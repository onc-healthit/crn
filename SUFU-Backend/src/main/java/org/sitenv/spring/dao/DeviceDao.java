package org.sitenv.spring.dao;

import org.hl7.fhir.r4.model.Device;
import org.sitenv.spring.model.DafDevice;

public interface DeviceDao {

	DafDevice createDevice(Device theDevice);

}
