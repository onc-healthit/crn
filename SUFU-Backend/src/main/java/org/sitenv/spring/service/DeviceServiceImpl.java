package org.sitenv.spring.service;

import org.hl7.fhir.r4.model.Device;
import org.sitenv.spring.dao.DeviceDao;
import org.sitenv.spring.model.DafDevice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ca.uhn.fhir.context.FhirContext;

@Service("DeviceService")
public class DeviceServiceImpl implements DeviceService {

	public static final String RESOURCE_TYPE = "Device";

	@Autowired
	private DeviceDao deviceDao;
	
	@Autowired
	FhirContext fhirContext;
	
	@Override
	public DafDevice createDevice(Device theDevice) {
		return deviceDao.createDevice(theDevice);
	}

}
