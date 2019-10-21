package org.sitenv.spring.dao;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hl7.fhir.r4.model.Condition;
import org.sitenv.spring.model.DafCondition;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import ca.uhn.fhir.context.FhirContext;
import ca.uhn.fhir.parser.IParser;

@Repository("conditionDao")
public class ConditionDaoImpl extends AbstractDao implements ConditionDao {

	@Autowired
	FhirContext fhirContext;

	@Autowired
    private SessionFactory sessionFactory;
	
	/**
	 * Creates the condition resource
	 * @param theCondition
	 * @return dafCondition
	 */
	@Override
	@Transactional
	public DafCondition createCondition(Condition theCondition) {
		Session session = sessionFactory.openSession();
		DafCondition dafCondition = new DafCondition();
		IParser jsonParser = fhirContext.newJsonParser();;
		dafCondition.setData(jsonParser.encodeResourceToString(theCondition));
		session.beginTransaction();
		session.save(dafCondition);
		session.getTransaction().commit();
		session.close();
		return dafCondition;
	}
}
