package org.sitenv.spring.dao;

import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.transaction.Transactional;
import javax.transaction.Transactional.TxType;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Conjunction;
import org.hibernate.criterion.Restrictions;
import org.hl7.fhir.r4.model.QuestionnaireResponse;
import org.sitenv.spring.model.DafQuestionnaireResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import ca.uhn.fhir.context.FhirContext;
import ca.uhn.fhir.parser.IParser;

@Repository("QuestionnaireResponseDao")
public class QuestionnaireResponseDaoImpl extends AbstractDao implements QuestionnaireResponseDao {

	@Autowired
	FhirContext fhirContext;
	
	@Autowired
    private SessionFactory sessionFactory;

	/**
	 * This method builds criteria for fetching QuestionnaireResponse record by id.
	 * 
	 * @param id : ID of the resource
	 * @return : DafQuestionnaireResponse object
	 */
	@Override
	public DafQuestionnaireResponse getQuestionnaireResponseById(int id) {
		// UPDATED: Create CriteriaBuilder
		Session session = sessionFactory.openSession();
		DafQuestionnaireResponse dafQuestionnaireResponse = (DafQuestionnaireResponse) session
				.get(DafQuestionnaireResponse.class, id);
		session.close();
		return dafQuestionnaireResponse;
	}
	
	@Override
	public List<DafQuestionnaireResponse> getAllQuestionnaireResponse() {
		Session session = sessionFactory.openSession();
		CriteriaBuilder builder = session.getCriteriaBuilder();

	    // UPDATED: Create CriteriaQuery
	    CriteriaQuery<DafQuestionnaireResponse> criteria = builder.createQuery(DafQuestionnaireResponse.class);

	    // UPDATED: Specify criteria root
	    criteria.from(DafQuestionnaireResponse.class);

	    // UPDATED: Execute query
	    List<DafQuestionnaireResponse> questionnaireResponseList = session.createQuery(criteria).getResultList();
	    
	    session.close();
	    
	    return questionnaireResponseList;

	}

	/**
	 * This method builds criteria for fetching particular version of the
	 * QuestionnaireResponse record by id.
	 * 
	 * @param theId     : ID of the QuestionnaireResponse
	 * @param versionId : version of the QuestionnaireResponse record
	 * @return : DafQuestionnaireResponse object
	 */

	@Override
	public DafQuestionnaireResponse getQuestionnaireResponseByVersionId(int theId, String versionId) {
		Criteria criteria = getSession().createCriteria(DafQuestionnaireResponse.class)
				.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);
		Conjunction versionConjunction = Restrictions.conjunction();
		versionConjunction.add(Restrictions.sqlRestriction("{alias}.data->'meta'->>'versionId' = '" + versionId + "'"));
		versionConjunction.add(Restrictions.sqlRestriction("{alias}.data->>'id' = '" + theId + "'"));
		criteria.add(versionConjunction);
		return (DafQuestionnaireResponse) criteria.uniqueResult();
	}

	@Override
	@Transactional(value = TxType.REQUIRES_NEW)
	public DafQuestionnaireResponse createQuestionnaireResponse(QuestionnaireResponse theQuestionnaireResponse) {

		DafQuestionnaireResponse dafQuestionnaireResponse = new DafQuestionnaireResponse();
		IParser jsonParser = fhirContext.newJsonParser();

		jsonParser.encodeResourceToString(theQuestionnaireResponse);
		dafQuestionnaireResponse.setData(jsonParser.encodeResourceToString(theQuestionnaireResponse));
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		session.save(dafQuestionnaireResponse);
		session.getTransaction().commit();
		session.close();

		return dafQuestionnaireResponse;
	}

	@Override
	public List<DafQuestionnaireResponse> getQuestionnaireResponseByAuthor(String authorId) {
		Session session = sessionFactory.openSession();
		List<DafQuestionnaireResponse> list = session.createNativeQuery(
    			"select * from questionnaireresponse where data->'author'->>'reference' = '"+authorId+"' ", 
    			DafQuestionnaireResponse.class)
    				.getResultList();
		return list;
	}

	@Override
	public DafQuestionnaireResponse updateQuestionnaireResponseById(int theId, 
					QuestionnaireResponse theQuestionnaireResponse) {
		DafQuestionnaireResponse dafQuestionnaireResponse = new DafQuestionnaireResponse();
		IParser jsonParser = fhirContext.newJsonParser();
		dafQuestionnaireResponse.setId(theId);
		dafQuestionnaireResponse.setData(jsonParser.encodeResourceToString(theQuestionnaireResponse));
		Session session = sessionFactory.openSession();
		session.beginTransaction();
		session.update(dafQuestionnaireResponse);
		session.getTransaction().commit();
		session.close();
		return dafQuestionnaireResponse;
	}
}
