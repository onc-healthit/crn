package org.sitenv.spring.service;

import java.util.List;

import org.hl7.fhir.r4.model.Questionnaire;
import org.sitenv.spring.model.DafQuestionnaire;

public interface QuestionnaireService {
	
	public Questionnaire getQuestionnaireById(int id);
	
	public List<Questionnaire> getAllQuestionnaire();
	
	public Questionnaire getQuestionnaireByVersionId(int theId, String versionId);
	
	public DafQuestionnaire createQuestionnaire(Questionnaire theQuestionnaire);
	
	public DafQuestionnaire updateQuestionnaireById(int theId, Questionnaire theQuestionnaire);

	public List<Questionnaire> getQuestionnaireByCategory(String categoryId);

}
