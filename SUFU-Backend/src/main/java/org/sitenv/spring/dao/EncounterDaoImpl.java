package org.sitenv.spring.dao;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hl7.fhir.r4.model.Encounter;
import org.sitenv.spring.model.DafEncounter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import ca.uhn.fhir.context.FhirContext;
import ca.uhn.fhir.parser.IParser;

@Repository("encounterDao")
public class EncounterDaoImpl extends AbstractDao implements EncounterDao {

	
	@Autowired
	FhirContext fhirContext;

	@Autowired
    private SessionFactory sessionFactory;
	
	/**
	 * Creates the enconter resource
	 * @param theEncounter
	 * @return dafEncounter
	 */
	@Override
	@Transactional
	public DafEncounter createEncounter(Encounter theEncounter) {
		Session session = sessionFactory.openSession();
		DafEncounter dafEncounter = new DafEncounter();
		IParser jsonParser = fhirContext.newJsonParser();;
		dafEncounter.setData(jsonParser.encodeResourceToString(theEncounter));
		session.beginTransaction();
		session.save(dafEncounter);
		session.getTransaction().commit();
		session.close();
		return dafEncounter;
	}
}
