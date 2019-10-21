package org.sitenv.spring;

import ca.uhn.fhir.rest.annotation.Metadata;

import javax.servlet.http.HttpServletRequest;

import org.hl7.fhir.r4.hapi.rest.server.ServerCapabilityStatementProvider;
import org.hl7.fhir.r4.model.CapabilityStatement;
import org.hl7.fhir.r4.model.CapabilityStatement.CapabilityStatementRestComponent;
import org.hl7.fhir.r4.model.CapabilityStatement.CapabilityStatementRestSecurityComponent;
import org.hl7.fhir.r4.model.CapabilityStatement.CapabilityStatementSoftwareComponent;
import org.hl7.fhir.r4.model.CapabilityStatement.RestfulCapabilityMode;
import org.hl7.fhir.r4.model.CodeableConcept;
import org.hl7.fhir.r4.model.Coding;
import org.hl7.fhir.r4.model.Enumerations.PublicationStatus;
import org.hl7.fhir.r4.model.Extension;
import org.hl7.fhir.r4.model.UriType;

import java.util.ArrayList;
import java.util.List;

public class CapabilityStatementResourceProvider extends ServerCapabilityStatementProvider {


    @Metadata
    public CapabilityStatement getConformance(HttpServletRequest request) {

        String uri = request.getScheme() + "://" +
                request.getServerName() +
                ("http".equals(request.getScheme()) && request.getServerPort() == 80 || "https".equals(request.getScheme()) && request.getServerPort() == 443 ? "" : ":" + request.getServerPort()) +
                request.getContextPath();

        CapabilityStatement conformance = super.getServerConformance(request);

        conformance.setId("ONC FHIR Server");
        conformance.setUrl("/fhir/metadata");
        conformance.setVersion("2.0");
        conformance.setName("ONC Argonaut FHIR Metadata");
        conformance.setStatus(PublicationStatus.ACTIVE);
        conformance.setPublisher("Office of the National Coordinator for Health Information Technology (ONC)");

        //Set Software
        CapabilityStatementSoftwareComponent softwareComponent = new CapabilityStatementSoftwareComponent();
        softwareComponent.setName("ONC Argonaut FHIR Server");
        softwareComponent.setVersion("1.6");
        conformance.setSoftware(softwareComponent);

        //Set Rest
        List<CapabilityStatementRestComponent> restList = new ArrayList<CapabilityStatementRestComponent>();
        CapabilityStatementRestComponent rest = new CapabilityStatementRestComponent();
        rest.setMode(RestfulCapabilityMode.SERVER);

        CapabilityStatementRestSecurityComponent restSecurity = new CapabilityStatementRestSecurityComponent();

        Extension conformanceExtension = new Extension("http://fhir-registry.smarthealthit.org/StructureDefinition/oauth-uris");

        conformanceExtension.addExtension(new Extension("authorize", new UriType(uri + "/authorize")));
        conformanceExtension.addExtension(new Extension("token", new UriType(uri + "/token")));
        conformanceExtension.addExtension(new Extension("register", new UriType(uri + "/view/newuser.html")));

        restSecurity.addExtension(conformanceExtension);

        CodeableConcept serviceCC = new CodeableConcept();
        List<Coding> theCodingList = new ArrayList<>();
        Coding theCoding = new Coding();
        theCoding.setCode("SMART-on-FHIR");
        theCoding.setSystem("http://hl7.org/fhir/restful-security-service");
        theCodingList.add(theCoding);
        serviceCC.setCoding(theCodingList);
        serviceCC.setText("OAuth2 using SMART-on-FHIR profile (see http://docs.smarthealthit.org)");
        restSecurity.getService().add(serviceCC);
        restSecurity.setCors(true);
        rest.setSecurity(restSecurity);

        rest.setResource(conformance.getRest().get(0).getResource());
        restList.add(rest);
        conformance.setRest(restList);

        return conformance;
    }

}
