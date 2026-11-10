import CustomButton from "@/components/shared/custom-button";
import { Button } from "@/components/ui/button";
import { Check, X, AlertTriangle, Clock, Loader2, Dot } from "lucide-react";

interface AcceptRequestModalProps {
  id: string;
  approvalId: string;
  amount: string;
  customerName: string;

  orderId?: string;
  requestType?: string;
  requestedBy?: string;
  requestedAt?: string;
  reviewerName?: string;

  isSubmitting?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const AcceptRequestModal = ({
  id,
  approvalId,
  amount,
  customerName,
  orderId,
  requestType = "Refund",
  requestedBy,
  requestedAt,
  reviewerName = "Current user",
  isSubmitting = false,
  onCancel,
  onConfirm,
}: AcceptRequestModalProps) => {
  return (
    <div className="space-y-5 w-full p-6">
      {/* HEADER */}
      <div className="flex flex-col">
        <h2 className="text-[22px] font-bold text-[#142B4A]">
          Approve this {requestType.toLowerCase()} request?
        </h2>

        <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-500">
          You are authorising a{" "}
          <span className="font-semibold text-slate-800">{amount}</span>{" "}
          {requestType.toLowerCase()} to the original payment method for the
          request below.
        </p>
      </div>

      {/* REQUEST DETAILS */}
      <div className="overflow-hidden py-2 rounded-lg border border-slate-200 bg-[#F8FAFC]">
        {/* REQUEST ID */}
        <div className="flex items-center justify-between border-slate-100 bg-slate-50/70 px-4 py-3">
          <div className="flex items-center gap-1">
            <p className="text-sm font-semibold text-slate-800">{approvalId}</p>
            <p className="mt-0.5 text-xs text-slate-500">{requestType}</p>
          </div>

          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-medium text-amber-700">
            <Clock className="h-3 w-3" />
            Pending
          </span>
        </div>

        {/* COMPLAINT AND ORDER */}
        <div className="flex items-center justify-between gap-1 border-slate-100 px-4">
          <div className="flex items-center gap-0.5 text-[#0B776E]">
            <p className="text-xs">{id}</p>
            <Dot />
            {orderId && <p className="text-xs">{orderId}</p>}
          </div>

          <p className="text-base font-bold text-slate-900">{amount}</p>
        </div>

        {/* CUSTOMER */}
        <div className="space-y-1 px-4 text-[#64748B]">
          <div className="flex items-center gap-1">
            <p className="text-xs">Customer</p>
            <p className="text-xs">{customerName}</p>
          </div>

          {requestedBy && (
            <div className="flex items-center gap-1">
              <p className="text-xs ">Requested by</p>
              <p className="text-xs">{requestedBy}</p>
              <p className="text-xs">{requestedAt}</p>
            </div>
          )}
        </div>
      </div>

      {/* WARNING */}
      <div className="flex gap-3 rounded-lg border border-amber-200 items-center bg-amber-50/70 p-3">
        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />

        <p className="text-xs leading-relaxed text-amber-800">
          On confirmation, this request moves to{" "}
          <span className="font-semibold">Approved</span> and relevant staff are
          notified. Your decision will be recorded under{" "}
          <span className="font-semibold">{reviewerName}</span> with a
          timestamp.
        </p>
      </div>

      {/* FOOTNOTE */}
      <p className="text-[11px] text-[#64748B]">
        No decision has been recorded. {approvalId} remains pending until you
        confirm.
      </p>

      {/* ACTIONS */}
      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <CustomButton title="Cancel" variant="outline" onClick={onCancel} />
        <CustomButton title={`Approve ${amount} refund`} variant="primary" />
      </div>
    </div>
  );
};

export default AcceptRequestModal;
