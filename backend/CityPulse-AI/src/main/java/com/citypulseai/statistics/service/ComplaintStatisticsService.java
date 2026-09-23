package com.citypulseai.statistics.service;

import com.citypulseai.department.entity.Department;
import com.citypulseai.statistics.dto.ComplaintStatisticsResponse;
import com.citypulseai.user.entity.User;

public interface ComplaintStatisticsService {

    ComplaintStatisticsResponse getPlatformStatistics();

    ComplaintStatisticsResponse getCitizenStatistics(User citizen);

    ComplaintStatisticsResponse getOfficerStatistics(User officer);

    ComplaintStatisticsResponse getDepartmentStatistics(Department department);
}
