import ComplaintFilters from '@/components/shared/complaint/complaint-filters';
import ComplaintInbox from '@/components/shared/complaint/complaint-inbox';

const StaffComplaintsHomepage = () => {
  return (
    <div className="space-y-3 pb-10">
      <ComplaintFilters />
      <ComplaintInbox role='staff' />
    </div>
  );
}

export default StaffComplaintsHomepage