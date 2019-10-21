package org.sitenv.spring.dao;

import java.util.List;

import org.hl7.fhir.r4.model.Bundle;
import org.hl7.fhir.r4.model.Patient;
import org.sitenv.spring.model.DafPatient;
import org.sitenv.spring.query.PatientSearchCriteria;

public interface PatientDao {
	
	public List<DafPatient> getAllPatientsList();
	
	public DafPatient createPatient(Patient thePatient);
	
	public DafPatient getPatientByVersionId(int theId, String versionId);
	
	public DafPatient getPatientById(int theId);

	public Bundle getPatientResourcesById(PatientSearchCriteria searchOption);
}
