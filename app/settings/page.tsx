"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Bell,
  Camera,
  Check,
  ChevronRight,
  CircleHelp,
  ImagePlus,
  LockKeyhole,
  Monitor,
  Save,
  Settings as SettingsIcon,
  ShieldCheck,
  Trash2,
  UserRound,
  X,
} from "lucide-react";

const SETTINGS_KEY = "ccts-settings";
const PROFILE_KEY = "ccts-account-profile";

type Profile = {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  photo: string;
};

const emptyProfile: Profile = {
  fullName: "",
  jobTitle: "",
  email: "",
  phone: "",
  photo: "",
};

export default function SettingsPage() {
  const [profile, setProfile] = useState<Profile>(emptyProfile);
  const [notifications, setNotifications] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [compactView, setCompactView] = useState(false);
  const [showSaved, setShowSaved] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [photoError, setPhotoError] = useState("");
  const [activeSection, setActiveSection] = useState("profile");

  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem(PROFILE_KEY);
      const savedSettings = localStorage.getItem(SETTINGS_KEY);

      if (savedProfile) {
        const parsed = JSON.parse(savedProfile);
        setProfile({ ...emptyProfile, ...parsed });
      }

      if (savedSettings) {
        const parsed = JSON.parse(savedSettings);
        setNotifications(parsed.notifications ?? true);
        setEmailAlerts(parsed.emailAlerts ?? true);
        setCompactView(parsed.compactView ?? false);
      }
    } catch {
      setSaveError("Some saved preferences could not be loaded.");
    }
  }, []);

  function updateProfile(field: keyof Profile, value: string) {
    setProfile((current) => ({ ...current, [field]: value }));
    setShowSaved(false);
    setSaveError("");
  }

  function handlePhotoChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setPhotoError("Please select a valid image file.");
      event.target.value = "";
      return;
    }

    if (file.size > 3 * 1024 * 1024) {
      setPhotoError("Your photo must be smaller than 3 MB.");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        updateProfile("photo", reader.result);
        setPhotoError("");
      }
    };

    reader.onerror = () => {
      setPhotoError("We could not load this image. Please try another.");
    };

    reader.readAsDataURL(file);
  }

  function saveSettings() {
    try {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
      localStorage.setItem(
        SETTINGS_KEY,
        JSON.stringify({
          notifications,
          emailAlerts,
          compactView,
        })
      );

      setShowSaved(true);
      setSaveError("");
    } catch {
      setShowSaved(false);
      setSaveError(
        "Your changes could not be saved. The profile photo may be too large for browser storage."
      );
    }
  }

  function removePhoto() {
    updateProfile("photo", "");
    setPhotoError("");
  }

  const menuItems = [
    { id: "profile", label: "My profile", icon: UserRound },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "appearance", label: "Appearance", icon: Monitor },
    { id: "security", label: "Security", icon: ShieldCheck },
    { id: "account", label: "Account options", icon: LockKeyhole },
  ];

  return (
    <main className="min-h-screen bg-[#F7F9FC] text-[#24364B]">
      <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-white/10 bg-[#152D4E] px-4 text-white shadow-sm sm:px-8">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#10968C]">
            <SettingsIcon size={21} />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-wide">CCTS</h1>
            <p className="text-xs text-slate-300">
              Complaint tracking system
            </p>
          </div>
        </Link>

        <Link
          href="/dashboard"
          className="rounded-lg border border-white/20 px-4 py-2 text-sm font-semibold transition hover:bg-white/10"
        >
          Dashboard
        </Link>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-8 sm:py-9">
        <Link
          href="/dashboard"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#087F78] hover:text-[#065F59]"
        >
          <ArrowLeft size={17} />
          Back to dashboard
        </Link>

        <div className="mb-8">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-[#10968C]">
            Staff preferences
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-[#152D4E] sm:text-4xl">
            Settings
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#718096] sm:text-base">
            Manage your personal information, profile photo, notifications,
            appearance and account preferences.
          </p>
        </div>

        {showSaved && (
          <div className="mb-5 flex items-center gap-3 rounded-xl border border-[#A9DED7] bg-[#EAF8F5] p-4 text-sm text-[#086B63]">
            <Check size={19} />
            <p className="flex-1 font-semibold">
              Your profile and settings have been saved successfully.
            </p>
            <button
              type="button"
              onClick={() => setShowSaved(false)}
              aria-label="Dismiss saved message"
              className="rounded-md p-1 hover:bg-[#D6F0EB]"
            >
              <X size={17} />
            </button>
          </div>
        )}

        {saveError && (
          <div
            role="alert"
            className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
          >
            {saveError}
          </div>
        )}

        <div className="grid items-start gap-6 md:grid-cols-[230px_minmax(0,1fr)]">
          <aside className="rounded-xl border border-[#DCE5EF] bg-white p-3 shadow-sm md:sticky md:top-24">
            <p className="px-3 py-3 text-[11px] font-bold uppercase tracking-[0.15em] text-[#8A98AA]">
              Settings menu
            </p>

            {menuItems.map((item) => {
              const Icon = item.icon;
              const selected = activeSection === item.id;

              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setActiveSection(item.id)}
                  className={`mb-1 flex items-center gap-3 rounded-lg border-l-[3px] px-3 py-3 text-sm transition ${
                    selected
                      ? "border-[#10968C] bg-[#EAF8F5] font-semibold text-[#087F78]"
                      : "border-transparent text-[#53657A] hover:bg-[#F3F7FA] hover:text-[#152D4E]"
                  }`}
                >
                  <Icon size={18} />
                  {item.label}
                </a>
              );
            })}

            <div className="my-3 border-t border-[#E8EDF3]" />

            <Link
              href="/help"
              className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-[#53657A] transition hover:bg-[#F3F7FA] hover:text-[#087F78]"
            >
              <CircleHelp size={18} />
              Help and support
            </Link>
          </aside>

          <div className="min-w-0 space-y-6">
            {/* PROFILE */}
            <section
              id="profile"
              className="scroll-mt-24 overflow-hidden rounded-xl border border-[#DCE5EF] bg-white shadow-sm"
            >
              <div className="border-b border-[#E8EDF3] px-5 py-5 sm:px-6">
                <h3 className="font-bold text-[#152D4E]">My profile</h3>
                <p className="mt-1 text-sm text-[#718096]">
                  Personalise your staff profile and update your information.
                </p>
              </div>

              <div className="p-5 sm:p-6">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                  <div className="relative flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full border-4 border-[#EAF8F5] bg-[#EAF8F5] text-[#087F78]">
                    {profile.photo ? (
                      <img
                        src={profile.photo}
                        alt="Profile photo"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <UserRound size={42} />
                    )}
                  </div>

                  <div className="flex-1">
                    <h4 className="font-bold text-[#152D4E]">
                      Profile photograph
                    </h4>
                    <p className="mt-1 text-sm text-[#718096]">
                      Add a clear photo so your staff profile is easy to
                      recognise.
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-[#10968C] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#087F78]">
                        <Camera size={17} />
                        Upload photo
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoChange}
                          className="hidden"
                        />
                      </label>

                      {profile.photo && (
                        <button
                          type="button"
                          onClick={removePhoto}
                          className="inline-flex items-center gap-2 rounded-lg border border-[#DCE5EF] px-4 py-2.5 text-sm font-semibold text-[#53657A] transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 size={16} />
                          Remove photo
                        </button>
                      )}
                    </div>

                    <p className="mt-2 text-xs text-[#8A98AA]">
                      JPG, PNG or other image format. Maximum size: 3 MB.
                    </p>

                    {photoError && (
                      <p className="mt-2 text-xs font-medium text-red-600">
                        {photoError}
                      </p>
                    )}
                  </div>
                </div>

                <div className="my-6 border-t border-[#E8EDF3]" />

                <div className="grid gap-5 sm:grid-cols-2">
                  <FormField
                    label="Full name"
                    placeholder="Enter your full name"
                    value={profile.fullName}
                    onChange={(value) => updateProfile("fullName", value)}
                  />

                  <FormField
                    label="Job title / Position"
                    placeholder="e.g. Customer Support Officer"
                    value={profile.jobTitle}
                    onChange={(value) => updateProfile("jobTitle", value)}
                  />

                  <FormField
                    label="Email address"
                    placeholder="Enter your email address"
                    type="email"
                    value={profile.email}
                    onChange={(value) => updateProfile("email", value)}
                  />

                  <FormField
                    label="Phone number"
                    placeholder="Enter your phone number"
                    value={profile.phone}
                    onChange={(value) => updateProfile("phone", value)}
                  />
                </div>

                <div className="mt-5 rounded-lg border border-[#DCE5EF] bg-[#F7F9FC] p-3">
                  <p className="text-xs leading-5 text-[#68788D]">
                    These are editable local profile details. Updating your
                    actual staff account or login email requires a connected
                    account service.
                  </p>
                </div>
              </div>
            </section>

            {/* NOTIFICATIONS */}
            <section
              id="notifications"
              className="scroll-mt-24 overflow-hidden rounded-xl border border-[#DCE5EF] bg-white shadow-sm"
            >
              <SectionHeading
                icon={Bell}
                title="Notification preferences"
                description="Choose how you would like to receive notifications."
              />

              <div className="px-5 sm:px-6">
                <SettingToggle
                  title="In-app notifications"
                  description="Allow notification messages to appear in the CCTS interface."
                  checked={notifications}
                  onChange={(value) => {
                    setNotifications(value);
                    setShowSaved(false);
                  }}
                />

                <SettingToggle
                  title="Email alert preference"
                  description="Save your preference for email alerts. Actual email delivery requires an email service."
                  checked={emailAlerts}
                  onChange={(value) => {
                    setEmailAlerts(value);
                    setShowSaved(false);
                  }}
                />
              </div>
            </section>

            {/* APPEARANCE */}
            <section
              id="appearance"
              className="scroll-mt-24 overflow-hidden rounded-xl border border-[#DCE5EF] bg-white shadow-sm"
            >
              <SectionHeading
                icon={Monitor}
                title="Appearance"
                description="Choose how information is displayed in your workspace."
              />

              <div className="px-5 sm:px-6">
                <SettingToggle
                  title="Compact view"
                  description="Save a preference for a more compact interface."
                  checked={compactView}
                  onChange={(value) => {
                    setCompactView(value);
                    setShowSaved(false);
                  }}
                />
              </div>

              <div className="mx-5 mb-5 rounded-lg border border-[#DCE5EF] bg-[#F7F9FC] p-4 sm:mx-6">
                <p className="text-xs leading-5 text-[#68788D]">
                  Compact view is saved as a preference. Applying it across
                  every CCTS page requires connecting the preference to those
                  pages.
                </p>
              </div>
            </section>

            {/* SECURITY */}
            <section
              id="security"
              className="scroll-mt-24 overflow-hidden rounded-xl border border-[#DCE5EF] bg-white shadow-sm"
            >
              <SectionHeading
                icon={ShieldCheck}
                title="Security and access"
                description="Review account access and available security options."
              />

              <div className="p-5 sm:p-6">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#EAF8F5] text-[#087F78]">
                    <LockKeyhole size={20} />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-[#152D4E]">
                      Password and authentication
                    </h4>
                    <p className="mt-1 text-sm leading-5 text-[#718096]">
                      Password changes and authentication security must be
                      handled by your connected authentication service.
                    </p>
                    <Link
                      href="/account"
                      className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[#087F78] hover:text-[#065F59]"
                    >
                      View account options
                      <ChevronRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* ACCOUNT */}
            <section
              id="account"
              className="scroll-mt-24 overflow-hidden rounded-xl border border-[#DCE5EF] bg-white shadow-sm"
            >
              <SectionHeading
                icon={UserRound}
                title="Account options"
                description="Access your account page and other staff resources."
              />

              <div className="divide-y divide-[#E8EDF3] px-5 sm:px-6">
                <AccountLink
                  title="My account"
                  description="View your account information and account actions."
                  href="/account"
                  icon={UserRound}
                />
                <AccountLink
                  title="Help and support"
                  description="Find assistance with using the CCTS workspace."
                  href="/help"
                  icon={CircleHelp}
                />
                <AccountLink
                  title="Dashboard"
                  description="Return to your staff dashboard."
                  href="/dashboard"
                  icon={SettingsIcon}
                />
              </div>
            </section>

            {/* SAVE */}
            <section className="rounded-xl border border-[#DCE5EF] bg-white p-5 shadow-sm sm:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="font-bold text-[#152D4E]">
                    Save your changes
                  </h3>
                  <p className="mt-1 text-sm leading-5 text-[#718096]">
                    Save your profile information and preferences on this
                    device.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={saveSettings}
                  className="inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#10968C] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#087F78] focus:outline-none focus:ring-2 focus:ring-[#10968C] focus:ring-offset-2"
                >
                  <Save size={17} />
                  Save changes
                </button>
              </div>
            </section>
          </div>
        </div>

        <footer className="mt-9 flex flex-col gap-2 border-t border-[#DCE5EF] py-5 text-xs text-[#8190A3] sm:flex-row sm:items-center sm:justify-between">
          <p>CCTS · Customer Complaint Tracking System</p>
          <Link
            href="/help"
            className="font-semibold text-[#087F78] hover:text-[#065F59]"
          >
            Help and support
          </Link>
        </footer>
      </div>
    </main>
  );
}

function SectionHeading({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof Bell;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-4 border-b border-[#E8EDF3] px-5 py-5 sm:px-6">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EAF8F5] text-[#087F78]">
        <Icon size={21} />
      </div>
      <div>
        <h3 className="font-bold text-[#152D4E]">{title}</h3>
        <p className="mt-1 text-sm leading-5 text-[#718096]">
          {description}
        </p>
      </div>
    </div>
  );
}

function FormField({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-[#34465B]">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-[#DCE5EF] bg-white px-4 py-3 text-sm text-[#24364B] outline-none transition placeholder:text-[#A0AAB8] focus:border-[#10968C] focus:ring-2 focus:ring-[#10968C]/15"
      />
    </label>
  );
}

function SettingToggle({
  title,
  description,
  checked,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-5 border-t border-[#E8EDF3] py-5 first:border-t-0">
      <div className="min-w-0">
        <h4 className="text-sm font-semibold text-[#24364B]">{title}</h4>
        <p className="mt-1 max-w-md text-sm leading-5 text-[#718096]">
          {description}
        </p>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={title}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#10968C] focus:ring-offset-2 ${
          checked ? "bg-[#10968C]" : "bg-[#CBD5E1]"
        }`}
      >
        <span
          className={`inline-block h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
            checked ? "translate-x-[22px]" : "translate-x-0.5"
          }`}
        />
      </button>
    </div>
  );
}

function AccountLink({
  title,
  description,
  href,
  icon: Icon,
}: {
  title: string;
  description: string;
  href: string;
  icon: typeof UserRound;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-3 py-4 transition"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#F0F4F8] text-[#53657A] transition group-hover:bg-[#EAF8F5] group-hover:text-[#087F78]">
        <Icon size={19} />
      </div>
      <div className="min-w-0 flex-1">
        <h4 className="text-sm font-semibold text-[#152D4E]">{title}</h4>
        <p className="mt-1 text-xs leading-5 text-[#718096]">
          {description}
        </p>
      </div>
      <ChevronRight
        size={19}
        className="shrink-0 text-[#9AA6B5] transition group-hover:translate-x-1 group-hover:text-[#087F78]"
      />
    </Link>
  );
}