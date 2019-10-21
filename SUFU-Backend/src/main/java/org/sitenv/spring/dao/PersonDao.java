package org.sitenv.spring.dao;

import java.util.List;

import org.hl7.fhir.r4.model.Person;
import org.sitenv.spring.model.DafPerson;
import org.sitenv.spring.query.PersonSearchCriteria;

public interface PersonDao {

	public List<DafPerson> getAllPersonsList();
	
	public DafPerson createPerson(Person thePerson);
	
	public DafPerson updatePersonById(int theId, Person thePerson);
	
	public DafPerson getPersonById(int id);
	
	public DafPerson getPersonByVersionId(int theId, String versionId);
	
	public DafPerson deletePerson(int theId);
	
	public DafPerson findPersonByEmailAndPassword(PersonSearchCriteria criteria);

}
