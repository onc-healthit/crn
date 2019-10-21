package org.sitenv.spring;

import java.util.List;
import java.util.Set;

import javax.persistence.NoResultException;

import org.hl7.fhir.instance.model.api.IBaseResource;
import org.hl7.fhir.r4.model.IdType;
import org.hl7.fhir.r4.model.Narrative;
import org.hl7.fhir.r4.model.OperationOutcome;
import org.hl7.fhir.r4.model.Person;
import org.sitenv.spring.configuration.AppConfig;
import org.sitenv.spring.model.DafPerson;
import org.sitenv.spring.query.PersonSearchCriteria;
import org.sitenv.spring.service.PersonService;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.support.AbstractApplicationContext;

import ca.uhn.fhir.model.api.Include;
import ca.uhn.fhir.rest.annotation.Count;
import ca.uhn.fhir.rest.annotation.Create;
import ca.uhn.fhir.rest.annotation.Delete;
import ca.uhn.fhir.rest.annotation.IdParam;
import ca.uhn.fhir.rest.annotation.IncludeParam;
import ca.uhn.fhir.rest.annotation.Read;
import ca.uhn.fhir.rest.annotation.RequiredParam;
import ca.uhn.fhir.rest.annotation.ResourceParam;
import ca.uhn.fhir.rest.annotation.Search;
import ca.uhn.fhir.rest.annotation.Sort;
import ca.uhn.fhir.rest.annotation.Update;
import ca.uhn.fhir.rest.api.MethodOutcome;
import ca.uhn.fhir.rest.api.SortSpec;
import ca.uhn.fhir.rest.param.StringParam;
import ca.uhn.fhir.rest.server.IResourceProvider;
import ca.uhn.fhir.rest.server.exceptions.ResourceNotFoundException;

public class PersonResourceProvider implements IResourceProvider {

	public static final String RESOURCE_TYPE = "Person";
	public static final String VERSION_ID = "1";
	AbstractApplicationContext context;
	PersonService service;

	public PersonResourceProvider() {
		context = new AnnotationConfigApplicationContext(AppConfig.class);
		service = (PersonService) context.getBean("PersonService");
	}
	
	/**
     * The getResourceType method comes from IResourceProvider, and must
     * be overridden to indicate what type of resource this provider
     * supplies.
     */
	@Override
	public Class<? extends IBaseResource> getResourceType() {
		return Person.class;
	}
	

	/**
	 * The "@Search" annotation indicates that this method supports the search operation. 
	 * The search operation returns a bundle with zero-to-many resources of a given type, 
	 * matching a given set of parameters.
	 * Example URL to invoke this method
	 * http://<server name>/<context>/fhir/Person?_pretty=true&_format=json
	 * @param theIncludes
	 * @param theSort
	 * @param theCount
	 * @return
	 */
    @Search
    public List<Person> getAllPerson(@IncludeParam(allow = "*") Set<Include> theIncludes, 
    									@Sort SortSpec theSort, 
    									@Count Integer theCount) {
    	
    	return service.getAllPersonsList();
    }
     
    /**
     * The "@Search" annotation indicates that this method supports the search operation. 
     * This example searches person by email and password
     * To allow a search using given search parameters, 
     * add two parameters to search method and tag these parameters as @RequiredParam.
     * @param theEmail
     * @param thePassword
     * @param theIncludes
     * @param theSort
     * @param theCount
     * @return
     */
    @Search()
    public MethodOutcome findPersonByEmailAndPassword(@RequiredParam(name = Person.SP_EMAIL) StringParam theEmail,
    												 @RequiredParam(name = "password") StringParam thePassword,
    												 @IncludeParam(allow = "*") Set<Include> theIncludes, 
    												 @Sort SortSpec theSort, 
    												 @Count Integer theCount) {
    	DafPerson dafPerson = null;
    	MethodOutcome retVal = new MethodOutcome();
    	
    	PersonSearchCriteria searchOption = new PersonSearchCriteria();
        searchOption.setEmail(theEmail.getValue());
        searchOption.setPassword(thePassword.getValue());
        
        try {
        	
        	dafPerson = service.findPersonByEmailAndPassword(searchOption);
        	OperationOutcome outcome = new OperationOutcome();
            outcome.setId(new IdType(RESOURCE_TYPE, dafPerson.getId() + "", VERSION_ID));
            Narrative text = new Narrative();
     	    text.setDivAsString("Login successfull");
            outcome.setText(text);
            retVal.setOperationOutcome(outcome); 
        }
        catch (NoResultException nre){
        	nre.printStackTrace();
        }
        
        return retVal;
    }
    
    /**
     * The create  operation saves a new resource to the server, 
     * allowing the server to give that resource an ID and version ID.
     * Create methods must be annotated with the @Create annotation, 
     * and have a single parameter annotated with the @ResourceParam annotation. 
     * This parameter contains the resource instance to be created. 
     * Create methods must return an object of type MethodOutcome. 
     * This object contains the identity of the created resource.
     * Example URL to invoke this method (this would be invoked using an HTTP POST, 
     * with the resource in the POST body): http://<server name>/<context>/fhir/Person
     * @param thePerson
     * @return
     */
    @Create
    public MethodOutcome createPerson(@ResourceParam Person thePerson) {
         
    	// Save this person to the database...
    	DafPerson dafPerson = service.createPerson(thePerson);
     
		MethodOutcome retVal = new MethodOutcome();
		retVal.setId(new IdType(RESOURCE_TYPE, dafPerson.getId() + "", VERSION_ID));
  
		return retVal;
    }
    
    /**
     * The update  operation updates a specific resource instance (using its ID).
     * Update methods must be annotated with the @Update annotation, 
     * and have a parameter annotated with the @ResourceParam annotation. 
     * This parameter contains the resource instance to be created. 
     * Example URL to invoke this method (this would be invoked using an HTTP PUT, 
     * with the resource in the PUT body): 
     * http://<server name>/<context>/fhir/Person/1
     * @param theId
     * @param thePerson
     * @return
     */
    @Update
    public MethodOutcome updatePersonById(@IdParam IdType theId, 
    										@ResourceParam Person thePerson) {

    	int id;
    	try {
		    id = theId.getIdPartAsLong().intValue();
		} catch (NumberFormatException e) {
		    /*
		     * If we can't parse the ID as a long, it's not valid so this is an unknown resource
			 */
		    throw new ResourceNotFoundException(theId);
		}
    	// Update this person to the database...
    	DafPerson dafPerson = service.updatePersonById(id, thePerson);  
    	MethodOutcome retVal = new MethodOutcome();
		retVal.setId(new IdType(RESOURCE_TYPE, dafPerson.getId() + "", VERSION_ID));
		return retVal;
    }
    
	/**
	 * The "@Read" annotation indicates that this method supports the read
	 * operation. The vread operation retrieves a specific version of a resource
	 * with a given ID. To support vread, simply add "version=true" to your @Read
	 * annotation. This means that the read method will support both "Read" and
	 * "VRead". The IdDt may or may not have the version populated depending on the
	 * client request. This operation retrieves a resource by ID. It has a single
	 * parameter annotated with the @IdParam annotation. Example URL to invoke this
	 * method: http://<server name>/<context>/fhir/Person/1/_history/4
	 * 
	 * @param theId : Id of the Person
	 * @return : Object of Person information
	 */
	@Read(version = true)
	public Person readOrVread(@IdParam IdType theId) {
		int id;
		Person person;
		try {
			id = theId.getIdPartAsLong().intValue();
		} catch (NumberFormatException e) {
			/*
			 * If we can't parse the ID as a long, it's not valid so this is an unknown
			 * resource
			 */
			throw new ResourceNotFoundException(theId);
		}
		if (theId.hasVersionIdPart()) {
			// this is a vread
			person = service.getPersonByVersionId(id, theId.getVersionIdPart());

		} else {
			// this is a read
			person = service.getPersonById(id);
		}

		if (person == null) {
			throw new ResourceNotFoundException(theId);
		}
		return person;
	}
	
	/**
	 * It takes a single ID parameter annotated with an @IdParam annotation, 
	 * which supplies the ID of the resource to delete.
	 * Example URL to invoke this method (HTTP DELETE): 
	 * http://<server name>/<context>/fhir/Person/1
	 * @param theId
	 */
	@Delete()
	public MethodOutcome deletePerson(@IdParam IdType theId) {
		int id;
		try {
			id = theId.getIdPartAsLong().intValue();
		} catch (NumberFormatException e) {
			/*
			 * If we can't parse the ID as a long, it's not valid so this is an unknown
			 * resource
			 */
			throw new ResourceNotFoundException(theId);
		}
	    // .. Delete the person ..
    	DafPerson dafPerson = service.deletePerson(id);  
    	MethodOutcome retVal = new MethodOutcome();
		retVal.setId(new IdType(RESOURCE_TYPE, dafPerson.getId() + "", VERSION_ID));
		return retVal;
	}
}
