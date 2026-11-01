import CustomerHistoryHeader from '@/components/manager/customer/customer-history-header';
import CustomerHistoryTable from '@/components/manager/customer/customer-history-table';

const CustomerHistoryHomepage = () => {
  return (
    <div className="space-y-6">
      <CustomerHistoryHeader />
      <CustomerHistoryTable />
    </div>
  );
}

export default CustomerHistoryHomepage