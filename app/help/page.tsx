"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  ClipboardList,
  Mail,
  MessageSquare,
  Search,
  Send,
  UserRound,
  Bell,
  Headset,
  X,
} from "lucide-react";

const faqs = [
  {
    question: "How do I view assigned complaints?",
    answer:
      "Open the dashboard and select Assigned Complaints. The page displays complaint records when your application has access to real complaint data.",
  },
  {
    question: "How can I find a customer?",
    answer:
      "Open the Customers page and search by customer name, email, or organization. Customer information appears when real customer records are available.",
  },
  {
    question: "Where can I view customer history?",
    answer:
      "Open Customer History from the dashboard or Customers page. Previous complaint records will appear when a suitable data source is connected.",
  },
  {
    question: "How do I change my preferences?",
    answer:
      "Open Settings to manage the interface preferences available in your application. Save your changes when you are finished.",
  },
  {
    question: "Why are no complaint records displayed?",
    answer:
      "This frontend does not create complaint records automatically. Real complaints must be supplied by your application's data source.",
  },
  {
    question: "How do I contact support?",
    answer:
      "Use the Contact Support form on this page to enter an enquiry. In this frontend-only version, requests are saved in your browser and are not sent to a support team.",
  },
];

const CATEGORIES = [
  "General enquiry",
  "Complaint tracking",
  "Customer information",
  "Account access",
  "Technical issue",
];

type SupportRequest = {
  category: string;
  subject: string;
  message: string;
  createdAt: string;
};

export default function HelpPage() {
  const [searchText, setSearchText] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [category, setCategory] = useState("General enquiry");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [feedback, setFeedback] = useState("");
  const [feedbackType, setFeedbackType] = useState<"success" | "error">(
    "success"
  );
  const [accountOpen, setAccountOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const filteredFaqs = faqs.filter((faq) => {
    const query = searchText.trim().toLowerCase();

    return (
      !query ||
      faq.question.toLowerCase().includes(query) ||
      faq.answer.toLowerCase().includes(query)
    );
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFeedback("");

    if (!subject.trim() || !message.trim()) {
      setFeedbackType("error");
      setFeedback("Please enter both a subject and a message.");
      return;
    }

    const supportRequest: SupportRequest = {
      category,
      subject: subject.trim(),
      message: message.trim(),
      createdAt: new Date().toISOString(),
    };

    try {
      const saved = localStorage.getItem("ccts-support-requests");
      const requests: unknown = saved ? JSON.parse(saved) : [];

      if (!Array.isArray(requests)) {
        setFeedbackType("error");
        setFeedback("Unable to save your request in this browser.");
        return;
      }

      localStorage.setItem(
        "ccts-support-requests",
        JSON.stringify([...requests, supportRequest])
      );

      setFeedbackType("success");
      setFeedback(
        "Your request has been saved in this browser. It has not been sent to a support team."
      );
      setSubject("");
      setMessage("");
    } catch {
      setFeedbackType("error");
      setFeedback(
        "Unable to save your request. Your browser storage may be unavailable."
      );
    }
  }

  return (
    <main className="min-h-screen bg-[#f7f9fc] text-[#142747]">
      {/* CCTS navigation */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#152d4e] text-white">
        <div className="mx-auto flex min-h-[76px] max-w-[1600px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link
            href="/dashboard"
            className="flex min-w-0 items-center gap-3"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#10968c]">
              <MessageSquare size={22} />
            </span>

            <span className="text-[25px] font-bold tracking-tight sm:text-[30px]">
              CCTS
            </span>

            <span className="mx-1 hidden h-8 w-px bg-white/30 sm:block" />

          </Link>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <span className="hidden items-center gap-2 text-sm text-slate-200 md:flex">
              <Headset size={18} />
              Help centre
            </span>

            <div className="relative">
              <button
                type="button"
                aria-label="Notifications"
                aria-expanded={notificationsOpen}
                onClick={() => {
                  setNotificationsOpen((value) => !value);
                  setAccountOpen(false);
                }}
                className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-200 transition hover:bg-white/10 hover:text-white"
              >
                <Bell size={20} />
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 top-12 z-50 w-64 rounded-xl border border-[#dce5ef] bg-white p-4 text-[#152d4e] shadow-xl">
                  <h3 className="font-semibold">Notifications</h3>
                  <p className="mt-2 text-sm text-[#647895]">
                    You have no new notifications.
                  </p>
                  <button
                    type="button"
                    onClick={() => setNotificationsOpen(false)}
                    className="mt-3 text-sm font-semibold text-[#087f78] hover:underline"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                type="button"
                aria-label="Open account menu"
                aria-expanded={accountOpen}
                onClick={() => {
                  setAccountOpen((value) => !value);
                  setNotificationsOpen(false);
                }}
                className="flex h-10 items-center gap-2 rounded-full border border-white/20 bg-white/10 py-1 pl-1 pr-2 transition hover:bg-white/15"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#10968c]">
                  <UserRound size={18} />
                </span>
                <span className="hidden text-sm sm:inline">Account</span>
                <ChevronDown size={15} className="text-slate-300" />
              </button>

              {accountOpen && (
                <div className="absolute right-0 top-12 z-50 w-52 rounded-xl border border-[#dce5ef] bg-white p-2 text-[#152d4e] shadow-xl">
                  <Link
                    href="/account"
                    onClick={() => setAccountOpen(false)}
                    className="block rounded-lg px-3 py-2.5 text-sm hover:bg-[#edf8f7]"
                  >
                    Account options
                  </Link>
                  <Link
                    href="/settings"
                    onClick={() => setAccountOpen(false)}
                    className="block rounded-lg px-3 py-2.5 text-sm hover:bg-[#edf8f7]"
                  >
                    Settings
                  </Link>
                  <Link
                    href="/login"
                    onClick={() => setAccountOpen(false)}
                    className="block rounded-lg px-3 py-2.5 text-sm text-red-700 hover:bg-red-50"
                  >
                    Sign out
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8">
        <Link
          href="/dashboard"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-[#647895] transition hover:text-[#087f78]"
        >
          <ArrowLeft size={16} />
          Back to dashboard
        </Link>

        {/* Support hero */}
        <section className="overflow-hidden rounded-2xl bg-[#152d4e] p-6 text-white sm:p-9 lg:p-10">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#10968c]">
              <CircleHelp size={25} />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#8ce0d7]">
                CCTS support centre
              </p>
              <p className="mt-1 text-sm text-slate-300">
                Help and guidance
              </p>
            </div>
          </div>

          <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
            How can we help?
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
            Find answers to common questions and learn how to use your customer
            complaint tracking workspace.
          </p>

          <label className="mt-6 flex items-center gap-3 rounded-xl border border-white/10 bg-white px-4 py-3 text-[#647895] shadow-sm focus-within:ring-4 focus-within:ring-[#10968c]/30">
            <Search size={20} className="shrink-0 text-[#087f78]" />
            <span className="sr-only">Search frequently asked questions</span>
            <input
              type="search"
              value={searchText}
              onChange={(event) => {
                setSearchText(event.target.value);
                setOpenFaq(null);
              }}
              placeholder="Search frequently asked questions..."
              className="w-full bg-transparent text-sm text-[#152d4e] outline-none placeholder:text-[#8a9ab0]"
            />
            {searchText && (
              <button
                type="button"
                onClick={() => {
                  setSearchText("");
                  setOpenFaq(0);
                }}
                aria-label="Clear FAQ search"
                className="shrink-0 rounded-md p-1 hover:bg-[#edf8f7]"
              >
                <X size={17} />
              </button>
            )}
          </label>
        </section>

        <div className="mt-8 grid items-start gap-6 lg:grid-cols-5">
          {/* FAQs */}
          <section className="space-y-5 lg:col-span-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#087f78]">
                Help centre
              </p>
              <h2 className="mt-1 text-xl font-bold text-[#152d4e]">
                Frequently asked questions
              </h2>
              <p className="mt-1 text-sm text-[#647895]">
                Select a question to read the answer.
              </p>
            </div>

            {filteredFaqs.length > 0 ? (
              <div className="overflow-hidden rounded-2xl border border-[#dce5ef] bg-white">
                {filteredFaqs.map((faq, index) => {
                  const isOpen = openFaq === index;

                  return (
                    <div
                      key={faq.question}
                      className="border-b border-[#e8edf4] last:border-b-0"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : index)}
                        aria-expanded={isOpen}
                        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-[#f5f9fb] sm:px-6"
                      >
                        <span className="text-sm font-semibold leading-6 text-[#203653]">
                          {faq.question}
                        </span>
                        <ChevronDown
                          size={18}
                          className={`shrink-0 text-[#087f78] transition-transform ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {isOpen && (
                        <div className="px-5 pb-5 sm:px-6">
                          <div className="rounded-lg border-l-[3px] border-[#10968c] bg-[#f5f9fb] px-4 py-3">
                            <p className="text-sm leading-6 text-[#536781]">
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-[#cbd7e5] bg-white px-5 py-12 text-center">
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#e8f6f4] text-[#087f78]">
                  <Search size={24} />
                </span>
                <h3 className="mt-4 font-bold text-[#152d4e]">
                  No matching questions
                </h3>
                <p className="mt-2 text-sm text-[#647895]">
                  Try a different search term.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchText("");
                    setOpenFaq(0);
                  }}
                  className="mt-4 text-sm font-semibold text-[#087f78] hover:underline"
                >
                  Clear search
                </button>
              </div>
            )}

            {/* Quick links */}
            <div className="grid gap-3 sm:grid-cols-2">
              <Link
                href="/assigned-complaints"
                className="group flex items-center gap-3 rounded-2xl border border-[#dce5ef] bg-white p-4 transition hover:border-[#9bd7d0] hover:bg-[#f4fbfa]"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e8f6f4] text-[#087f78]">
                  <ClipboardList size={21} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-bold text-[#152d4e]">
                    Complaints
                  </span>
                  <span className="mt-1 block text-xs text-[#647895]">
                    View assigned complaints
                  </span>
                </span>
                <ChevronRight
                  size={18}
                  className="shrink-0 text-[#8292a8] transition group-hover:translate-x-0.5 group-hover:text-[#087f78]"
                />
              </Link>

              <Link
                href="/settings"
                className="group flex items-center gap-3 rounded-2xl border border-[#dce5ef] bg-white p-4 transition hover:border-[#9bd7d0] hover:bg-[#f4fbfa]"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#edf2f9] text-[#315b87]">
                  <BookOpen size={21} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-bold text-[#152d4e]">
                    Settings
                  </span>
                  <span className="mt-1 block text-xs text-[#647895]">
                    Manage preferences
                  </span>
                </span>
                <ChevronRight
                  size={18}
                  className="shrink-0 text-[#8292a8] transition group-hover:translate-x-0.5 group-hover:text-[#087f78]"
                />
              </Link>
            </div>
          </section>

          {/* Contact support form */}
          <section className="overflow-hidden rounded-2xl border border-[#dce5ef] bg-white lg:col-span-2">
            <div className="border-b border-[#e3eaf2] p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e8f6f4] text-[#087f78]">
                  <Mail size={22} />
                </span>
                <div>
                  <h2 className="font-bold text-[#152d4e]">
                    Contact support
                  </h2>
                  <p className="mt-1 text-xs text-[#647895]">
                    Tell us what you need help with
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 p-5 sm:p-6">
              <div>
                <label
                  htmlFor="category"
                  className="mb-1.5 block text-sm font-semibold text-[#314866]"
                >
                  Enquiry category
                </label>
                <select
                  id="category"
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  className="w-full rounded-lg border border-[#d7e1ed] bg-white px-3 py-2.5 text-sm text-[#203653] outline-none transition focus:border-[#087f78] focus:ring-4 focus:ring-[#087f78]/10"
                >
                  {CATEGORIES.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="mb-1.5 block text-sm font-semibold text-[#314866]"
                >
                  Subject
                </label>
                <input
                  id="subject"
                  value={subject}
                  onChange={(event) => setSubject(event.target.value)}
                  maxLength={120}
                  required
                  placeholder="Enter your subject"
                  className="w-full rounded-lg border border-[#d7e1ed] bg-white px-3 py-2.5 text-sm text-[#203653] outline-none transition placeholder:text-[#8a9ab0] focus:border-[#087f78] focus:ring-4 focus:ring-[#087f78]/10"
                />
              </div>

              <div>
                <div className="mb-1.5 flex items-center justify-between gap-2">
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-[#314866]"
                  >
                    Message
                  </label>
                  <span className="text-xs text-[#8292a8]">
                    {message.length}/3000
                  </span>
                </div>
                <textarea
                  id="message"
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  maxLength={3000}
                  required
                  rows={5}
                  placeholder="Describe how we can help..."
                  className="w-full resize-y rounded-lg border border-[#d7e1ed] bg-white px-3 py-2.5 text-sm text-[#203653] outline-none transition placeholder:text-[#8a9ab0] focus:border-[#087f78] focus:ring-4 focus:ring-[#087f78]/10"
                />
              </div>

              {feedback && (
                <div
                  role="status"
                  className={`flex items-start gap-2 rounded-lg border p-3 text-sm leading-5 ${
                    feedbackType === "success"
                      ? "border-[#b9e5df] bg-[#edf8f7] text-[#175c58]"
                      : "border-red-200 bg-red-50 text-red-800"
                  }`}
                >
                  {feedbackType === "success" ? (
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
                  ) : (
                    <CircleHelp size={18} className="mt-0.5 shrink-0" />
                  )}
                  <p>{feedback}</p>
                </div>
              )}

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#087f78] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#066b65] focus:outline-none focus:ring-4 focus:ring-[#087f78]/20"
              >
                <Send size={17} />
                Save support request
              </button>

              <p className="text-xs leading-5 text-[#8292a8]">
                This frontend-only form saves requests in this browser. It
                does not send an email or notify a support team.
              </p>
            </form>
          </section>
        </div>

        <footer className="mt-8 flex flex-wrap items-center justify-between gap-2 border-t border-[#dce5ef] py-5 text-xs text-[#71829a]">
          <span className="font-semibold text-[#152d4e]">
            CCTS · Customer care
          </span>
          <span>Here to help, every step of the way.</span>
        </footer>
      </div>
    </main>
  );
}
