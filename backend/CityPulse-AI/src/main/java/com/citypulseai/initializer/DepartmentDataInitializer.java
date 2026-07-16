package com.citypulseai.initializer;

import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import com.citypulseai.department.entity.Department;
import com.citypulseai.department.repository.DepartmentRepository;

import lombok.RequiredArgsConstructor;

@Component
@Order(2)
@RequiredArgsConstructor
public class DepartmentDataInitializer implements CommandLineRunner{

	private final DepartmentRepository departmentRepository;

	@Override
	public void run(String... args) throws Exception {

	    createDepartmentIfNotExists(
	            "Sanitation",
	            "Handles waste collection, garbage disposal, street cleanliness, and sanitation services."
	    );

	    createDepartmentIfNotExists(
	            "Water Supply",
	            "Handles water supply issues, pipeline leakages, drainage, and water distribution."
	    );

	    createDepartmentIfNotExists(
	            "Electrical",
	            "Handles street lights, electrical infrastructure, and power-related civic maintenance."
	    );

	    createDepartmentIfNotExists(
	            "Roads & Infrastructure",
	            "Handles potholes, damaged roads, footpaths, bridges, and public infrastructure maintenance."
	    );

	    createDepartmentIfNotExists(
	            "Parks & Recreation",
	            "Maintains parks, public gardens, playgrounds, lakes, and recreational facilities."
	    );

	    createDepartmentIfNotExists(
	            "Traffic Management",
	            "Handles traffic signals, road signs, parking issues, traffic congestion, and public road safety."
	    );

	    createDepartmentIfNotExists(
	            "Public Health",
	            "Handles public health hazards, mosquito breeding, unhygienic conditions, public toilets, and disease prevention."
	    );

	    createDepartmentIfNotExists(
	            "Animal Control",
	            "Handles stray animals, injured animals, animal rescue requests, and animal-related public safety issues."
	    );

	    createDepartmentIfNotExists(
	            "Environmental Services",
	            "Handles air pollution, noise pollution, illegal dumping, tree plantation, environmental conservation, and waste recycling initiatives."
	    );

	    createDepartmentIfNotExists(
	            "Urban Planning & Building Control",
	            "Handles illegal constructions, building safety complaints, encroachments, zoning violations, and urban development issues."
	    );
	}
	
	private void createDepartmentIfNotExists(String departmentName, String description) {
		
		if(!departmentRepository.existsByDepartmentName(departmentName)) {
			
			Department department = Department.builder()
				.departmentName(departmentName)
				.description(description)
				.build();
			
			departmentRepository.save(department);
		}
	}
	
	
}
