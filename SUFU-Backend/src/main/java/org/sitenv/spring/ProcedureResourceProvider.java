package org.sitenv.spring;

import org.hl7.fhir.instance.model.api.IBaseResource;
import org.hl7.fhir.r4.model.IdType;
import org.hl7.fhir.r4.model.Observation;
import org.hl7.fhir.r4.model.Procedure;
import org.sitenv.spring.configuration.AppConfig;
import org.sitenv.spring.model.DafObservation;
import org.sitenv.spring.model.DafProcedure;
import org.sitenv.spring.service.ProcedureService;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.support.AbstractApplicationContext;

import ca.uhn.fhir.rest.annotation.Create;
import ca.uhn.fhir.rest.annotation.ResourceParam;
import ca.uhn.fhir.rest.api.MethodOutcome;
import ca.uhn.fhir.rest.server.IResourceProvider;

public class ProcedureResourceProvider implements IResourceProvider{

	public static final String RESOURCE_TYPE = "Procedure";
    public static final String VERSION_ID = "1";
    AbstractApplicationContext context;
    ProcedureService service;

    public ProcedureResourceProvider() {
        context = new AnnotationConfigApplicationContext(AppConfig.class);
        service = (ProcedureService) context.getBean("ProcedureService");
    }
    
	/**
     * The getResourceType method comes from IResourceProvider, and must
     * be overridden to indicate what type of resource this provider
     * supplies.
     */
	@Override
	public Class<? extends IBaseResource> getResourceType() {
		return Procedure.class;
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
     * with the resource in the POST body): http://<server name>/<context>/fhir/Procedure
     * @param theProcedure
     * @return
     */
    @Create
    public MethodOutcome createProcedure(@ResourceParam Procedure theProcedure) {
        System.out.println("%%%%%%% Create Procedure %%%%%%%%");
    	// Save this procedure to the database...
    	DafProcedure dafProcedure = service.createProcedure(theProcedure);
     
		MethodOutcome retVal = new MethodOutcome();
		retVal.setId(new IdType(RESOURCE_TYPE, dafProcedure.getId() + "", VERSION_ID));
  
		return retVal;
    }

}
