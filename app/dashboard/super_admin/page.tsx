"use client"

import { useEffect, useRef, useState } from "react"

// ─── DATA ────────────────────────────────────────────────────────────────────

const DATA = {
  header: {
    title: "Analytics Overview",
    subtitle:
      "Comprehensive political performance & constituency analysis — hover any element for details",
    filters: [
      { id: "year", current: "2023", options: ["2021", "2022", "2023"] },
      {
        id: "region",
        current: "Johor Bahru",
        options: ["Johor Bahru", "Melaka", "Penang"],
      },
      {
        id: "party",
        current: "All Parties",
        options: ["All Parties", "Coalition"],
      },
    ],
  },
  topMetrics: [
    {
      id: "total_seats",
      label: "Total Seats",
      value: 88,
      unit: "Seats",
      bg: "#EBEDFC",
      stroke: "#5D6DEA",
      tooltip: "Total contested seats across all regions",
    },
    {
      id: "strong",
      label: "Strong",
      value: 48,
      unit: "Seats",
      bg: "#EBF2F0",
      stroke: "#397968",
      tooltip: "Seats with >60% support — up 3 from last cycle",
      trend: "+3",
    },
    {
      id: "competitive",
      label: "Competitive",
      value: 23,
      unit: "Seats",
      bg: "#FAEECF",
      stroke: "#E5A90F",
      tooltip: "Seats within ±10% margin — critical battlegrounds",
      trend: "-1",
    },
    {
      id: "risk",
      label: "Risk",
      value: 15,
      unit: "Seats",
      bg: "#FFE5DF",
      stroke: "#FF7D60",
      tooltip: "Seats below 40% support — priority intervention needed",
      trend: "+2",
    },
    {
      id: "momentum",
      label: "Momentum",
      value: "+4.8%",
      unit: "",
      bg: "#E7F1F8",
      stroke: "#5D6DEA",
      tooltip: "Overall support swing vs. previous month",
    },
  ],
  partyDist: [
    { name: "Party A", pct: 45, color: "#4CAF82" },
    { name: "Party B", pct: 35, color: "#21483B" },
    { name: "Party C", pct: 20, color: "#FF7A53" },
  ],
  trendLabels: ["May 05", "May 10", "May 15", "May 20", "May 25", "May 30"],
  trendData: [
    { name: "Party A", color: "#4CAF82", data: [52, 55, 58, 57, 60, 63] },
    { name: "Party B", color: "#21483B", data: [45, 44, 47, 50, 48, 51] },
    { name: "Party C", color: "#FF7A53", data: [38, 36, 34, 35, 33, 32] },
  ],
  risk: [
    {
      label: "Johor Bahru",
      pct: 90,
      color: "#FF7D60",
      status: "High Risk",
      support: "32%",
    },
    {
      label: "Johor South",
      pct: 45,
      color: "#E5A90F",
      status: "Competitive",
      support: "55%",
    },
    {
      label: "Melaka West",
      pct: 75,
      color: "#4CAF82",
      status: "Strong",
      support: "75%",
    },
    {
      label: "Melaka North",
      pct: 60,
      color: "#E5A90F",
      status: "Competitive",
      support: "60%",
    },
    {
      label: "Penang East",
      pct: 78,
      color: "#FF7D60",
      status: "At Risk",
      support: "41%",
    },
  ],
  topPerforming: {
    val: "91%",
    label: "Support",
    items: [
      "Johor Bahru — 91% support",
      "Melaka West — 75% support",
      "+5.1% momentum this week",
    ],
  },
  stateRows: [
    { name: "Strong Seats", v1: 21, v2: 48 },
    { name: "Competitive", v1: 15, v2: 23 },
    { name: "Risk", v1: 6, v2: 15 },
    { name: "Health Score", v1: "62%", v2: "78%" },
  ],
  candidates: [
    {
      name: "Wan Hafiz Ghani",
      party: "PAP",
      constituency: "Johor Bahru",
      support: 62,
      status: "Strong",
    },
    {
      name: "Amir Hafiz Ghani",
      party: "PAP",
      constituency: "Malacca",
      support: 38,
      status: "Risk",
    },
    {
      name: "Siti Rahimah",
      party: "PKR",
      constituency: "Johor Bahru",
      support: 55,
      status: "Strong",
    },
    {
      name: "Wan Hafiz Ghani",
      party: "PAP",
      constituency: "Penang",
      support: 52,
      status: "Strong",
    },
    {
      name: "Azman bin Rais",
      party: "BN",
      constituency: "Johor Bahru",
      support: 44,
      status: "Competitive",
    },
  ],
  keyFindings: [
    {
      text: "Johor gained",
      highlight: "+4% support",
      rest: " vs. last quarter.",
    },
    {
      text: "Malacca has ",
      highlight: "3 high-risk constituencies",
      rest: " needing urgent attention.",
    },
    { text: "", highlight: "Party A", rest: " leads support in both states." },
    {
      text: "Candidate engagement improved by ",
      highlight: "12%",
      rest: " this cycle.",
    },
    {
      text: "Profile updates logged ",
      highlight: "1 hour ago",
      rest: " by Sarah.",
    },
    {
      text: "State analysis revised ",
      highlight: "2 hours ago",
      rest: " by Admin.",
    },
  ],
  reports: [
    "Domestic Analytics Report",
    "Executive Analysis",
    "Electoral Performance Report",
    "Political Sentiment Report",
    "Overall Performance Report",
    "Political Blueprint Report",
  ],
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function useChartJs(
  callback: (ctx: CanvasRenderingContext2D, Chart: unknown) => unknown
) {
  const ref = useRef(null)
  const chartRef = useRef(null)

  useEffect(() => {
    if (!ref.current) return
    const ctx = ref.current.getContext("2d")
    if (chartRef.current) chartRef.current.destroy()

    const build = () => {
      chartRef.current = callback(ctx, window.Chart)
    }

    if (window.Chart) {
      build()
    } else {
      const script = document.createElement("script")
      script.src =
        "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.js"
      script.onload = build
      document.head.appendChild(script)
    }

    return () => {
      if (chartRef.current) chartRef.current.destroy()
    }
  }, [])

  return ref
}

function Tooltip({ text, children }) {
  const [show, setShow] = useState(false)
  return (
    <div
      style={{ position: "relative", display: "inline-flex" }}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && (
        <div
          style={{
            position: "absolute",
            bottom: "calc(100% + 6px)",
            left: "50%",
            transform: "translateX(-50%)",
            background: "#1e2024",
            color: "#fff",
            fontSize: 11,
            padding: "5px 10px",
            borderRadius: 6,
            whiteSpace: "nowrap",
            zIndex: 100,
            pointerEvents: "none",
            boxShadow: "0 2px 8px rgba(0,0,0,0.18)",
          }}
        >
          {text}
          <div
            style={{
              position: "absolute",
              top: "100%",
              left: "50%",
              transform: "translateX(-50%)",
              borderLeft: "5px solid transparent",
              borderRight: "5px solid transparent",
              borderTop: "5px solid #1e2024",
            }}
          />
        </div>
      )}
    </div>
  )
}

// ─── SUB-COMPONENTS ──────────────────────────────────────────────────────────

function MetricCard({ card }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff",
        border: `1px solid ${hovered ? "#c0c4d8" : "#DDDDDB"}`,
        borderRadius: 12,
        padding: 14,
        position: "relative",
        cursor: "default",
        transition: "border-color 0.15s, box-shadow 0.15s",
        boxShadow: hovered
          ? "0 4px 16px rgba(93,109,234,0.10)"
          : "0 1px 3px rgba(0,0,0,0.05)",
      }}
    >
      {hovered && (
        <div
          style={{
            position: "absolute",
            bottom: "calc(100% + 8px)",
            left: "50%",
            transform: "translateX(-50%)",
            background: "#1e2024",
            color: "#fff",
            fontSize: 11,
            padding: "6px 12px",
            borderRadius: 7,
            whiteSpace: "nowrap",
            zIndex: 200,
            pointerEvents: "none",
            lineHeight: 1.5,
          }}
        >
          {card.tooltip}
          {card.trend && (
            <>
              <br />
              <strong>{card.trend} vs last cycle</strong>
            </>
          )}
          <div
            style={{
              position: "absolute",
              top: "100%",
              left: "50%",
              transform: "translateX(-50%)",
              borderLeft: "5px solid transparent",
              borderRight: "5px solid transparent",
              borderTop: "5px solid #1e2024",
            }}
          />
        </div>
      )}
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: 6,
          background: card.bg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 10,
        }}
      >
        <svg width="15" height="15" viewBox="0 0 30 30" fill="none">
          <path
            d="M15.75 11.25L14.25 11.25C12.1 11.25 10.65 13.55 11.5 15.62C11.61 15.91 11.88 16.1 12.18 16.1H12.71C12.89 16.1 13.04 16.22 13.09 16.4L13.77 19.24C13.91 19.83 14.42 20.25 15 20.25C15.58 20.25 16.09 19.83 16.23 19.24L16.91 16.4C16.96 16.22 17.11 16.1 17.29 16.1H17.82C18.12 16.1 18.39 15.91 18.5 15.62C19.35 13.55 17.9 11.25 15.75 11.25Z"
            stroke={card.stroke}
            strokeWidth="2"
          />
          <circle
            cx="15"
            cy="9.37"
            r="1.87"
            stroke={card.stroke}
            strokeWidth="2"
          />
        </svg>
      </div>
      <div
        style={{
          fontSize: 10,
          fontWeight: 500,
          color: "#888",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
        }}
      >
        {card.label}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 5,
          marginTop: 4,
        }}
      >
        <span style={{ fontSize: 22, fontWeight: 600, color: "#111" }}>
          {card.value}
        </span>
        {card.unit && (
          <span style={{ fontSize: 11, color: "#aaa" }}>{card.unit}</span>
        )}
        {card.trend && (
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: card.trend.startsWith("+") ? "#16a34a" : "#dc2626",
            }}
          >
            {card.trend}
          </span>
        )}
      </div>
    </div>
  )
}

function DonutChart() {
  const [centerVal, setCenterVal] = useState("45%")
  const [centerLbl, setCenterLbl] = useState("Top Distribution")
  const canvasRef = useChartJs((ctx, Chart) => {
    return new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: DATA.partyDist.map((d) => d.name),
        datasets: [
          {
            data: DATA.partyDist.map((d) => d.pct),
            backgroundColor: DATA.partyDist.map((d) => d.color),
            borderWidth: 3,
            borderColor: "#fff",
            hoverOffset: 10,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "65%",
        rotation: -90,
        circumference: 180,
        plugins: {
          legend: { display: false },
          tooltip: { callbacks: { label: (c) => ` ${c.label}: ${c.parsed}%` } },
        },
        onHover: (e, els) => {
          if (els.length) {
            const i = els[0].index
            setCenterVal(DATA.partyDist[i].pct + "%")
            setCenterLbl(DATA.partyDist[i].name)
          } else {
            setCenterVal("45%")
            setCenterLbl("Top Distribution")
          }
        },
      },
    })
  })

  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #DDDDDB",
        borderRadius: 12,
        padding: 16,
        height: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <span style={{ fontSize: 13, fontWeight: 600, color: "#111" }}>
          Party distribution
        </span>
        <span style={{ fontSize: 11, color: "#aaa", cursor: "pointer" }}>
          Party Share ▾
        </span>
      </div>
      <div
        style={{
          position: "relative",
          height: 110,
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
        }}
      >
        <canvas
          ref={canvasRef}
          role="img"
          aria-label="Party distribution semi-circle chart"
        />
        <div
          style={{
            position: "absolute",
            bottom: 4,
            textAlign: "center",
            pointerEvents: "none",
          }}
        >
          <div style={{ fontSize: 20, fontWeight: 700, color: "#111" }}>
            {centerVal}
          </div>
          <div style={{ fontSize: 10, color: "#888" }}>{centerLbl}</div>
        </div>
      </div>
      <div
        style={{ display: "flex", gap: 12, marginTop: 10, flexWrap: "wrap" }}
      >
        {DATA.partyDist.map((d) => (
          <Tooltip key={d.name} text={`${d.name}: ${d.pct}% of seats`}>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                fontSize: 11,
                color: "#555",
                cursor: "default",
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: d.color,
                  display: "inline-block",
                }}
              />
              {d.name} — {d.pct}%
            </span>
          </Tooltip>
        ))}
      </div>
    </div>
  )
}

function TrendChart() {
  const canvasRef = useChartJs((ctx, Chart) => {
    return new Chart(ctx, {
      type: "line",
      data: {
        labels: DATA.trendLabels,
        datasets: DATA.trendData.map((d) => ({
          label: d.name,
          data: d.data,
          borderColor: d.color,
          backgroundColor: d.color + "18",
          borderDash: [],
          borderWidth: 2.5,
          tension: 0.4,
          pointRadius: 3,
          pointHoverRadius: 7,
          fill: false,
        })),
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: "index", intersect: false },
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: { label: (c) => ` ${c.dataset.label}: ${c.parsed.y}%` },
          },
        },
        scales: {
          x: { grid: { display: false }, ticks: { font: { size: 10 } } },
          y: {
            grid: { color: "rgba(0,0,0,0.04)" },
            ticks: { font: { size: 10 }, callback: (v) => v + "%" },
            min: 25,
            max: 70,
          },
        },
      },
    })
  })

  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #DDDDDB",
        borderRadius: 12,
        padding: 16,
        height: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <span style={{ fontSize: 13, fontWeight: 600, color: "#111" }}>
          Political performance trend
        </span>
        <span style={{ fontSize: 11, color: "#aaa", cursor: "pointer" }}>
          Unit Status ▾
        </span>
      </div>
      <div style={{ position: "relative", height: 160 }}>
        <canvas
          ref={canvasRef}
          role="img"
          aria-label="Political performance trend lines"
        />
      </div>
      <div
        style={{ display: "flex", gap: 14, marginTop: 10, flexWrap: "wrap" }}
      >
        {DATA.trendData.map((d, i) => (
          <span
            key={d.name}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              fontSize: 11,
              color: "#555",
            }}
          >
            <span
              style={{
                width: 14,
                height: 3,
                background: d.color,
                display: "inline-block",
                borderRadius: 2,
              }}
            />
            {d.name}
          </span>
        ))}
      </div>
    </div>
  )
}

function RiskBars() {
  const [animated, setAnimated] = useState(false)
  const [liveWidths, setLiveWidths] = useState(DATA.risk.map((r) => r.pct))
  const [hoveredIdx, setHoveredIdx] = useState(null)

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 200)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const iv = setInterval(() => {
      setLiveWidths((prev) =>
        prev.map((w, i) => {
          const base = DATA.risk[i].pct
          return Math.min(100, Math.max(5, base + (Math.random() * 4 - 2)))
        })
      )
    }, 3000)
    return () => clearInterval(iv)
  }, [])

  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #DDDDDB",
        borderRadius: 12,
        padding: 16,
      }}
    >
      <div
        style={{
          fontSize: 13,
          fontWeight: 600,
          color: "#111",
          marginBottom: 14,
        }}
      >
        Constituency risk analysis
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {DATA.risk.map((r, i) => (
          <div
            key={i}
            style={{
              display: "grid",
              gridTemplateColumns: "100px 1fr",
              alignItems: "center",
              gap: 10,
            }}
          >
            <span
              style={{
                fontSize: 11,
                fontWeight: 500,
                color: "#555",
                textAlign: "right",
              }}
            >
              {r.label}
            </span>
            <div
              style={{
                background: "#f3f4f6",
                borderRadius: 99,
                height: 22,
                position: "relative",
                cursor: "default",
              }}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <div
                style={{
                  height: "100%",
                  borderRadius: 99,
                  background: r.color,
                  width: animated ? liveWidths[i].toFixed(1) + "%" : "0%",
                  transition: animated ? "width 1s ease" : "width 0.6s ease",
                }}
              />
              {hoveredIdx === i && (
                <div
                  style={{
                    position: "absolute",
                    bottom: "calc(100% + 7px)",
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "#1e2024",
                    color: "#fff",
                    fontSize: 11,
                    padding: "5px 10px",
                    borderRadius: 6,
                    whiteSpace: "nowrap",
                    zIndex: 100,
                    pointerEvents: "none",
                  }}
                >
                  <strong>{r.label}</strong> — {r.status} | Support: {r.support}
                  <div
                    style={{
                      position: "absolute",
                      top: "100%",
                      left: "50%",
                      transform: "translateX(-50%)",
                      borderLeft: "5px solid transparent",
                      borderRight: "5px solid transparent",
                      borderTop: "5px solid #1e2024",
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 10,
          color: "#aaa",
          marginTop: 8,
          paddingLeft: 110,
        }}
      >
        {["0%", "25%", "50%", "75%", "100%"].map((l) => (
          <span key={l}>{l}</span>
        ))}
      </div>
    </div>
  )
}

function TopPerforming() {
  return (
    <div
      style={{
        background: "#1F3D33",
        borderRadius: 12,
        padding: 16,
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: 200,
      }}
    >
      <div
        style={{
          fontSize: 10,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: "#a0b4ae",
          fontWeight: 500,
        }}
      >
        Top Performing Constituencies
      </div>
      <div style={{ margin: "12px 0 4px" }}>
        <div style={{ fontSize: 38, fontWeight: 700 }}>
          {DATA.topPerforming.val}
        </div>
        <div
          style={{
            fontSize: 10,
            color: "#CCE88E",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            fontWeight: 600,
            marginTop: 2,
          }}
        >
          {DATA.topPerforming.label}
        </div>
      </div>
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          borderTop: "1px solid rgba(255,255,255,0.1)",
          paddingTop: 10,
          display: "flex",
          flexDirection: "column",
          gap: 5,
        }}
      >
        {DATA.topPerforming.items.map((item, i) => (
          <li
            key={i}
            style={{
              fontSize: 11,
              color: "#c5d3cf",
              display: "flex",
              alignItems: "center",
              gap: 7,
            }}
          >
            <span
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: "#4ade80",
                display: "inline-block",
                flexShrink: 0,
              }}
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

function StateTable() {
  const [hoveredRow, setHoveredRow] = useState(null)
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #DDDDDB",
        borderRadius: 12,
        padding: 16,
      }}
    >
      <div
        style={{
          fontSize: 13,
          fontWeight: 600,
          color: "#111",
          marginBottom: 4,
        }}
      >
        State comparison
      </div>
      <p
        style={{
          fontSize: 11,
          color: "#888",
          marginBottom: 14,
          lineHeight: 1.6,
        }}
      >
        Compare political performance, constituency strengths, and campaign
        health across Melaka and Johor.
      </p>
      <table
        style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}
      >
        <thead>
          <tr>
            {["Metric", "Melaka", "Johor", "Δ"].map((h) => (
              <th
                key={h}
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  color: "#aaa",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  paddingBottom: 8,
                  borderBottom: "1px solid #f0f0f0",
                  textAlign: "left",
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {DATA.stateRows.map((r, i) => {
            const n1 = parseFloat(r.v1),
              n2 = parseFloat(r.v2)
            const diff =
              !isNaN(n1) && !isNaN(n2)
                ? n2 > n1
                  ? `▲${n2 - n1}`
                  : `▼${n1 - n2}`
                : ""
            const diffColor =
              !isNaN(n1) && !isNaN(n2)
                ? n2 > n1
                  ? "#16a34a"
                  : "#dc2626"
                : "#888"
            return (
              <tr
                key={i}
                onMouseEnter={() => setHoveredRow(i)}
                onMouseLeave={() => setHoveredRow(null)}
                title={`Johor leads Melaka in ${r.name}`}
                style={{
                  background: hoveredRow === i ? "#f9fafb" : "transparent",
                  cursor: "default",
                  transition: "background 0.1s",
                }}
              >
                <td style={{ padding: "8px 0", color: "#666" }}>{r.name}</td>
                <td style={{ padding: "8px 0", color: "#333" }}>{r.v1}</td>
                <td
                  style={{ padding: "8px 0", fontWeight: 600, color: "#111" }}
                >
                  {r.v2}
                </td>
                <td
                  style={{
                    padding: "8px 0",
                    color: diffColor,
                    fontWeight: 600,
                    fontSize: 11,
                  }}
                >
                  {diff}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

function CandidateTable() {
  const [hoveredRow, setHoveredRow] = useState(null)
  const statusStyle = (s) => {
    if (s === "Strong") return { background: "#dcfce7", color: "#15803d" }
    if (s === "Risk") return { background: "#fee2e2", color: "#dc2626" }
    return { background: "#fef9c3", color: "#a16207" }
  }
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #DDDDDB",
        borderRadius: 12,
        padding: 16,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <span style={{ fontSize: 13, fontWeight: 600, color: "#111" }}>
          Candidate performance
        </span>
        <span
          style={{
            fontSize: 11,
            color: "#5D6DEA",
            cursor: "pointer",
            fontWeight: 500,
          }}
        >
          View all →
        </span>
      </div>
      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: 11,
            minWidth: 440,
          }}
        >
          <thead>
            <tr>
              {["Candidate", "Party", "Constituency", "Support", "Status"].map(
                (h) => (
                  <th
                    key={h}
                    style={{
                      fontSize: 10,
                      fontWeight: 600,
                      color: "#aaa",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      paddingBottom: 8,
                      borderBottom: "1px solid #f0f0f0",
                      textAlign: "left",
                    }}
                  >
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {DATA.candidates.map((c, i) => (
              <tr
                key={i}
                onMouseEnter={() => setHoveredRow(i)}
                onMouseLeave={() => setHoveredRow(null)}
                title={`${c.name} · ${c.constituency} · ${c.support}% support`}
                style={{
                  background: hoveredRow === i ? "#f9fafb" : "transparent",
                  cursor: "default",
                  transition: "background 0.1s",
                }}
              >
                <td style={{ padding: "8px 0" }}>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 7 }}
                  >
                    <div
                      style={{
                        width: 22,
                        height: 22,
                        borderRadius: "50%",
                        background: "#e0e7ff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 9,
                        fontWeight: 600,
                        color: "#4338ca",
                        flexShrink: 0,
                      }}
                    >
                      {c.name.charAt(0)}
                    </div>
                    <span style={{ fontWeight: 500, color: "#111" }}>
                      {c.name}
                    </span>
                  </div>
                </td>
                <td style={{ padding: "8px 0", color: "#666" }}>{c.party}</td>
                <td style={{ padding: "8px 0", color: "#666" }}>
                  {c.constituency}
                </td>
                <td
                  style={{ padding: "8px 0", fontWeight: 600, color: "#111" }}
                >
                  {c.support}%
                </td>
                <td style={{ padding: "8px 0" }}>
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 600,
                      padding: "2px 8px",
                      borderRadius: 99,
                      ...statusStyle(c.status),
                    }}
                  >
                    {c.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function KeyFindings() {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #DDDDDB",
        borderRadius: 12,
        padding: 16,
      }}
    >
      <div
        style={{
          fontSize: 13,
          fontWeight: 600,
          color: "#111",
          marginBottom: 12,
        }}
      >
        Key findings
      </div>
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "flex",
          flexDirection: "column",
          gap: 9,
        }}
      >
        {DATA.keyFindings.map((f, i) => (
          <li
            key={i}
            style={{
              fontSize: 11,
              color: "#666",
              display: "flex",
              gap: 7,
              lineHeight: 1.5,
            }}
          >
            <span style={{ color: "#aaa", flexShrink: 0 }}>▪</span>
            <span>
              {f.text}
              <strong style={{ color: "#111" }}>{f.highlight}</strong>
              {f.rest}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function ReportCards() {
  const [hovered, setHovered] = useState(null)
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #DDDDDB",
        borderRadius: 12,
        padding: 16,
      }}
    >
      <div
        style={{
          fontSize: 13,
          fontWeight: 600,
          color: "#111",
          marginBottom: 12,
        }}
      >
        Report cards
      </div>
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        {DATA.reports.map((r, i) => (
          <li
            key={i}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              fontSize: 11,
              color: hovered === i ? "#111" : "#666",
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "5px 0",
              cursor: "pointer",
              transition: "color 0.1s",
            }}
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            {r}
          </li>
        ))}
      </ul>
    </div>
  )
}

function PromoBanner() {
  return (
    <div
      style={{
        borderRadius: 12,
        overflow: "hidden",
        position: "relative",
        minHeight: 140,
        display: "flex",
        alignItems: "flex-end",
        padding: 16,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "url('https://images.unsplash.com/photo-1549693578-d683be217e58?q=80&w=600&auto=format&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)",
        }}
      />
      <div style={{ position: "relative", zIndex: 2, color: "#fff" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            marginBottom: 4,
          }}
        >
          <span style={{ fontSize: 18 }}>🇲🇾</span>
          <span
            style={{
              fontSize: 10,
              color: "#ccc",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              fontWeight: 500,
            }}
          >
            National Focus
          </span>
        </div>
        <h2 style={{ fontSize: 15, fontWeight: 700, margin: 0 }}>
          Build a Stronger Malaysia
        </h2>
        <p
          style={{ fontSize: 10, color: "#ccc", marginTop: 3, marginBottom: 0 }}
        >
          Satu strategi mampan untuk makmur.
        </p>
      </div>
    </div>
  )
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────

export default function AdminDashboard() {
  const [lastUpdated, setLastUpdated] = useState("just now")
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const iv = setInterval(() => {
      setTick((t) => {
        const next = t + 3
        setLastUpdated(next < 10 ? "just now" : `${next}s ago`)
        return next
      })
    }, 3000)
    return () => clearInterval(iv)
  }, [])

  return (
    <div
      style={{
        background: "#f8f9fa",
        minHeight: "100vh",
        paddingBottom: 48,
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      {/* Header */}
      <div style={{ padding: "20px 24px", maxWidth: 1400, margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: 12,
            marginBottom: 20,
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 3,
              }}
            >
              <h1
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  color: "#111",
                  margin: 0,
                }}
              >
                {DATA.header.title}
              </h1>
            </div>
            <p style={{ fontSize: 12, color: "#888", margin: 0 }}>
              {DATA.header.subtitle}
            </p>
          </div>
          <div
            style={{
              display: "flex",
              gap: 8,
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {DATA.header.filters.map((f) => (
              <select
                key={f.id}
                defaultValue={f.current}
                style={{
                  height: 32,
                  fontSize: 11,
                  border: "1px solid #DDDDDB",
                  borderRadius: 8,
                  padding: "0 10px",
                  background: "#fff",
                  color: "#333",
                  outline: "none",
                  cursor: "pointer",
                }}
              >
                {f.options.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            ))}
            <button
              style={{
                height: 32,
                padding: "0 14px",
                fontSize: 11,
                fontWeight: 600,
                background: "#CCE88E",
                color: "#1a2e0a",
                border: "none",
                borderRadius: 8,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <svg
                width="13"
                height="13"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                />
              </svg>
              Export Report
            </button>
          </div>
        </div>

        {/* Metrics */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: 10,
            marginBottom: 16,
          }}
        >
          {DATA.topMetrics.map((card) => (
            <MetricCard key={card.id} card={card} />
          ))}
        </div>

        {/* Charts Row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 2fr",
            gap: 10,
            marginBottom: 16,
          }}
        >
          <DonutChart />
          <TrendChart />
        </div>

        {/* Risk + Top Performing */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: 10,
            marginBottom: 16,
          }}
        >
          <RiskBars />
          <TopPerforming />
        </div>

        {/* Tables */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "5fr 7fr",
            gap: 10,
            marginBottom: 16,
          }}
        >
          <StateTable />
          <CandidateTable />
        </div>

        {/* Footer */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 10,
          }}
        >
          <KeyFindings />
          <ReportCards />
          <PromoBanner />
        </div>
      </div>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1;} 50%{opacity:0.4;} }
        * { box-sizing: border-box; }
        select:hover { border-color: #aaa !important; }
      `}</style>
    </div>
  )
}
