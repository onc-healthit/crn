package org.sitenv.spring;

import org.json.JSONArray;
import org.sitenv.spring.service.ResourceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/resource")
public class ResourceController {
	
	@Autowired
	private ResourceService resourceService;
	
	@RequestMapping(value="/patient/{patientId}", method=RequestMethod.GET)
	@ResponseBody
	public JSONArray getResourcesForPatient(@PathVariable Integer patientId) {
		
		return resourceService.getResourcesForPatient(patientId);
	}

}
