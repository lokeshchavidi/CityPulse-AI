package com.citypulseai.complaint.entity;

import java.time.LocalDateTime;

import com.citypulseai.complaint.enums.ComplaintPriority;
import com.citypulseai.department.entity.Department;
import com.citypulseai.user.entity.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
@Table(name = "complaints")
public class Complaint {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "complaint_id", nullable = false, unique = true)
	private String complaintId;
	
	@Column(nullable = false, length = 150)
	private String title;
	
	@Column(nullable = false, length = 1000)
	private String description;
	
	private Double latitude;
	
	private Double longitude;
	
	@Column(length = 300)
	private String address;
	
	@Column(name = "image_url")
	private String imageUrl;
	
	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private ComplaintStatus status;
	
	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private ComplaintPriority priority;
	
	/**
     * Citizen who created the complaint.
     */
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "citizen_id", nullable = false)
	private User citizen;
	
	/**
	 * Department responsible for resolving the complaint.
	 * Initially null. Assigned manually or by AI recommendation
	 */
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "department_id")
	private Department department;
	
	/**
     * Officer assigned to handle the complaint.
     * Initially null.
     */
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "assigned_officer_id")
	private User assignedOfficer;
	
	@Column(name = "created_at", nullable = false, updatable = false)
	private LocalDateTime createdAt;
	
	@Column(name = "updated_at", nullable = false)
	private LocalDateTime updatedAt;
	
	@PrePersist
	public void prePersist() {
		this.createdAt = LocalDateTime.now();
		this.updatedAt = LocalDateTime.now();
		
		 // Default status when a complaint is created
        if (this.status == null) {
            this.status = ComplaintStatus.OPEN;
        }

        // Default priority before AI/officer analysis
        if (this.priority == null) {
            this.priority = ComplaintPriority.MEDIUM;
        }
	}
	
	@PreUpdate
	public void preUpdate() {
		this.updatedAt = LocalDateTime.now();
	}
	
}
