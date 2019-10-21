package org.sitenv.spring.service;

import org.hl7.fhir.r4.model.Procedure;
import org.sitenv.spring.model.DafProcedure;

public interface ProcedureService {

	DafProcedure createProcedure(Procedure theProcedure);

}
