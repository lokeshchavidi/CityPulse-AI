package com.citypulseai.role.enums;

public enum RoleType {

	CITIZEN("Citizen of the city"),
	
	OFFICER("Department Officer"),
	
	DEPARTMENT_MANAGER("Department Manager"),
	
	ADMIN("System Administrator");
	
	private final String description;
	
	RoleType(String description) {
		this.description = description;
	}
	
	public String getDescription() {
		return description;
	}
}
