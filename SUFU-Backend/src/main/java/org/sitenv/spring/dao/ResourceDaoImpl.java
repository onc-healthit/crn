package org.sitenv.spring.dao;

import java.util.List;

import org.json.JSONArray;
import org.sitenv.spring.model.DafCondition;
import org.sitenv.spring.model.DafObservation;
import org.sitenv.spring.model.DafProcedure;
import org.sitenv.spring.model.DafQuestionnaireResponse;
import org.springframework.stereotype.Repository;

@Repository
public class ResourceDaoImpl extends AbstractDao implements ResourceDao {

	@Override
	public JSONArray getResourcesForPatient(Integer patientId) {
		JSONArray resourceList = new JSONArray();
		
		//Fetch questionnaire response
		List<DafQuestionnaireResponse> qrList = getSession().createNativeQuery(
				"select * from questionnaireresponse where data->'subject'->>'reference' = '"+"Patient/"+patientId+"'", DafQuestionnaireResponse.class)
		.getResultList();
		if(!qrList.isEmpty()) {
			resourceList.put(qrList);
		}
		 
		//Fetch observation 
		List<DafObservation> observationList = getSession().createNativeQuery(
				"select * from observationvitalsigns where data->'subject'->>'reference' = '"+"Patient/"+patientId+"'", DafObservation.class)
		.getResultList();
		if(!observationList.isEmpty()) {
			resourceList.put(observationList);
		}
		
		//Fetch procedure
		List<DafProcedure> procedureList = getSession().createNativeQuery(
				"select * from procedure where data->'subject'->>'reference' = '"+"Patient/"+patientId+"'", DafProcedure.class)
		.getResultList();
		if(!procedureList.isEmpty()) {
			resourceList.put(procedureList);
		}
		
		//Fetch condition
		List<DafCondition> conditionList = getSession().createNativeQuery(
				"select * from condition where data->'subject'->>'reference' = '"+"Patient/"+patientId+"'", DafCondition.class)
		.getResultList();
		if(!conditionList.isEmpty()) {
			resourceList.put(conditionList);
		}
		
		return resourceList;
	}
}

