package org.sitenv.spring.service;

import javax.transaction.Transactional;

import org.json.JSONArray;
import org.sitenv.spring.dao.ResourceDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class ResourceServiceImpl implements ResourceService {

	@Autowired
	private ResourceDao resourceDao;
	
	@Override
	public JSONArray getResourcesForPatient(Integer patientId) {
		
		return resourceDao.getResourcesForPatient(patientId);
	}

}
