package org.sitenv.spring.service;

import org.hl7.fhir.r4.model.Encounter;
import org.sitenv.spring.dao.EncounterDao;
import org.sitenv.spring.model.DafEncounter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ca.uhn.fhir.context.FhirContext;

@Service("EncounterService")
public class EncounterServiceImpl implements EncounterService {
	
	public static final String RESOURCE_TYPE = "Encounter";

	@Autowired
	private EncounterDao encounterDao;
	
	@Autowired
	FhirContext fhirContext;
	
	@Override
	public DafEncounter createEncounter(Encounter theEncounter) {
		return encounterDao.createEncounter(theEncounter);
	}
}
