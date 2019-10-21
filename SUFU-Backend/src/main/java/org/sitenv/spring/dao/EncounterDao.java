package org.sitenv.spring.dao;

import org.hl7.fhir.r4.model.Encounter;
import org.sitenv.spring.model.DafEncounter;

public interface EncounterDao {

	DafEncounter createEncounter(Encounter theEncounter);

}
