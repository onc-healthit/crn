package org.sitenv.spring.dao;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hl7.fhir.r4.model.Procedure;
import org.sitenv.spring.model.DafProcedure;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import ca.uhn.fhir.context.FhirContext;
import ca.uhn.fhir.parser.IParser;

@Repository("ProcedureDao")
public class ProcedureDaoImpl extends AbstractDao implements ProcedureDao{

	@Autowired
	FhirContext fhirContext;

	@Autowired
    private SessionFactory sessionFactory;
	
	/**
	 * Creates the procedure resource
	 * @param theProcedure
	 * @return dafProcedure
	 */
	@Override
	@Transactional
	public DafProcedure createProcedure(Procedure theProcedure) {
		Session session = sessionFactory.openSession();
		DafProcedure dafProcedure = new DafProcedure();
		IParser jsonParser = fhirContext.newJsonParser();;
		dafProcedure.setData(jsonParser.encodeResourceToString(theProcedure));
		session.beginTransaction();
		session.save(dafProcedure);
		session.getTransaction().commit();
		session.close();
		return dafProcedure;
	}
}
