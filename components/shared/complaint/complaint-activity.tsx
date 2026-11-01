"use client";

import { useRef, useState, type FormEvent, type ChangeEvent } from "react";
import {
  Paperclip,
  Send,
  Image as ImageIcon,
  Video,
  FileText,
  Mic,
  X,
  CheckCircle2,
  Clock,
  MessageSquare,
  StickyNote,
  Download,
} from "lucide-react";

// ---------------------------------------------
// Types
// ---------------------------------------------

export interface ComplaintAttachment {
  id: string;
  name: string;
  type: "image" | "video" | "audio" | "document";
  url: string;
  size: string;
}

export interface ComplaintMessage {
  id: string;
  sender: string;
  role: "customer" | "staff";
  message: string;
  timestamp: string;
  avatar?: string;
  attachments?: ComplaintAttachment[];
}

export interface ComplaintActivityEvent {
  id: string;
  type: "internal-note" | "status-update";
  title: string;
  description: string;
  timestamp: string;
}

type ConversationItem =
  | ({ kind: "message" } & ComplaintMessage)
  | ({ kind: "event" } & ComplaintActivityEvent);

interface ComplaintActivityProps {
  attachments?: ComplaintAttachment[];
  initialMessages?: ComplaintMessage[];
  initialEvents?: ComplaintActivityEvent[];
  onSendMessage?: (message: string, files: File[]) => void;
  onViewAllAttachments?: () => void;
  onViewFullHistory?: () => void;
}

// ---------------------------------------------
// Sample Data
// ---------------------------------------------

const defaultAttachments: ComplaintAttachment[] = [
  {
    id: "1",
    name: "screen_damage.jpg",
    type: "image",
    url: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400",
    size: "2.4 MB",
  },
  {
    id: "2",
    name: "cracked_device.jpg",
    type: "image",
    url: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400",
    size: "1.8 MB",
  },
  {
    id: "3",
    name: "damaged_phone.jpg",
    type: "image",
    url: "https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?w=400",
    size: "2.1 MB",
  },
  {
    id: "4",
    name: "unboxing_video.mp4",
    type: "video",
    url: "https://images.unsplash.com/photo-1607082349566-187342175e2f?w=400",
    size: "2.4 MB",
  },
  {
    id: "5",
    name: "damaged_box.jpg",
    type: "image",
    url: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=400",
    size: "1.8 MB",
  },
  {
    id: "6",
    name: "product_package.jpg",
    type: "image",
    url: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400",
    size: "1.5 MB",
  },
];

const defaultMessages: ComplaintMessage[] = [
  {
    id: "1",
    sender: "Adebayo Tolu",
    role: "customer",
    timestamp: "07 Oct 2026, 10:24 AM",
    message:
      "My tablet arrived this morning with a crack across the screen. The outer box was dented and the screen does not respond properly. I have attached photos and a short video. Please arrange a replacement as soon as possible. The tablet screen is cracked and touch isn't working. The box was dented when it arrived. I need a replacement, please.",
  },
  {
    id: "2",
    sender: "Jordan Ladipo",
    role: "staff",
    timestamp: "07 Oct 2026, 10:25 AM",
    message:
      "Hello Adebayo, I'm sorry about this.\nWe will review and get back to you shortly.",
  },
  {
    id: "3",
    sender: "Adebayo Tolu",
    role: "customer",
    timestamp: "07 Oct 2026, 11:20 AM",
    message: "Thank you, I look forward to your response.",
  },
];

const defaultEvents: ComplaintActivityEvent[] = [
  {
    id: "1",
    type: "internal-note",
    title: "Internal Note",
    description:
      "Customer provided clear photos and video.\nItem is still under warranty. Recommend replacement",
    timestamp: "07 Oct 2026, 11:00 AM",
  },
  {
    id: "2",
    type: "status-update",
    title: "Status Updated",
    description: "Status changed from New to In Progress",
    timestamp: "07 Oct 2026, 11:00 AM",
  },
];

// ---------------------------------------------
// Helper Components
// ---------------------------------------------

function Avatar({ name, role }: { name: string; role: "customer" | "staff" }) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white ${
        role === "customer" ? "bg-[#173252]" : "bg-teal-600"
      }`}
    >
      {initials}
    </div>
  );
}

function AttachmentIcon({ type }: { type: ComplaintAttachment["type"] }) {
  const iconClass = "h-5 w-5";

  switch (type) {
    case "image":
      return <ImageIcon className={iconClass} />;
    case "video":
      return <Video className={iconClass} />;
    case "audio":
      return <Mic className={iconClass} />;
    default:
      return <FileText className={iconClass} />;
  }
}

// ---------------------------------------------
// Evidence & Attachments
// ---------------------------------------------

function EvidenceAttachments({
  attachments,
  onViewAll,
}: {
  attachments: ComplaintAttachment[];
  onViewAll?: () => void;
    }) {
    
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-800">
          Evidence & Attachments
        </h3>

        <button
          onClick={onViewAll}
          className="rounded-md border border-slate-200 px-3 py-1.5 text-[10px] font-semibold text-slate-600 transition hover:bg-slate-50"
        >
          View All ({attachments.length})
        </button>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-1">
        {attachments.map((attachment) => (
          <a
            key={attachment.id}
            href={attachment.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group w-[88px] shrink-0"
          >
            <div className="relative mb-1.5 flex h-[90px] w-full items-center justify-center overflow-hidden rounded-md border border-slate-200 bg-slate-100">
              {attachment.type === "image" ? (
                <img
                  src={attachment.url}
                  alt={attachment.name}
                  className="h-full w-full object-cover transition duration-200 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-slate-500">
                  <AttachmentIcon type={attachment.type} />
                  <span className="text-[9px] uppercase">
                    {attachment.type}
                  </span>
                </div>
              )}

              <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/20">
                <Download className="h-5 w-5 text-white opacity-0 group-hover:opacity-100" />
              </div>
            </div>

            <p className="truncate text-[10px] font-medium text-slate-700">
              {attachment.name}
            </p>

            <p className="mt-0.5 text-[9px] text-slate-400">
              {attachment.type.toUpperCase()} · {attachment.size}
            </p>
          </a>
        ))}
      </div>
    </section>
  );
}

// ---------------------------------------------
// Conversation Message
// ---------------------------------------------

function MessageItem({ message }: { message: ComplaintMessage }) {
  return (
    <div className="flex items-start gap-2">
      <Avatar name={message.sender} role={message.role} />

      <div className="min-w-0 flex-1">
        <div className="mb-1 flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-semibold text-slate-800">
            {message.sender}
          </span>

          <span className="text-[10px] text-slate-400">
            ({message.role === "customer" ? "Customer" : "Staff"})
          </span>
        </div>

        <p className="mb-2 text-[10px] text-slate-500">{message.timestamp}</p>

        <div
          className={`w-full rounded-md border p-3 text-[11px] leading-relaxed whitespace-pre-line ${
            message.role === "customer"
              ? "border-slate-200 bg-slate-50 text-slate-700"
              : "border-slate-200 bg-slate-50 text-slate-700"
          }`}
        >
          {message.message}

          {message.attachments && message.attachments.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {message.attachments.map((file) => (
                <a
                  key={file.id}
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-md border border-slate-200 bg-white px-2 py-1.5 text-[10px] hover:bg-slate-50"
                >
                  <AttachmentIcon type={file.type} />
                  {file.name}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------
// Internal Note
// ---------------------------------------------

function InternalNote({ event }: { event: ComplaintActivityEvent }) {
  return (
    <div className="flex items-start gap-2">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-600">
        <StickyNote size={15} />
      </div>

      <div className="min-w-0 flex-1">
        <h4 className="mb-1 text-[11px] font-semibold text-slate-800">
          {event.title}
        </h4>

        <p className="mb-2 text-[10px] text-slate-500">{event.timestamp}</p>

        <div className="rounded-md border border-amber-200 bg-amber-100 p-3 text-[11px] leading-relaxed whitespace-pre-line text-amber-800">
          {event.description}
        </div>

        <p className="mt-1.5 text-[10px] text-slate-500">
          Visible to staff only
        </p>
      </div>
    </div>
  );
}

// ---------------------------------------------
// Status Update
// ---------------------------------------------

function StatusUpdate({ event }: { event: ComplaintActivityEvent }) {
  return (
    <div className="flex items-start gap-2">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-teal-600 text-white">
        <CheckCircle2 size={17} />
      </div>

      <div className="min-w-0 flex-1">
        <h4 className="mb-1 text-[11px] font-semibold text-slate-800">
          {event.title}
        </h4>

        <p className="mb-3 text-[10px] text-slate-500">{event.timestamp}</p>

        <p className="text-[10px] text-slate-500">
          {event.description.split("New")[0]}
          {event.description.includes("New") && (
            <>
              <span className="font-semibold text-slate-800">New</span>
              {" to "}
              <span className="font-semibold text-slate-800">
                {event.description.split(" to ").slice(1).join(" to ")}
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
}

// ---------------------------------------------
// Main Component
// ---------------------------------------------

export default function ComplaintActivity({
  attachments = defaultAttachments,
  initialMessages = defaultMessages,
  initialEvents = defaultEvents,
  onSendMessage,
  onViewAllAttachments,
  onViewFullHistory,
}: ComplaintActivityProps) {
  const [messages, setMessages] = useState(initialMessages);
  const [events] = useState(initialEvents);
  const [message, setMessage] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Merge messages and events into chronological activity
  const activity: ConversationItem[] = [
    ...messages.map((item) => ({
      ...item,
      kind: "message" as const,
    })),
    ...events.map((item) => ({
      ...item,
      kind: "event" as const,
    })),
  ];

  const sortedActivity = [...activity].sort(
    (a, b) =>
      new Date(a.timestamp.replace(" at ", " ")).getTime() -
      new Date(b.timestamp.replace(" at ", " ")).getTime(),
  );

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);

    setSelectedFiles((prev) => [...prev, ...files]);

    // Allow selecting the same file again
    e.target.value = "";
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!message.trim() && selectedFiles.length === 0) return;

    const newMessage: ComplaintMessage = {
      id: crypto.randomUUID(),
      sender: "Jordan Ladipo",
      role: "staff",
      timestamp: new Date().toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      message: message.trim(),
    };

    setMessages((prev) => [...prev, newMessage]);

    onSendMessage?.(message.trim(), selectedFiles);

    setMessage("");
    setSelectedFiles([]);
  };

  return (
    <div className="space-y-4">
      {/* Evidence & Attachments */}
      <EvidenceAttachments
        attachments={attachments}
        onViewAll={onViewAllAttachments}
      />

      {/* Conversation / Activity */}
      <section className="rounded-lg border border-slate-200 bg-white p-4">
        {/* Header */}
        <div className="mb-5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-slate-800">
              Conversation / Activity
            </h3>
          </div>

          <button
            onClick={onViewFullHistory}
            className="shrink-0 rounded-md border border-slate-200 px-3 py-1.5 text-[10px] font-semibold text-slate-600 transition hover:bg-slate-50"
          >
            View Full History
          </button>
        </div>

        {/* Activity Timeline */}
        <div className="space-y-4">
          {sortedActivity.map((item) => {
            if (item.kind === "message") {
              return <MessageItem key={`message-${item.id}`} message={item} />;
            }

            if (item.type === "internal-note") {
              return <InternalNote key={`event-${item.id}`} event={item} />;
            }

            return <StatusUpdate key={`event-${item.id}`} event={item} />;
          })}
        </div>

        {/* Message Composer */}
        <form
          onSubmit={handleSendMessage}
          className="mt-5 border-t border-slate-100 pt-4"
        >
          {/* Selected Attachments */}
          {selectedFiles.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-2">
              {selectedFiles.map((file, index) => (
                <div
                  key={`${file.name}-${index}`}
                  className="flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-2 py-1.5"
                >
                  <FileText size={13} className="text-slate-500" />

                  <span className="max-w-[140px] truncate text-[10px] text-slate-600">
                    {file.name}
                  </span>

                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="text-slate-400 hover:text-red-500"
                    aria-label={`Remove ${file.name}`}
                  >
                    <X size={13} />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="flex items-end gap-3">
            <div className="flex min-h-[48px] flex-1 items-center gap-2 rounded-md border border-slate-200 bg-white px-3 focus-within:border-teal-500">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message........"
                rows={1}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    e.currentTarget.form?.requestSubmit();
                  }
                }}
                className="max-h-28 min-h-[40px] flex-1 resize-none bg-transparent py-3 text-[11px] text-slate-700 outline-none placeholder:text-slate-400"
              />

              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*,video/*,audio/*,.pdf,.doc,.docx"
                onChange={handleFileChange}
                className="hidden"
              />

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="shrink-0 p-1 text-slate-500 transition hover:text-teal-600"
                aria-label="Attach files"
              >
                <Paperclip size={17} />
              </button>
            </div>

            <button
              type="submit"
              disabled={!message.trim() && selectedFiles.length === 0}
              className="flex h-11 w-11 shrink-0 items-center justify-center bg-teal-600 text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Send message"
            >
              <Send size={17} />
            </button>
          </div>

          <p className="mt-2 text-[9px] text-slate-400">
            Press Enter to send · Shift + Enter for a new line
          </p>
        </form>
      </section>
    </div>
  );
}
