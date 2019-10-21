package org.sitenv.spring.dao;

import java.util.List;

import org.hl7.fhir.r4.model.QuestionnaireResponse;
import org.sitenv.spring.model.DafQuestionnaireResponse;

public interface QuestionnaireResponseDao {

	public DafQuestionnaireResponse getQuestionnaireResponseById(int id);
	
	public List<DafQuestionnaireResponse> getAllQuestionnaireResponse();

	public DafQuestionnaireResponse getQuestionnaireResponseByVersionId(int theId, String versionId);

	public DafQuestionnaireResponse createQuestionnaireResponse(QuestionnaireResponse theQuestionnaireResponse);
	
	public List<DafQuestionnaireResponse> getQuestionnaireResponseByAuthor(String authorId);
	
	public DafQuestionnaireResponse updateQuestionnaireResponseById(int theId, QuestionnaireResponse theQuestionnaireResponse);
}
