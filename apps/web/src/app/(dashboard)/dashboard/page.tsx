"use client";

const projects = [
  { name: "Phoenix", key: "PHX", health: "AT_RISK", progress: 68, color: "#FF6B6B" },
  { name: "Mercury", key: "MRC", health: "HEALTHY", progress: 42, color: "#00C48C" },
  { name: "Atlas", key: "ATL", health: "AT_RISK", progress: 23, color: "#FFB800" },
];

const myTasks = [
  { title: "Fix payment timeout", project: "PHX", priority: "HIGH", due: "Today", status: "IN_PROGRESS" },
  { title: "Review sprint backlog", project: "PHX", priority: "MEDIUM", due: "Today", status: "TODO" },
  { title: "Update API documentation", project: "MRC", priority: "LOW", due: "Tomorrow", status: "TODO" },
  { title: "QA sign-off on auth flow", project: "ATL", priority: "HIGH", due: "Overdue", status: "BLOCKED" },
];

const activity = [
  { avatar: "R", name: "Rahul S.", action: "moved", item: "Fix payment bug to In Review", time: "2h ago", color: "#6C63FF" },
  { avatar: "P", name: "Priya G.", action: "created", item: "Sprint 13", time: "4h ago", color: "#00C48C" },
  { avatar: "AI", name: "Nimbus AI", action: "created", item: "3 tasks from meeting notes", time: "5h ago", color: "#9B59B6" },
  { avatar: "M", name: "Manu S.", action: "closed", item: "Project risk review", time: "1d ago", color: "#FF6B6B" },
];

const aiInsights = [
  { text: "3 tasks may put Sprint 12 at risk", action: "Analyze", color: "#FFB800", bg: "#FFF8E6" },
  { text: "Project Phoenix has 6 overdue tasks", action: "View", color: "#FF6B6B", bg: "#FFF0F0" },
  { text: "Rahul is overloaded — 12 active tasks", action: "Rebalance", color: "#6C63FF", bg: "#EEF0FF" },
];

function HealthBadge({ health }: { health: string }) {
  const map: any = {
    HEALTHY: { label: "Healthy", color: "#00C48C", bg: "#E6FAF5" },
    AT_RISK: { label: "At Risk", color: "#FFB800", bg: "#FFF8E6" },
    BLOCKED: { label: "Blocked", color: "#FF6B6B", bg: "#FFF0F0" },
  };
  const s = map[health] || map.HEALTHY;
  return <span style={{ background: s.bg, color: s.color, fontSize: "11px", fontWeight: "600", padding: "3px 10px", borderRadius: "99px" }}>{s.label}</span>;
}

function PriorityBadge({ priority }: { priority: string }) {
  const map: any = {
    HIGH: { color: "#FF6B6B", bg: "#FFF0F0" },
    MEDIUM: { color: "#FFB800", bg: "#FFF8E6" },
    LOW: { color: "#9B9BAD", bg: "#F4F4F8" },
  };
  const s = map[priority] || map.MEDIUM;
  return <span style={{ background: s.bg, color: s.color, fontSize: "11px", fontWeight: "600", padding: "3px 8px", borderRadius: "6px" }}>{priority}</span>;
}

export default function DashboardPage() {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      {/* GREETING */}
      <div style={{ marginBottom: "28px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "800", color: "#1A1A2E", marginBottom: "4px" }}>{greeting}, Manu ☀️</h1>
        <p style={{ color: "#9B9BAD", fontSize: "14px" }}>You have 4 tasks due today and 2 blockers to resolve.</p>
      </div>

      {/* STATS */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "24px" }}>
        {[
          { label: "Due Today", value: 4, color: "#6C63FF", bg: "#EEF0FF" },
          { label: "Overdue", value: 2, color: "#FF6B6B", bg: "#FFF0F0" },
          { label: "Blocked", value: 1, color: "#FFB800", bg: "#FFF8E6" },
          { label: "Upcoming", value: 8, color: "#00C48C", bg: "#E6FAF5" },
        ].map(s => (
          <div key={s.label} style={{ background: "white", borderRadius: "16px", padding: "20px", border: "1px solid #EBEBF0", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
            <div style={{ fontSize: "13px", color: "#9B9BAD", fontWeight: "500", marginBottom: "8px" }}>{s.label}</div>
            <div style={{ fontSize: "32px", fontWeight: "800", color: s.color }}>{s.value}</div>
            <div style={{ marginTop: "8px", height: "3px", borderRadius: "99px", background: s.bg }}>
              <div style={{ width: `${s.value * 10}%`, height: "3px", borderRadius: "99px", background: s.color }} />
            </div>
          </div>
        ))}
      </div>

      {/* MAIN GRID */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
        {/* PROJECTS */}
        <div style={{ background: "white", borderRadius: "16px", padding: "20px", border: "1px solid #EBEBF0", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <h3 style={{ fontSize: "15px", fontWeight: "700", color: "#1A1A2E" }}>Active Projects</h3>
            <a href="/dashboard/projects" style={{ fontSize: "13px", color: "#6C63FF", textDecoration: "none", fontWeight: "500" }}>View all →</a>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {projects.map(p => (
              <div key={p.key} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px", borderRadius: "12px", background: "#FAFAFA", border: "1px solid #F0F0F4" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: p.color + "20", display: "flex", alignItems: "center", justifyContent: "center", color: p.color, fontWeight: "700", fontSize: "12px", flexShrink: 0 }}>{p.key}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                    <span style={{ fontWeight: "600", fontSize: "14px", color: "#1A1A2E" }}>{p.name}</span>
                    <HealthBadge health={p.health} />
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{ flex: 1, height: "4px", borderRadius: "99px", background: "#F0F0F4" }}>
                      <div style={{ width: `${p.progress}%`, height: "4px", borderRadius: "99px", background: p.color }} />
                    </div>
                    <span style={{ fontSize: "12px", color: "#9B9BAD", fontWeight: "500", flexShrink: 0 }}>{p.progress}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI INSIGHTS */}
        <div style={{ background: "white", borderRadius: "16px", padding: "20px", border: "1px solid #EBEBF0", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#6C63FF", boxShadow: "0 0 0 3px rgba(108,99,255,0.2)" }} />
              <h3 style={{ fontSize: "15px", fontWeight: "700", color: "#1A1A2E" }}>Nimbus AI Insights</h3>
            </div>
            <a href="/dashboard/ai" style={{ fontSize: "13px", color: "#6C63FF", textDecoration: "none", fontWeight: "500" }}>Open AI →</a>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "16px" }}>
            {aiInsights.map((insight, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 14px", borderRadius: "12px", background: insight.bg, border: `1px solid ${insight.color}22` }}>
                <div style={{ flex: 1, fontSize: "13px", color: "#1A1A2E", fontWeight: "500" }}>{insight.text}</div>
                <button style={{ background: "white", border: `1px solid ${insight.color}44`, color: insight.color, fontSize: "12px", fontWeight: "600", padding: "5px 12px", borderRadius: "8px", cursor: "pointer", flexShrink: 0 }}>{insight.action}</button>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", background: "#F4F3FF", borderRadius: "12px", padding: "10px 14px" }}>
            <span style={{ fontSize: "14px" }}>✦</span>
            <input placeholder="Ask Nimbus AI anything..." style={{ flex: 1, background: "none", border: "none", outline: "none", fontSize: "13px", color: "#1A1A2E" }} />
            <button style={{ background: "#6C63FF", color: "white", border: "none", borderRadius: "8px", padding: "6px 14px", fontSize: "13px", fontWeight: "600", cursor: "pointer" }}>Ask</button>
          </div>
        </div>
      </div>

      {/* BOTTOM GRID */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
        {/* MY TASKS */}
        <div style={{ background: "white", borderRadius: "16px", padding: "20px", border: "1px solid #EBEBF0", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <h3 style={{ fontSize: "15px", fontWeight: "700", color: "#1A1A2E" }}>My Tasks</h3>
            <a href="/dashboard/tasks" style={{ fontSize: "13px", color: "#6C63FF", textDecoration: "none", fontWeight: "500" }}>View all →</a>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {myTasks.map((task, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 12px", borderRadius: "10px", border: "1px solid #F0F0F4", borderLeft: task.status === "BLOCKED" ? "3px solid #FF6B6B" : "1px solid #F0F0F4" }}>
                <div style={{ width: "16px", height: "16px", borderRadius: "50%", border: "2px solid #EBEBF0", flexShrink: 0, background: task.status === "IN_PROGRESS" ? "#6C63FF" : "transparent" }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "13px", fontWeight: "600", color: "#1A1A2E" }}>{task.title}</div>
                  <div style={{ fontSize: "11px", color: "#9B9BAD", marginTop: "2px" }}>{task.project} · {task.due}</div>
                </div>
                <PriorityBadge priority={task.priority} />
              </div>
            ))}
          </div>
        </div>

        {/* ACTIVITY */}
        <div style={{ background: "white", borderRadius: "16px", padding: "20px", border: "1px solid #EBEBF0", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
          <h3 style={{ fontSize: "15px", fontWeight: "700", color: "#1A1A2E", marginBottom: "16px" }}>Recent Activity</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {activity.map((a, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: a.color, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: "700", flexShrink: 0 }}>{a.avatar}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "13px", color: "#1A1A2E" }}>
                    <span style={{ fontWeight: "600" }}>{a.name}</span>{" "}{a.action}{" "}<span style={{ fontWeight: "500" }}>{a.item}</span>
                  </div>
                  <div style={{ fontSize: "11px", color: "#9B9BAD", marginTop: "2px" }}>{a.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
