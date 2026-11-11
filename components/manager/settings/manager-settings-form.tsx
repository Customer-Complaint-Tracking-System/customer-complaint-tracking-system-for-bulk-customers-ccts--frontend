"use client";

import { useState } from "react";
import {
  RotateCcw,
  Check,
  Info,
  CheckCircle2,
  UserRound,
  ClipboardCheck,
  Bell,
  ArrowUpRight,
  ShieldCheck,
  History,
  Clock,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CustomButton from "@/components/shared/custom-button";

// --------------------------------------------------
// TYPES
// --------------------------------------------------

type ComplaintCategory =
  | "Damaged Product"
  | "Late Delivery"
  | "Incorrect Quantity"
  | "Missing Items"
  | "Other";

type WorkingDay = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";

type ManagerSettings = {
  approvalLimits: Record<ComplaintCategory, string>;

  autoApprovalEnabled: boolean;
  autoApprovalAmount: string;
  complaintHistoryCriteria: string;
  requireEvidence: boolean;
  autoApprovalAction: string;

  preferredApprovalAction: string;
  refundMethod: string;
  approvalMessage: string;
  rejectionMessage: string;

  timezone: string;
  startTime: string;
  endTime: string;
  workingDays: WorkingDay[];
};

type ManagerSettingsProps = {
  initialSettings?: ManagerSettings;
  onSave?: (settings: ManagerSettings) => void | Promise<void>;
};

// --------------------------------------------------
// DEFAULT SETTINGS
// --------------------------------------------------

const DEFAULT_SETTINGS: ManagerSettings = {
  approvalLimits: {
    "Damaged Product": "",
    "Late Delivery": "",
    "Incorrect Quantity": "",
    "Missing Items": "",
    Other: "",
  },

  autoApprovalEnabled: false,
  autoApprovalAmount: "",
  complaintHistoryCriteria: "",
  requireEvidence: false,
  autoApprovalAction: "",

  preferredApprovalAction: "",
  refundMethod: "",
  approvalMessage: "",
  rejectionMessage: "",

  timezone: "Africa/Lagos",
  startTime: "09:00",
  endTime: "17:00",
  workingDays: ["Mon", "Tue", "Wed", "Thu", "Fri"],
};

const DAYS: WorkingDay[] = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const CATEGORIES: ComplaintCategory[] = [
  "Damaged Product",
  "Late Delivery",
  "Incorrect Quantity",
  "Missing Items",
  "Other",
];

// --------------------------------------------------
// SETTINGS NAVIGATION
// --------------------------------------------------

const SETTINGS_TABS = [
  { label: "Profile", icon: UserRound, href: "/manager-settings/profile" },
  {
    label: "Approval Settings",
    icon: ClipboardCheck,
    href: "/manager-settings",
  },
  {
    label: "Notifications",
    icon: Bell,
    href: "/manager-settings/notifications",
  },
  {
    label: "Escalation Rules",
    icon: ArrowUpRight,
    href: "/manager-settings/escalation-rules",
  },
  {
    label: "Security",
    icon: ShieldCheck,
    href: "/manager-settings/security",
  },
  {
    label: "Audit",
    icon: History,
    href: "/manager-settings/audit",
  },
];

// --------------------------------------------------
// REUSABLE SECTION
// --------------------------------------------------

function SettingsSection({
  title,
  description,
  children,
  className = "",
}: {
  title: string;
  description: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Card
      className={`rounded-lg border-slate-200 bg-white shadow-none ${className}`}
    >
      <CardContent className="p-4">
        <div className="mb-5">
          <h2 className="text-[11px] font-bold uppercase tracking-wide text-[#172F52]">
            {title}
          </h2>

          <p className="mt-1 text-[10px] text-slate-500">{description}</p>
        </div>

        {children}
      </CardContent>
    </Card>
  );
}

// --------------------------------------------------
// REUSABLE FIELD LABEL
// --------------------------------------------------

function FieldLabel({
  children,
  htmlFor,
}: {
  children: React.ReactNode;
  htmlFor?: string;
}) {
  return (
    <Label htmlFor={htmlFor} className="text-[10px] font-medium text-[#172F52]">
      {children}
    </Label>
  );
}

// --------------------------------------------------
// MAIN COMPONENT
// --------------------------------------------------

export function ManagerSettingsForm({
  initialSettings,
  onSave,
}: ManagerSettingsProps) {
  const [settings, setSettings] = useState<ManagerSettings>(() => ({
    ...DEFAULT_SETTINGS,
    ...initialSettings,
    approvalLimits: {
      ...DEFAULT_SETTINGS.approvalLimits,
      ...initialSettings?.approvalLimits,
    },
    workingDays: initialSettings?.workingDays ?? DEFAULT_SETTINGS.workingDays,
  }));

  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // -----------------------------------------------
  // UPDATE HELPERS
  // -----------------------------------------------

  function updateSetting<K extends keyof ManagerSettings>(
    key: K,
    value: ManagerSettings[K],
  ) {
    setSettings((previous) => ({
      ...previous,
      [key]: value,
    }));

    setSaved(false);
  }

  function updateApprovalLimit(category: ComplaintCategory, value: string) {
    setSettings((previous) => ({
      ...previous,
      approvalLimits: {
        ...previous.approvalLimits,
        [category]: value,
      },
    }));

    setSaved(false);
  }

  function toggleWorkingDay(day: WorkingDay) {
    setSettings((previous) => ({
      ...previous,
      workingDays: previous.workingDays.includes(day)
        ? previous.workingDays.filter((item) => item !== day)
        : [...previous.workingDays, day],
    }));

    setSaved(false);
  }

  function restoreDefaults() {
    setSettings({
      ...DEFAULT_SETTINGS,
      approvalLimits: { ...DEFAULT_SETTINGS.approvalLimits },
      workingDays: [...DEFAULT_SETTINGS.workingDays],
    });

    setSaved(false);
  }

  async function handleSave() {
    if (settings.startTime >= settings.endTime) {
      return;
    }

    try {
      setIsSaving(true);

      await onSave?.(settings);

      setSaved(true);
    } catch (error) {
      console.error("Failed to save manager settings:", error);
    } finally {
      setIsSaving(false);
    }
  }

  // -----------------------------------------------
  // RENDER
  // -----------------------------------------------

  return (
    <div className="min-h-screen bg-[#F7F9FC] p-4 md:p-6">
      <div className="mx-auto max-w-[1600px] space-y-5">
        {/* PAGE HEADER */}
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-[#172F52]">
              Manager Settings
            </h1>

            <p className="mt-1 text-[11px] text-slate-500">
              Manage your approval limits, decision preferences and
              availability.
            </p>
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={restoreDefaults}
            className="h-9 gap-2 border-slate-200 bg-white text-[10px] font-semibold text-[#172F52] hover:bg-slate-50"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Restore Defaults
          </Button>
        </div>

        {/* SETTINGS NAVIGATION */}
        <nav className="flex items-center gap-5 overflow-x-auto border-b border-slate-200">
          {SETTINGS_TABS.map((tab, index) => {
            const Icon = tab.icon;
            const isActive = index === 1;

            return (
              <a
                key={tab.label}
                href={tab.href}
                className={`flex shrink-0 items-center gap-1.5 border-b-2 px-0.5 pb-3 text-[10px] transition-colors ${
                  isActive
                    ? "border-teal-600 font-semibold text-teal-700"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {tab.label}
              </a>
            );
          })}
        </nav>

        {/* TOP SETTINGS GRID */}
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          {/* APPROVAL LIMITS */}
          <SettingsSection
            title="Approval Limits"
            description="Set the maximum amount you can approve for each complaint category."
          >
            <div className="space-y-3">
              {CATEGORIES.map((category) => (
                <div
                  key={category}
                  className="flex items-center justify-between gap-4"
                >
                  <FieldLabel>{category}</FieldLabel>

                  <div className="flex h-8 w-32 shrink-0 items-center overflow-hidden rounded-md border border-slate-200 focus-within:border-teal-500 sm:w-40">
                    <span className="flex h-full items-center border-r border-slate-200 bg-slate-50 px-2 text-[9px] text-slate-500">
                      NGN
                    </span>

                    <Input
                      type="number"
                      min="0"
                      value={settings.approvalLimits[category]}
                      onChange={(event) =>
                        updateApprovalLimit(category, event.target.value)
                      }
                      placeholder="Not configured"
                      aria-label={`${category} approval limit`}
                      className="h-full min-w-0 rounded-none border-0 px-2 text-[9px] shadow-none focus-visible:ring-0"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center gap-2 rounded-md bg-slate-50 p-2">
              <Info className="h-3.5 w-3.5 shrink-0 text-slate-500" />

              <p className="text-[9px] text-slate-500">
                Requests above these limits escalate to senior managers.
              </p>
            </div>
          </SettingsSection>

          {/* AUTO APPROVAL RULES */}
          <SettingsSection
            title="Auto-Approval Rules"
            description="Define the conditions for automatic approval."
          >
            <div className="space-y-4">
              {/* AUTO APPROVAL TOGGLE */}
              <div className="flex items-center justify-between gap-3">
                <FieldLabel>Enable auto-approval</FieldLabel>

                <Switch
                  checked={settings.autoApprovalEnabled}
                  onCheckedChange={(checked) =>
                    updateSetting("autoApprovalEnabled", checked)
                  }
                  aria-label="Enable auto approval"
                />
              </div>

              {/* MAXIMUM AMOUNT */}
              <div className="space-y-1.5">
                <FieldLabel htmlFor="auto-approval-amount">
                  Maximum amount
                </FieldLabel>

                <div className="flex h-8 items-center overflow-hidden rounded-md border border-slate-200 focus-within:border-teal-500">
                  <span className="border-r border-slate-200 bg-slate-50 px-2.5 py-2 text-[9px] text-slate-500">
                    NGN
                  </span>

                  <Input
                    id="auto-approval-amount"
                    type="number"
                    min="0"
                    value={settings.autoApprovalAmount}
                    onChange={(event) =>
                      updateSetting("autoApprovalAmount", event.target.value)
                    }
                    placeholder="Not configured"
                    disabled={!settings.autoApprovalEnabled}
                    className="h-full border-0 px-2 text-[10px] shadow-none focus-visible:ring-0"
                  />
                </div>
              </div>

              {/* COMPLAINT HISTORY */}
              <div className="space-y-1.5">
                <FieldLabel>Customer complaint history</FieldLabel>

                <Select
                  value={settings.complaintHistoryCriteria}
                  onValueChange={(value) => {
                    if (value !== null) {
                      updateSetting("complaintHistoryCriteria", value);
                    }
                  }}
                  disabled={!settings.autoApprovalEnabled}
                >
                  <SelectTrigger className="h-8 text-[10px]">
                    <SelectValue placeholder="Select complaint-history criteria" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="first-time">
                      First-time complainants only
                    </SelectItem>
                    <SelectItem value="good-history">
                      Customers with good complaint history
                    </SelectItem>
                    <SelectItem value="no-recent">
                      No complaints in the last 30 days
                    </SelectItem>
                    <SelectItem value="any">Any customer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* REQUIRE EVIDENCE */}
              <div className="flex items-center justify-between gap-3">
                <FieldLabel>Require evidence</FieldLabel>

                <Switch
                  checked={settings.requireEvidence}
                  onCheckedChange={(checked) =>
                    updateSetting("requireEvidence", checked)
                  }
                  disabled={!settings.autoApprovalEnabled}
                  aria-label="Require evidence"
                />
              </div>

              {/* AUTO APPROVAL ACTION */}
              <div className="space-y-1.5">
                <FieldLabel>Auto-approval action</FieldLabel>

                <Select
                  value={settings.autoApprovalAction}
                  onValueChange={(value) => {
                    if (value !== null) {
                      updateSetting("autoApprovalAction", value);
                    }
                  }}
                  disabled={!settings.autoApprovalEnabled}
                >
                  <SelectTrigger className="h-8 text-[10px]">
                    <SelectValue placeholder="Select an action" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="approve">
                      Automatically approve
                    </SelectItem>
                    <SelectItem value="notify">
                      Notify manager for review
                    </SelectItem>
                    <SelectItem value="escalate">
                      Escalate to senior manager
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2 rounded-md bg-emerald-50 p-2.5">
                <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-600" />

                <p className="text-[9px] text-emerald-700">
                  Auto-approved requests are logged in Activity History.
                </p>
              </div>
            </div>
          </SettingsSection>
        </div>

        {/* DEFAULT DECISION ACTIONS */}
        <SettingsSection
          title="Default Decision Actions"
          description="Choose your preferred actions and message templates for approval decisions."
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* APPROVAL ACTION */}
            <div className="space-y-2">
              <FieldLabel>Preferred approval action</FieldLabel>

              <Select
                value={settings.preferredApprovalAction}
                onValueChange={(value) => {
                  if (value !== null) {
                    updateSetting("preferredApprovalAction", value);
                  }
                }}
              >
                <SelectTrigger className="h-8 text-[10px]">
                  <SelectValue placeholder="Select an approval action" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="refund">Process a refund</SelectItem>
                  <SelectItem value="compensation">
                    Issue compensation
                  </SelectItem>
                  <SelectItem value="discount">Apply a discount</SelectItem>
                  <SelectItem value="replacement">
                    Arrange a replacement
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* REFUND METHOD */}
            <div className="space-y-2">
              <FieldLabel>Refund method</FieldLabel>

              <Select
                value={settings.refundMethod}
                onValueChange={(value) => {
                  if (value !== null) {
                    updateSetting("refundMethod", value);
                  }
                }}
              >
                <SelectTrigger className="h-8 text-[10px]">
                  <SelectValue placeholder="Select a refund method" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="original">
                    Original payment method
                  </SelectItem>
                  <SelectItem value="bank">Bank transfer</SelectItem>
                  <SelectItem value="wallet">Customer wallet</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* APPROVAL MESSAGE */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <FieldLabel>Approval message template</FieldLabel>
              </div>

              <Textarea
                value={settings.approvalMessage}
                onChange={(event) =>
                  updateSetting("approvalMessage", event.target.value)
                }
                maxLength={500}
                placeholder="Write the message customers receive when a request is approved..."
                className="min-h-24 resize-y text-[10px] placeholder:text-slate-400"
              />

              <p className="text-right text-[9px] text-slate-400">
                {settings.approvalMessage.length} characters
              </p>
            </div>

            {/* REJECTION MESSAGE */}
            <div className="space-y-2">
              <FieldLabel>Rejection message template</FieldLabel>

              <Textarea
                value={settings.rejectionMessage}
                onChange={(event) =>
                  updateSetting("rejectionMessage", event.target.value)
                }
                maxLength={500}
                placeholder="Write the message customers receive when a request is rejected..."
                className="min-h-24 resize-y text-[10px] placeholder:text-slate-400"
              />

              <p className="text-right text-[9px] text-slate-400">
                {settings.rejectionMessage.length} characters
              </p>
            </div>
          </div>
        </SettingsSection>

        {/* WORKING HOURS & AVAILABILITY */}
        <SettingsSection
          title="Working Hours & Availability"
          description="Set the timezone, hours and days when you are available to review requests."
        >
          <div className="space-y-4">
            {/* TIMEZONE AND HOURS */}
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              {/* TIMEZONE */}
              <div className="space-y-2">
                <FieldLabel>Timezone</FieldLabel>

                <Select
                  value={settings.timezone}
                  onValueChange={(value) => {
                    if (value !== null) {
                      updateSetting("timezone", value);
                    }
                  }}
                >
                  <SelectTrigger className="h-8 text-[10px]">
                    <SelectValue placeholder="Select a timezone" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="Africa/Lagos">
                      Africa/Lagos (WAT)
                    </SelectItem>
                    <SelectItem value="Africa/Accra">
                      Africa/Accra (GMT)
                    </SelectItem>
                    <SelectItem value="Europe/London">Europe/London</SelectItem>
                    <SelectItem value="America/New_York">
                      America/New_York
                    </SelectItem>
                    <SelectItem value="Asia/Dubai">Asia/Dubai</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* START TIME */}
              <div className="space-y-2">
                <FieldLabel htmlFor="start-time">Start time</FieldLabel>

                <div className="relative">
                  <Input
                    id="start-time"
                    type="time"
                    value={settings.startTime}
                    onChange={(event) =>
                      updateSetting("startTime", event.target.value)
                    }
                    className="h-8 text-[10px]"
                  />
                  <Clock className="pointer-events-none absolute right-3 top-2 h-3.5 w-3.5 text-slate-400" />
                </div>
              </div>

              {/* END TIME */}
              <div className="space-y-2">
                <FieldLabel htmlFor="end-time">End time</FieldLabel>

                <div className="relative">
                  <Input
                    id="end-time"
                    type="time"
                    value={settings.endTime}
                    onChange={(event) =>
                      updateSetting("endTime", event.target.value)
                    }
                    className="h-8 text-[10px]"
                  />
                  <Clock className="pointer-events-none absolute right-3 top-2 h-3.5 w-3.5 text-slate-400" />
                </div>
              </div>
            </div>

            {/* WORKING DAYS */}
            <div className="space-y-2">
              <FieldLabel>Working days</FieldLabel>

              <div className="flex flex-wrap items-center gap-1.5">
                {DAYS.map((day) => {
                  const isSelected = settings.workingDays.includes(day);

                  return (
                    <button
                      key={day}
                      type="button"
                      onClick={() => toggleWorkingDay(day)}
                      aria-pressed={isSelected}
                      className={`flex h-8 min-w-9 items-center justify-center rounded-md border px-2 text-[10px] font-medium transition-colors ${
                        isSelected
                          ? "border-teal-600 bg-teal-600 text-white hover:bg-teal-700"
                          : "border-slate-200 bg-white text-slate-500 hover:border-teal-300 hover:text-teal-700"
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}

                <span className="ml-2 text-[9px] text-teal-600">
                  {settings.workingDays.length} days selected
                </span>
              </div>
            </div>
          </div>
        </SettingsSection>

        {/* FOOTER ACTIONS */}
        <div className="flex flex-col-reverse items-center justify-end gap-2 sm:flex-row">
          {saved && (
            <span className="mr-auto flex items-center gap-1.5 text-[10px] text-emerald-600">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Settings saved successfully
            </span>
          )}

        
          <CustomButton
            onClick={restoreDefaults}
            disabled={isSaving}
            title="Cancel / Reset"
            variant="outline"
          />
          <CustomButton
            onClick={handleSave}
            disabled={isSaving}
            icon={<Check className="h-3.5 w-3.5" />}
            title={isSaving ? "Saving..." : "Save Changes"}
          />
        </div>
      </div>
    </div>
  );
}
