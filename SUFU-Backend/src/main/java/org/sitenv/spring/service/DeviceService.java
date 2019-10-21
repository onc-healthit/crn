package org.sitenv.spring.service;

import org.hl7.fhir.r4.model.Device;
import org.sitenv.spring.model.DafDevice;

public interface DeviceService {

	DafDevice createDevice(Device theDevice);

}
