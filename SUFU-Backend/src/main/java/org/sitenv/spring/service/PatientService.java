package org.sitenv.spring.service;

import java.util.List;

import org.hl7.fhir.r4.model.Bundle;
import org.hl7.fhir.r4.model.Patient;
import org.sitenv.spring.model.DafPatient;
import org.sitenv.spring.query.PatientSearchCriteria;

public interface PatientService {
	
	public List<Patient> getAllPatientsList();
	
	public DafPatient createPatient(Patient thePatient);
	
	public Patient getPatientByVersionId(int theId, String versionId);
	
	public Patient getPatientById(int theId);

	public Bundle getPatientResourcesById(PatientSearchCriteria searchOption);
}
