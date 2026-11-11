"use client";
import TeamHeader from "@/components/manager/team/team-header";
import TeamStats from "@/components/manager/team/team-stats";
import TeamTable from "@/components/manager/team/team-table";

const TeamHomepage = () => {
  return (
    <div className="space-y-6 h-full">
      <TeamHeader onAddStaff={() => {}} />
      <TeamStats />
      <TeamTable />
    </div>
  );
};

export default TeamHomepage;
