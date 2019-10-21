package org.sitenv.spring.dao;

import org.hl7.fhir.r4.model.Procedure;
import org.sitenv.spring.model.DafProcedure;

public interface ProcedureDao {

	DafProcedure createProcedure(Procedure theProcedure);

}
