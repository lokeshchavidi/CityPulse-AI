package com.citypulseai.ai.dto;

import com.citypulseai.complaint.enums.ComplaintCategory;
import com.citypulseai.complaint.enums.ComplaintPriority;
import com.citypulseai.complaint.enums.ComplaintSeverity;
import com.fasterxml.jackson.annotation.JsonPropertyDescription;

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
public class AIAnalysisResponse {

    @JsonPropertyDescription("Predicted complaint category.")
    private ComplaintCategory category;

    @JsonPropertyDescription("Predicted complaint severity. Possible values: LOW, MEDIUM, HIGH, CRITICAL.")
    private ComplaintSeverity severity;

    @JsonPropertyDescription("Recommended complaint priority. Possible values: LOW, MEDIUM, HIGH, CRITICAL.")
    private ComplaintPriority priority;

    @JsonPropertyDescription("Recommended municipal department responsible for resolving the complaint.")
    private String suggestedDepartment;

    @JsonPropertyDescription("Short summary of the complaint in one or two sentences.")
    private String summary;

    @JsonPropertyDescription("AI confidence score between 0 and 100.")
    private Integer confidenceScore;

    @JsonPropertyDescription("True if the uploaded image was successfully analyzed.")
    private Boolean imageVerified;

    @JsonPropertyDescription("True if the complaint text and image are consistent.")
    private Boolean textImageConsistent;

    @JsonPropertyDescription("True if the complaint requires immediate emergency response.")
    private Boolean emergencyDetected;

    @JsonPropertyDescription("True if this complaint appears to be a duplicate.")
    private Boolean duplicateComplaint;

    @JsonPropertyDescription("Reason why the complaint is considered a duplicate. Empty if not applicable.")
    private String duplicateReason;

    @JsonPropertyDescription("Additional AI observations or recommendations.")
    private String remarks;

}