package org.sitenv.spring.query;

public class PatientSearchCriteria extends SearchCriteria {
	
	private static final long serialVersionUID = 1L;
	private String patientId;
	
	public String getPatientId() {
		return patientId;
	}
	public void setPatientId(String patientId) {
		this.patientId = patientId;
	}
	
	//=================================
    // Public Methods
    //=================================
    public void reset() {
        this.setPatientId(null);
    }
}
