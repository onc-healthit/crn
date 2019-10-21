package org.sitenv.spring.service;

import java.util.ArrayList;
import java.util.List;

import org.hl7.fhir.r4.model.IdType;
import org.hl7.fhir.r4.model.Person;
import org.sitenv.spring.dao.PersonDao;
import org.sitenv.spring.model.DafPerson;
import org.sitenv.spring.query.PersonSearchCriteria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ca.uhn.fhir.context.FhirContext;
import ca.uhn.fhir.parser.IParser;

@Service("PersonService")
public class PersonServiceImpl implements PersonService {
	
	public static final String RESOURCE_TYPE = "Person";

	@Autowired
	private PersonDao personDao;

	@Autowired
	FhirContext fhirContext;

	@Override
	public List<Person> getAllPersonsList() {
		Person person = null;
		List<Person> personList = new ArrayList<Person>();
		IParser jsonParser = fhirContext.newJsonParser();
		List<DafPerson> dafPersonList = personDao.getAllPersonsList();
		if(dafPersonList != null && dafPersonList.size() > 0) {
			for(DafPerson dafPerson : dafPersonList) {
				person = jsonParser.parseResource(Person.class, dafPerson.getData());
				person.setId(new IdType(RESOURCE_TYPE, dafPerson.getId().toString()));
				personList.add(person);
			}
		}
		return personList;
	}

	@Override
	public DafPerson createPerson(Person thePerson) {
		return personDao.createPerson(thePerson);
	}

	@Override
	public DafPerson updatePersonById(int theId, Person thePerson) {
		return personDao.updatePersonById(theId, thePerson);
	}

	@Override
	public Person getPersonById(int id) {
		Person person = null;
		IParser jsonParser = fhirContext.newJsonParser();
		DafPerson dafPerson = personDao.getPersonById(id);
		if(dafPerson != null) {
			person = jsonParser.parseResource(Person.class, dafPerson.getData());
			person.setId(new IdType(RESOURCE_TYPE, dafPerson.getId().toString()));
		}
		return person;
	}

	@Override
	public Person getPersonByVersionId(int theId, String versionId) {
		Person person = null;
		IParser jsonParser = fhirContext.newJsonParser();
		DafPerson dafPerson = personDao.getPersonByVersionId(theId, versionId);
		if(dafPerson != null) {
			person = jsonParser.parseResource(Person.class, dafPerson.getData());
			person.setId(new IdType(RESOURCE_TYPE, dafPerson.getId().toString()));
		}
		return person;
	}

	@Override
	public DafPerson deletePerson(int theId) {
		return personDao.deletePerson(theId);
	}

	@Override
	public DafPerson findPersonByEmailAndPassword(PersonSearchCriteria criteria) {
		return personDao.findPersonByEmailAndPassword(criteria);
	}
}
