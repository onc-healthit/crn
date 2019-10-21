package org.sitenv.spring.service;

import org.hl7.fhir.r4.model.Encounter;
import org.sitenv.spring.model.DafEncounter;

public interface EncounterService {

	DafEncounter createEncounter(Encounter theEncounter);

}
