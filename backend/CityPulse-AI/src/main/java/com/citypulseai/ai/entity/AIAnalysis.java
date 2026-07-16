package com.citypulseai.ai.entity;

import java.time.LocalDateTime;

import com.citypulseai.ai.enums.AIAnalysisStatus;
import com.citypulseai.complaint.entity.Complaint;
import com.citypulseai.complaint.enums.ComplaintCategory;
import com.citypulseai.complaint.enums.ComplaintPriority;
import com.citypulseai.complaint.enums.ComplaintSeverity;
import com.citypulseai.department.entity.Department;

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
import jakarta.persistence.OneToOne;
import jakarta.persistence.PrePersist;
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
@Table(name = "ai_analysis")
public class AIAnalysis {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(unique = true)
	private String analysisId;

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "complaint_id")
	private Complaint complaint;

	@Enumerated(EnumType.STRING)
	private ComplaintCategory category;

	@Enumerated(EnumType.STRING)
	private ComplaintSeverity severity;

	@Enumerated(EnumType.STRING)
	private ComplaintPriority priority;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "suggested_department_id")
	private Department suggestedDepartment;

	@Column(length = 2000)
	private String summary;

	private Integer confidenceScore;

	private Boolean imageVerified;

	private Boolean textImageConsistent;

	private Boolean emergencyDetected;

	private Boolean duplicateComplaint;

	@Column(length = 2000)
	private String duplicateReason;

	@Column(length = 3000)
	private String remarks;

	@Enumerated(EnumType.STRING)
	private AIAnalysisStatus status;

	private String aiModel;

	private Long processingTimeInMs;

	private LocalDateTime createdAt;
	
	@PrePersist
	private void prePersist() {
		this.createdAt = LocalDateTime.now();
	}
}
