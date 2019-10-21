package org.sitenv.spring.dao;

import org.json.JSONArray;

public interface ResourceDao {
	
	JSONArray getResourcesForPatient(Integer patientId);

}
