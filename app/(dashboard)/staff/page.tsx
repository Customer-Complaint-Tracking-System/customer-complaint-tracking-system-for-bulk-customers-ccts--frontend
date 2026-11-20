import MyAssignedComplaints from "@/components/staff/home/assigned-complaint";
import ComplaintOverview from "@/components/staff/home/complaint-overview";

const StaffHomepage = () => {
  return (
    <div className="space-y-3">
      <ComplaintOverview />
      <MyAssignedComplaints />
    </div>
  );
};

export default StaffHomepage;
