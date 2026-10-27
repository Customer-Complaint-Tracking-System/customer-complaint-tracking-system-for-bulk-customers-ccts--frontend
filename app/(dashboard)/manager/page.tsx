import ComplaintsOverview from "@/components/manager/home/complaint-overview";
import ComplaintStats from "@/components/manager/home/complaint-stats";
import NeedsYourAttention from "@/components/manager/home/need-your-attention";
import RecentActivities from "@/components/manager/home/recent-activity";

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
