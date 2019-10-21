package org.sitenv.spring.service;

import org.hl7.fhir.r4.model.Condition;
import org.sitenv.spring.dao.ConditionDao;
import org.sitenv.spring.model.DafCondition;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ca.uhn.fhir.context.FhirContext;

@Service("ConditionService")
public class ConditionServiceImpl implements ConditionService {

	public static final String RESOURCE_TYPE = "Condition";

	@Autowired
	private ConditionDao conditionDao;
	
	@Autowired
	FhirContext fhirContext;
	
	@Override
	public DafCondition createCondition(Condition theCondition) {
		return conditionDao.createCondition(theCondition);
	}
}
