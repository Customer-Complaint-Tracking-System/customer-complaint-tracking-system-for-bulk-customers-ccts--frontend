"use client";

import { useRef, useState } from "react";
import {
  CalendarDays,
  Clock,
  UserRound,
  UserRoundCheck,
  Phone,
  Pencil,
  Mic,
  Play,
  Pause,
  Download,
  AlertTriangle,
  FileText,
} from "lucide-react";

interface ComplaintDetailsProps {
  complaint?: {
    id: string;
    category: string;
    priority: "High" | "Medium" | "Low";
    status: string;
    dateReceived: string;
    assignedTo: string;
    deadline: string;
    customer: {
      name: string;
      phone: string;
      email: string;
      verified: boolean;
    };
    order: {
      id: string;
      date: string;
      paymentMethod: string;
      product: string;
      missingInformation: string[];
    };
    description: string;
    channel: string;
    receivedAt: string;
    audioUrl?: string;
    transcript?: string;
  };
  onEditDetails?: () => void;
}

const defaultComplaint = {
  id: "CCTS 2601",
  category: "Damaged Product",
  priority: "High" as const,
  status: "In Progress",
  dateReceived: "07 Oct 2026, 10:24 AM",
  assignedTo: "Jordan Ladipo",
  deadline: "09 Oct 2026, 10:24 AM",
  customer: {
    name: "Adebayo Tolu",
    phone: "+234 801 234 5678",
    email: "adebayotolu@gmail.com",
    verified: true,
  },
  order: {
    id: "ORD-8731",
    date: "03 Oct 2026",
    paymentMethod: "Bank Transfer",
    product: "10-inch tablet - 128 GB - Gray · TAB-10-128-GR",
    missingInformation: ["Device serial number", "Payment proof not attached"],
  },
  description:
    "My tablet arrived this morning with a crack across the screen. The outer box was dented and the screen does not respond properly. I have attached photos and a short video. Please arrange a replacement as soon as possible.",
  channel: "Voice note",
  receivedAt: "07 Oct 2026 · 10:42 AM",
  audioUrl: "",
  transcript:
    "My tablet arrived this morning with a crack across the screen. The outer box was dented and the screen does not respond properly. I have attached photos and a short video. Please arrange a replacement as soon as possible.",
};

export default function ComplaintDetails({
  complaint = defaultComplaint,
  onEditDetails,
}: ComplaintDetailsProps) {
  const [showTranscript, setShowTranscript] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef<HTMLAudioElement>(null);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (!audio || !complaint.audioUrl) return;

    if (audio.paused) {
      await audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const handleSeek = (value: number) => {
    if (!audioRef.current) return;

    audioRef.current.currentTime = value;
    setCurrentTime(value);
  };

  const handleDownload = () => {
    if (!complaint.audioUrl) return;

    const link = document.createElement("a");
    link.href = complaint.audioUrl;
    link.download = `${complaint.id}-voice-note.mp3`;
    link.click();
  };

  const priorityStyles = {
    High: "bg-red-100 text-red-600",
    Medium: "bg-orange-100 text-orange-600",
    Low: "bg-green-100 text-green-600",
  };

  return (
    <div className="w-full space-y-4 text-slate-800">
      {/* Complaint Overview */}
      <section className="space-y-3">
        <h2 className="text-base font-bold">Complaint Details</h2>

        <div className="grid grid-cols-1 gap-5 rounded-lg border border-slate-200 bg-white p-4 md:grid-cols-4 md:divide-x md:divide-slate-200 md:gap-0">
          {/* Complaint ID */}
          <div className="flex flex-col justify-center gap-2 md:pr-5">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-sm font-bold">{complaint.id}</h3>

              <span
                className={`rounded-full px-2 py-1 text-[10px] font-medium ${priorityStyles[complaint.priority]}`}
              >
                {complaint.priority} Priority
              </span>
            </div>

            <div className="space-y-1">
              <p className="text-[10px] text-slate-400">Category</p>
              <p className="text-xs font-medium">{complaint.category}</p>
            </div>

            <span className="w-fit rounded-full bg-purple-100 px-2 py-1 text-[10px] font-medium text-purple-600">
              {complaint.status}
            </span>
          </div>

          {/* Date Received */}
          <div className="flex flex-col justify-center gap-3 md:px-5">
            <p className="text-[10px] text-slate-400">Date Received</p>

            <div className="flex items-center gap-2 text-xs font-medium">
              <CalendarDays size={14} className="text-slate-600" />
              {complaint.dateReceived}
            </div>
          </div>

          {/* Assigned To */}
          <div className="flex flex-col justify-center gap-3 md:px-5">
            <p className="text-[10px] text-slate-400">Assigned To</p>

            <div className="flex items-center gap-2 text-xs font-medium">
              <UserRound size={15} className="text-slate-700" />
              {complaint.assignedTo}
            </div>
          </div>

          {/* Deadline */}
          <div className="flex flex-col justify-center gap-3 md:pl-5">
            <p className="text-[10px] text-slate-400">Deadline</p>

            <div className="flex items-center gap-2 text-xs font-medium text-red-600">
              <Clock size={14} />
              {complaint.deadline}
            </div>

            <p className="text-[10px] text-red-600">Overdue by 1 day</p>
          </div>
        </div>
      </section>

      {/* Customer and Order Information */}
      <section className="rounded-lg border border-slate-200 bg-white p-4">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h3 className="flex items-center gap-2 text-xs font-bold">
            <UserRound size={15} />
            Customer & Order Information
          </h3>

          <button
            onClick={onEditDetails}
            className="flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5 text-[10px] font-semibold transition hover:bg-slate-100"
          >
            <Pencil size={12} />
            Edit Details
          </button>
        </div>

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
          {/* Customer Information */}
          <div className="space-y-2 bg-slate-50 p-3">
            <div>
              <p className="mb-1 text-[10px] text-slate-400">Customer Name</p>
              <p className="text-xs font-semibold">{complaint.customer.name}</p>
            </div>

            <div>
              <p className="mb-1 text-[10px] text-slate-400">Phone Number</p>

              <div className="flex flex-wrap items-center gap-2">
                <Phone size={14} />
                <span className="text-xs font-semibold">
                  {complaint.customer.phone}
                </span>

                {complaint.customer.verified && (
                  <span className="rounded-md bg-teal-100 px-2 py-1 text-[9px] font-medium text-teal-700">
                    Verified
                  </span>
                )}
              </div>
            </div>

            <div>
              <p className="mb-1 text-[10px] text-slate-400">Email</p>
              <p className="text-xs font-semibold">
                {complaint.customer.email}
              </p>
            </div>
          </div>

          {/* Order Information */}
          <div className="space-y-2 bg-slate-50 p-3">
            <div>
              <p className="mb-1 text-[10px] text-slate-400">Order ID</p>
              <p className="text-xs font-semibold">{complaint.order.id}</p>
            </div>

            <div>
              <p className="mb-1 text-[10px] text-slate-400">Order Date</p>
              <div className="flex items-center gap-2 text-xs font-semibold">
                <CalendarDays size={13} />
                {complaint.order.date}
              </div>
            </div>

            <div>
              <p className="mb-1 text-[10px] text-slate-400">Payment Method</p>
              <p className="text-xs font-semibold">
                {complaint.order.paymentMethod}
              </p>
            </div>
          </div>

          {/* Order Details and Missing Information */}
          <div className="space-y-2">
            <div>
              <p className="mb-1 text-[10px] text-slate-400">Order Details</p>
              <p className="text-xs leading-relaxed font-medium">
                {complaint.order.product}
              </p>
            </div>

            {complaint.order.missingInformation.length > 0 && (
              <div className="rounded-md bg-amber-100 p-3">
                <div className="mb-2 flex items-center gap-2 text-amber-700">
                  <AlertTriangle size={15} />
                  <p className="text-[10px] font-bold">Missing Information</p>
                </div>

                <ul className="list-inside list-disc space-y-1 text-[10px] text-amber-800">
                  {complaint.order.missingInformation.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Complaint Description */}
      <section className="rounded-lg border border-slate-200 bg-white p-4">
        <h3 className="mb-3 text-xs font-bold">Complaint Description</h3>

        <div className="mb-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <p className="mb-1 text-[10px] text-slate-400">Channel</p>

            <div className="flex items-center gap-2 text-xs font-semibold">
              <Mic size={14} />
              {complaint.channel}
            </div>
          </div>

          <div>
            <p className="mb-1 text-[10px] text-slate-400">Received</p>

            <p className="text-xs font-semibold">{complaint.receivedAt}</p>
          </div>
        </div>

        {/* Voice Note Player */}
        {complaint.channel === "Voice note" && (
          <div className="rounded-lg border border-slate-100 bg-slate-50 p-2">
            {complaint.audioUrl && (
              <audio
                ref={audioRef}
                src={complaint.audioUrl}
                onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
                onTimeUpdate={(e) =>
                  setCurrentTime(e.currentTarget.currentTime)
                }
                onEnded={() => setIsPlaying(false)}
              />
            )}

            <div className="flex items-center gap-3 rounded-md border border-slate-200 bg-white p-2">
              {/* Play / Pause */}
              <button
                onClick={togglePlayback}
                disabled={!complaint.audioUrl}
                aria-label={isPlaying ? "Pause audio" : "Play audio"}
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-slate-800 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isPlaying ? (
                  <Pause size={16} fill="currentColor" />
                ) : (
                  <Play size={16} fill="currentColor" />
                )}
              </button>

              {/* Current Time */}
              <span className="shrink-0 text-[10px] text-slate-600">
                {formatTime(currentTime)} / {formatTime(duration || 48)}
              </span>

              {/* Progress Bar */}
              <input
                type="range"
                min={0}
                max={duration || 48}
                value={currentTime}
                onChange={(e) => handleSeek(Number(e.target.value))}
                disabled={!complaint.audioUrl}
                className="h-1 min-w-0 flex-1 cursor-pointer accent-red-600 disabled:cursor-not-allowed"
                aria-label="Audio progress"
              />

              {/* Download */}
              <button
                onClick={handleDownload}
                disabled={!complaint.audioUrl}
                aria-label="Download voice note"
                className="shrink-0 p-1 text-slate-700 transition hover:text-red-600 disabled:opacity-40"
              >
                <Download size={16} />
              </button>

              {/* Transcript */}
              <button
                onClick={() => setShowTranscript(!showTranscript)}
                className="shrink-0 px-1 text-[10px] font-medium text-slate-500 transition hover:text-red-600"
              >
                {showTranscript ? "Hide Transcript" : "Transcript"}
              </button>
            </div>

            {/* Transcript Content */}
            {showTranscript && (
              <div className="mt-3 rounded-md border border-slate-200 bg-white p-3">
                <div className="mb-2 flex items-center gap-2">
                  <FileText size={14} />
                  <p className="text-xs font-semibold">Voice Note Transcript</p>
                </div>

                <p className="text-xs leading-relaxed text-slate-600">
                  {complaint.transcript || complaint.description}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Text Complaint */}
        {complaint.channel !== "Voice note" && (
          <div className="rounded-md border border-slate-100 bg-slate-50 p-3">
            <p className="text-xs leading-relaxed text-slate-600">
              {complaint.description}
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
