import ComplaintsOverview from "@/components/manager/complaint-overview";
import ComplaintStats from "@/components/manager/complaint-stats";
import NeedsYourAttention from "@/components/manager/need-your-attention";
import RecentActivities from "@/components/manager/recent-activity";

const ManagerHomePage = () => {
  return (
    <div className="space-y-2 pb-10">
      <ComplaintStats />
      <NeedsYourAttention />
      <ComplaintsOverview />
      <RecentActivities />
    </div>
  );
};

export default ManagerHomePage;
