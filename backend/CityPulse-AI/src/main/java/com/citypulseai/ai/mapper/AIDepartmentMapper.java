package com.citypulseai.ai.mapper;

import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;

/**
 * Normalizes Gemini's free-text suggestedDepartment into one of the
 * canonical department names seeded in the database.
 *
 * This field is a plain String, not a schema-constrained enum like
 * severity/priority, so Gemini has real room to phrase it slightly
 * differently from the exact prompt wording ("Roads and Infrastructure
 * Department" instead of "Roads & Infrastructure", for example) even
 * though the prompt asks for an exact match. Matching used to be a strict
 * switch on a handful of hardcoded phrases per department — anything that
 * didn't match one of those exact strings silently fell through to
 * "Public Health" with no log line, which meant a complaint could get
 * quietly misrouted to the wrong manager's queue with zero visibility
 * into why.
 *
 * This version instead checks whether the AI's text CONTAINS a keyword
 * associated with each department, which tolerates rewording, extra
 * words like "Department"/"Team", and minor punctuation differences. It
 * also logs a warning whenever it has to fall back to the default, so a
 * misroute is now traceable in the logs instead of invisible.
 */
@Component
@Slf4j
public class AIDepartmentMapper {

    private static final String DEFAULT_DEPARTMENT = "Public Health";

    // Order matters: checked top to bottom, first match wins. More
    // specific / less ambiguous keywords are listed first.
    private static final String[][] KEYWORD_RULES = {
        { "Roads & Infrastructure", "road", "pothole", "infrastructure", "public works", "footpath", "bridge" },
        { "Water Supply", "water" },
        { "Electrical", "electric", "street light", "streetlight", "power" },
        { "Sanitation", "sanitation", "garbage", "waste", "cleanliness", "trash" },
        { "Traffic Management", "traffic", "parking", "road sign" },
        { "Parks & Recreation", "park", "playground", "garden", "recreation" },
        { "Environmental Services", "environment", "pollution", "dumping", "tree" },
        { "Animal Control", "animal", "stray" },
        { "Urban Planning & Building Control", "urban planning", "building control", "encroachment", "zoning", "illegal construction" },
        { "Public Health", "health", "hygiene", "mosquito", "disease" },
    };

    public String mapDepartment(String aiDepartment) {

        if (aiDepartment == null || aiDepartment.isBlank()) {
            log.warn("AI returned no suggested department; defaulting to {}", DEFAULT_DEPARTMENT);
            return DEFAULT_DEPARTMENT;
        }

        String normalized = aiDepartment.trim().toLowerCase();

        for (String[] rule : KEYWORD_RULES) {
            String canonicalName = rule[0];

            for (int i = 1; i < rule.length; i++) {
                if (normalized.contains(rule[i])) {
                    return canonicalName;
                }
            }
        }

        log.warn(
                "AI suggested department '{}' did not match any known department keywords; "
                        + "defaulting to {}. Consider adding a keyword rule for this phrasing.",
                aiDepartment, DEFAULT_DEPARTMENT);

        return DEFAULT_DEPARTMENT;
    }
}
