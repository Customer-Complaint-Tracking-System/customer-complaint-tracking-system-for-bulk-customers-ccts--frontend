"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ExternalLink,
  FileText,
  ShieldCheck,
  Check,
  X,
  Clock,
  AlertCircle,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";

type Decision = "Approved" | "Rejected";

export default function ApprovalDetails() {
  const [decision, setDecision] = useState<Decision | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [pendingDecision, setPendingDecision] = useState<Decision | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [error, setError] = useState("");

  const [decisionHistory, setDecisionHistory] = useState<{
    decision: Decision;
    date: string;
    reason?: string;
  } | null>(null);

  const [status, setStatus] = useState("Pending authorisation");

  const request = {
    id: "APR-0136",
    complaintId: "CMP-1086",
    customer: "Ngozi Johnson",
    email: "ngozi.johnson@example.com",
    phone: "+234 803 555 0142",
    orderId: "ORD-20874",
    orderDate: "24 Oct 2026",
    orderTotal: "₦45,000 / ₦45,000",
    product: "1 × countertop blender",
    paymentMethod: "Paid by card",
    deliveryDate: "27 Oct 2026",
    refundAmount: "₦45,000",
    submitted: "03 Nov 2026, 09:15 WAT",
    officer: "Chinedu Eze",
    officerRole: "Senior officer",
  };

  const previousActions = [
    {
      title: "Return received and damage verified",
      actor: "Warehouse team",
      date: "02 Nov 2026, 15:40 WAT",
      description:
        "Inspection report attached; item marked unsuitable for resale.",
    },
    {
      title: "Complaint logged and assigned",
      actor: "Fatima Bello → Chinedu Eze",
      date: "28 Oct 2026, 10:20 WAT",
      description: "Customer photos collected and return arranged.",
    },
  ];

  const evidence = [
    {
      name: "Damage photos.jpg",
      type: "JPG",
      size: "2.4 MB",
      href: "#",
    },
    {
      name: "Return inspection.pdf",
      type: "PDF",
      size: "184 KB",
      href: "#",
    },
  ];

  const openDecision = (value: Decision) => {
    setPendingDecision(value);
    setRejectionReason("");
    setError("");
    setShowConfirmation(true);
  };

  const confirmDecision = () => {
    if (!pendingDecision) return;

    if (pendingDecision === "Rejected" && !rejectionReason.trim()) {
      setError("Please provide a reason for rejecting this request.");
      return;
    }

    const now = new Date().toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    setDecision(pendingDecision);
    setStatus(pendingDecision === "Approved" ? "Approved" : "Rejected");

    setDecisionHistory({
      decision: pendingDecision,
      date: `${now}`,
      reason:
        pendingDecision === "Rejected" ? rejectionReason.trim() : undefined,
    });

    setShowConfirmation(false);
    setPendingDecision(null);
    setRejectionReason("");
    setError("");
  };

  return (
    <main className="min-h-screen bg-[#f7f9fc] px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1440px]">
        {/* HEADER */}
        <div className="mb-4">
          <Link
            href="/dashboard/approvals"
            className="mb-3 inline-flex items-center gap-1 text-[10px] font-semibold text-teal-700 hover:underline"
          >
            <ArrowLeft size={12} />
            Back to approvals
          </Link>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-xl font-bold tracking-tight text-[#172b49]">
                Request {request.id}
              </h1>

              <p className="mt-1 text-[11px] text-slate-500">
                Refund request · {request.complaintId} · Submitted{" "}
                {request.submitted}
              </p>
            </div>

            <Badge
              className={`rounded-full border-0 px-2 py-1 text-[10px] ${
                decision === "Approved"
                  ? "bg-teal-50 text-teal-700"
                  : decision === "Rejected"
                    ? "bg-red-50 text-red-600"
                    : "bg-slate-200 text-slate-700"
              }`}
            >
              {status}
            </Badge>
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1.8fr)_minmax(270px,0.85fr)]">
          {/* LEFT COLUMN */}
          <div className="space-y-4">
            {/* CUSTOMER INFORMATION */}
            <Card className="rounded-lg border-slate-200 shadow-none">
              <CardContent className="p-3.5">
                <h2 className="mb-4 text-sm font-semibold text-[#172b49]">
                  Customer & order information
                </h2>

                <div className="grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-3">
                  <div>
                    <p className="text-[10px] text-slate-400">Customer</p>
                    <p className="mt-1 text-[11px] font-medium text-slate-800">
                      {request.customer}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] text-slate-400">Email</p>
                    <p className="mt-1 break-all text-[11px] font-medium text-slate-800">
                      {request.email}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] text-slate-400">Phone</p>
                    <p className="mt-1 text-[11px] font-medium text-slate-800">
                      {request.phone}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] text-slate-400">Order ID</p>
                    <p className="mt-1 text-[11px] font-medium text-slate-800">
                      {request.orderId}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] text-slate-400">Order date</p>
                    <p className="mt-1 text-[11px] font-medium text-slate-800">
                      {request.orderDate}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] text-slate-400">
                      Order total / paid
                    </p>
                    <p className="mt-1 text-[11px] font-medium text-slate-800">
                      {request.orderTotal}
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-[10px] text-slate-400">
                  Item: {request.product} · {request.paymentMethod} · Delivered{" "}
                  {request.deliveryDate}
                </p>
              </CardContent>
            </Card>

            {/* COMPLAINT SUMMARY */}
            <Card className="rounded-lg border-slate-200 shadow-none">
              <CardContent className="p-3.5">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <h2 className="text-sm font-semibold text-[#172b49]">
                    Complaint summary
                  </h2>

                  <Badge className="rounded-full border-0 bg-slate-100 text-[9px] text-slate-700">
                    Under review
                  </Badge>
                </div>

                <p className="mb-4 text-[10px] font-semibold text-teal-700">
                  {request.complaintId} · Damaged item on delivery
                </p>

                <p className="text-[11px] leading-5 text-slate-700">
                  Customer reported a cracked blender jar on delivery. Photos
                  show transit damage. The returned item was received and
                  inspected on 02 Nov 2026; a replacement is unavailable.
                </p>
              </CardContent>
            </Card>

            {/* STAFF JUSTIFICATION */}
            <Card className="rounded-lg border-slate-200 shadow-none">
              <CardContent className="p-3.5">
                <h2 className="mb-3 text-sm font-semibold text-[#172b49]">
                  Staff justification
                </h2>

                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <p className="text-[11px] font-semibold text-slate-800">
                    {request.officer} · {request.officerRole}
                  </p>

                  <p className="text-[10px] text-slate-400">
                    03 Nov 2026, 09:15 WAT
                  </p>
                </div>

                <p className="text-[11px] leading-5 text-slate-700">
                  I recommend a full refund of ₦45,000 to the original payment
                  method. Warehouse inspection confirms the item is damaged and
                  the return is complete. No refund or credit has previously
                  been issued for this order.
                </p>
              </CardContent>
            </Card>

            {/* SUPPORTING EVIDENCE */}
            <Card className="rounded-lg border-slate-200 shadow-none">
              <CardContent className="p-3.5">
                <h2 className="mb-3 text-sm font-semibold text-[#172b49]">
                  Supporting evidence
                </h2>

                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {evidence.map((file) => (
                    <a
                      key={file.name}
                      href={file.href}
                      className="flex items-center justify-between gap-2 rounded-md border border-slate-200 p-2.5 transition-colors hover:border-teal-300 hover:bg-teal-50/30"
                    >
                      <div className="flex min-w-0 items-center gap-2">
                        <FileText
                          size={15}
                          className="shrink-0 text-teal-700"
                        />

                        <div className="min-w-0">
                          <p className="truncate text-[10px] font-medium text-teal-700">
                            {file.name}
                          </p>
                          <p className="mt-0.5 text-[9px] text-slate-400">
                            {file.type} · {file.size}
                          </p>
                        </div>
                      </div>

                      <ExternalLink
                        size={12}
                        className="shrink-0 text-slate-500"
                      />
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* PREVIOUS ACTIONS */}
            <Card className="rounded-lg border-slate-200 shadow-none">
              <CardContent className="p-3.5">
                <h2 className="mb-4 text-sm font-semibold text-[#172b49]">
                  Previous actions
                </h2>

                <div className="space-y-4">
                  {previousActions.map((action, index) => (
                    <div key={index} className="flex gap-2.5">
                      <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-teal-50">
                        <Check size={11} className="text-teal-700" />
                      </div>

                      <div>
                        <p className="text-[10px] font-semibold text-slate-800">
                          {action.title}
                        </p>

                        <p className="mt-0.5 text-[9px] text-slate-400">
                          {action.actor} · {action.date}
                        </p>

                        <p className="mt-1 text-[10px] leading-5 text-slate-500">
                          {action.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-4">
            {/* REQUESTED AUTHORISATION */}
            <Card className="rounded-lg border-slate-200 shadow-none">
              <CardContent className="p-3.5">
                <h2 className="mb-4 text-sm font-semibold text-[#172b49]">
                  Requested authorisation
                </h2>

                <p className="text-[10px] text-slate-400">Refund amount</p>

                <h3 className="mt-1 text-2xl font-bold tracking-tight text-[#172b49]">
                  {request.refundAmount}
                </h3>

                <p className="mt-1 text-[10px] text-slate-400">
                  Full order value · Original payment method
                </p>

                <div className="my-4 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] text-slate-400">Request ID</p>
                    <p className="mt-1 text-[11px] font-medium text-slate-800">
                      {request.id}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] text-slate-400">Complaint ID</p>
                    <p className="mt-1 text-[11px] font-medium text-slate-800">
                      {request.complaintId}
                    </p>
                  </div>
                </div>

                <p className="mb-3 text-[10px] leading-5 text-slate-500">
                  Your decision and timestamp will be recorded. The requesting
                  staff member will be notified.
                </p>

                {decision ? (
                  <div
                    className={`rounded-md p-3 text-[11px] font-medium ${
                      decision === "Approved"
                        ? "bg-teal-50 text-teal-700"
                        : "bg-red-50 text-red-600"
                    }`}
                  >
                    {decision === "Approved"
                      ? "This request has been approved."
                      : "This request has been rejected."}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      className="h-8"
                      onClick={() => openDecision("Approved")}
                    >
                      Approve request
                    </Button>

                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 border-slate-200"
                      onClick={() => openDecision("Rejected")}
                    >
                      Reject request
                    </Button>
                  </div>
                )}

                <p className="mt-3 text-[9px] leading-4 text-slate-400">
                  Both actions require confirmation. Rejection requires a reason
                  visible to staff.
                </p>
              </CardContent>
            </Card>

            {/* DECISION HISTORY */}
            <Card className="rounded-lg border-slate-200 shadow-none">
              <CardContent className="p-3.5">
                <h2 className="mb-4 text-sm font-semibold text-[#172b49]">
                  Decision history
                </h2>

                {decisionHistory ? (
                  <div>
                    <Badge
                      className={`mb-3 border-0 ${
                        decisionHistory.decision === "Approved"
                          ? "bg-teal-50 text-teal-700"
                          : "bg-red-50 text-red-600"
                      }`}
                    >
                      {decisionHistory.decision}
                    </Badge>

                    <div className="flex gap-2">
                      <div
                        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${
                          decisionHistory.decision === "Approved"
                            ? "bg-teal-50"
                            : "bg-red-50"
                        }`}
                      >
                        {decisionHistory.decision === "Approved" ? (
                          <Check size={11} className="text-teal-700" />
                        ) : (
                          <X size={11} className="text-red-600" />
                        )}
                      </div>

                      <div>
                        <p className="text-[10px] font-semibold text-slate-800">
                          Request {decisionHistory.decision.toLowerCase()}
                        </p>

                        <p className="mt-1 text-[9px] text-slate-400">
                          Manager · {decisionHistory.date}
                        </p>

                        {decisionHistory.reason && (
                          <p className="mt-2 text-[10px] leading-5 text-slate-500">
                            Reason: {decisionHistory.reason}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <Badge className="mb-3 border-0 bg-slate-100 text-[9px] text-slate-700">
                      Awaiting manager decision
                    </Badge>

                    <div className="flex gap-2">
                      <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-teal-50">
                        <Check size={11} className="text-teal-700" />
                      </div>

                      <div>
                        <p className="text-[10px] font-semibold text-slate-800">
                          Request submitted
                        </p>

                        <p className="mt-1 text-[9px] text-slate-400">
                          Chinedu Eze · {request.submitted}
                        </p>

                        <p className="mt-1 text-[10px] leading-5 text-slate-500">
                          {request.id} sent to Ada Okafor for authorisation.
                        </p>
                      </div>
                    </div>

                    <p className="mt-3 text-[10px] leading-5 text-slate-400">
                      No approval or rejection has been recorded. This request
                      remains in the pending queue.
                    </p>
                  </>
                )}
              </CardContent>
            </Card>

            {/* REMINDER */}
            <div className="flex gap-2 px-3 py-2">
              <ShieldCheck
                size={15}
                className="mt-0.5 shrink-0 text-slate-500"
              />

              <p className="text-[10px] leading-5 text-slate-500">
                Review the order, evidence and previous actions before making a
                decision.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CONFIRMATION MODAL */}
      {showConfirmation && pendingDecision && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="decision-title"
            className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-5 shadow-xl"
          >
            <div className="mb-4 flex items-start gap-3">
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                  pendingDecision === "Approved"
                    ? "bg-teal-50 text-teal-700"
                    : "bg-red-50 text-red-600"
                }`}
              >
                {pendingDecision === "Approved" ? (
                  <Check size={18} />
                ) : (
                  <AlertCircle size={18} />
                )}
              </div>

              <div>
                <h2
                  id="decision-title"
                  className="text-sm font-semibold text-[#172b49]"
                >
                  {pendingDecision === "Approved"
                    ? "Approve refund request?"
                    : "Reject refund request?"}
                </h2>

                <p className="mt-1 text-[11px] leading-5 text-slate-500">
                  {pendingDecision === "Approved"
                    ? `You are approving a refund of ${request.refundAmount} for ${request.customer}.`
                    : "Please provide a reason for rejecting this refund request."}
                </p>
              </div>
            </div>

            {pendingDecision === "Rejected" && (
              <div className="mb-4">
                <label
                  htmlFor="rejection-reason"
                  className="mb-2 block text-[11px] font-medium text-slate-700"
                >
                  Rejection reason <span className="text-red-500">*</span>
                </label>

                <Textarea
                  id="rejection-reason"
                  value={rejectionReason}
                  onChange={(e) => {
                    setRejectionReason(e.target.value);
                    setError("");
                  }}
                  placeholder="Explain why this request is being rejected..."
                  className="min-h-24"
                />

                {error && (
                  <p className="mt-1 text-[10px] text-red-600">{error}</p>
                )}
              </div>
            )}

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setShowConfirmation(false);
                  setError("");
                }}
              >
                Cancel
              </Button>

              <Button
                size="sm"
                className={
                  pendingDecision === "Rejected"
                    ? "bg-red-600 hover:bg-red-700"
                    : ""
                }
                onClick={confirmDecision}
              >
                Confirm{" "}
                {pendingDecision === "Approved" ? "approval" : "rejection"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
