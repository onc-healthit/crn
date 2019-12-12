package org.sitenv.spring;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.UUID;

import org.hl7.fhir.instance.model.api.IBaseResource;
import org.hl7.fhir.r4.model.CodeableConcept;
import org.hl7.fhir.r4.model.Coding;
import org.hl7.fhir.r4.model.Condition;
import org.hl7.fhir.r4.model.DateTimeType;
import org.hl7.fhir.r4.model.DateType;
import org.hl7.fhir.r4.model.DecimalType;
import org.hl7.fhir.r4.model.Device;
import org.hl7.fhir.r4.model.Device.DeviceUdiCarrierComponent;
import org.hl7.fhir.r4.model.Encounter;
import org.hl7.fhir.r4.model.Extension;
import org.hl7.fhir.r4.model.IdType;
import org.hl7.fhir.r4.model.Meta;
import org.hl7.fhir.r4.model.Observation;
import org.hl7.fhir.r4.model.Period;
import org.hl7.fhir.r4.model.Procedure;
import org.hl7.fhir.r4.model.Quantity;
import org.hl7.fhir.r4.model.QuestionnaireResponse;
import org.hl7.fhir.r4.model.QuestionnaireResponse.QuestionnaireResponseItemAnswerComponent;
import org.hl7.fhir.r4.model.QuestionnaireResponse.QuestionnaireResponseItemComponent;
import org.hl7.fhir.r4.model.Reference;
import org.hl7.fhir.r4.model.StringType;
import org.sitenv.spring.configuration.AppConfig;
import org.sitenv.spring.model.DafQuestionnaireResponse;
import org.sitenv.spring.service.QuestionnaireResponseService;
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
import ca.uhn.fhir.rest.annotation.Update;
import ca.uhn.fhir.rest.api.MethodOutcome;
import ca.uhn.fhir.rest.api.SortSpec;
import ca.uhn.fhir.rest.param.ReferenceParam;
import ca.uhn.fhir.rest.server.IResourceProvider;
import ca.uhn.fhir.rest.server.exceptions.ResourceNotFoundException;

public class QuestionnaireResponseResourceProvider  implements IResourceProvider {
	
	public static final String RESOURCE_TYPE = "QuestionnaireResponse";
    public static final String VERSION_ID = "4.0";
    AbstractApplicationContext context;
    QuestionnaireResponseService service;

    public QuestionnaireResponseResourceProvider() {
        context = new AnnotationConfigApplicationContext(AppConfig.class);
        service = (QuestionnaireResponseService) context.getBean("QuestionnaireResponseService");
    }

    ObservationResourceProvider observationResourceProvider = new ObservationResourceProvider();
    ProcedureResourceProvider procedureResourceProvider = new ProcedureResourceProvider();
    DeviceResourceProvider deviceResourceProvider = new DeviceResourceProvider();
    ConditionResourceProvider conditionResourceProvider = new ConditionResourceProvider();
    EncounterResourceProvider encounterResourceProvider = new EncounterResourceProvider();

    
    /**
     * The getResourceType method comes from IResourceProvider, and must
     * be overridden to indicate what type of resource this provider
     * supplies.
     */
	@Override
	public Class<? extends IBaseResource> getResourceType() {
		return QuestionnaireResponse.class;
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
     * with the resource in the POST body): http://<server name>/<context>/fhir/QuestionnaireResponse
     * @param theQuestionnaireResponse
     * @return
     */
	@Create
	public MethodOutcome createQuestionnaireResponse(@ResourceParam QuestionnaireResponse theQuestionnaireResponse) {
	 
		Meta meta = new Meta();
		meta.setVersionId("1");
		Date date = new Date();
		meta.setLastUpdated(date);
		theQuestionnaireResponse.setMeta(meta);
	
		Reference thePatient = theQuestionnaireResponse.getSubject();
		String theReference = thePatient.getReference();
		String[] id = theReference.split("/");
		String patientId = id[1];
		StringType UDI = null;
		StringType deviceType = null;
		DateType encounterDate = null;
		StringType encounterReason = null;
		List<QuestionnaireResponseItemComponent> qrItemComponentListOutter =  theQuestionnaireResponse.getItem();
		int noOfOutterItems = qrItemComponentListOutter.size();
		for(int i = 0; i < noOfOutterItems; i++) {
			QuestionnaireResponseItemComponent theQRItemComponentOutter = qrItemComponentListOutter.get(i);
			List<QuestionnaireResponseItemComponent> qrItemComponentListInner = theQRItemComponentOutter.getItem();
			int noOfInnerItems = qrItemComponentListInner.size();
			String questionnaireInnerText = theQRItemComponentOutter.getText();
			//Check for Encounter
			if(questionnaireInnerText.equalsIgnoreCase("Date of visit")) {
				QuestionnaireResponseItemAnswerComponent datePeriod = theQRItemComponentOutter.getAnswerFirstRep();
				encounterDate = datePeriod.getValueDateType();
			}
			if(questionnaireInnerText.equalsIgnoreCase("What is the reason for this visit? Briefly describe")) {
				QuestionnaireResponseItemAnswerComponent visitReason = theQRItemComponentOutter.getAnswerFirstRep();
				encounterReason = visitReason.getValueStringType();
			}
			if(encounterDate != null && encounterReason != null) {
				Encounter theEncounter = constructEncounterResourceObj(encounterDate, encounterReason, patientId);
				encounterResourceProvider.createEncounter(theEncounter);
				encounterDate = null;
				encounterReason= null;
			}
			for(int j = 0; j < noOfInnerItems; j++) {
				QuestionnaireResponseItemComponent theQRItemComponentInner = qrItemComponentListInner.get(j);
				String questionnaireText = theQRItemComponentInner.getText();
				//Check for diagnosis
				if(questionnaireText.equalsIgnoreCase("What is the diagnosis?")) {
					QuestionnaireResponseItemAnswerComponent diagnosisType = theQRItemComponentInner.getAnswerFirstRep();
					Coding diagnosisCoding = diagnosisType.getValueCoding();
					Condition theCondition = constructConditionResourceObj(diagnosisCoding, patientId);
					conditionResourceProvider.createCondition(theCondition);	
				}
				//Check for procedure
				if(questionnaireText.equalsIgnoreCase("Type of incontinence procedure performed")) {
					QuestionnaireResponseItemAnswerComponent procedureType = theQRItemComponentInner.getAnswerFirstRep();
					Coding procedureCoding = procedureType.getValueCoding();
					Procedure theProcedure = constructProcedureResourceObj(procedureCoding, patientId);
					procedureResourceProvider.createProcedure(theProcedure);
				}
				//Check for weight text
				if(questionnaireText.equalsIgnoreCase("Weight (in pounds)")) {
					QuestionnaireResponseItemAnswerComponent weightAsnwer = theQRItemComponentInner.getAnswerFirstRep();
					DecimalType weight = weightAsnwer.getValueDecimalType();
					Observation theWObservation = constructObservationResourceObj(weight, "pounds", patientId, "Weight");
					observationResourceProvider.createObservation(theWObservation);
				}
				//Check for height text
				if(questionnaireText.equalsIgnoreCase("Height (in inches)")) {
					QuestionnaireResponseItemAnswerComponent heightAsnwer = theQRItemComponentInner.getAnswerFirstRep();
					DecimalType height = heightAsnwer.getValueDecimalType();
					Observation theHObservation = constructObservationResourceObj(height, "inches", patientId, "Height");
					observationResourceProvider.createObservation(theHObservation);
				}
				//Check for Device
				if(questionnaireText.equalsIgnoreCase("UDI (numbers only, max 14 digits)")) {
					QuestionnaireResponseItemAnswerComponent uidAsnwer = theQRItemComponentInner.getAnswerFirstRep();
					 UDI = uidAsnwer.getValueStringType();
				}
				if(questionnaireText.equalsIgnoreCase("Device Description")) {
					QuestionnaireResponseItemAnswerComponent device = theQRItemComponentInner.getAnswerFirstRep();
					deviceType = device.getValueStringType(); 
				}
				if(UDI != null && deviceType != null) {
					Device theDevice = constructDeviceResourceObj(UDI, deviceType, patientId);
					deviceResourceProvider.createDevice(theDevice);
					UDI = null;
					deviceType = null;
				}
				
			}
		}
		// Save this QuestionnaireResponse to the database...
		DafQuestionnaireResponse dafQuestionnaireResponse = service.createQuestionnaireResponse(theQuestionnaireResponse);
		 
		// This method returns a MethodOutcome object which contains
		// the ID (composed of the type QuestionnaireResponse, the logical ID 3746, and the
		// version ID 1)
		MethodOutcome retVal = new MethodOutcome();
		retVal.setId(new IdType(RESOURCE_TYPE, dafQuestionnaireResponse.getId().toString()));
		return retVal;
	}
	
	/**
	 * creates device resource object
	 * 
	 * @param 
	 * @param patientId
	 * @return theDevice
	 */
	private Device constructDeviceResourceObj(StringType udi, StringType type, String patientId) {
		Device theDevice = new Device();
		theDevice.setId(new IdType("Device", UUID.randomUUID() + "", "1"));
		
		//Set status 
		theDevice.setStatus(Device.FHIRDeviceStatus.ACTIVE);
		
		//Set subject 
		Reference thePatient = new Reference();
		thePatient.setReference("Patient/"+patientId);
		theDevice.setPatient(thePatient);
				
		//Set udiCarrier
		List<DeviceUdiCarrierComponent> udiCarrierList = new ArrayList<DeviceUdiCarrierComponent>();
		DeviceUdiCarrierComponent theUdiCarrier = new DeviceUdiCarrierComponent();
		String UDI = udi.asStringValue();
		theUdiCarrier.setDeviceIdentifier(UDI);
		theUdiCarrier.setCarrierHRF(UDI);
		udiCarrierList.add(theUdiCarrier);
		theDevice.setUdiCarrier(udiCarrierList);
		
		//Set type
		CodeableConcept theType = new CodeableConcept();
		List<Coding> theDeviceCodingList = new ArrayList<Coding>();
		Coding theDeviceCoding = new Coding();
		theDeviceCoding.setSystem("http://snomed.info/sct");
		theDeviceCoding.setDisplay(UDI);
		theDeviceCodingList.add(theDeviceCoding);
		theType.setCoding(theDeviceCodingList);
		theType.setText(UDI);
		return theDevice;
	}
	
	/**
	 * creates encounter resource object
	 * 
	 * @param 
	 * @param patientId
	 * @return theEncounter
	 */
	private Encounter constructEncounterResourceObj(DateType encounterDate, StringType encounterReason, String patientId) {
		Encounter theEncounter = new Encounter();
		theEncounter.setId(new IdType("Encounter", UUID.randomUUID() + "", "1"));
		
		//Set status 
		theEncounter.setStatus(Encounter.EncounterStatus.FINISHED);
		
		//Set subject 
		Reference thePatient = new Reference();
		thePatient.setReference("Patient/"+patientId);
		theEncounter.setSubject(thePatient);
	
		//Set period
		Period thePeriod = new Period();
		Date period = encounterDate.getValue();
		thePeriod.setStart(period);
		thePeriod.setEnd(period);
		theEncounter.setPeriod(thePeriod);
		
		//Set type
		List<CodeableConcept> typeEncounterList = new ArrayList<CodeableConcept>();
		CodeableConcept theEncounterType = new CodeableConcept();
		List<Coding> encounterCodings = new ArrayList<Coding>();
		Coding theEncounterCoding = new Coding();
		theEncounterCoding.setSystem("http://www.ama-assn.org/go/cpt");
		String display = encounterReason.asStringValue();
		theEncounterCoding.setDisplay(display);
		encounterCodings.add(theEncounterCoding);
		theEncounterType.setCoding(encounterCodings);
		theEncounterType.setText(display);
		typeEncounterList.add(theEncounterType);
		theEncounter.setType(typeEncounterList);
		
		return theEncounter;
	}
	
	/**
	 * creates procedure resource object
	 * 
	 * @param procedureCoding
	 * @param patientId
	 * @return theProcedure
	 */
	private Procedure constructProcedureResourceObj(Coding procedureCoding, String patientId) {
		Procedure theProcedure = new Procedure();
		theProcedure.setId(new IdType("Procedure", UUID.randomUUID() + "", "1"));
		
		//Set status 
		theProcedure.setStatus(Procedure.ProcedureStatus.COMPLETED);
		
		//Set subject 
		Reference thePatient = new Reference();
		thePatient.setReference("Patient/"+patientId);
		theProcedure.setSubject(thePatient);
				
		//Set performed dateTime
		DateTimeType thePerformedDateTime= new DateTimeType();
		Date date = new Date();
    	thePerformedDateTime.setValue(date);
    	theProcedure.setPerformed(thePerformedDateTime);
    	
    	//Set code
    	CodeableConcept theCode = new CodeableConcept();
		List<Coding> codingList = new ArrayList<Coding>();
		Coding theCoding = new Coding();
		theCoding.setCode(procedureCoding.getCode());
		theCoding.setSystem("http://snomed.info/sct");
		theCoding.setDisplay(procedureCoding.getDisplay());
		codingList.add(theCoding);
		theCode.setCoding(codingList);
		theCode.setText(procedureCoding.getDisplay());
		theProcedure.setCode(theCode);
	
		return theProcedure;
	}

	/**
	 * Creates the observation tresource with 
	 * weight 
	 * @param weight
	 * @return theObservation
	 */
	private Observation constructObservationResourceObj(DecimalType value, String unit, String patientId, String type) {
		Observation theObservation = new Observation();
		theObservation.setId(new IdType("Observation", UUID.randomUUID() + "", "1"));		
		Date date = new Date();
		
		//Set status 
		theObservation.setStatus(Observation.ObservationStatus.FINAL);
		
		//Set Value Quantity
		Quantity theQuantity = new Quantity();
		theQuantity.setValueElement(value);
		theQuantity.setUnit(unit);
		theQuantity.setSystem("http://unitsofmeasure.org");
		theQuantity.setCode("%");
		List<Extension> extensionList = new ArrayList<Extension>();
		Extension theExtennsion = new Extension();
		if(type.equalsIgnoreCase("Height")) {
			theExtennsion.setUrl("http://hl7.org/fhir/StructureDefinition/bodyheight");
		}
		else {
			theExtennsion.setUrl("http://hl7.org/fhir/StructureDefinition/bodyweight");
		}
		StringType uType = new StringType();
		uType.setValueAsString(type);
		theExtennsion.setValue(uType);
		extensionList.add(theExtennsion);
		theQuantity.setExtension(extensionList);
		theObservation.setValue(theQuantity);

		//Set code
		CodeableConcept theCode = new CodeableConcept();
		List<Coding> codingList = new ArrayList<Coding>();
		Coding theCoding = new Coding();
		theCoding.setCode("77606-2");
		theCoding.setSystem("http://loinc.org");
		theCode.setCoding(codingList);
		theObservation.setCode(theCode);
		
		//Set subject 
		Reference thePatient = new Reference();
		thePatient.setReference("Patient/"+patientId);
		theObservation.setSubject(thePatient);
		
		//Set category
		List<CodeableConcept> categoryList = new ArrayList<CodeableConcept>();
		CodeableConcept theCategory = new CodeableConcept();
		
		List<Coding> categoryCodingList = new ArrayList<Coding>();
		Coding theCategoryCoding = new Coding();
		theCategoryCoding.setSystem("http://terminology.hl7.org/CodeSystem/observation-category");
		theCategoryCoding.setCode("vital-signs");
		theCategoryCoding.setDisplay("Vital Signs");
		categoryCodingList.add(theCategoryCoding);
		theCategory.setCoding(categoryCodingList);
		theCategory.setText("Vital Signs");
		categoryList.add(theCategory);
		theObservation.setCategory(categoryList);
		
		return theObservation;
	}
	
	/**
	 * creates condition resource object
	 * 
	 * @param procedureCoding
	 * @param patientId
	 * @return theCondition
	 */
	private Condition constructConditionResourceObj(Coding conditionCoding, String patientId) {
		Condition theCondition = new Condition();
		theCondition.setId(new IdType("Condition", UUID.randomUUID() + "", "1"));
		
		//Set clinicalStatus 
		CodeableConcept theClinicalStatus = new CodeableConcept();
		List<Coding> clinicalStatusCodingList = new ArrayList<Coding>();
		Coding theClinicalStatusCoding = new Coding();
		theClinicalStatusCoding.setCode("active");
		theClinicalStatusCoding.setSystem("http://terminology.hl7.org/CodeSystem/condition-clinical");
		theClinicalStatusCoding.setDisplay("Active");
		clinicalStatusCodingList.add(theClinicalStatusCoding);
		theClinicalStatus.setCoding(clinicalStatusCodingList);
		theClinicalStatus.setText("Active");
		theCondition.setClinicalStatus(theClinicalStatus);
		
		//Set verificationStatus
		CodeableConcept theVerificationStatus = new CodeableConcept();
		List<Coding> verificationStatusCodingList = new ArrayList<Coding>();
		Coding theVerificationStatusCoding = new Coding();
		theVerificationStatusCoding.setCode("confirmed");
		theVerificationStatusCoding.setSystem("http://terminology.hl7.org/CodeSystem/condition-ver-status");
		theVerificationStatusCoding.setDisplay("Confirmed");
		verificationStatusCodingList.add(theVerificationStatusCoding);
		theVerificationStatus.setCoding(verificationStatusCodingList);
		theVerificationStatus.setText("Confirmed");
		theCondition.setVerificationStatus(theVerificationStatus);
		
		//Set subject 
		Reference thePatient = new Reference();
		thePatient.setReference("Patient/"+patientId);
		theCondition.setSubject(thePatient);
	
    	//Set code
    	CodeableConcept theCode = new CodeableConcept();
		List<Coding> codingList = new ArrayList<Coding>();
		Coding theCoding = new Coding();
		theCoding.setCode(conditionCoding.getCode());
		theCoding.setSystem("http://snomed.info/sct");
		theCoding.setDisplay(conditionCoding.getDisplay());
		codingList.add(theCoding);
		theCode.setCoding(codingList);
		theCode.setText(conditionCoding.getDisplay());
		theCondition.setCode(theCode);
	
		//Set category
		List<CodeableConcept> categoryList = new ArrayList<CodeableConcept>();
		CodeableConcept theCategory = new CodeableConcept();
		List<Coding> categoryCodingList = new ArrayList<Coding>();
		Coding categoryCoding = new Coding();
		categoryCoding.setSystem("http://terminology.hl7.org/CodeSystem/condition-category");
		categoryCoding.setCode("problem-list-item");
		categoryCoding.setDisplay("Problem List Item");
		categoryCodingList.add(categoryCoding);
		theCategory.setCoding(categoryCodingList);
		categoryList.add(theCategory);
		theCondition.setCategory(categoryList);
		
		return theCondition;
	}

	/**
	 * The "@Search" annotation indicates that this method supports the search operation. 
	 * The search operation returns a bundle with zero-to-many resources of a given type
	 * Example URL to invoke this method
	 * http://<server name>/<context>/fhir/QuestionnaireResponse?_pretty=true&_format=json
	 * @return
	 */
	@Search
	public List<QuestionnaireResponse> searchAllQuestionnaireResponse() {

		return service.getAllQuestionnaireResponse();
	}

	
 	/**
	 * The "@Read" annotation indicates that this method supports the read operation. 
	 * The vread operation retrieves a specific version of a resource with a given ID. 
	 * To support vread, simply add "version=true" to your @Read annotation. 
	 * This means that the read method will support both "Read" and "VRead". 
	 * The IdDt may or may not have the version populated depending on the client request.
	 * This operation retrieves a resource by ID. 
	 * It has a single parameter annotated with the @IdParam annotation.
	 * Example URL to invoke this method: 
	 * http://<server name>/<context>/fhir/QuestionnaireResponse/1/_history/4
	 * @param theId : Id of the QuestionnaireResponse
	 * @return : Object of QuestionnaireResponse information
	 */
	@Read(version=true)
    public QuestionnaireResponse readOrVread(@IdParam IdType theId) {
		int id;
		QuestionnaireResponse questionnaireResponse;
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
			questionnaireResponse = service.getQuestionnaireResponseByVersionId(id, theId.getVersionIdPart());
		   
		} else {
		   // this is a read
			questionnaireResponse = service.getQuestionnaireResponseById(id);
		}
		
		if(questionnaireResponse==null) {
			throw new ResourceNotFoundException(theId);
		}
		return questionnaireResponse;
    }
	
	/**
	 * The "@Search" annotation indicates that this method supports the search operation. 
	 * The search operation returns a bundle with zero-to-many resources of a given type, 
	 * matching a given set of parameters.
	 * Example URL to invoke this method
	 * http://<server name>/<context>/fhir/QuestionnaireResponse?_pretty=true&_format=json
	 * @param theAuthor
	 * @param theIncludes
	 * @param theSort
	 * @param theCount
	 * @return
	 */
	@Search()
	public List<QuestionnaireResponse> searchByAuthor(@RequiredParam(name = QuestionnaireResponse.SP_AUTHOR) 
														ReferenceParam theAuthor,
														@IncludeParam(allow = "*") Set<Include> theIncludes, 
														@Sort SortSpec theSort, 
														@Count Integer theCount) {	
		String authorId = "";
		try {
			authorId = theAuthor.getValue();
		} catch (Exception e) {
		    /*
		     * If we can't parse the ID as a long, it's not valid so this is an unknown resource
			 */
		    throw new ResourceNotFoundException(authorId);
		}
		
		List<QuestionnaireResponse> questionnaireResponseList = service.getQuestionnaireResponseByAuthor(authorId);
		return questionnaireResponseList;
	}

	/**
     * The update  operation updates a specific resource instance (using its ID).
     * Update methods must be annotated with the @Update annotation, 
     * and have a parameter annotated with the @ResourceParam annotation. 
     * This parameter contains the resource instance to be created. 
     * Example URL to invoke this method (this would be invoked using an HTTP PUT, 
     * with the resource in the PUT body): 
     * http://<server name>/<context>/fhir/QuestionnaireResponse/1
     * @param theId
     * @param theQuestionnaireResponse
     * @return
     */
    @Update
    public MethodOutcome updateQuestionnaireResponseById(
    													@IdParam IdType theId, 
    													@ResourceParam QuestionnaireResponse theQuestionnaireResponse) {

    	int id;
    	try {
		    id = theId.getIdPartAsLong().intValue();
		} catch (NumberFormatException e) {
		    /*
		     * If we can't parse the ID as a long, it's not valid so this is an unknown resource
			 */
		    throw new ResourceNotFoundException(theId);
		}
    	
    	Meta meta = new Meta();
		meta.setVersionId("1");
		Date date = new Date();
		meta.setLastUpdated(date);
		theQuestionnaireResponse.setMeta(meta);
    	// Update this QuestionnaireResponse to the database...
    	DafQuestionnaireResponse dafQuestionnaireResponse = service.updateQuestionnaireResponseById(id, theQuestionnaireResponse);  
    	MethodOutcome retVal = new MethodOutcome();
		retVal.setId(new IdType(RESOURCE_TYPE, dafQuestionnaireResponse.getId() + "", VERSION_ID));
		return retVal;
    }
}
