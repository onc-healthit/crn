package org.sitenv.spring.service;

import org.hl7.fhir.r4.model.Observation;
import org.sitenv.spring.model.DafObservation;

public interface ObservationService {

	DafObservation createObservation(Observation theObservation);

}
