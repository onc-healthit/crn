package org.sitenv.spring.service;

import java.util.List;

import org.hl7.fhir.r4.model.QuestionnaireResponse;
import org.sitenv.spring.model.DafQuestionnaireResponse;

public interface QuestionnaireResponseService {

	public QuestionnaireResponse getQuestionnaireResponseById(int id);
	
	public List<QuestionnaireResponse> getAllQuestionnaireResponse();

	public QuestionnaireResponse getQuestionnaireResponseByVersionId(int theId, String versionId);

	public DafQuestionnaireResponse createQuestionnaireResponse(QuestionnaireResponse theQuestionnaire);
	
	public List<QuestionnaireResponse> getQuestionnaireResponseByAuthor(String authorId);

	public DafQuestionnaireResponse updateQuestionnaireResponseById(int theId, QuestionnaireResponse theQuestionnaireResponse);
}
