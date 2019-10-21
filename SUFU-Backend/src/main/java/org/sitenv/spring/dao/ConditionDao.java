package org.sitenv.spring.dao;

import org.hl7.fhir.r4.model.Condition;
import org.sitenv.spring.model.DafCondition;

public interface ConditionDao {

	DafCondition createCondition(Condition theCondition);

}
