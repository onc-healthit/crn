package org.sitenv.spring.dao;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hl7.fhir.r4.model.Observation;
import org.sitenv.spring.model.DafObservation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import ca.uhn.fhir.context.FhirContext;
import ca.uhn.fhir.parser.IParser;

@Repository("observationDao")
public class ObservationDaoImpl extends AbstractDao implements ObservationDao {
	
	@Autowired
	FhirContext fhirContext;

	@Autowired
    private SessionFactory sessionFactory;
	
	/**
	 * Creates the observation resource
	 * @param theObservation
	 * @return dafObservation
	 */
	@Override
	@Transactional
	public DafObservation createObservation(Observation theObservation) {
		Session session = sessionFactory.openSession();
		DafObservation dafObservation = new DafObservation();
		IParser jsonParser = fhirContext.newJsonParser();;
		dafObservation.setData(jsonParser.encodeResourceToString(theObservation));
		session.beginTransaction();
		session.save(dafObservation);
		session.getTransaction().commit();
		session.close();
		return dafObservation;
	}
}
