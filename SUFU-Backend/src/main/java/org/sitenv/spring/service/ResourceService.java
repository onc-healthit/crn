package org.sitenv.spring.service;

import org.json.JSONArray;

public interface ResourceService {

	JSONArray getResourcesForPatient(Integer patientId);
}
