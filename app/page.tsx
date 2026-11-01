import Link from "next/link";
import {
  ArrowRight,
  MessageCircle,
  ClipboardCheck,
  Users,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Headset,
} from "lucide-react";

const features = [
  {
    icon: MessageCircle,
    title: "Multi-channel intake",
    description:
      "Receive customer complaints through WhatsApp and web forms in one streamlined system.",
  },
  {
    icon: ClipboardCheck,
    title: "Smart complaint tracking",
    description:
      "Keep complaint details, attachments, priorities, and resolution progress organized.",
  },
  {
    icon: Users,
    title: "Seamless team handover",
    description:
      "Give staff the context they need to take over complaints without making customers repeat themselves.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Navbar */}
      <header className="border-b border-slate-100">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white">
              <Headset size={22} />
            </div>
            <span className="text-xl font-bold tracking-tight">CCTS</span>
          </Link>

          <div className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
            <a href="#features" className="transition hover:text-emerald-600">
              Features
            </a>
            <a
              href="#how-it-works"
              className="transition hover:text-emerald-600"
            >
              How it works
            </a>
            <a href="#about" className="transition hover:text-emerald-600">
              About
            </a>
          </div>

          <Link
            href="/login"
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            Get started
            <ArrowRight size={16} />
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <section className="overflow-hidden bg-gradient-to-b from-emerald-50/70 to-white">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-20 md:py-28 lg:grid-cols-2 lg:px-8">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-white px-4 py-2 text-sm font-medium text-emerald-700 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Smarter complaint management
            </div>

            <h1 className="max-w-xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Every complaint deserves a{" "}
              <span className="text-emerald-600">better response.</span>
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-8 text-slate-600">
              Receive, track, and resolve customer complaints in one place. CCTS
              helps your team respond faster and deliver better customer
              experiences.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700"
              >
                Get started
                <ArrowRight size={18} />
              </Link>

              <a
                href="#features"
                className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-6 py-3.5 font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Explore features
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-500">
              <span className="flex items-center gap-2">
                <CheckCircle2 size={17} className="text-emerald-600" />
                WhatsApp and web forms
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 size={17} className="text-emerald-600" />
                English and Nigerian Pidgin
              </span>
            </div>
          </div>

          {/* Complaint dashboard preview */}
          <div className="relative">
            <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-emerald-200/40 blur-3xl" />
            <div className="absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-teal-100/60 blur-3xl" />

            <div className="relative rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-200/70 sm:p-7">
              <div className="flex items-center justify-between border-b border-slate-100 pb-5">
                <div>
                  <p className="text-sm text-slate-500">Welcome back</p>
                  <h2 className="mt-1 text-xl font-bold">Complaint overview</h2>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <ClipboardCheck size={22} />
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">Open complaints</p>
                  <p className="mt-2 text-3xl font-bold">24</p>
                  <p className="mt-1 text-xs text-amber-600">
                    Awaiting resolution
                  </p>
                </div>

                <div className="rounded-xl bg-emerald-50 p-4">
                  <p className="text-sm text-slate-500">Resolved</p>
                  <p className="mt-2 text-3xl font-bold text-emerald-700">86</p>
                  <p className="mt-1 text-xs text-emerald-700">
                    Successfully handled
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-semibold">Recent complaints</h3>
                  <span className="text-xs font-medium text-emerald-600">
                    Latest activity
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 rounded-xl border border-slate-100 p-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                      <MessageCircle size={19} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold">
                        Delayed order delivery
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        WhatsApp · #CCTS-1024
                      </p>
                    </div>
                    <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">
                      Open
                    </span>
                  </div>

                  <div className="flex items-center gap-3 rounded-xl border border-slate-100 p-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                      <Clock size={19} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold">
                        Payment confirmation issue
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        Web form · #CCTS-1023
                      </p>
                    </div>
                    <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
                      In progress
                    </span>
                  </div>

                  <div className="flex items-center gap-3 rounded-xl border border-slate-100 p-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                      <ShieldCheck size={19} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold">
                        Incorrect item received
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        WhatsApp · #CCTS-1022
                      </p>
                    </div>
                    <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                      Resolved
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex items-center gap-3 rounded-xl bg-slate-50 p-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-emerald-600 shadow-sm">
                  <CheckCircle2 size={19} />
                </div>
                <p className="text-sm leading-6 text-slate-600">
                  Keep every complaint organized, from the first message to
                  final resolution.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-6 py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-emerald-600">
              Built for better service
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Everything you need to manage complaints
            </h2>
            <p className="mt-5 leading-7 text-slate-600">
              Simplify how complaints are received, managed, and resolved while
              keeping your team and customers informed.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-slate-200 bg-white p-7 transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl hover:shadow-slate-200/50"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <Icon size={24} />
                  </div>
                  <h3 className="mt-6 text-lg font-bold">{feature.title}</h3>
                  <p className="mt-3 leading-7 text-slate-600">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section
        id="how-it-works"
        className="bg-slate-50 px-6 py-20 lg:px-8 lg:py-24"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-emerald-600">
              How it works
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              From first message to final resolution.
            </h2>
            <p className="mt-5 max-w-lg leading-7 text-slate-600">
              CCTS brings complaint intake and resolution into one organized
              workflow, helping your team deliver timely and consistent support.
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                number: "01",
                title: "Receive the complaint",
                description:
                  "Customers submit their issues through WhatsApp or a web form.",
              },
              {
                number: "02",
                title: "Process and organize",
                description:
                  "The system records details, retains evidence, and requests missing information.",
              },
              {
                number: "03",
                title: "Review and resolve",
                description:
                  "Staff take over when needed, manage the case, and record the resolution.",
              },
            ].map((step) => (
              <div key={step.number} className="flex gap-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-600 font-bold text-white">
                  {step.number}
                </div>
                <div>
                  <h3 className="font-bold">{step.title}</h3>
                  <p className="mt-2 leading-7 text-slate-600">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="about" className="px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-3xl bg-emerald-700 px-6 py-14 text-center text-white sm:px-12 sm:py-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Make every complaint count.
          </h2>
          <p className="mx-auto mt-5 max-w-xl leading-7 text-emerald-50">
            Bring your complaint management workflow together and help your team
            deliver better customer experiences.
          </p>
          <Link
            href="/login"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3.5 font-semibold text-emerald-700 transition hover:bg-emerald-50"
          >
            Get started
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 px-6 py-7 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-sm text-slate-500 sm:flex-row">
          <Link href="/" className="font-bold text-slate-900">
            CCTS
          </Link>
          <p>
            © 2026 CCTS. Customer complaints, handled
            better.
          </p>
        </div>
      </footer>
    </main>
  );
}
