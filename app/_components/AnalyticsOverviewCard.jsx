"use client";

import { useAnalytics } from "../_hooks/useAnalytics";
import DashboardLeadsSummaryCard from "../_sections/DashboardLeadsSummaryCard";
import { IoPeople } from "react-icons/io5";

function AnalyticsOverviewCard() {
  const { data, loading, error } = useAnalytics();

  if (loading) {
    return (
      <div className="leads-summary-card">
        <div className="leads-summary-card_figures">
          <h6>Visitors this month</h6>
          <h4 className="skeleton skeleton-text"/>
        </div>
        <div className="leads-summary-card_icon">
          <IoPeople />
        </div>

        <div className="leads-summary-card_percentage">
           <p className="skeleton skeleton-text-sm" />
        </div>
      </div> // reuse your skeleton style
    );
  }

  if (error) {
    return (
      <DashboardLeadsSummaryCard
        heading="Visitors this month"
        data={{ total: "N/A", percentage: null }}
        icon={<IoPeople />}
        index={1}
      />
    );
  }

  const { thisMonth, lastMonth } = data;

  return (
    <DashboardLeadsSummaryCard
      heading="Visitors this month"
      data={{
        total: thisMonth.visitors ?? 0,
        percentage: lastMonth.visitors ?? 0,
      }}
      icon={<IoPeople />}
      index={1}
    />
  );
}

export default AnalyticsOverviewCard;
