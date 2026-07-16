package com.citypulseai.initializer;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import com.citypulseai.role.entity.Role;
import com.citypulseai.role.enums.RoleType;
import com.citypulseai.role.repository.RoleRepository;

import lombok.RequiredArgsConstructor;

@Component
@Order(1)
@RequiredArgsConstructor
public class RoleDataInitializer implements CommandLineRunner {
	
	private final RoleRepository roleRepository;
	
	@Override
	public void run(String... args) throws Exception {
		
		for(RoleType roleType : RoleType.values()) {
			
			if(!roleRepository.existsByRoleType(roleType)) {
				
				Role role = Role.builder()
				.roleType(roleType)
				.description(roleType.getDescription())
				.build();
				
				roleRepository.save(role);
			}
		}
	}

}
