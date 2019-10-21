package org.sitenv.spring.dao;

import org.hl7.fhir.r4.model.Observation;
import org.sitenv.spring.model.DafObservation;

public interface ObservationDao {

	DafObservation createObservation(Observation theObservation);

}
