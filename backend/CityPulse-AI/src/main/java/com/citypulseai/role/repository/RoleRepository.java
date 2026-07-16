package com.citypulseai.role.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.citypulseai.role.entity.Role;
import com.citypulseai.role.enums.RoleType;

public interface RoleRepository extends JpaRepository<Role, Long>{

	Optional<Role> findByRoleType(RoleType roleType);
	
	boolean existsByRoleType(RoleType roleType);
}
