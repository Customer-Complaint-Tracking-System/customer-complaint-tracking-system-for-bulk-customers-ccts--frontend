import EscalationCharts from "@/components/manager/escalations/escalation-chart";
import EscalationFilters from "@/components/manager/escalations/escalation-filters";
import EscalationHeader from "@/components/manager/escalations/escalation-header";
import EscalationTable from "@/components/manager/escalations/escalation-table";
import React from "react";

const EscalationsHomepage = () => {
  return (
    <div className="w-full min-h-screen bg-slate-50/70 space-y-5">
      <EscalationHeader />
      <EscalationFilters />
      <EscalationTable />
      <EscalationCharts />
    </div>
  );
};

export default EscalationsHomepage;
