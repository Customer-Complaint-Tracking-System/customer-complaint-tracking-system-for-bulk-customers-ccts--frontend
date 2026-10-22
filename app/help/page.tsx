"use client";

import Link from "next/link";
import { useState } from "react";
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
} from "lucide-react";

const faqs = [
  {
    question: "How do I view assigned complaints?",
    answer:
      "Open the dashboard menu and select Assigned complaints. The page must be available in your application for this link to work.",
  },
  {
    question: "How can I find a customer?",
    answer:
      "Open the Customers page and use its search tools if available. Customer information will only appear when real records are connected.",
  },
  {
    question: "Where can I view customer history?",
    answer:
      "Choose Customer history from the dashboard navigation. The page can display history after a suitable data source is connected.",
  },
  {
    question: "How do I change my preferences?",
    answer:
      "Open Settings to adjust the available interface preferences, then select Save settings.",
  },
  {
    question: "Why are no complaint records displayed?",
    answer:
      "This frontend does not create complaint records by itself. Real records require a connected data source or backend service.",
  },
];

export default function HelpPage() {
  const [searchText, setSearchText] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [category, setCategory] = useState("General enquiry");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [feedback, setFeedback] = useState("");

  const filteredFaqs = faqs.filter((faq) => {
    const search = searchText.trim().toLowerCase();
    return (
      !search ||
      faq.question.toLowerCase().includes(search) ||
      faq.answer.toLowerCase().includes(search)
    );
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!subject.trim() || !message.trim()) {
      setFeedback("Please enter both a subject and a message.");
      return;
    }

    const supportRequest = {
      category,
      subject: subject.trim(),
      message: message.trim(),
      createdAt: new Date().toISOString(),
    };

    try {
      const saved = localStorage.getItem("ccts-support-requests");
      const requests = saved ? JSON.parse(saved) : [];

      if (!Array.isArray(requests)) {
        setFeedback("Unable to save your request in this browser.");
        return;
      }

      requests.push(supportRequest);
      localStorage.setItem(
        "ccts-support-requests",
        JSON.stringify(requests)
      );

      setFeedback(
        "Your request has been saved in this browser. It has not been sent to a support team."
      );
      setSubject("");
      setMessage("");
    } catch {
      setFeedback("Unable to save your request. Please try again.");
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      <header className="sticky top-0 z-20 flex h-[72px] items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-700 text-white">
            <MessageSquare size={22} />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900">CCTS</h1>
            <p className="text-xs text-slate-500">Complaint tracking</p>
          </div>
        </div>

        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium hover:bg-slate-50"
        >
          <ClipboardList size={17} />
          Dashboard
        </Link>
      </header>

      <div className="mx-auto max-w-5xl p-4 sm:p-8">
        <Link
          href="/dashboard"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-blue-700 hover:underline"
        >
          <ArrowLeft size={17} />
          Back to dashboard
        </Link>

        <section className="rounded-2xl bg-blue-700 p-6 text-white sm:p-10">
          <div className="flex items-center gap-3">
            <CircleHelp size={30} />
            <span className="text-sm font-semibold text-blue-100">
              CCTS SUPPORT CENTRE
            </span>
          </div>
          <h2 className="mt-5 text-3xl font-bold sm:text-4xl">
            How can we help?
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-blue-100 sm:text-base">
            Find guidance on navigating the complaint tracking workspace and
            using its available features.
          </p>

          <div className="mt-6 flex items-center gap-3 rounded-xl bg-white px-4 py-3 text-slate-500">
            <Search size={20} />
            <input
              type="search"
              value={searchText}
              onChange={(event) => {
                setSearchText(event.target.value);
                setOpenFaq(null);
              }}
              placeholder="Search frequently asked questions..."
              aria-label="Search frequently asked questions"
              className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
            />
          </div>
        </section>

        <div className="mt-8 grid gap-6 lg:grid-cols-5">
          <section className="space-y-4 lg:col-span-3">
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Frequently asked questions
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Select a question to read the answer.
              </p>
            </div>

            {filteredFaqs.length > 0 ? (
              <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                {filteredFaqs.map((faq, index) => {
                  const isOpen = openFaq === index;

                  return (
                    <div
                      key={faq.question}
                      className="border-b border-slate-100 last:border-b-0"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : index)}
                        aria-expanded={isOpen}
                        className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left hover:bg-slate-50"
                      >
                        <span className="text-sm font-semibold text-slate-800">
                          {faq.question}
                        </span>
                        <ChevronDown
                          size={18}
                          className={`shrink-0 text-slate-400 transition ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {isOpen && (
                        <p className="px-5 pb-5 text-sm leading-6 text-slate-600">
                          {faq.answer}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center">
                <Search className="mx-auto text-slate-400" size={28} />
                <p className="mt-3 font-semibold text-slate-800">
                  No matching questions
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  Try a different search term.
                </p>
              </div>
            )}

            <div className="grid gap-3 sm:grid-cols-2">
              <Link
                href="/assigned-complaints"
                className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 transition hover:border-blue-300 hover:bg-blue-50"
              >
                <div className="rounded-lg bg-blue-50 p-3 text-blue-700">
                  <ClipboardList size={21} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold">Complaints</p>
                  <p className="mt-1 text-xs text-slate-500">
                    View assigned complaints
                  </p>
                </div>
                <ChevronRight size={17} />
              </Link>

              <Link
                href="/settings"
                className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 transition hover:border-blue-300 hover:bg-blue-50"
              >
                <div className="rounded-lg bg-violet-50 p-3 text-violet-700">
                  <BookOpen size={21} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold">Settings</p>
                  <p className="mt-1 text-xs text-slate-500">
                    Manage preferences
                  </p>
                </div>
                <ChevronRight size={17} />
              </Link>
            </div>
          </section>

          <section className="h-fit rounded-xl border border-slate-200 bg-white p-5 sm:p-6 lg:col-span-2">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-50 p-3 text-blue-700">
                <Mail size={22} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Contact support</h3>
                <p className="mt-1 text-xs text-slate-500">
                  Write down your enquiry
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label
                  htmlFor="category"
                  className="mb-1.5 block text-sm font-medium text-slate-700"
                >
                  Enquiry category
                </label>
                <select
                  id="category"
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option>General enquiry</option>
                  <option>Complaint tracking</option>
                  <option>Customer information</option>
                  <option>Account access</option>
                  <option>Technical issue</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="mb-1.5 block text-sm font-medium text-slate-700"
                >
                  Subject
                </label>
                <input
                  id="subject"
                  value={subject}
                  onChange={(event) => setSubject(event.target.value)}
                  maxLength={120}
                  placeholder="Enter your subject"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-1.5 block text-sm font-medium text-slate-700"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  maxLength={3000}
                  rows={5}
                  placeholder="Describe how we can help..."
                  className="w-full resize-y rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
                <p className="mt-1 text-right text-xs text-slate-400">
                  {message.length}/3000
                </p>
              </div>

              {feedback && (
                <div
                  role="status"
                  className="flex items-start gap-2 rounded-lg bg-blue-50 p-3 text-sm text-blue-800"
                >
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
                  <p>{feedback}</p>
                </div>
              )}

              <button
                type="submit"
                className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-blue-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-800"
              >
                <Send size={17} />
                Save support request
              </button>

              <p className="text-xs leading-5 text-slate-400">
                Frontend only: this form saves the request in this browser. It
                does not send an email or notify a support team.
              </p>
            </form>
          </section>
        </div>

        <footer className="mt-8 border-t border-slate-200 py-5 text-xs text-slate-500">
          CCTS · Help and support · Frontend interface
        </footer>
      </div>
    </main>
  );
}