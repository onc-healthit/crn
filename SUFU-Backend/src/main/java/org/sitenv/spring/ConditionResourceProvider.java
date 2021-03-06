package org.sitenv.spring;

import java.util.Date;

import org.hl7.fhir.instance.model.api.IBaseResource;
import org.hl7.fhir.r4.model.Condition;
import org.hl7.fhir.r4.model.IdType;
import org.hl7.fhir.r4.model.Meta;
import org.sitenv.spring.configuration.AppConfig;
import org.sitenv.spring.model.DafCondition;
import org.sitenv.spring.service.ConditionService;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.support.AbstractApplicationContext;

import ca.uhn.fhir.rest.annotation.Create;
import ca.uhn.fhir.rest.annotation.ResourceParam;
import ca.uhn.fhir.rest.api.MethodOutcome;
import ca.uhn.fhir.rest.server.IResourceProvider;

public class ConditionResourceProvider implements IResourceProvider {

	public static final String RESOURCE_TYPE = "Condition";
    public static final String VERSION_ID = "1";
    AbstractApplicationContext context;
    ConditionService service;

    public ConditionResourceProvider() {
        context = new AnnotationConfigApplicationContext(AppConfig.class);
        service = (ConditionService) context.getBean("ConditionService");
    }
    
	/**
     * The getResourceType method comes from IResourceProvider, and must
     * be overridden to indicate what type of resource this provider
     * supplies.
     */
	@Override
	public Class<? extends IBaseResource> getResourceType() {
		return Condition.class;
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
     * with the resource in the POST body): http://<server name>/<context>/fhir/Condition
     * @param theCondition
     * @return
     */
    @Create
    public MethodOutcome createCondition(@ResourceParam Condition theCondition) {
    	Date date = new Date();
    	//Set meta 
		Meta meta = new Meta();
		meta.setVersionId("1");
		meta.setLastUpdated(date);
		theCondition.setMeta(meta);
		
    	// Save this condition to the database...
    	DafCondition dafCondition = service.createCondition(theCondition);
     
		MethodOutcome retVal = new MethodOutcome();
		retVal.setId(new IdType(RESOURCE_TYPE, dafCondition.getId() + "", VERSION_ID));
  
		return retVal;
    }

}
