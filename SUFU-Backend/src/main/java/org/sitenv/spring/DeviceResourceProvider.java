package org.sitenv.spring;

import org.hl7.fhir.instance.model.api.IBaseResource;
import org.hl7.fhir.r4.model.Device;
import org.hl7.fhir.r4.model.IdType;
import org.hl7.fhir.r4.model.Observation;
import org.sitenv.spring.configuration.AppConfig;
import org.sitenv.spring.model.DafDevice;
import org.sitenv.spring.model.DafObservation;
import org.sitenv.spring.service.DeviceService;
import org.sitenv.spring.service.ProcedureService;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.support.AbstractApplicationContext;

import ca.uhn.fhir.rest.annotation.Create;
import ca.uhn.fhir.rest.annotation.ResourceParam;
import ca.uhn.fhir.rest.api.MethodOutcome;
import ca.uhn.fhir.rest.server.IResourceProvider;

public class DeviceResourceProvider implements IResourceProvider {

	public static final String RESOURCE_TYPE = "Device";
    public static final String VERSION_ID = "1";
    AbstractApplicationContext context;
    DeviceService service;

    public DeviceResourceProvider() {
        context = new AnnotationConfigApplicationContext(AppConfig.class);
        service = (DeviceService) context.getBean("DeviceService");
    }
    
	/**
     * The getResourceType method comes from IResourceProvider, and must
     * be overridden to indicate what type of resource this provider
     * supplies.
     */
	@Override
	public Class<? extends IBaseResource> getResourceType() {
		return Device.class;
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
     * with the resource in the POST body): http://<server name>/<context>/fhir/Device
     * @param theObservation
     * @return
     */
    @Create
    public MethodOutcome createDevice(@ResourceParam Device theDevice) {
    	// Save this observation to the database...
    	DafDevice dafDevice = service.createDevice(theDevice);
     
		MethodOutcome retVal = new MethodOutcome();
		retVal.setId(new IdType(RESOURCE_TYPE, dafDevice.getId() + "", VERSION_ID));
  
		return retVal;
    }

}
