"use client";

import { useState } from "react";
import {
  Bell,
  Check,
  Clock3,
  FileCheck2,
  MessageSquareText,
  Settings2,
  ShieldCheck,
  SlidersHorizontal,
  Wallet,
  Info,
  Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import SettingsHeader from "@/components/manager/settings/settings-header";

// --------------------------------------------------
// Types
// --------------------------------------------------

type NotificationPreferences = {
  newApprovalRequests: boolean;
  highPriorityComplaints: boolean;
  escalations: boolean;
  overdueComplaints: boolean;
};

type TimingConfiguration = {
  firstResponseTarget: string;
  reminderTiming: string;
  escalationTiming: string;
};

type ApprovalMessages = {
  approvalMessage: string;
  rejectionMessage: string;
};

type ManagerSettings = {
  maximumApprovalAmount: string;
  autoApprovalEnabled: boolean;
  notifications: NotificationPreferences;
  timing: TimingConfiguration;
  messages: ApprovalMessages;
};

type ManagerSettingsPageProps = {
  initialSettings?: ManagerSettings;
  onSave?: (settings: ManagerSettings) => Promise<void>;
};

// --------------------------------------------------
// Default settings
// --------------------------------------------------

const defaultSettings: ManagerSettings = {
  maximumApprovalAmount: "",
  autoApprovalEnabled: false,

  notifications: {
    newApprovalRequests: true,
    highPriorityComplaints: true,
    escalations: true,
    overdueComplaints: false,
  },

  timing: {
    firstResponseTarget: "",
    reminderTiming: "",
    escalationTiming: "",
  },

  messages: {
    approvalMessage: "",
    rejectionMessage: "",
  },
};

// --------------------------------------------------
// Reusable section component
// --------------------------------------------------

type SettingsSectionProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  status?: string;
  children: React.ReactNode;
};

function SettingsSection({
  icon,
  title,
  description,
  status,
  children,
}: SettingsSectionProps) {
  return (
    <section className="grid grid-cols-1 gap-5 rounded-lg border bg-white p-4 md:grid-cols-[250px_1fr] md:p-5">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="flex size-7 items-center justify-center rounded-md bg-teal-50 text-teal-600">
            {icon}
          </div>

          <h2 className="text-sm font-semibold text-slate-800">{title}</h2>
        </div>

        <p className="max-w-[220px] text-xs leading-relaxed text-slate-500">
          {description}
        </p>

        {status && (
          <Badge
            variant="outline"
            className="mt-1 w-fit border-slate-200 bg-slate-50 text-[10px] font-normal text-slate-500"
          >
            {status}
          </Badge>
        )}
      </div>

      <div className="min-w-0">{children}</div>
    </section>
  );
}

// --------------------------------------------------
// Reusable notification switch
// --------------------------------------------------

type NotificationItemProps = {
  title: string;
  description: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
};

function NotificationItem({
  title,
  description,
  checked,
  onCheckedChange,
}: NotificationItemProps) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div className="space-y-1">
        <p className="text-xs font-medium text-slate-700">{title}</p>
        <p className="text-[11px] text-slate-500">{description}</p>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <span className="text-[10px] text-slate-400">
          {checked ? "On" : "Off"}
        </span>

        <Switch
          checked={checked}
          onCheckedChange={onCheckedChange}
          aria-label={title}
        />
      </div>
    </div>
  );
}

// --------------------------------------------------
// Reusable timing input
// --------------------------------------------------

type TimingInputProps = {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
};

function TimingInput({
  label,
  placeholder,
  value,
  onChange,
}: TimingInputProps) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-medium text-slate-700">{label}</label>

      <div className="relative">
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="h-9 pr-20 text-xs"
        />

        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-400">
          Unit pending
        </span>
      </div>
    </div>
  );
}

// --------------------------------------------------
// Main Settings Page
// --------------------------------------------------

export default function ManagerSettingsPage({
  initialSettings,
  onSave,
}: ManagerSettingsPageProps) {
  const [settings, setSettings] = useState<ManagerSettings>(
    () => initialSettings ?? defaultSettings,
  );

  const [savedSettings, setSavedSettings] = useState<ManagerSettings>(
    () => initialSettings ?? defaultSettings,
  );

  const [isSaving, setIsSaving] = useState(false);

  const isDirty = JSON.stringify(settings) !== JSON.stringify(savedSettings);

  // Update individual settings
  const updateSettings = <K extends keyof ManagerSettings>(
    key: K,
    value: ManagerSettings[K],
  ) => {
    setSettings((previous) => ({
      ...previous,
      [key]: value,
    }));
  };

  // Update notification preferences
  const updateNotification = (
    key: keyof NotificationPreferences,
    value: boolean,
  ) => {
    setSettings((previous) => ({
      ...previous,
      notifications: {
        ...previous.notifications,
        [key]: value,
      },
    }));
  };

  // Update timing configuration
  const updateTiming = (key: keyof TimingConfiguration, value: string) => {
    setSettings((previous) => ({
      ...previous,
      timing: {
        ...previous.timing,
        [key]: value,
      },
    }));
  };

  // Update approval messages
  const updateMessage = (key: keyof ApprovalMessages, value: string) => {
    setSettings((previous) => ({
      ...previous,
      messages: {
        ...previous.messages,
        [key]: value,
      },
    }));
  };

  // Reset unsaved changes
  const handleCancel = () => {
    setSettings(savedSettings);
  };

  // Save settings
  const handleSave = async () => {
    try {
      setIsSaving(true);

      await onSave?.(settings);

      setSavedSettings({ ...settings });
      toast.success("Settings saved successfully.");
    } catch {
      toast.error("Unable to save settings. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/70">
      <div className="mx-auto max-w-7xl space-y-4 p-4 md:p-6">
        <SettingsHeader isDirty onCancel={() => {}} onSave={() => {}} />

        {/* ----------------------------------------- */}
        {/* Approval Limits */}
        {/* ----------------------------------------- */}

        <SettingsSection
          icon={<Wallet size={15} />}
          title="Approval Limits"
          description="Set the maximum amount staff can approve without manager approval."
          status="Pending confirmation"
        >
          <div className="space-y-2">
            <h3 className="text-xs font-semibold text-slate-800">
              Staff approval threshold
            </h3>

            <label className="text-xs font-medium text-slate-700">
              Maximum approval amount
            </label>

            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">
                ₦
              </span>

              <Input
                type="number"
                min="0"
                value={settings.maximumApprovalAmount}
                onChange={(e) =>
                  updateSettings("maximumApprovalAmount", e.target.value)
                }
                placeholder="Enter confirmed amount"
                className="h-9 pl-7 text-xs"
              />
            </div>

            <p className="text-[10px] text-slate-500">
              Nigerian Naira (₦). No approval amount has been confirmed.
            </p>

            <p className="flex items-center gap-1.5 text-[10px] text-slate-500">
              <Info size={12} />
              Use a numeric amount when confirmed. Any validation requirements
              must be agreed before implementation.
            </p>
          </div>
        </SettingsSection>

        {/* ----------------------------------------- */}
        {/* Auto Approval Rules */}
        {/* ----------------------------------------- */}

        <SettingsSection
          icon={<Settings2 size={15} />}
          title="Auto-Approval Rules"
          description="Automatic approval support is awaiting product confirmation."
          status="Pending confirmation"
        >
          <div className="rounded-md border bg-slate-50/70 p-3">
            <div className="flex items-start gap-2">
              <div className="mt-0.5">
                <ShieldCheck size={15} className="text-slate-500" />
              </div>

              <div className="space-y-1">
                <h3 className="text-xs font-semibold text-slate-800">
                  Product confirmation required
                </h3>

                <p className="text-[11px] leading-relaxed text-slate-500">
                  Enable/disable controls and rule limits will be defined only
                  if auto-approval is supported. No automatic approval rule is
                  configured here.
                </p>
              </div>
            </div>
          </div>
        </SettingsSection>

        {/* ----------------------------------------- */}
        {/* Notifications */}
        {/* ----------------------------------------- */}

        <SettingsSection
          icon={<Bell size={15} />}
          title="Notifications"
          description="Choose which complaint and approval events you want to be notified about."
        >
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold text-slate-800">
                Notification preferences
              </h3>

              <Badge className="border border-teal-100 bg-teal-50 text-[10px] font-medium text-teal-700 hover:bg-teal-50">
                Draft selections
              </Badge>
            </div>

            <div className="divide-y">
              <NotificationItem
                title="New approval requests"
                description="When a new request needs manager review."
                checked={settings.notifications.newApprovalRequests}
                onCheckedChange={(value) =>
                  updateNotification("newApprovalRequests", value)
                }
              />

              <NotificationItem
                title="High-priority complaints"
                description="When a complaint is marked as high priority."
                checked={settings.notifications.highPriorityComplaints}
                onCheckedChange={(value) =>
                  updateNotification("highPriorityComplaints", value)
                }
              />

              <NotificationItem
                title="Escalations"
                description="When a complaint is escalated."
                checked={settings.notifications.escalations}
                onCheckedChange={(value) =>
                  updateNotification("escalations", value)
                }
              />

              <NotificationItem
                title="Overdue complaints"
                description="When a complaint is overdue."
                checked={settings.notifications.overdueComplaints}
                onCheckedChange={(value) =>
                  updateNotification("overdueComplaints", value)
                }
              />
            </div>

            <p className="flex items-center gap-1.5 pt-2 text-[10px] text-slate-500">
              <Info size={12} />
              These switch positions are a visual draft. Confirm these
              preferences before enabling notifications.
            </p>
          </div>
        </SettingsSection>

        {/* ----------------------------------------- */}
        {/* Escalation and Reminders */}
        {/* ----------------------------------------- */}

        <SettingsSection
          icon={<Clock3 size={15} />}
          title="Escalation & Reminders"
          description="Define response targets and when reminders or escalations should occur."
          status="Pending confirmation"
        >
          <div className="space-y-4">
            <h3 className="text-xs font-semibold text-slate-800">
              Timing configuration
            </h3>

            <TimingInput
              label="First-response target"
              placeholder="Enter confirmed target"
              value={settings.timing.firstResponseTarget}
              onChange={(value) => updateTiming("firstResponseTarget", value)}
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <TimingInput
                label="Reminder timing"
                placeholder="Enter timing"
                value={settings.timing.reminderTiming}
                onChange={(value) => updateTiming("reminderTiming", value)}
              />

              <TimingInput
                label="Escalation timing"
                placeholder="Enter timing"
                value={settings.timing.escalationTiming}
                onChange={(value) => updateTiming("escalationTiming", value)}
              />
            </div>

            <p className="flex items-start gap-1.5 text-[10px] text-slate-500">
              <Info size={12} className="mt-0.5 shrink-0" />
              Values, time units and timing reference points are pending
              confirmation. Confirm these before setting validation rules.
            </p>
          </div>
        </SettingsSection>

        {/* ----------------------------------------- */}
        {/* Complaint Closure */}
        {/* ----------------------------------------- */}

        <SettingsSection
          icon={<FileCheck2 size={15} />}
          title="Complaint Closure"
          description="Keep resolution and closure distinct. Automatic closure requires team approval."
          status="Pending confirmation"
        >
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="space-y-2 rounded-md border bg-slate-50/50 p-3">
              <h3 className="text-xs font-semibold text-slate-800">Resolved</h3>

              <p className="text-[11px] leading-relaxed text-slate-500">
                The complaint issue has been addressed.
              </p>
            </div>

            <div className="space-y-2 rounded-md border bg-slate-50/50 p-3">
              <h3 className="text-xs font-semibold text-slate-800">Closed</h3>

              <p className="text-[11px] leading-relaxed text-slate-500">
                The complaint is recorded as concluded.
              </p>
            </div>
          </div>

          <p className="mt-3 flex items-start gap-1.5 text-[10px] leading-relaxed text-slate-500">
            <Info size={12} className="mt-0.5 shrink-0" />
            These are distinct statuses; no automatic transition is implied.
            Automatic closure and its timing are awaiting team approval, so no
            closure controls are shown.
          </p>
        </SettingsSection>

        {/* ----------------------------------------- */}
        {/* Approval Messages */}
        {/* ----------------------------------------- */}

        <SettingsSection
          icon={<MessageSquareText size={15} />}
          title="Approval Messages"
          description="Prepare standard messages for approval and rejection decisions."
        >
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-slate-800">
              Standard messages
            </h3>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-700">
                  Standard approval message
                </label>

                <Textarea
                  value={settings.messages.approvalMessage}
                  onChange={(e) =>
                    updateMessage("approvalMessage", e.target.value)
                  }
                  placeholder="Enter the message to accompany an approval decision..."
                  className="min-h-24 resize-none text-xs"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-700">
                  Standard rejection message
                </label>

                <Textarea
                  value={settings.messages.rejectionMessage}
                  onChange={(e) =>
                    updateMessage("rejectionMessage", e.target.value)
                  }
                  placeholder="Enter the message to accompany a rejection decision..."
                  className="min-h-24 resize-none text-xs"
                />
              </div>
            </div>

            <p className="flex items-center gap-1.5 text-[10px] text-slate-500">
              <Info size={12} />
              Instructional placeholders only. No standard message has been
              approved.
            </p>
          </div>
        </SettingsSection>

        {/* ----------------------------------------- */}
        {/* Footer Actions */}
        {/* ----------------------------------------- */}

        <div className="sticky bottom-0 z-10 flex flex-col gap-3 border-t bg-white px-4 py-3 shadow-[0_-4px_12px_rgba(0,0,0,0.03)] sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <span
              className={`size-2 rounded-full ${
                isDirty ? "bg-amber-500" : "bg-teal-500"
              }`}
            />

            <div>
              <p className="text-xs font-medium text-slate-700">
                {isDirty ? "Unsaved draft changes" : "All changes saved"}
              </p>

              <p className="text-[10px] text-slate-500">
                Review selections before saving. Pending features remain
                unconfigured.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleCancel}
              disabled={!isDirty || isSaving}
              className="h-8 text-xs"
            >
              Cancel
            </Button>

            <Button
              type="button"
              size="sm"
              onClick={handleSave}
              disabled={!isDirty || isSaving}
              className="h-8 bg-teal-600 text-xs text-white hover:bg-teal-700"
            >
              {isSaving ? (
                <>
                  <Loader2 className="mr-1 size-3 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Check className="mr-1 size-3" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
