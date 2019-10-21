package org.sitenv.spring.service;

import java.util.List;

import org.hl7.fhir.r4.model.Person;
import org.sitenv.spring.model.DafPerson;
import org.sitenv.spring.query.PersonSearchCriteria;

public interface PersonService {
	
	public List<Person> getAllPersonsList();
	
	public DafPerson createPerson(Person thePerson);
	
	public DafPerson updatePersonById(int theId, Person thePerson);
	
	public Person getPersonById(int id);
	
	public Person getPersonByVersionId(int theId, String versionId);
	
	public DafPerson deletePerson(int theId);
	
	public DafPerson findPersonByEmailAndPassword(PersonSearchCriteria criteria);

}
