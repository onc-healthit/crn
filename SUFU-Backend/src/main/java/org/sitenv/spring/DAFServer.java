package org.sitenv.spring;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.annotation.WebServlet;

import ca.uhn.fhir.context.FhirContext;
import ca.uhn.fhir.rest.api.EncodingEnum;
import ca.uhn.fhir.rest.server.IResourceProvider;
import ca.uhn.fhir.rest.server.RestfulServer;


@WebServlet(urlPatterns = {"/fhir/*"}, displayName = "FHIR Server")
public class DAFServer extends RestfulServer {


    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
    /**
     * This method is called automatically when the
     * servlet is initializing.
     */
    @Override
    public void initialize() {
    	
    	
    	setFhirContext(FhirContext.forR4());

      /*
       * The servlet defines any number of resource providers, and
       * configures itself to use them by calling
       * setResourceProviders()
       */

        List<IResourceProvider> resourceProviders = new ArrayList<IResourceProvider>();
      
        resourceProviders.add(new QuestionnaireResourceProvider());
        resourceProviders.add(new QuestionnaireResponseResourceProvider());
        resourceProviders.add(new PatientResourceProvider());
        resourceProviders.add(new PersonResourceProvider());
        resourceProviders.add(new ObservationResourceProvider());
        resourceProviders.add(new ProcedureResourceProvider());
        resourceProviders.add(new DeviceResourceProvider());
        resourceProviders.add(new ConditionResourceProvider());

        setResourceProviders(resourceProviders);

        //setServerConformanceProvider(new CapabilityStatementResourceProvider());

		/*
         * Use a narrative generator. This is a completely optional step,
		 * but can be useful as it causes HAPI to generate narratives for
		 * resources which don't otherwise have one.
		 */
        /** -- revisit Devil */
       /* INarrativeGenerator narrativeGen = new DefaultThymeleafNarrativeGenerator();
        getFhirContext().setNarrativeGenerator(narrativeGen);*/

		/*
         * Tells HAPI to use content types which are not technically FHIR compliant when a browser is detected as the
		 * requesting client. This prevents browsers from trying to download resource responses instead of displaying them
		 * inline which can be handy for troubleshooting.
		 */
        setDefaultResponseEncoding(EncodingEnum.JSON);
        setDefaultPrettyPrint(true);

    }
}
