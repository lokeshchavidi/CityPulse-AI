package com.citypulseai.user.entity;

import java.time.LocalDateTime;

import com.citypulseai.department.entity.Department;
import com.citypulseai.role.entity.Role;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "users")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "user_id", unique = true, nullable = false)
	private String userId;
	
	@Column(name = "first_name", nullable = false, length = 50)
	private String firstName;
	
	@Column(name = "last_name", nullable = false, length = 50)
	private String lastName;
	
	@Column(name = "email", nullable = false, unique = true, length = 100)
	private String email;

	@Column(name = "password", nullable = false, length = 255)
	private String password;
	
	@Column(name = "phone_number", nullable = false, length = 15)
	private String phoneNumber;
	
	@Builder.Default
	@Column(name = "enabled", nullable = false)
	private boolean enabled = true;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "role_id", nullable = false)
	private Role role;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "department_id")
	private Department department;
	
	private LocalDateTime createdAt;
	
	private LocalDateTime updatedAt;
	
	@PrePersist
	public void prePersist() {
		this.createdAt = LocalDateTime.now();
		this.updatedAt = LocalDateTime.now();
	}
	
	@PreUpdate
	public void preUpdate() {
		this.updatedAt = LocalDateTime.now();
	}
}
