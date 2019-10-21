package org.sitenv.spring.service;

import java.util.ArrayList;
import java.util.List;

import org.hl7.fhir.r4.model.Bundle;
import org.hl7.fhir.r4.model.IdType;
import org.hl7.fhir.r4.model.Patient;
import org.sitenv.spring.dao.PatientDao;
import org.sitenv.spring.model.DafPatient;
import org.sitenv.spring.query.PatientSearchCriteria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ca.uhn.fhir.context.FhirContext;
import ca.uhn.fhir.parser.IParser;

@Service("PatientService")
public class PatientServiceImpl implements PatientService {
	
	public static final String RESOURCE_TYPE = "Patient";

	@Autowired
	private PatientDao patientDao;
	
	@Autowired
	FhirContext fhirContext;

	@Override
	public List<Patient> getAllPatientsList() {
		Patient patient = null;
		List<Patient> patientList = new ArrayList<Patient>();
		IParser jsonParser = fhirContext.newJsonParser();
		List<DafPatient> dafPatientList = patientDao.getAllPatientsList();
		if(dafPatientList != null && dafPatientList.size() > 0) {
			for(DafPatient dafPatient : dafPatientList) {
				patient = jsonParser.parseResource(Patient.class, dafPatient.getData());
				patient.setId(new IdType(RESOURCE_TYPE, dafPatient.getId().toString()));
				patientList.add(patient);
			}
		}
		return patientList;
	}
	
	@Override
	public DafPatient createPatient(Patient thePatient) {
		return patientDao.createPatient(thePatient);
	}

	@Override
	public Patient getPatientByVersionId(int theId, String versionId) {
		Patient patient = null;
		IParser jsonParser = fhirContext.newJsonParser();
		DafPatient dafPatient = patientDao.getPatientByVersionId(theId, versionId);
		if(dafPatient != null) {
			patient = jsonParser.parseResource(Patient.class, dafPatient.getData());
			patient.setId(new IdType(RESOURCE_TYPE, dafPatient.getId().toString()));
		}
		return patient;
	}

	@Override
	public Patient getPatientById(int theId) {
		Patient patient = null;
		IParser jsonParser = fhirContext.newJsonParser();
		DafPatient dafPatient = patientDao.getPatientById(theId);
		if(dafPatient != null) {
			patient = jsonParser.parseResource(Patient.class, dafPatient.getData());
			patient.setId(new IdType(RESOURCE_TYPE, dafPatient.getId().toString()));
		}
		return patient;
	}

	@Override
	public Bundle getPatientResourcesById(PatientSearchCriteria searchOption) {
		return patientDao.getPatientResourcesById(searchOption);
	}
}
