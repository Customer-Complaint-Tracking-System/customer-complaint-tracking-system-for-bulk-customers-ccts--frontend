import ApprovalHeader from "@/components/manager/approval/approval-header";
import ApprovalTable from "@/components/manager/approval/approval-table";
import React, { Suspense } from "react";

const ApprovalsHomePage = () => {
  return (
    <div>
      <ApprovalHeader />
      <Suspense fallback={"Loading..."}>
        <ApprovalTable />
      </Suspense>
    </div>
  );
};

export default ApprovalsHomePage;
