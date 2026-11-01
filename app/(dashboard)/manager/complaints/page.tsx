import ComplaintFilters from "@/components/shared/complaint/complaint-filters";
import ComplaintInbox from "@/components/shared/complaint/complaint-inbox";

const ComplaintsInboxHomepage = () => {
  return (
    <div className="space-y-3 pb-10">
      <ComplaintFilters />
      <ComplaintInbox role="manager" />
    </div>
  );
};

export default ComplaintsInboxHomepage;
