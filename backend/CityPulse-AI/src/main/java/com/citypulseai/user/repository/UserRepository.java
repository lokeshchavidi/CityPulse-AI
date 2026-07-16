package com.citypulseai.user.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.citypulseai.department.entity.Department;
import com.citypulseai.role.enums.RoleType;
import com.citypulseai.user.entity.User;

public interface UserRepository extends JpaRepository<User, Long>{

	@Query("""
		    SELECT u
		    FROM User u
		    LEFT JOIN FETCH u.department
		    LEFT JOIN FETCH u.role
		    WHERE u.email = :email
		""")
		Optional<User> findByEmailWithDepartment(@Param("email") String email);
	
	@EntityGraph(attributePaths = "role")
	Optional<User> findByEmail(String email);
	
	boolean existsByEmail(String email);
	
	
	
	Optional<User> findByUserId(String userId);

	List<User> findByRole_RoleType(RoleType roleType);
	
	boolean existsByUserId(String userId);
	
	List<User> findByRole_RoleTypeAndDepartment(
	        RoleType roleType,
	        Department department);
	
	long countByRole_RoleType(RoleType roleType);
	
	long countByRole_RoleTypeAndEnabled(RoleType roleType, boolean enabled);
	boolean existsByRole_RoleTypeAndDepartment(
	        RoleType roleType,
	        Department department);
}
