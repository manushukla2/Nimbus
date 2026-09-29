"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

const navItems = [
  { icon: "⊞", label: "Home", path: "/dashboard" },
  { icon: "✓", label: "My Work", path: "/dashboard/my-work" },
  { icon: "◎", label: "Inbox", path: "/dashboard/inbox", badge: 3 },
  { icon: "◈", label: "Projects", path: "/dashboard/projects" },
  { icon: "→", label: "Roadmap", path: "/dashboard/roadmap" },
  { icon: "⚡", label: "Sprints", path: "/dashboard/sprints" },
  { icon: "☑", label: "Tasks", path: "/dashboard/tasks" },
  { icon: "▤", label: "Docs", path: "/dashboard/docs" },
  { icon: "◎", label: "Goals", path: "/dashboard/goals" },
  { icon: "▦", label: "Reports", path: "/dashboard/reports" },
  { icon: "✦", label: "AI Workspace", path: "/dashboard/ai", special: true },
  { icon: "⚙", label: "Settings", path: "/dashboard/settings" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) { router.push("/login"); return; }
    fetch("http://localhost:8001/api/v1/auth/me", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(r => r.json())
      .then(data => setUser(data))
      .catch(() => router.push("/login"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    router.push("/login");
  };

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "Inter, sans-serif", background: "#F4F3FF" }}>
      {/* SIDEBAR */}
      <div style={{
        width: collapsed ? "64px" : "240px", background: "#1A1A2E",
        display: "flex", flexDirection: "column", flexShrink: 0,
        transition: "width 0.2s ease", overflow: "hidden",
        borderRight: "1px solid rgba(255,255,255,0.06)"
      }}>
        {/* Logo */}
        <div style={{
          display: "flex", alignItems: "center",
          justifyContent: collapsed ? "center" : "space-between",
          padding: collapsed ? "20px 0" : "20px 16px",
          borderBottom: "1px solid rgba(255,255,255,0.06)"
        }}>
          {!collapsed && (
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{
                width: "30px", height: "30px", borderRadius: "8px",
                background: "linear-gradient(135deg, #6C63FF, #9B8FFF)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "white", fontWeight: "800", fontSize: "14px", flexShrink: 0
              }}>N</div>
              <div>
                <div style={{ color: "white", fontWeight: "700", fontSize: "14px" }}>Nimbus</div>
                <div style={{ color: "#9B9BAD", fontSize: "11px" }}>Acme Technologies</div>
              </div>
            </div>
          )}
          {collapsed && (
            <div style={{
              width: "30px", height: "30px", borderRadius: "8px",
              background: "linear-gradient(135deg, #6C63FF, #9B8FFF)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "white", fontWeight: "800", fontSize: "14px"
            }}>N</div>
          )}
          <button onClick={() => setCollapsed(!collapsed)} style={{
            background: "none", border: "none", color: "#9B9BAD",
            cursor: "pointer", padding: "4px", fontSize: "16px",
            display: collapsed ? "none" : "block"
          }}>‹</button>
        </div>

        {/* Search */}
        {!collapsed && (
          <div style={{ padding: "12px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{
              display: "flex", alignItems: "center", gap: "8px",
              background: "rgba(255,255,255,0.06)", borderRadius: "8px",
              padding: "8px 12px", cursor: "pointer"
            }}>
              <span style={{ color: "#9B9BAD", fontSize: "13px" }}>🔍</span>
              <span style={{ color: "#9B9BAD", fontSize: "13px" }}>Search...</span>
              <span style={{ marginLeft: "auto", color: "#9B9BAD", fontSize: "11px", background: "rgba(255,255,255,0.08)", padding: "2px 6px", borderRadius: "4px" }}>⌘K</span>
            </div>
          </div>
        )}

        {/* Nav */}
        <nav style={{ flex: 1, padding: "8px", overflowY: "auto" }}>
          {navItems.map(item => {
            const isActive = pathname === item.path;
            return (
              <Link key={item.path} href={item.path} style={{ textDecoration: "none" }}>
                <div style={{
                  display: "flex", alignItems: "center", gap: "10px",
                  padding: collapsed ? "10px 0" : "9px 12px",
                  borderRadius: "8px", marginBottom: "2px",
                  justifyContent: collapsed ? "center" : "flex-start",
                  background: isActive ? "rgba(108,99,255,0.15)" : "transparent",
                  cursor: "pointer"
                }}>
                  <span style={{ fontSize: "16px", color: isActive ? "#9B8FFF" : item.special ? "#6C63FF" : "#9B9BAD" }}>{item.icon}</span>
                  {!collapsed && (
                    <>
                      <span style={{
                        fontSize: "13px", fontWeight: isActive ? "600" : "500",
                        color: isActive ? "white" : item.special ? "#9B8FFF" : "#C8C8D8", flex: 1
                      }}>{item.label}</span>
                      {item.badge && (
                        <span style={{ background: "#6C63FF", color: "white", fontSize: "11px", fontWeight: "600", padding: "2px 7px", borderRadius: "99px" }}>{item.badge}</span>
                      )}
                    </>
                  )}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* User */}
        <div style={{
          padding: collapsed ? "16px 0" : "16px",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          display: "flex", alignItems: "center", gap: "10px",
          justifyContent: collapsed ? "center" : "flex-start"
        }}>
          <div style={{
            width: "32px", height: "32px", borderRadius: "50%",
            background: "linear-gradient(135deg, #6C63FF, #9B8FFF)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "white", fontSize: "12px", fontWeight: "700", flexShrink: 0
          }}>{user?.full_name?.charAt(0) || "M"}</div>
          {!collapsed && (
            <>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ color: "white", fontSize: "13px", fontWeight: "600", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user?.full_name || "Loading..."}</div>
                <div style={{ color: "#9B9BAD", fontSize: "11px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user?.email || ""}</div>
              </div>
              <button onClick={handleLogout} style={{ background: "none", border: "none", color: "#9B9BAD", cursor: "pointer", fontSize: "16px", padding: "4px" }} title="Logout">⎋</button>
            </>
          )}
        </div>
      </div>

      {/* MAIN */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* TOPBAR */}
        <div style={{
          height: "56px", background: "white", borderBottom: "1px solid #EBEBF0",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 24px", flexShrink: 0
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ color: "#9B9BAD", fontSize: "13px" }}>Nimbus</span>
            <span style={{ color: "#9B9BAD", fontSize: "13px" }}>›</span>
            <span style={{ color: "#1A1A2E", fontSize: "13px", fontWeight: "600" }}>
              {navItems.find(i => i.path === pathname)?.label || "Dashboard"}
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "#F4F3FF", borderRadius: "8px", padding: "7px 14px", cursor: "pointer", minWidth: "200px" }}>
              <span style={{ fontSize: "13px", color: "#9B9BAD" }}>🔍</span>
              <span style={{ fontSize: "13px", color: "#9B9BAD" }}>Search anything...</span>
            </div>
            <div style={{ position: "relative", width: "36px", height: "36px", borderRadius: "8px", background: "#F4F3FF", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <span style={{ fontSize: "16px" }}>🔔</span>
              <div style={{ position: "absolute", top: "6px", right: "6px", width: "8px", height: "8px", borderRadius: "50%", background: "#FF6B6B", border: "2px solid white" }} />
            </div>
            <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "linear-gradient(135deg, #6C63FF, #9B8FFF)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "13px", fontWeight: "700", cursor: "pointer" }}>
              {user?.full_name?.charAt(0) || "M"}
            </div>
          </div>
        </div>
        {/* CONTENT */}
        <div style={{ flex: 1, overflowY: "auto", padding: "24px" }}>
          {children}
        </div>
      </div>
    </div>
  );
}
