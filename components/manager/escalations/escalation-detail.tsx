"use client";

import { useState } from "react";
import { ArrowLeft, ExternalLink, ChevronDown } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function EscalationDetails() {
  const [assignee, setAssignee] = useState("Chinedu Eze");
  const [status, setStatus] = useState("In Progress");
  const [note, setNote] = useState("");

  const [savedAssignee, setSavedAssignee] = useState("Fatima Bello");
  const [savedStatus, setSavedStatus] = useState("New");

  const [notes, setNotes] = useState([
    {
      author: "Fatima Bello",
      date: "30 Oct, 15:45 WAT",
      message:
        "Billing confirmed the duplicate debit. Awaiting the reversal reference before updating the customer.",
    },
  ]);

  const [message, setMessage] = useState("");

  const history = [
    {
      date: "31 Oct 2026 · 09:15 WAT",
      title: "Escalated by customer",
      description:
        "Ngozi Johnson requested manager review after the refund SLA expired.",
    },
    {
      date: "30 Oct 2026 · 15:40 WAT",
      title: "Follow-up sent · Fatima Bello",
      description:
        "Contacted Billing Operations for a reversal reference. Response pending.",
    },
    {
      date: "28 Oct 2026 · 11:00 WAT",
      title: "Refund requested · Fatima Bello",
      description:
        "Duplicate debit confirmed. Refund request submitted to Billing Operations.",
    },
    {
      date: "26 Oct 2026 · 10:20 WAT",
      title: "Complaint received and assigned",
      description:
        "Customer reported a duplicate debit. Assigned to Fatima Bello for investigation.",
    },
  ];

  const saveChanges = () => {
    setSavedAssignee(assignee);
    setSavedStatus(status);
    setMessage("Changes saved successfully.");
  };

  const cancelChanges = () => {
    setAssignee(savedAssignee);
    setStatus(savedStatus);
    setMessage("");
  };

  const addNote = () => {
    if (!note.trim()) return;

    setNotes([
      {
        author: "You",
        date: "Just now",
        message: note.trim(),
      },
      ...notes,
    ]);

    setNote("");
    setMessage("Internal note added.");
  };

  return (
    <main className="min-h-screen bg-[#f7f9fc] px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1440px]">
        {/* HEADER */}
        <div className="mb-4">
          <button className="mb-3 flex items-center gap-1 text-xs font-medium text-teal-700">
            <ArrowLeft size={13} />
            Back to Escalations
          </button>

          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="text-xl font-bold tracking-tight text-[#172b49]">
                Escalation ESC-0248
              </h1>
              <p className="mt-1 text-xs text-slate-500">
                Review the complaint, coordinate responsibility and record the
                next action.
              </p>
            </div>

            <div className="flex gap-2">
              <Badge className="border-0 bg-red-100 text-red-600">● High</Badge>
              <Badge className="border-0 bg-slate-200 text-slate-600">
                ● {savedStatus}
              </Badge>
            </div>
          </div>
        </div>

        {/* ESCALATION SUMMARY */}
        <Card className="mb-4 rounded-lg border-slate-200 shadow-none">
          <CardContent className="p-3.5">
            <div className="flex flex-wrap justify-between gap-2">
              <h2 className="font-semibold text-[#172b49]">
                Refund delayed beyond SLA
              </h2>
              <span className="text-[10px] text-slate-400">
                Escalated on 31 Oct 2026 · 09:15 WAT
              </span>
            </div>

            <p className="mt-2 text-xs leading-5 text-slate-800">
              "I was debited twice for the same payment. The promised refund has
              not arrived, and I need a manager to review this urgently."
            </p>

            <p className="mt-2 text-[10px] text-slate-400">
              Escalated by Customer · Ngozi Johnson · Customer portal
            </p>
          </CardContent>
        </Card>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.7fr_1fr]">
          {/* LEFT COLUMN */}
          <div className="space-y-4">
            {/* RELATED COMPLAINT */}
            <Card className="rounded-lg border-slate-200 shadow-none">
              <CardContent className="p-3.5">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-sm font-semibold text-[#172b49]">
                    Related complaint
                  </h2>

                  <a
                    href="#"
                    className="flex items-center gap-1 text-[10px] font-semibold text-teal-700"
                  >
                    CMP-1086
                    <ExternalLink size={12} />
                  </a>
                </div>

                <h3 className="text-xs font-semibold text-slate-800">
                  Duplicate debit on card payment
                </h3>

                <p className="mt-1 text-[11px] leading-5 text-slate-500">
                  Two debits of ₦45,000 were posted for one payment on 25
                  October. Billing confirmed a duplicate transaction; the refund
                  is still outstanding.
                </p>

                <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
                  <div>
                    <p className="text-[10px] text-slate-400">Category</p>
                    <p className="mt-1 text-xs">Billing & payments</p>
                  </div>

                  <div>
                    <p className="text-[10px] text-slate-400">
                      Complaint status
                    </p>
                    <p className="mt-1 text-xs">In Progress</p>
                  </div>

                  <div>
                    <p className="text-[10px] text-slate-400">Submitted</p>
                    <p className="mt-1 text-xs">26 Oct 2026 · 10:20</p>
                  </div>
                </div>

                <div className="my-4 border-t border-slate-100" />

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                  <div>
                    <p className="text-[10px] text-slate-400">Customer</p>
                    <p className="mt-1 text-xs">Ngozi Johnson</p>
                  </div>

                  <div>
                    <p className="text-[10px] text-slate-400">Email</p>
                    <p className="mt-1 break-all text-xs">
                      ngozi.j@example.com
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] text-slate-400">Phone</p>
                    <p className="mt-1 text-xs">+234 803 555 0142</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* COMPLAINT HISTORY */}
            <Card className="rounded-lg border-slate-200 shadow-none">
              <CardContent className="p-3.5">
                <div className="mb-5 flex items-center justify-between">
                  <h2 className="text-sm font-semibold text-[#172b49]">
                    Complaint history & previous actions
                  </h2>

                  <span className="text-[10px] text-slate-400">
                    Newest first
                  </span>
                </div>

                <div className="space-y-5">
                  {history.map((item, index) => (
                    <div key={index} className="flex gap-3">
                      <div className="relative flex flex-col items-center">
                        <span className="mt-1 h-2 w-2 rounded-full bg-teal-600" />

                        {index !== history.length - 1 && (
                          <span className="absolute top-3 h-[calc(100%+12px)] w-px bg-slate-200" />
                        )}
                      </div>

                      <div className="pb-1">
                        <p className="text-[10px] text-slate-400">
                          {item.date}
                        </p>

                        <p className="mt-1 text-[11px] font-semibold text-slate-800">
                          {item.title}
                        </p>

                        <p className="mt-1 text-[11px] leading-5 text-slate-500">
                          {item.description}
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
            {/* MANAGE ESCALATION */}
            <Card className="rounded-lg border-slate-200 shadow-none">
              <CardContent className="p-3.5">
                <h2 className="mb-4 text-sm font-semibold text-[#172b49]">
                  Manage escalation
                </h2>

                <p className="mb-2 text-[10px] text-slate-400">
                  Currently assigned staff
                </p>

                <div className="mb-4 flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-teal-50 text-[10px] font-bold text-teal-700">
                      FB
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <p className="text-xs font-semibold">Fatima Bello</p>
                    <p className="text-[10px] text-slate-400">
                      Support officer
                    </p>
                  </div>
                </div>

                <label className="mb-2 block text-[10px] text-slate-500">
                  Assign / reassign responsibility
                </label>

                <Select
                  value={assignee}
                  onValueChange={(value) => {
                    if (value !== null) {
                      setAssignee(value);
                    }
                  }}
                >
                  <SelectTrigger className="h-9 text-xs">
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="Chinedu Eze">
                      Chinedu Eze · Senior officer
                    </SelectItem>
                    <SelectItem value="Fatima Bello">
                      Fatima Bello · Support officer
                    </SelectItem>
                    <SelectItem value="Amina Yusuf">
                      Amina Yusuf · Team lead
                    </SelectItem>
                    <SelectItem value="Daniel Okafor">
                      Daniel Okafor · Support officer
                    </SelectItem>
                  </SelectContent>
                </Select>

                <label className="mb-2 mt-4 block text-[10px] text-slate-500">
                  Update escalation status
                </label>

                <Select
                  value={status}
                  onValueChange={(value) => {
                    if (value !== null) {
                      setStatus(value);
                    }
                  }}
                >
                  <SelectTrigger className="h-9 text-xs">
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="New">New</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Resolved">Resolved</SelectItem>
                    <SelectItem value="Closed">Closed</SelectItem>
                  </SelectContent>
                </Select>

                <p className="mt-3 text-[10px] leading-5 text-slate-400">
                  Pending changes: reassign to {assignee} and move from{" "}
                  {savedStatus} to {status}.
                </p>

                <div className="mt-2 flex gap-2">
                  <Button
                    size="sm"
                    onClick={saveChanges}
                    disabled={
                      assignee === savedAssignee && status === savedStatus
                    }
                  >
                    Save changes
                  </Button>

                  <Button size="sm" variant="outline" onClick={cancelChanges}>
                    Cancel
                  </Button>
                </div>

                {message && (
                  <p className="mt-2 text-[10px] text-teal-700">{message}</p>
                )}
              </CardContent>
            </Card>

            {/* INTERNAL NOTES */}
            <Card className="rounded-lg border-slate-200 shadow-none">
              <CardContent className="p-3.5">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-sm font-semibold text-[#172b49]">
                    Internal notes
                  </h2>

                  <span className="text-[10px] text-slate-400">Staff only</span>
                </div>

                <div className="max-h-48 space-y-2 overflow-y-auto">
                  {notes.map((item, index) => (
                    <div key={index} className="rounded-md bg-slate-50 p-3">
                      <p className="text-[10px] font-semibold text-slate-700">
                        {item.author} · {item.date}
                      </p>

                      <p className="mt-2 text-[10px] leading-5 text-slate-500">
                        {item.message}
                      </p>
                    </div>
                  ))}
                </div>

                <label className="mb-2 mt-4 block text-[10px] text-slate-500">
                  Add internal note
                </label>

                <Textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Write an internal update..."
                  className="min-h-[90px] text-xs"
                />

                <div className="mt-2 flex items-center justify-between gap-2">
                  <span className="text-[10px] text-slate-400">
                    Not visible to the customer
                  </span>

                  <Button size="sm" onClick={addNote} disabled={!note.trim()}>
                    Add note
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
