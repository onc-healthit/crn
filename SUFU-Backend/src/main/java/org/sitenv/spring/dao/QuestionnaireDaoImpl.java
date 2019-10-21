package org.sitenv.spring.dao;

import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import javax.transaction.Transactional;
import javax.transaction.Transactional.TxType;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Conjunction;
import org.hibernate.criterion.Restrictions;
import org.hl7.fhir.r4.model.Questionnaire;
import org.sitenv.spring.model.DafQuestionnaire;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import ca.uhn.fhir.context.FhirContext;
import ca.uhn.fhir.parser.IParser;

@Repository("QuestionnaireDao")
public class QuestionnaireDaoImpl extends AbstractDao implements QuestionnaireDao {
	
	
	@Autowired
	FhirContext fhirContext;

	@Autowired
    private SessionFactory sessionFactory;
	
	/**
	 * This method builds criteria for fetching Questionnaire record by id.
	 * 
	 * @param id : ID of the resource
	 * @return : DafQuestionnaire object
	 */

	@Override
	public DafQuestionnaire getQuestionnaireById(int id) {
		Session session = sessionFactory.openSession();
		DafQuestionnaire dafQuestionnaire = (DafQuestionnaire)session.get(DafQuestionnaire.class, id);
		session.close();
		return dafQuestionnaire;
	}

	/**
	 * This method builds criteria for fetching particular version of the
	 * Questionnaire record by id.
	 * 
	 * @param theId     : ID of the Questionnaire
	 * @param versionId : version of the Questionnaire record
	 * @return : DafQuestionnaire object
	 */

	@Override
	public DafQuestionnaire getQuestionnaireByVersionId(int theId, String versionId) {
		
		Session session = sessionFactory.openSession();
		Criteria criteria = session.createCriteria(DafQuestionnaire.class)
				.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);
		Conjunction versionConjunction = Restrictions.conjunction();
		versionConjunction.add(Restrictions.sqlRestriction("{alias}.data->'meta'->>'versionId' = '" + versionId + "'"));
		versionConjunction.add(Restrictions.sqlRestriction("id = '" + theId + "'"));
		criteria.add(versionConjunction);
		DafQuestionnaire dafQuestionnaire = (DafQuestionnaire) criteria.uniqueResult();
		session.close();
		return dafQuestionnaire;
	}

	@Override
	@Transactional(value=TxType.REQUIRES_NEW)
	public DafQuestionnaire createQuestionnaire(Questionnaire theQuestionnaire) {
		
		DafQuestionnaire dafQuestionnaire = new DafQuestionnaire();
		IParser jsonParser = fhirContext.newJsonParser();
		
		jsonParser.encodeResourceToString(theQuestionnaire);
		dafQuestionnaire.setData(jsonParser.encodeResourceToString(theQuestionnaire));
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		session.save(dafQuestionnaire);
		session.getTransaction().commit();
		session.close();
		return dafQuestionnaire;
	}

	@Override
	public List<DafQuestionnaire> getAllQuestionnaire() {
		Session session = sessionFactory.openSession();
		CriteriaBuilder builder = session.getCriteriaBuilder();

	    // UPDATED: Create CriteriaQuery
	    CriteriaQuery<DafQuestionnaire> criteria = builder.createQuery(DafQuestionnaire.class);

	    // UPDATED: Specify criteria root
	    Root<DafQuestionnaire> root = criteria.from(DafQuestionnaire.class);
	    
	    criteria.select(root);
	    criteria.orderBy(builder.asc(root.get("id")));

	    // UPDATED: Execute query
	    List<DafQuestionnaire> questionnaireList = session.createQuery(criteria).getResultList();
	    
	    session.close();
	    
	    return questionnaireList;

	}
	
	@Override
	@Transactional
	public List<DafQuestionnaire> getQuestionnaireByCategory(String categoryId) {
	    List<DafQuestionnaire> questionnaireList = getSession().createNativeQuery(
			"select * from questionnaire where data->'extension'->0->>'valueId' = '"+categoryId+"'", DafQuestionnaire.class)
				.getResultList();
		return questionnaireList;
	}

	@Override
	public DafQuestionnaire updateQuestionnaireById(int theId, Questionnaire theQuestionnaire) {
		DafQuestionnaire dafQuestionnaire = new DafQuestionnaire();
		IParser jsonParser = fhirContext.newJsonParser();
		dafQuestionnaire.setId(theId);
		dafQuestionnaire.setData(jsonParser.encodeResourceToString(theQuestionnaire));
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		session.update(dafQuestionnaire);
		session.getTransaction().commit();
		session.close();
		return dafQuestionnaire;
	}

}
