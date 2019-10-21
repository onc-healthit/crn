package org.sitenv.spring.dao;

import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hl7.fhir.r4.model.Bundle;
import org.hl7.fhir.r4.model.Condition;
import org.hl7.fhir.r4.model.IdType;
import org.hl7.fhir.r4.model.Observation;
import org.hl7.fhir.r4.model.Patient;
import org.hl7.fhir.r4.model.Person;
import org.hl7.fhir.r4.model.Procedure;
import org.hl7.fhir.r4.model.QuestionnaireResponse;
import org.sitenv.spring.model.DafCondition;
import org.sitenv.spring.model.DafObservation;
import org.sitenv.spring.model.DafPatient;
import org.sitenv.spring.model.DafPerson;
import org.sitenv.spring.model.DafProcedure;
import org.sitenv.spring.model.DafQuestionnaireResponse;
import org.sitenv.spring.query.PatientSearchCriteria;
import org.sitenv.spring.util.AESencryption;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import ca.uhn.fhir.context.FhirContext;
import ca.uhn.fhir.parser.IParser;

@Repository("patientDao")
public class PatientDaoImpl extends AbstractDao implements PatientDao {
	
	@Autowired
	FhirContext fhirContext;

	@Autowired
    private SessionFactory sessionFactory;

	/**
     * This method builds query for fetching all patients
     * @return : List of patient records
     */
    @Override
    @Transactional
	public List<DafPatient> getAllPatientsList() {
    	List<DafPatient> list = getSession().createNativeQuery(
    			"select * from patient", DafPatient.class)
    				.getResultList();
		return list;
	}

    /**
     * This method builds criteria for creating the patient
     * @return : patient record
     */
    @Override
    @Transactional
	public DafPatient createPatient(Patient thePatient) {
		Session session = sessionFactory.openSession();
		DafPatient dafPatient = new DafPatient();
		IParser jsonParser = fhirContext.newJsonParser();;
		dafPatient.setData(jsonParser.encodeResourceToString(thePatient));
		session.beginTransaction();
		session.save(dafPatient);
		session.getTransaction().commit();
		session.close();
		return dafPatient;
	}
	
	/**
	 * This method builds query for fetching particular version of the patient record by id.
	 * @param theId : ID of the patient
	 * @param versionId : version of the patient record
	 * @return : DafPatient object
	 */
	@Override
	@Transactional 
	public DafPatient getPatientByVersionId(int theId, String versionId) {
		DafPatient list = getSession().createNativeQuery(
			"select * from patient where id = '"+theId+"' and data->'meta'->>'versionId' = '"+versionId+"'", DafPatient.class)
				.getSingleResult();
			return list;
	}

	/**
	 * This method builds criteria for fetching patient record by id.
	 * @param id : ID of the resource
	 * @return : DafPatient object
	 */
	@Override
	public DafPatient getPatientById(int theId) {
		Session session = sessionFactory.openSession();
		DafPatient dafPatient = (DafPatient)session.get(DafPatient.class, theId);
		session.close();
		return dafPatient;
	}

	@Override
	public Bundle getPatientResourcesById(PatientSearchCriteria searchOption) {
		Bundle resourceBundle = new Bundle();
		IParser jsonParser = fhirContext.newJsonParser(); 
		String patientId = null;
		List<DafQuestionnaireResponse> dafQuestionnaireResponse = null;
		List<DafObservation> dafObservation = null;
		List<DafProcedure> dafProcedure = null;
		List<DafCondition> dafCondition = null;
		List<QuestionnaireResponse> questionnaireResponseList = null;
		QuestionnaireResponse theQuestionnaireResponse = null;
		List<Observation> observationList = null;
		Observation theObservation = null;
		List<Procedure> procedureList = null;
		Procedure theProcedure = null;
		List<Condition> conditionList = null;
		Condition theCondition = null;
		Patient thePatient = null;
		DafPatient dafPatient = null;
		
		//patientId
        if (StringUtils.isNotBlank(searchOption.getPatientId())) {
        	patientId = searchOption.getPatientId();
		}
        
        try {
        	//Patient
        	int theId = Integer.parseInt(patientId);
        	Session patientSession = sessionFactory.openSession();
    		dafPatient = (DafPatient)patientSession.get(DafPatient.class, theId);
    		patientSession.close();
    		thePatient = jsonParser.parseResource(Patient.class, dafPatient.getData());
    		thePatient.setId(new IdType("Patient", dafPatient.getId().toString()));
			//questionnaireResponseList.add(theQuestionnaireResponse);
			resourceBundle.addEntry()
			   .setFullUrl(thePatient.getId())
			   .setResource(thePatient);
    		
        	//QuestionnaireResponse
			Session questionnaireResponseSession = sessionFactory.openSession();
        	dafQuestionnaireResponse = questionnaireResponseSession.createNativeQuery(
					"select * from questionnaireresponse where data->'subject'->>'reference' = '"+"Patient/"+patientId+"' ", 
					DafQuestionnaireResponse.class).getResultList();
        	questionnaireResponseSession.close();

			for(int i = 0; i < dafQuestionnaireResponse.size(); i++) {
				theQuestionnaireResponse = jsonParser.parseResource(QuestionnaireResponse.class, 
						dafQuestionnaireResponse.get(i).getData());
				theQuestionnaireResponse.setId(new IdType("QuestionnaireResponse", dafQuestionnaireResponse.get(i).getId().toString()));
				//questionnaireResponseList.add(theQuestionnaireResponse);
				resourceBundle.addEntry()
				   .setFullUrl(theQuestionnaireResponse.getId())
				   .setResource(theQuestionnaireResponse);
			}
			//Condition
			Session conditionResponseSession = sessionFactory.openSession();
			dafCondition = conditionResponseSession.createNativeQuery(
					"select * from condition where data->'subject'->>'reference' = '"+"Patient/"+patientId+"' ", 
					DafCondition.class).getResultList();
			conditionResponseSession.close();
			for(int i = 0; i < dafCondition.size(); i++) {
				theCondition = jsonParser.parseResource(Condition.class, dafCondition.get(i).getData());
				theCondition.setId(new IdType("Condition", dafCondition.get(i).getId().toString()));
				//conditionList.add(theCondition);
				resourceBundle.addEntry()
				   .setFullUrl(theCondition.getId())
				   .setResource(theCondition);
			}
			//Procedure
			Session procedureSession = sessionFactory.openSession();
			dafProcedure = procedureSession.createNativeQuery(
					"select * from procedure where data->'subject'->>'reference' = '"+"Patient/"+patientId+"' ", DafProcedure.class)
						.getResultList();
			procedureSession.close();
			for(int i = 0; i < dafProcedure.size(); i++) {
				theProcedure = jsonParser.parseResource(Procedure.class, dafProcedure.get(i).getData());
				theProcedure.setId(new IdType("Procedure", dafProcedure.get(i).getId().toString()));
				//procedureList.add(theProcedure);
				resourceBundle.addEntry()
				   .setFullUrl(theProcedure.getId())
				   .setResource(theProcedure);
			}
			//Observation
			Session observationSession = sessionFactory.openSession();
			dafObservation = observationSession.createNativeQuery(
					"select * from observationvitalsigns where data->'subject'->>'reference' = '"+"Patient/"+patientId+"' ", DafObservation.class)
						.getResultList();
			observationSession.close();
			for(int i = 0; i < dafObservation.size(); i++) {
				theObservation = jsonParser.parseResource(Observation.class, dafObservation.get(i).getData());
				theObservation.setId(new IdType("Observation", dafObservation.get(i).getId().toString()));
				//observationList.add(theObservation);
				resourceBundle.addEntry()
				   .setFullUrl(theObservation.getId())
				   .setResource(theObservation);
			}
				
		} catch (Exception e) {
			e.printStackTrace();
		}
		return resourceBundle;
	}
}
