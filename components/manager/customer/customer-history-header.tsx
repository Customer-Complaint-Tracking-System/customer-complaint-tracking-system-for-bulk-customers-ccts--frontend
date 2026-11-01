import { UsersRound } from "lucide-react";

const CustomerHistoryHeader = () => {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <h1 className="text-lg font-semibold tracking-tight text-slate-800">
          Customer History
        </h1>
      </div>

      <p className="text-xs leading-5 text-slate-500">
        View customer records, monitor complaint activity and track customer
        service history across your organisation.
      </p>
    </div>
  );
};

export default CustomerHistoryHeader;
