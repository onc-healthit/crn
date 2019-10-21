package org.sitenv.spring.dao;

import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import javax.transaction.Transactional;
import javax.transaction.Transactional.TxType;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hl7.fhir.r4.model.IdType;
import org.hl7.fhir.r4.model.Person;
import org.hl7.fhir.r4.model.StringType;
import org.sitenv.spring.model.DafPerson;
import org.sitenv.spring.query.PersonSearchCriteria;
import org.sitenv.spring.util.AESencryption;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.apache.commons.lang3.StringUtils;


import ca.uhn.fhir.context.FhirContext;
import ca.uhn.fhir.parser.IParser;

@Repository("PersonDao")
public class PersonDaoImpl extends AbstractDao implements PersonDao {

	public static final String PASSWORD_URL = "http://hl7.org/fhir/StructureDefinition/person-password";
	public static final String RESOURCE_TYPE = "Person";

	@Autowired
	FhirContext fhirContext;

	@Autowired
    private SessionFactory sessionFactory;
	
	@Override
	public List<DafPerson> getAllPersonsList() {
		Session session = sessionFactory.openSession();
		CriteriaBuilder builder = session.getCriteriaBuilder();

	    // UPDATED: Create CriteriaQuery
	    CriteriaQuery<DafPerson> criteria = builder.createQuery(DafPerson.class);

	    // UPDATED: Specify criteria root
	    Root<DafPerson> root = criteria.from(DafPerson.class);
	    
	    criteria.select(root);
	    criteria.orderBy(builder.asc(root.get("id")));

	    // UPDATED: Execute query
	    List<DafPerson> personsList = session.createQuery(criteria).getResultList();
	    
	    session.close();
	    
	    return personsList;
	}

	@Override
	@Transactional(value=TxType.REQUIRES_NEW)
	public DafPerson createPerson(Person thePerson) {
		DafPerson dafPerson = new DafPerson();
		IParser jsonParser = fhirContext.newJsonParser(); 
		try {
			int noOfExt = thePerson.getExtension().size(); 
			for(int i = 0; i < noOfExt; i++) {
				String passwordUrl = thePerson.getExtension().get(i).getUrl().toString();
				if (PASSWORD_URL.equals(passwordUrl)) {
					String encryptedPassword = AESencryption.encrypt(thePerson.getExtension().get(i).getValue().toString());
					StringType theType = new StringType();
					theType.setValue(encryptedPassword);
					thePerson.getExtension().get(i).setValue(theType);
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		dafPerson.setData(jsonParser.encodeResourceToString(thePerson));
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		session.save(dafPerson);
		session.getTransaction().commit();
		session.close();
		return dafPerson;
	}

	@Override
	public DafPerson updatePersonById(int theId, Person thePerson) {
		DafPerson dafPerson = new DafPerson();
		IParser jsonParser = fhirContext.newJsonParser();
		dafPerson.setId(theId);
		dafPerson.setData(jsonParser.encodeResourceToString(thePerson));
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		session.update(dafPerson);
		session.getTransaction().commit();
		session.close();
		return dafPerson;
	}

	@Override
	public DafPerson getPersonById(int id) {
		Session session = sessionFactory.openSession();
		DafPerson dafPerson = (DafPerson)session.get(DafPerson.class, id);
		session.close();
		return dafPerson;
	}


	@Override
	public DafPerson getPersonByVersionId(int theId, String versionId) {
		Session session = sessionFactory.openSession();
		DafPerson list = session.createNativeQuery(
				"select * from person where id = '"+theId+"' and data->'meta'->>'versionId' = '"+versionId+"'", DafPerson.class)
					.getSingleResult();
				return list;
	}

	@Override
	public DafPerson deletePerson(int theId) {
		DafPerson dafPerson = new DafPerson();
		dafPerson.setId(theId);
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		session.delete(dafPerson);
		session.getTransaction().commit();
		session.close();
		return dafPerson;
	}

	@Override
	public DafPerson findPersonByEmailAndPassword(PersonSearchCriteria searchOptions) {
		Session session = sessionFactory.openSession();
		String email = "";
		String password = "";
		IParser jsonParser = fhirContext.newJsonParser(); 
		String decryptedPassword = "";
		Person person = null;
		DafPerson dafPerson = null;
		//email
        if (StringUtils.isNotBlank(searchOptions.getEmail())) {
			email = searchOptions.getEmail();
		}
        //password
        if (StringUtils.isNotBlank(searchOptions.getPassword())) {
			password = searchOptions.getPassword();
        }

		try {
			dafPerson = session.createNativeQuery(
					"select * from person where data->'telecom'->0->>'value' = '"+email+"' "
							+ "or data->'telecom'->1->>'value' = '"+email+"' "
									+ "or data->'telecom'->2->>'value' = '"+email+"'", DafPerson.class)
						.getSingleResult();
			
			person = jsonParser.parseResource(Person.class, dafPerson.getData());
			person.setId(new IdType(RESOURCE_TYPE, dafPerson.getId().toString()));
			
			int noOfExt = person.getExtension().size(); 
			for(int i = 0; i < noOfExt; i++) {
				String passwordUrl = person.getExtension().get(i).getUrl().toString();
				if (PASSWORD_URL.equals(passwordUrl)) {
					decryptedPassword = AESencryption.decrypt(person.getExtension().get(i).getValue().toString());
					if(!password.equals(decryptedPassword)) {
						dafPerson = null;
					}
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return dafPerson;
	}
}
