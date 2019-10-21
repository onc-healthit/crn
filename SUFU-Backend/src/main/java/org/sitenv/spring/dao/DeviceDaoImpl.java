package org.sitenv.spring.dao;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hl7.fhir.r4.model.Device;
import org.sitenv.spring.model.DafDevice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import ca.uhn.fhir.context.FhirContext;
import ca.uhn.fhir.parser.IParser;

@Repository("deviceDao")
public class DeviceDaoImpl extends AbstractDao implements DeviceDao {

	@Autowired
	FhirContext fhirContext;

	@Autowired
    private SessionFactory sessionFactory;
	
	/**
	 * Creates the observation resource
	 * @param theObservation
	 * @return dafObservation
	 */
	@Override
	@Transactional
	public DafDevice createDevice(Device theDevice) {
		Session session = sessionFactory.openSession();
		DafDevice dafDevice = new DafDevice();
		IParser jsonParser = fhirContext.newJsonParser();;
		dafDevice.setData(jsonParser.encodeResourceToString(theDevice));
		session.beginTransaction();
		session.save(dafDevice);
		session.getTransaction().commit();
		session.close();
		return dafDevice;
	}
}
