package com.citypulseai.complaint.service;

import org.springframework.stereotype.Component;

import com.citypulseai.common.constants.AppConstants;
import com.citypulseai.complaint.entity.Complaint;
import com.citypulseai.complaint.exception.UnauthorizedComplaintAccessException;
import com.citypulseai.role.enums.RoleType;
import com.citypulseai.user.entity.User;

/**
 * Centralizes the "who is allowed to view this specific complaint" rule so
 * it's enforced consistently everywhere a complaint (or its history) is
 * fetched by ID. Complaint IDs are short, sequential, and guessable
 * (CMP-00001, CMP-00002, ...), so relying on "you'd have to already know
 * the ID" is not a real access control — every read-by-ID endpoint must
 * check the caller actually has a relationship to that complaint.
 *
 * Rules:
 *  - CITIZEN: only their own complaint.
 *  - OFFICER: only a complaint currently assigned to them.
 *  - DEPARTMENT_MANAGER: only a complaint in their department.
 *  - ADMIN: unrestricted.
 */
@Component
public class ComplaintAccessValidator {

    public void validateAccess(Complaint complaint, User currentUser) {

        RoleType role = currentUser.getRole().getRoleType();

        switch (role) {

            case ADMIN -> {
                // Unrestricted.
            }

            case CITIZEN -> {
                boolean isOwner = complaint.getCitizen() != null
                        && complaint.getCitizen().getUserId().equals(currentUser.getUserId());

                if (!isOwner) {
                    throw new UnauthorizedComplaintAccessException(
                            AppConstants.UNAUTHORIZED_COMPLAINT_ACCESS);
                }
            }

            case OFFICER -> {
                boolean isAssignedOfficer = complaint.getAssignedOfficer() != null
                        && complaint.getAssignedOfficer().getUserId().equals(currentUser.getUserId());

                if (!isAssignedOfficer) {
                    throw new UnauthorizedComplaintAccessException(
                            AppConstants.UNAUTHORIZED_COMPLAINT_ACCESS);
                }
            }

            case DEPARTMENT_MANAGER -> {
                boolean sameDepartment = complaint.getDepartment() != null
                        && currentUser.getDepartment() != null
                        && complaint.getDepartment().getDepartmentId()
                                .equals(currentUser.getDepartment().getDepartmentId());

                if (!sameDepartment) {
                    throw new UnauthorizedComplaintAccessException(
                            AppConstants.UNAUTHORIZED_COMPLAINT_ACCESS);
                }
            }
        }
    }
}
