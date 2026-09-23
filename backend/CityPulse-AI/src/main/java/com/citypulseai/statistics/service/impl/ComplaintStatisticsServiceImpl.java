package com.citypulseai.statistics.service.impl;

import java.time.LocalDateTime;
import java.time.YearMonth;
import java.time.format.TextStyle;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.citypulseai.ai.repository.AIAnalysisRepository;
import com.citypulseai.complaint.entity.ComplaintStatus;
import com.citypulseai.complaint.enums.ComplaintPriority;
import com.citypulseai.complaint.repository.ComplaintRepository;
import com.citypulseai.department.entity.Department;
import com.citypulseai.statistics.dto.ComplaintStatisticsResponse;
import com.citypulseai.statistics.dto.MonthlyTrendPointResponse;
import com.citypulseai.statistics.dto.NamedCountResponse;
import com.citypulseai.statistics.service.ComplaintStatisticsService;
import com.citypulseai.user.entity.User;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ComplaintStatisticsServiceImpl implements ComplaintStatisticsService {

    private static final int TREND_MONTHS = 6;

    private final ComplaintRepository complaintRepository;

    private final AIAnalysisRepository aiAnalysisRepository;

    @Override
    public ComplaintStatisticsResponse getPlatformStatistics() {
        long total = complaintRepository.count();
        long resolved = complaintRepository.countByStatus(ComplaintStatus.RESOLVED);
        long open = complaintRepository.countByStatus(ComplaintStatus.OPEN);
        long critical = complaintRepository.countByPriority(ComplaintPriority.CRITICAL);

        LocalDateTime from = trendStart();

        return buildResponse(
                total,
                open,
                resolved,
                critical,
                toNamedCounts(complaintRepository.countGroupedByStatus(), true),
                toNamedCounts(complaintRepository.countGroupedByPriority(), false),
                toDepartmentBreakdown(complaintRepository.countGroupedByDepartment()),
                buildMonthlyTrend(
                        complaintRepository.countFiledByMonthSince(from),
                        complaintRepository.countByStatusUpdatedByMonthSince(
                                ComplaintStatus.RESOLVED,
                                from)));
    }

    @Override
    public ComplaintStatisticsResponse getCitizenStatistics(User citizen) {
        long total = complaintRepository.countByCitizen(citizen);
        long resolved = complaintRepository.countByCitizenAndStatus(
                citizen,
                ComplaintStatus.RESOLVED);
        long open = complaintRepository.countByCitizenAndStatus(
                citizen,
                ComplaintStatus.OPEN);
        long critical = complaintRepository.countByCitizenAndPriority(
                citizen,
                ComplaintPriority.CRITICAL);

        LocalDateTime from = trendStart();

        return buildResponse(
                total,
                open,
                resolved,
                critical,
                toNamedCounts(
                        complaintRepository.countGroupedByStatusForCitizen(citizen),
                        true),
                toNamedCounts(
                        complaintRepository.countGroupedByPriorityForCitizen(citizen),
                        false),
                List.of(),
                buildMonthlyTrend(
                        complaintRepository.countFiledByMonthSinceForCitizen(citizen, from),
                        complaintRepository.countByStatusUpdatedByMonthSinceForCitizen(
                                citizen,
                                ComplaintStatus.RESOLVED,
                                from)));
    }

    @Override
    public ComplaintStatisticsResponse getOfficerStatistics(User officer) {
        long total = complaintRepository.countByAssignedOfficer(officer);
        long resolved = complaintRepository.countByAssignedOfficerAndStatus(
                officer,
                ComplaintStatus.RESOLVED);
        long open = complaintRepository.countByAssignedOfficerAndStatus(
                officer,
                ComplaintStatus.ASSIGNED);
        long critical = complaintRepository.countByAssignedOfficerAndPriority(
                officer,
                ComplaintPriority.CRITICAL);

        LocalDateTime from = trendStart();

        return buildResponse(
                total,
                open,
                resolved,
                critical,
                toNamedCounts(
                        complaintRepository.countGroupedByStatusForOfficer(officer),
                        true),
                toNamedCounts(
                        complaintRepository.countGroupedByPriorityForOfficer(officer),
                        false),
                List.of(),
                buildMonthlyTrend(
                        complaintRepository.countFiledByMonthSinceForOfficer(officer, from),
                        complaintRepository.countByStatusUpdatedByMonthSinceForOfficer(
                                officer,
                                ComplaintStatus.RESOLVED,
                                from)));
    }

    @Override
    public ComplaintStatisticsResponse getDepartmentStatistics(Department department) {
        // Complaints still waiting for the manager to accept the AI result
        // have no department on the complaint row yet. Count them with the
        // department the AI suggested, using the AI priority rather than the
        // default MEDIUM stored on the complaint.
        long awaitingAcceptance = aiAnalysisRepository.countUnassignedOpen(department);
        long awaitingCritical = aiAnalysisRepository.countUnassignedOpenByAiPriority(
                department,
                ComplaintPriority.CRITICAL);

        long total = complaintRepository.countByDepartment(department) + awaitingAcceptance;
        long resolved = complaintRepository.countByDepartmentAndStatus(
                department,
                ComplaintStatus.RESOLVED);
        long open = complaintRepository.countByDepartmentAndStatus(
                department,
                ComplaintStatus.OPEN)
                + complaintRepository.countByDepartmentAndStatus(
                        department,
                        ComplaintStatus.UNDER_REVIEW)
                + awaitingAcceptance;
        long critical = complaintRepository.countByDepartmentAndPriority(
                department,
                ComplaintPriority.CRITICAL)
                + awaitingCritical;

        List<NamedCountResponse> statusBreakdown = toNamedCounts(
                complaintRepository.countGroupedByStatusForDepartment(department),
                true);
        addToNamedCount(statusBreakdown, formatEnum(ComplaintStatus.OPEN.name()), awaitingAcceptance);

        List<NamedCountResponse> priorityBreakdown = toNamedCounts(
                complaintRepository.countGroupedByPriorityForDepartment(department),
                false);
        for (Object[] row : aiAnalysisRepository.countUnassignedOpenGroupedByPriority(department)) {
            if (row[0] == null) {
                continue;
            }
            addToNamedCount(
                    priorityBreakdown,
                    formatEnum(row[0].toString()),
                    ((Number) row[1]).longValue());
        }

        LocalDateTime from = trendStart();

        return buildResponse(
                total,
                open,
                resolved,
                critical,
                statusBreakdown,
                priorityBreakdown,
                List.of(),
                buildMonthlyTrend(
                        mergeMonthRows(
                                complaintRepository.countFiledByMonthSinceForDepartment(
                                        department,
                                        from),
                                aiAnalysisRepository.countUnassignedOpenFiledByMonth(
                                        department,
                                        from)),
                        complaintRepository.countByStatusUpdatedByMonthSinceForDepartment(
                                department,
                                ComplaintStatus.RESOLVED,
                                from)));
    }

    private ComplaintStatisticsResponse buildResponse(
            long total,
            long open,
            long resolved,
            long critical,
            List<NamedCountResponse> statusBreakdown,
            List<NamedCountResponse> priorityBreakdown,
            List<NamedCountResponse> departmentBreakdown,
            List<MonthlyTrendPointResponse> monthlyTrend) {

        double resolutionRate = total == 0
                ? 0.0
                : Math.round((resolved * 1000.0) / total) / 10.0;

        return ComplaintStatisticsResponse.builder()
                .totalComplaints(total)
                .openComplaints(open)
                .resolvedComplaints(resolved)
                .criticalComplaints(critical)
                .resolutionRate(resolutionRate)
                .statusBreakdown(statusBreakdown)
                .priorityBreakdown(priorityBreakdown)
                .departmentBreakdown(departmentBreakdown)
                .monthlyTrend(monthlyTrend)
                .build();
    }

    private LocalDateTime trendStart() {
        return YearMonth.now()
                .minusMonths(TREND_MONTHS - 1L)
                .atDay(1)
                .atStartOfDay();
    }

    private List<NamedCountResponse> toNamedCounts(
            List<Object[]> rows,
            boolean statusLabels) {

        Map<String, Long> counts = new LinkedHashMap<>();

        if (statusLabels) {
            for (ComplaintStatus status : ComplaintStatus.values()) {
                counts.put(formatEnum(status.name()), 0L);
            }
        } else {
            for (ComplaintPriority priority : ComplaintPriority.values()) {
                counts.put(formatEnum(priority.name()), 0L);
            }
        }

        for (Object[] row : rows) {
            if (row[0] == null) {
                continue;
            }

            String name = formatEnum(row[0].toString());
            long value = ((Number) row[1]).longValue();
            counts.put(name, value);
        }

        List<NamedCountResponse> result = new ArrayList<>();

        for (Map.Entry<String, Long> entry : counts.entrySet()) {
            result.add(NamedCountResponse.builder()
                    .name(entry.getKey())
                    .value(entry.getValue())
                    .build());
        }

        return result;
    }

    private List<NamedCountResponse> toDepartmentBreakdown(List<Object[]> rows) {
        List<NamedCountResponse> result = new ArrayList<>();

        for (Object[] row : rows) {
            result.add(NamedCountResponse.builder()
                    .name(row[0] != null ? row[0].toString() : "Unassigned")
                    .value(((Number) row[1]).longValue())
                    .build());
        }

        return result;
    }

    private List<MonthlyTrendPointResponse> buildMonthlyTrend(
            List<Object[]> filedRows,
            List<Object[]> resolvedRows) {

        Map<YearMonth, Long> filed = toMonthMap(filedRows);
        Map<YearMonth, Long> resolved = toMonthMap(resolvedRows);

        List<MonthlyTrendPointResponse> trend = new ArrayList<>();
        YearMonth cursor = YearMonth.now().minusMonths(TREND_MONTHS - 1L);

        for (int i = 0; i < TREND_MONTHS; i++) {
            trend.add(MonthlyTrendPointResponse.builder()
                    .year(cursor.getYear())
                    .month(cursor.getMonthValue())
                    .label(cursor.getMonth().getDisplayName(TextStyle.SHORT, Locale.ENGLISH)
                            + " " + cursor.getYear())
                    .filed(filed.getOrDefault(cursor, 0L))
                    .resolved(resolved.getOrDefault(cursor, 0L))
                    .build());

            cursor = cursor.plusMonths(1);
        }

        return trend;
    }

    private void addToNamedCount(List<NamedCountResponse> counts, String name, long amount) {
        if (amount == 0) {
            return;
        }

        for (NamedCountResponse item : counts) {
            if (name.equals(item.getName())) {
                item.setValue(item.getValue() + amount);
                return;
            }
        }

        counts.add(NamedCountResponse.builder()
                .name(name)
                .value(amount)
                .build());
    }

    private List<Object[]> mergeMonthRows(List<Object[]> first, List<Object[]> second) {
        Map<YearMonth, Long> merged = new HashMap<>();
        addMonthRows(merged, first);
        addMonthRows(merged, second);

        List<Object[]> rows = new ArrayList<>();
        for (Map.Entry<YearMonth, Long> entry : merged.entrySet()) {
            rows.add(new Object[] {
                    entry.getKey().getYear(),
                    entry.getKey().getMonthValue(),
                    entry.getValue()
            });
        }
        return rows;
    }

    private void addMonthRows(Map<YearMonth, Long> merged, List<Object[]> rows) {
        for (Object[] row : rows) {
            YearMonth month = YearMonth.of(
                    ((Number) row[0]).intValue(),
                    ((Number) row[1]).intValue());
            long count = ((Number) row[2]).longValue();
            merged.merge(month, count, Long::sum);
        }
    }

    private Map<YearMonth, Long> toMonthMap(List<Object[]> rows) {
        Map<YearMonth, Long> map = new HashMap<>();

        for (Object[] row : rows) {
            int year = ((Number) row[0]).intValue();
            int month = ((Number) row[1]).intValue();
            long count = ((Number) row[2]).longValue();
            map.put(YearMonth.of(year, month), count);
        }

        return map;
    }

    private String formatEnum(String value) {
        String[] parts = value.toLowerCase(Locale.ENGLISH).split("_");
        StringBuilder builder = new StringBuilder();

        for (int i = 0; i < parts.length; i++) {
            if (parts[i].isEmpty()) {
                continue;
            }

            if (i > 0) {
                builder.append(' ');
            }

            builder.append(Character.toUpperCase(parts[i].charAt(0)))
                    .append(parts[i].substring(1));
        }

        return builder.toString();
    }
}
