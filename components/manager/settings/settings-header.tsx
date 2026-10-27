"use client";

import { Check, Info } from "lucide-react";

import { Button } from "@/components/ui/button";

type SettingsHeaderProps = {
  isDirty: boolean;
  isSaving?: boolean;
  onCancel: () => void;
  onSave: () => void;
};

export default function SettingsHeader({
  isDirty,
  isSaving = false,
  onCancel,
  onSave,
}: SettingsHeaderProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            Settings
          </h1>

          <p className="text-sm text-slate-500">
            Manage approval limits, complaint handling and team notifications.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={!isDirty || isSaving}
            className="h-10 border-slate-200 bg-white px-5 text-sm font-medium"
          >
            Cancel
          </Button>

          <Button
            type="button"
            onClick={onSave}
            disabled={!isDirty || isSaving}
            className="h-10 gap-2 bg-teal-600 px-5 text-sm font-medium text-white hover:bg-teal-700"
          >
            <Check size={16} />
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      {/* Information Notice */}
      <div className="flex gap-3 rounded-md border border-teal-200 bg-teal-50/80 p-4">
        <Info size={18} className="mt-0.5 shrink-0 text-teal-700" />

        <div className="space-y-1">
          <h3 className="text-sm font-semibold text-teal-800">
            Review draft settings before saving
          </h3>

          <p className="text-xs leading-relaxed text-teal-700">
            Notification switches are illustrative selections, not saved
            defaults. Undecided values remain blank; pending features are not
            available for configuration.
          </p>
        </div>
      </div>
    </div>
  );
}
