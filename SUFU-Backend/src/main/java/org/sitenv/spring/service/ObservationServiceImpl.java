package org.sitenv.spring.service;

import org.hl7.fhir.r4.model.Observation;
import org.sitenv.spring.dao.ObservationDao;
import org.sitenv.spring.model.DafObservation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ca.uhn.fhir.context.FhirContext;

@Service("ObservationService")
public class ObservationServiceImpl implements ObservationService {

	public static final String RESOURCE_TYPE = "Observation";

	@Autowired
	private ObservationDao observationDao;
	
	@Autowired
	FhirContext fhirContext;
	
	@Override
	public DafObservation createObservation(Observation theObservation) {
		return observationDao.createObservation(theObservation);
	}
}
