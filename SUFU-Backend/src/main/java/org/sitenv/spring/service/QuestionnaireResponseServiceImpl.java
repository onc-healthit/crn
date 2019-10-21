package org.sitenv.spring.service;

import java.util.ArrayList;
import java.util.List;

import org.hl7.fhir.r4.model.IdType;
import org.hl7.fhir.r4.model.QuestionnaireResponse;
import org.sitenv.spring.dao.QuestionnaireResponseDao;
import org.sitenv.spring.model.DafQuestionnaireResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ca.uhn.fhir.context.FhirContext;
import ca.uhn.fhir.parser.IParser;

@Service("QuestionnaireResponseService")
public class QuestionnaireResponseServiceImpl implements QuestionnaireResponseService
{

	public static final String RESOURCE_TYPE = "QuestionnaireResponse";

	@Autowired
	private QuestionnaireResponseDao questionnaireResponseDao;

	@Autowired
	FhirContext fhirContext;

	@Override
	@Transactional
	public QuestionnaireResponse getQuestionnaireResponseById(int id) {
		QuestionnaireResponse questionnaireResponse = null;
		IParser jsonParser = fhirContext.newJsonParser();
		DafQuestionnaireResponse dafQuestionnaireResponse = questionnaireResponseDao.getQuestionnaireResponseById(id);
		if (dafQuestionnaireResponse != null) {
			questionnaireResponse = jsonParser.parseResource(QuestionnaireResponse.class, dafQuestionnaireResponse.getData());
			questionnaireResponse.setId(new IdType(RESOURCE_TYPE, dafQuestionnaireResponse.getId().toString()));
		}
		return questionnaireResponse;
	}

	@Override
	public QuestionnaireResponse getQuestionnaireResponseByVersionId(int theId, String versionId) {

		IParser jsonParser = fhirContext.newJsonParser();
		DafQuestionnaireResponse dafQuestionnaireResponse = questionnaireResponseDao.getQuestionnaireResponseByVersionId(theId, versionId);
		QuestionnaireResponse questionnaireResponse = jsonParser.parseResource(QuestionnaireResponse.class, dafQuestionnaireResponse.getData());
		questionnaireResponse.setId(new IdType(RESOURCE_TYPE, dafQuestionnaireResponse.getId().toString()));
		return questionnaireResponse;
	}

	@Override
	public DafQuestionnaireResponse createQuestionnaireResponse(QuestionnaireResponse theQuestionnaireResponse) {
		return questionnaireResponseDao.createQuestionnaireResponse(theQuestionnaireResponse);
	}
	
	@Override
	public List<QuestionnaireResponse> getAllQuestionnaireResponse() {
		QuestionnaireResponse questionnaireResponse= null;
		List<QuestionnaireResponse> questionnaireResponseList = new ArrayList<QuestionnaireResponse>();
		IParser jsonParser = fhirContext.newJsonParser();
		List<DafQuestionnaireResponse> dafQuestionnaireResponseList = questionnaireResponseDao.getAllQuestionnaireResponse();
		if(dafQuestionnaireResponseList != null && dafQuestionnaireResponseList.size() > 0) {
			for(DafQuestionnaireResponse dafQuestionnaireResponse : dafQuestionnaireResponseList) {
				questionnaireResponse = jsonParser.parseResource(QuestionnaireResponse.class, dafQuestionnaireResponse.getData());
				questionnaireResponse.setId(new IdType(RESOURCE_TYPE, dafQuestionnaireResponse.getId().toString()));
				questionnaireResponseList.add(questionnaireResponse);
			}
		}
		return questionnaireResponseList;
	}

	@Override
	public List<QuestionnaireResponse> getQuestionnaireResponseByAuthor(String authorId) {
		QuestionnaireResponse questionnaireResponse= null;
		List<QuestionnaireResponse> questionnaireResponseList = new ArrayList<QuestionnaireResponse>();
		IParser jsonParser = fhirContext.newJsonParser();
		List<DafQuestionnaireResponse> dafQuestionnaireResponseList = questionnaireResponseDao.getQuestionnaireResponseByAuthor(authorId);
		if(dafQuestionnaireResponseList != null && dafQuestionnaireResponseList.size() > 0) {
			for(DafQuestionnaireResponse dafQuestionnaireResponse : dafQuestionnaireResponseList) {
				questionnaireResponse = jsonParser.parseResource(QuestionnaireResponse.class, dafQuestionnaireResponse.getData());
				questionnaireResponse.setId(new IdType(RESOURCE_TYPE, dafQuestionnaireResponse.getId().toString()));
				questionnaireResponseList.add(questionnaireResponse);
			}
		}
		return questionnaireResponseList;
	}

	@Override
	public DafQuestionnaireResponse updateQuestionnaireResponseById(int theId,
			QuestionnaireResponse theQuestionnaireResponse) {
		return questionnaireResponseDao.updateQuestionnaireResponseById(theId, theQuestionnaireResponse);
	}
}
