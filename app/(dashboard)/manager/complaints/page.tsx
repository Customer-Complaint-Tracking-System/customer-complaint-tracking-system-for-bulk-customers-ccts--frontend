import ComplaintFilters from "@/components/manager/complaint/complaint-filters";
import ComplaintInbox from "@/components/manager/complaint/complaint-inbox";

const ComplaintsInboxHomepage = () => {
  return (
    <div className="space-y-3 pb-10">
      <ComplaintFilters />
      <ComplaintInbox />
    </div>
  );
};

export default ComplaintsInboxHomepage;
