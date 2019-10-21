package org.sitenv.spring;

import java.util.List;
import java.util.Set;

import javax.persistence.NoResultException;

import org.hl7.fhir.instance.model.api.IBaseResource;
import org.hl7.fhir.r4.model.Bundle;
import org.hl7.fhir.r4.model.IdType;
import org.hl7.fhir.r4.model.OperationOutcome;
import org.hl7.fhir.r4.model.Patient;
import org.sitenv.spring.configuration.AppConfig;
import org.sitenv.spring.model.DafPatient;
import org.sitenv.spring.query.PatientSearchCriteria;
import org.sitenv.spring.service.PatientService;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.support.AbstractApplicationContext;

import ca.uhn.fhir.model.api.Include;
import ca.uhn.fhir.rest.annotation.Count;
import ca.uhn.fhir.rest.annotation.Create;
import ca.uhn.fhir.rest.annotation.IdParam;
import ca.uhn.fhir.rest.annotation.IncludeParam;
import ca.uhn.fhir.rest.annotation.Read;
import ca.uhn.fhir.rest.annotation.RequiredParam;
import ca.uhn.fhir.rest.annotation.ResourceParam;
import ca.uhn.fhir.rest.annotation.Search;
import ca.uhn.fhir.rest.annotation.Sort;
import ca.uhn.fhir.rest.api.MethodOutcome;
import ca.uhn.fhir.rest.api.SortSpec;
import ca.uhn.fhir.rest.param.StringParam;
import ca.uhn.fhir.rest.server.IResourceProvider;
import ca.uhn.fhir.rest.server.exceptions.ResourceNotFoundException;

public class PatientResourceProvider implements IResourceProvider {
	
	public static final String RESOURCE_TYPE = "Patient";
    public static final String VERSION_ID = "4";
    AbstractApplicationContext context;
    PatientService service;

    public PatientResourceProvider() {
        context = new AnnotationConfigApplicationContext(AppConfig.class);
        service = (PatientService) context.getBean("PatientService");
    }

    /**
     * The getResourceType method comes from IResourceProvider, and must
     * be overridden to indicate what type of resource this provider
     * supplies.
     */
	@Override
	public Class<? extends IBaseResource> getResourceType() {
		return Patient.class;
	}

	/**
	 * The "@Search" annotation indicates that this method supports the search operation. 
	 * The search operation returns a bundle with zero-to-many resources of a given type, 
	 * matching a given set of parameters.
	 * Example URL to invoke this method 
	 * http://<server name>/<context>/fhir/Patient?_pretty=true&_format=json
	 * @param theIncludes
	 * @param theSort
	 * @param theCount
	 * @return
	 */
    @Search
    public List<Patient> getAllPatient( @IncludeParam(allow = "*") Set<Include> theIncludes, 
    									@Sort SortSpec theSort, 
    									@Count Integer theCount) {
    	
    	return service.getAllPatientsList();
    }
    
    /**
     * The create  operation saves a new resource to the server, 
     * allowing the server to give that resource an ID and version ID.
     * Create methods must be annotated with the @Create annotation, 
     * and have a single parameter annotated with the @ResourceParam annotation. 
     * This parameter contains the resource instance to be created. 
     * Create methods must return an object of type MethodOutcome . 
     * This object contains the identity of the created resource.
     * Example URL to invoke this method (this would be invoked using an HTTP POST, 
     * with the resource in the POST body): http://<server name>/<context>/fhir/Patient
     * @param thePatient
     * @return
     */
    @Create
    public MethodOutcome createPatient(@ResourceParam Patient thePatient) {
         
    	// Save this patient to the database...
    	DafPatient dafPatient = service.createPatient(thePatient);
     
		MethodOutcome retVal = new MethodOutcome();
		retVal.setId(new IdType(RESOURCE_TYPE, dafPatient.getId() + "", VERSION_ID));
  
		return retVal;
    }
    
 	/**
	 * The "@Read" annotation indicates that this method supports the read operation. 
	 * The vread operation retrieves a specific version of a resource with a given ID. 
	 * To support vread, simply add "version=true" to your @Read annotation. 
	 * This means that the read method will support both "Read" and "VRead". 
	 * The IdDt may or may not have the version populated depending on the client request.
	 * This operation retrieves a resource by ID. 
	 * It has a single parameter annotated with the @IdParam annotation.
	 * Example URL to invoke this method: http://<server name>/<context>/fhir/Patient/1/_history/4
	 * @param theId : Id of the patient
	 * @return : Object of patient information
	 */
	@Read(version=true)
    public Patient readOrVread(@IdParam IdType theId) {
		int id;
		Patient thePatient;
		try {
		    id = theId.getIdPartAsLong().intValue();
		} catch (NumberFormatException e) {
		    /*
		     * If we can't parse the ID as a long, it's not valid so this is an unknown resource
			 */
		    throw new ResourceNotFoundException(theId);
		}
		if (theId.hasVersionIdPart()) {
		   // this is a vread  
			System.out.println("Version Id is "+theId.getVersionIdPart());
			thePatient = service.getPatientByVersionId(id, theId.getVersionIdPart());
		   
		} else {
		   // this is a read
			thePatient = service.getPatientById(id);
		}
		return thePatient;
    }
	
	/**
     * The "@Search" annotation indicates that this method supports the search operation. 
     * This example searches person by email and password
     * To allow a search using given search parameters, 
     * add two parameters to search method and tag these parameters as @RequiredParam.
     * @param thePatientId
     * @param theIncludes
     * @param theSort
     * @param theCount
     * @return
     */
    @Search()
    public Bundle getPatientResourcesById(@RequiredParam(name = Patient.SP_RES_ID) StringParam thePatientId,
    												 @IncludeParam(allow = "*") Set<Include> theIncludes, 
    												 @Sort SortSpec theSort, 
    												 @Count Integer theCount) {
    	Bundle resourceBundle = null;
    	MethodOutcome retVal = new MethodOutcome();
    	
    	PatientSearchCriteria searchOption = new PatientSearchCriteria();
        searchOption.setPatientId(thePatientId.getValue());
        
        try {
        	resourceBundle = service.getPatientResourcesById(searchOption);
        	OperationOutcome outcome = new OperationOutcome();
            outcome.setId(new IdType(RESOURCE_TYPE, resourceBundle.getId() + "", VERSION_ID));
            retVal.setOperationOutcome(outcome); 
        }
        catch (NoResultException nre){
        	nre.printStackTrace();
        }
        
        return resourceBundle;
    }
}
