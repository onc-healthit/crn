package org.sitenv.spring;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Properties;

import org.json.JSONObject;
import org.springframework.core.io.ClassPathResource;
import  org.springframework.core.io.Resource;
import org.springframework.core.io.support.PropertiesLoaderUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/device")
public class DeviceController {

	Properties props;
    private final String USER_AGENT = "Mozilla/5.0";
    
    /**
     * This method is used to get the device by id
     *
     * @param id
     * @return This method will return the device. if the device not existed returns null.
     */
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    @ResponseBody
    public JSONObject getDeviceById(@PathVariable final String id) {
    	JSONObject json = null;
    	System.out.println(id);
    	DeviceController http = new DeviceController();
    	try {
			json = http.sendGet(id);
		} catch (Exception e) {
			System.out.println(e);
			e.printStackTrace();
		}
    	return json;
    }

    // HTTP GET request
	private JSONObject sendGet(String id) throws Exception {

		Resource resource = new ClassPathResource("/application.properties");
		try { 
			  props = PropertiesLoaderUtils.loadProperties(resource); 
		} catch (IOException e) {
			  e.printStackTrace(); 
		}
		  
		String url = props.getProperty("deviceurl");
	    String deviceUrl = url+id;
		
		URL obj = new URL(deviceUrl);
		HttpURLConnection con = (HttpURLConnection) obj.openConnection();

		// optional default is GET
		con.setRequestMethod("GET");

		//add request header
		con.setRequestProperty("User-Agent", USER_AGENT);
		
		System.out.println("Response Code : " + con.getResponseCode());
		BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
		String inputLine;
		StringBuffer response = new StringBuffer();

		while ((inputLine = in.readLine()) != null) {
			response.append(inputLine);
		}
		in.close();
		JSONObject responseObj = new JSONObject(response.toString());
		
		return responseObj;
	}
    
}
