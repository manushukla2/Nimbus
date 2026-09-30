"use client";
import { useState } from "react";

const projects = [
  { id: "1", name: "Project Phoenix", key: "PHX", description: "Complete redesign of the core payment infrastructure", health: "AT_RISK", status: "ACTIVE", progress: 68, tasks: 62, completed: 42, overdue: 6, blocked: 2, owner: "Manu S.", team: ["M", "R", "P", "A"], startDate: "Sep 1, 2026", endDate: "Oct 15, 2026", color: "#FF6B6B" },
  { id: "2", name: "Project Mercury", key: "MRC", description: "New mobile application for iOS and Android platforms", health: "HEALTHY", status: "ACTIVE", progress: 42, tasks: 34, completed: 14, overdue: 0, blocked: 0, owner: "Priya G.", team: ["P", "R", "K"], startDate: "Sep 15, 2026", endDate: "Nov 30, 2026", color: "#00C48C" },
  { id: "3", name: "Project Atlas", key: "ATL", description: "Enterprise analytics dashboard and reporting system", health: "AT_RISK", status: "ACTIVE", progress: 23, tasks: 28, completed: 6, overdue: 4, blocked: 1, owner: "Rahul S.", team: ["R", "M", "S"], startDate: "Oct 1, 2026", endDate: "Dec 10, 2026", color: "#FFB800" },
  { id: "4", name: "Project Orion", key: "ORN", description: "Internal developer tools and CI/CD pipeline improvements", health: "HEALTHY", status: "PLANNING", progress: 8, tasks: 15, completed: 1, overdue: 0, blocked: 0, owner: "Karan M.", team: ["K", "R"], startDate: "Oct 15, 2026", endDate: "Jan 15, 2027", color: "#3B9EFF" },
];

function HealthBadge({ health }: { health: string }) {
  const map: any = { HEALTHY: { label: "Healthy", color: "#00C48C", bg: "#E6FAF5" }, AT_RISK: { label: "At Risk", color: "#FFB800", bg: "#FFF8E6" }, BLOCKED: { label: "Blocked", color: "#FF6B6B", bg: "#FFF0F0" } };
  const s = map[health] || map.HEALTHY;
  return <span style={{ background: s.bg, color: s.color, fontSize: "11px", fontWeight: "600", padding: "3px 10px", borderRadius: "99px" }}>{s.label}</span>;
}

function StatusBadge({ status }: { status: string }) {
  const map: any = { ACTIVE: { label: "Active", color: "#6C63FF", bg: "#EEF0FF" }, PLANNING: { label: "Planning", color: "#9B9BAD", bg: "#F4F4F8" }, COMPLETED: { label: "Completed", color: "#00C48C", bg: "#E6FAF5" } };
  const s = map[status] || map.ACTIVE;
  return <span style={{ background: s.bg, color: s.color, fontSize: "11px", fontWeight: "600", padding: "3px 10px", borderRadius: "99px" }}>{s.label}</span>;
}

export default function ProjectsPage() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [filter, setFilter] = useState("ALL");
  const filters = ["ALL", "ACTIVE", "AT_RISK", "PLANNING"];
  const filtered = projects.filter(p => filter === "ALL" ? true : filter === "AT_RISK" ? p.health === "AT_RISK" : p.status === filter);

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: "800", color: "#1A1A2E", marginBottom: "4px" }}>Projects</h1>
          <p style={{ color: "#9B9BAD", fontSize: "14px" }}>{projects.length} projects · {projects.filter(p => p.status === "ACTIVE").length} active</p>
        </div>
        <button style={{ display: "flex", alignItems: "center", gap: "8px", background: "#6C63FF", color: "white", border: "none", borderRadius: "10px", padding: "10px 20px", fontSize: "14px", fontWeight: "600", cursor: "pointer" }}>
          + New Project
        </button>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <div style={{ display: "flex", gap: "8px" }}>
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{ padding: "6px 16px", borderRadius: "99px", border: "1px solid", fontSize: "13px", fontWeight: "500", cursor: "pointer", background: filter === f ? "#1A1A2E" : "white", color: filter === f ? "white" : "#4A4A6A", borderColor: filter === f ? "#1A1A2E" : "#EBEBF0" }}>
              {f === "ALL" ? "All" : f === "AT_RISK" ? "At Risk" : f.charAt(0) + f.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", gap: "4px", background: "#F4F3FF", borderRadius: "8px", padding: "4px" }}>
          {[{ v: "grid", icon: "⊞" }, { v: "list", icon: "☰" }].map(({ v, icon }) => (
            <button key={v} onClick={() => setView(v as any)} style={{ width: "32px", height: "32px", borderRadius: "6px", border: "none", cursor: "pointer", fontSize: "16px", background: view === v ? "white" : "transparent", color: view === v ? "#6C63FF" : "#9B9BAD" }}>{icon}</button>
          ))}
        </div>
      </div>

      {view === "grid" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px" }}>
          {filtered.map(p => (
            <div key={p.id} style={{ background: "white", borderRadius: "16px", border: "1px solid #EBEBF0", boxShadow: "0 2px 8px rgba(0,0,0,0.04)", overflow: "hidden", cursor: "pointer" }}
              onClick={() => window.location.href = `/dashboard/projects/${p.id}`}>
              <div style={{ height: "4px", background: p.color }} />
              <div style={{ padding: "20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: p.color + "20", color: p.color, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700", fontSize: "13px" }}>{p.key}</div>
                    <div>
                      <div style={{ fontWeight: "700", fontSize: "15px", color: "#1A1A2E" }}>{p.name}</div>
                      <div style={{ fontSize: "12px", color: "#9B9BAD", marginTop: "2px" }}>{p.startDate} → {p.endDate}</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "6px" }}>
                    <StatusBadge status={p.status} />
                    <HealthBadge health={p.health} />
                  </div>
                </div>
                <p style={{ fontSize: "13px", color: "#4A4A6A", lineHeight: "1.5", marginBottom: "16px" }}>{p.description}</p>
                <div style={{ marginBottom: "16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                    <span style={{ fontSize: "12px", color: "#9B9BAD" }}>Progress</span>
                    <span style={{ fontSize: "12px", fontWeight: "600", color: "#1A1A2E" }}>{p.progress}%</span>
                  </div>
                  <div style={{ height: "6px", borderRadius: "99px", background: "#F0F0F4" }}>
                    <div style={{ width: `${p.progress}%`, height: "6px", borderRadius: "99px", background: p.color }} />
                  </div>
                </div>
                <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
                  {[{ label: "Tasks", value: p.tasks, color: "#6C63FF" }, { label: "Done", value: p.completed, color: "#00C48C" }, { label: "Overdue", value: p.overdue, color: "#FF6B6B" }, { label: "Blocked", value: p.blocked, color: "#FFB800" }].map(s => (
                    <div key={s.label} style={{ textAlign: "center" }}>
                      <div style={{ fontSize: "18px", fontWeight: "800", color: s.value > 0 ? s.color : "#9B9BAD" }}>{s.value}</div>
                      <div style={{ fontSize: "11px", color: "#9B9BAD" }}>{s.label}</div>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "12px", borderTop: "1px solid #F0F0F4" }}>
                  <div style={{ display: "flex" }}>
                    {p.team.map((t, i) => (
                      <div key={i} style={{ width: "28px", height: "28px", borderRadius: "50%", background: `hsl(${i * 60 + 200}, 60%, 55%)`, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "11px", fontWeight: "700", border: "2px solid white", marginLeft: i > 0 ? "-8px" : "0" }}>{t}</div>
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button style={{ background: "#F4F3FF", color: "#6C63FF", border: "none", borderRadius: "8px", padding: "6px 14px", fontSize: "12px", fontWeight: "600", cursor: "pointer" }}>✦ Analyze</button>
                    <button style={{ background: "#1A1A2E", color: "white", border: "none", borderRadius: "8px", padding: "6px 14px", fontSize: "12px", fontWeight: "600", cursor: "pointer" }}>Open →</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {view === "list" && (
        <div style={{ background: "white", borderRadius: "16px", border: "1px solid #EBEBF0", overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 120px", padding: "12px 20px", borderBottom: "1px solid #EBEBF0", background: "#FAFAFA" }}>
            {["Project", "Status", "Health", "Progress", "Tasks", "Actions"].map(h => (
              <div key={h} style={{ fontSize: "12px", fontWeight: "600", color: "#9B9BAD" }}>{h}</div>
            ))}
          </div>
          {filtered.map((p, i) => (
            <div key={p.id} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 120px", padding: "14px 20px", alignItems: "center", borderBottom: i < filtered.length - 1 ? "1px solid #F0F0F4" : "none", cursor: "pointer" }}
              onClick={() => window.location.href = `/dashboard/projects/${p.id}`}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ width: "4px", height: "36px", borderRadius: "99px", background: p.color, flexShrink: 0 }} />
                <div>
                  <div style={{ fontWeight: "600", fontSize: "14px", color: "#1A1A2E" }}>{p.name}</div>
                  <div style={{ fontSize: "12px", color: "#9B9BAD" }}>{p.owner}</div>
                </div>
              </div>
              <div><StatusBadge status={p.status} /></div>
              <div><HealthBadge health={p.health} /></div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ flex: 1, height: "4px", borderRadius: "99px", background: "#F0F0F4", maxWidth: "80px" }}>
                  <div style={{ width: `${p.progress}%`, height: "4px", borderRadius: "99px", background: p.color }} />
                </div>
                <span style={{ fontSize: "12px", color: "#9B9BAD" }}>{p.progress}%</span>
              </div>
              <div style={{ fontSize: "13px", color: "#1A1A2E", fontWeight: "600" }}>{p.completed}/{p.tasks}</div>
              <div style={{ display: "flex", gap: "6px" }}>
                <button style={{ background: "#F4F3FF", color: "#6C63FF", border: "none", borderRadius: "6px", padding: "5px 10px", fontSize: "12px", cursor: "pointer" }}>✦ AI</button>
                <button style={{ background: "#1A1A2E", color: "white", border: "none", borderRadius: "6px", padding: "5px 10px", fontSize: "12px", cursor: "pointer" }}>Open</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
