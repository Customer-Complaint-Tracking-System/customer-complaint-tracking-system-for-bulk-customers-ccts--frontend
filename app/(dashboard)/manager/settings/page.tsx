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
import { ManagerSettingsForm } from "@/components/manager/settings/manager-settings-form";

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
        <SettingsHeader isDirty onCancel={() => { }} onSave={() => { }} />
        <ManagerSettingsForm />
      </div>
    </div>
  );
}
