"use client"

import { useSession } from "@/app/lib/auth-client"
import { useRouter } from "next/navigation"

const FEATURES = [
  {
    id: "onsite-data",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"
          fill="currentColor"
        />
      </svg>
    ),
    label: "Onsite Data",
    description:
      "Real-time ground intelligence from field officers across all constituencies.",
    highlight: true,
    href: "/dashboard/super_admin",
  },
  {
    id: "analytics",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M3 3v18h18M7 16l4-4 4 4 4-6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    label: "Analytics",
    description:
      "Deep-dive polling trends, swing analysis, and voter sentiment tracking.",
    href: "/dashboard/super_admin",
  },
  {
    id: "gis-map",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    label: "GIS Political Map",
    description:
      "Visualise constituency boundaries, voter density and party strongholds on an interactive map.",
    href: "/dashboard/super_admin",
  },
  {
    id: "scenario",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 3v1m0 16v1M4.22 4.22l.707.707m12.02 12.02l.707.707M3 12h1m16 0h1M4.927 19.073l.707-.707M18.364 5.636l.707-.707M12 7a5 5 0 100 10A5 5 0 0012 7z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
    label: "Scenario Simulator",
    description:
      "Model election outcomes under different coalition and swing-vote scenarios.",
    href: "/dashboard/super_admin",
  },
  {
    id: "candidates",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    label: "Candidates",
    description:
      "Manage candidate profiles, campaign metrics, and constituency assignments.",
    href: "/dashboard/super_admin",
  },
  {
    id: "reports",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M9 17H7a2 2 0 01-2-2V5a2 2 0 012-2h10a2 2 0 012 2v3M9 17H17a2 2 0 002-2V9M9 17l-3 3v-3"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    label: "Reports",
    description:
      "Export briefing-ready reports for party leadership and campaign strategists.",
    href: "/dashboard/super_admin",
  },
]

const STATS = [
  { value: "222", label: "Parliament Seats" },
  { value: "13", label: "States Covered" },
  { value: "15M+", label: "Registered Voters" },
  { value: "Real-time", label: "Data Updates" },
]

export default function HomePage() {
  const router = useRouter()
  const { data: session, isPending } = useSession()

  function handleFeatureClick(href: string) {
    if (isPending) return
    if (session) {
      router.push(href)
    } else {
      router.push("/auth/login")
    }
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* ── NAV ── */}
      <nav className="sticky top-0 z-50 border-b border-[#EFEFED] bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-[1200px] items-center justify-between px-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-[6px] bg-[#1E463C] text-[11px] font-bold tracking-wide text-white">
              RP
            </div>
            <span className="text-sm font-semibold tracking-wide text-[#1E463C]">
              RISIK PRN
            </span>
          </div>
          <div className="flex items-center gap-3">
            {session ? (
              <button
                onClick={() => router.push("/dashboard/super_admin")}
                className="h-8 rounded-[6px] bg-[#1E463C] px-4 text-sm font-medium text-white transition-colors hover:bg-[#22493e]/90"
              >
                Go to Dashboard
              </button>
            ) : (
              <>
                <button
                  onClick={() => router.push("/auth/login")}
                  className="h-8 rounded-[6px] border border-[#DDDDDB] px-4 text-sm font-medium text-[#1E463C] transition-colors hover:bg-[#F8F9FA]"
                >
                  Sign In
                </button>
                <button
                  onClick={() => router.push("/auth/first_login")}
                  className="h-8 rounded-[6px] bg-[#1E463C] px-4 text-sm font-medium text-white transition-colors hover:bg-[#22493e]/90"
                >
                  Get Access
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="mx-auto max-w-[1200px] px-6 pt-20 pb-16 text-center">
        <span className="mb-4 inline-block rounded-full bg-[#D1E99E] px-3 py-1 text-xs font-semibold tracking-wide text-[#1E463C] uppercase">
          Malaysia&apos;s Political Intelligence Platform
        </span>
        <h1 className="mx-auto max-w-3xl text-[52px] leading-[1.12] font-bold text-[#1B1B21]">
          Win Elections with <span className="text-[#1E463C]">Data-Driven</span>{" "}
          Strategy
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-[#5C5C5F]">
          RISIK PRN unifies onsite field data, GIS mapping, and predictive
          analytics to give political teams a decisive edge across all 222
          parliament seats.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <button
            onClick={() => handleFeatureClick("/dashboard/super_admin")}
            className="h-11 rounded-[8px] bg-[#1E463C] px-7 text-sm font-medium text-white transition-colors hover:bg-[#22493e]/90"
          >
            Enter Dashboard
          </button>
          <button
            onClick={() => router.push("/auth/login")}
            className="h-11 rounded-[8px] border border-[#DDDDDB] px-7 text-sm font-medium text-[#1B1B21] transition-colors hover:bg-[#F8F9FA]"
          >
            Sign In
          </button>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="border-y border-[#EFEFED] bg-[#F8F9FA]">
        <div className="mx-auto grid max-w-[1200px] grid-cols-2 gap-6 px-6 py-8 md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl font-bold text-[#1E463C]">{s.value}</p>
              <p className="mt-1 text-sm text-[#5C5C5F]">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="mx-auto max-w-[1200px] px-6 py-20">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-[#1B1B21]">
            Everything your campaign needs
          </h2>
          <p className="mt-3 text-[#5C5C5F]">
            One platform for field intelligence, analytics, and strategic
            planning.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <button
              key={f.id}
              onClick={() => handleFeatureClick(f.href)}
              className={`group cursor-pointer rounded-[14px] border p-6 text-left transition-all ${
                f.highlight
                  ? "border-[#1E463C] bg-[#1E463C] text-white shadow-lg shadow-[#1E463C]/20 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#1E463C]/30"
                  : "border-[#E4E4E2] bg-white hover:-translate-y-0.5 hover:border-[#1E463C]/40 hover:shadow-md"
              }`}
            >
              <div
                className={`mb-4 flex h-10 w-10 items-center justify-center rounded-[10px] ${
                  f.highlight
                    ? "bg-white/15 text-white"
                    : "bg-[#F0F7F4] text-[#1E463C]"
                }`}
              >
                {f.icon}
              </div>
              <h3
                className={`mb-1.5 text-[15px] font-semibold ${f.highlight ? "text-white" : "text-[#1B1B21]"}`}
              >
                {f.label}
                {f.highlight && (
                  <span className="ml-2 rounded-full bg-[#D1E99E] px-2 py-0.5 align-middle text-[10px] font-bold text-[#1E463C]">
                    LIVE
                  </span>
                )}
              </h3>
              <p
                className={`text-sm leading-relaxed ${f.highlight ? "text-white/75" : "text-[#5C5C5F]"}`}
              >
                {f.description}
              </p>
              <div
                className={`mt-4 flex items-center gap-1 text-xs font-medium ${
                  f.highlight
                    ? "text-[#D1E99E]"
                    : "text-[#1E463C] opacity-0 group-hover:opacity-100"
                } transition-opacity`}
              >
                Open
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 12h14M13 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-[#EFEFED] bg-[#F8F9FA]">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-3 px-6 py-8 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-[5px] bg-[#1E463C] text-[9px] font-bold text-white">
              RP
            </div>
            <span className="text-sm text-[#5C5C5F]">
              RISIK PRN — Political Analysis CRM
            </span>
          </div>
          <p className="text-xs text-[#5C5C5F]">
            © {new Date().getFullYear()} RISIK PRN. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
