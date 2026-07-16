package com.citypulseai.notification.dto;

public final class NotificationMessages {

	private NotificationMessages() {
	}

	// Complaint Created
	public static final String COMPLAINT_SUBMITTED_TITLE = "Complaint Submitted";
	public static final String COMPLAINT_SUBMITTED_MESSAGE = "Your complaint has been submitted successfully.";

	// AI Accepted
	public static final String UNDER_REVIEW_TITLE = "Complaint Under Review";
	public static final String UNDER_REVIEW_MESSAGE = "Your complaint is now under review by the department.";

	// Officer Assigned
	public static final String OFFICER_ASSIGNED_TITLE = "New Complaint Assigned";
	public static final String OFFICER_ASSIGNED_MESSAGE = "A new complaint has been assigned to you.";

	// Work Started
	public static final String WORK_STARTED_TITLE = "Work Started";
	public static final String WORK_STARTED_MESSAGE = "An officer has started working on your complaint.";

	// Complaint Resolved
	public static final String COMPLAINT_RESOLVED_TITLE = "Complaint Resolved";
	public static final String COMPLAINT_RESOLVED_MESSAGE = "Your complaint has been resolved successfully.";

	// AI Analysis
	public static final String AI_ANALYSIS_COMPLETED_TITLE = "AI Analysis Completed";
	public static final String AI_ANALYSIS_COMPLETED_MESSAGE = "AI analysis has completed for your complaint.";


	public static final String ACCOUNT_ENABLED_TITLE = "Account Enabled";

	public static final String ACCOUNT_DISABLED_TITLE = "Account Disabled";

	public static final String DEPARTMENT_UPDATED_TITLE = "Department Updated";
	public static final String NEW_COMPLAINT_ASSIGNED_TITLE = "Complaint assigned";}