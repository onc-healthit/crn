package org.sitenv.spring.service;

import org.hl7.fhir.r4.model.Procedure;
import org.sitenv.spring.dao.ProcedureDao;
import org.sitenv.spring.model.DafProcedure;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ca.uhn.fhir.context.FhirContext;

@Service("ProcedureService")
public class ProcedureServiceImpl implements ProcedureService {


	public static final String RESOURCE_TYPE = "Procedure";

	@Autowired
	private ProcedureDao procedureDao;
	
	@Autowired
	FhirContext fhirContext;

	@Override
	public DafProcedure createProcedure(Procedure theProcedure) {
		return procedureDao.createProcedure(theProcedure);
	}
}
