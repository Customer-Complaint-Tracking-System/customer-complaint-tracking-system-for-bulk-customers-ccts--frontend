"use client";
import TeamHeader from "@/components/manager/team/team-header";
import TeamTable from "@/components/manager/team/team-table";

const TeamHomepage = () => {
  return (
    <div className="space-y-6">
      <TeamHeader onAddStaff={() => {}} />
      <TeamTable />
    </div>
  );
};

export default TeamHomepage;
