package org.sitenv.spring.service;

import org.hl7.fhir.r4.model.Condition;
import org.sitenv.spring.model.DafCondition;

public interface ConditionService {

	DafCondition createCondition(Condition theCondition);

}
