export default function LandingPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#F8F8FA", fontFamily: "Inter, -apple-system, sans-serif" }}>

      {/* NAVBAR */}
      <nav style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 48px", height: "64px", background: "#FFFFFF",
        borderBottom: "1px solid #EBEBF0", position: "sticky", top: 0, zIndex: 50
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{
            width: "32px", height: "32px", borderRadius: "8px",
            background: "linear-gradient(135deg, #6C63FF, #9B8FFF)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "white", fontWeight: "800", fontSize: "16px"
          }}>N</div>
          <span style={{ fontWeight: "700", fontSize: "18px", color: "#1A1A2E" }}>Nimbus</span>
        </div>
        <div style={{ display: "flex", gap: "32px" }}>
          {["Products", "Solutions", "Pricing", "Insight"].map(item => (
            <a key={item} href="#" style={{ color: "#4A4A6A", fontSize: "14px", textDecoration: "none", fontWeight: "500" }}>{item}</a>
          ))}
        </div>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <a href="/login" style={{ padding: "8px 20px", borderRadius: "99px", border: "1px solid #EBEBF0", color: "#1A1A2E", textDecoration: "none", fontSize: "14px", fontWeight: "500", background: "white" }}>Sign in</a>
          <a href="/register" style={{ padding: "8px 20px", borderRadius: "99px", background: "#1A1A2E", color: "white", textDecoration: "none", fontSize: "14px", fontWeight: "600" }}>Get Started</a>
        </div>
      </nav>

      {/* HERO SECTION */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "80px 48px", position: "relative" }}>
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: "800px", height: "800px",
          pointerEvents: "none", zIndex: 0
        }}>
          <div style={{ position: "absolute", inset: 0, border: "1px solid #E8E8F0", borderRadius: "50%" }} />
          <div style={{ position: "absolute", inset: "100px", border: "1px solid #E8E8F0", borderRadius: "50%" }} />
          <div style={{ position: "absolute", inset: "200px", border: "1px solid #E8E8F0", borderRadius: "50%" }} />
          {[
            { top: "0%", left: "42%", label: "Slack", color: "#E01E5A", symbol: "S" },
            { top: "12%", left: "88%", label: "AWS", color: "#FF9900", symbol: "A" },
            { top: "42%", left: "96%", label: "Linear", color: "#5E6AD2", symbol: "L" },
            { top: "75%", left: "82%", label: "ClickUp", color: "#7B68EE", symbol: "C" },
            { top: "88%", left: "42%", label: "Notion", color: "#1A1A2E", symbol: "N" },
            { top: "75%", left: "4%", label: "Figma", color: "#F24E1E", symbol: "F" },
            { top: "42%", left: "-4%", label: "GDrive", color: "#34A853", symbol: "G" },
            { top: "12%", left: "4%", label: "Meta", color: "#0866FF", symbol: "M" },
          ].map((icon, i) => (
            <div key={i} style={{
              position: "absolute", top: icon.top, left: icon.left,
              transform: "translate(-50%, -50%)",
              width: "44px", height: "44px", borderRadius: "12px",
              background: "white", border: "1px solid #EBEBF0",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: "800", fontSize: "16px", color: icon.color
            }}>{icon.symbol}</div>
          ))}
        </div>

        <div style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: "680px", margin: "0 auto", paddingTop: "80px" }}>
          <div style={{ display: "flex", gap: "24px", justifyContent: "center", marginBottom: "32px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ fontSize: "14px", color: "#4285F4", fontWeight: "700" }}>G</span>
              <span style={{ fontSize: "13px", color: "#1A1A2E", fontWeight: "600" }}>4.8 Google</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ fontSize: "14px", color: "#00B67A", fontWeight: "700" }}>★</span>
              <span style={{ fontSize: "13px", color: "#1A1A2E", fontWeight: "600" }}>4.9 Trustpilot</span>
            </div>
          </div>

          <h1 style={{ fontSize: "58px", fontWeight: "800", lineHeight: "1.1", color: "#1A1A2E", marginBottom: "20px", letterSpacing: "-2px" }}>
            AI-powered tools to<br />stay organized
          </h1>
          <p style={{ fontSize: "16px", color: "#6B6B80", marginBottom: "36px", lineHeight: "1.7", maxWidth: "480px", margin: "0 auto 36px" }}>
            From small tasks to complex projects, manage everything in one place and keep your team moving forward.
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", marginBottom: "60px" }}>
            <a href="/register" style={{ padding: "13px 28px", borderRadius: "99px", background: "#1A1A2E", color: "white", textDecoration: "none", fontSize: "15px", fontWeight: "600", boxShadow: "0 4px 12px rgba(26,26,46,0.3)" }}>Get started free</a>
            <a href="#" style={{ padding: "13px 28px", borderRadius: "99px", border: "1px solid #EBEBF0", color: "#1A1A2E", textDecoration: "none", fontSize: "15px", fontWeight: "500", background: "white" }}>Talk to sales team</a>
          </div>

          <div style={{ background: "white", borderRadius: "20px", padding: "4px", boxShadow: "0 8px 32px rgba(0,0,0,0.10)", border: "1px solid #EBEBF0", maxWidth: "420px", margin: "0 auto" }}>
            {[
              { avatar: "R", name: "Rahul S.", action: "created", item: "Fix payment timeout", time: "2m ago", color: "#6C63FF" },
              { avatar: "P", name: "Priya G.", action: "moved", item: "Sprint 12 to Active", time: "8m ago", color: "#00C48C" },
              { avatar: "M", name: "Manu S.", action: "asked AI", item: "Analyze project risks", time: "15m ago", color: "#FF6B6B" },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px", borderBottom: i < 2 ? "1px solid #F4F4F8" : "none" }}>
                <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: item.color, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: "700", flexShrink: 0 }}>{item.avatar}</div>
                <div style={{ flex: 1, textAlign: "left" }}>
                  <div style={{ fontSize: "13px", color: "#1A1A2E" }}>
                    <span style={{ fontWeight: "600" }}>{item.name}</span>{" "}{item.action}{" "}<span style={{ fontWeight: "600" }}>{item.item}</span>
                  </div>
                  <div style={{ fontSize: "11px", color: "#9B9BAD", marginTop: "2px" }}>{item.time}</div>
                </div>
                <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: item.color, flexShrink: 0 }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TRUSTED BY */}
      <div style={{ borderTop: "1px solid #EBEBF0", borderBottom: "1px solid #EBEBF0", padding: "28px 48px", background: "white" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <div style={{ fontSize: "12px", color: "#9B9BAD", textAlign: "center", marginBottom: "20px", fontWeight: "500", letterSpacing: "1px" }}>TRUSTED BY 200,000+ USERS WORLDWIDE</div>
          <div style={{ display: "flex", gap: "48px", justifyContent: "center", alignItems: "center", flexWrap: "wrap" }}>
            {["Google", "Airbnb", "Coinbase", "Notion", "Stripe", "Zoom", "Shopify"].map(name => (
              <div key={name} style={{ fontSize: "15px", fontWeight: "700", color: "#C8C8D8", letterSpacing: "0.5px" }}>{name}</div>
            ))}
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "80px 48px" }}>
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <h2 style={{ fontSize: "40px", fontWeight: "800", color: "#1A1A2E", marginBottom: "16px", letterSpacing: "-1px" }}>Everything your team needs</h2>
          <p style={{ fontSize: "16px", color: "#6B6B80" }}>One platform. Every tool. Powered by AI.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "20px" }}>
          {[
            {
              bg: "#EEF0FF", iconBg: "#6C63FF",
              title: "AI Agents",
              desc: "Agents that create tasks, assign work, analyze blockers — not just answer questions.",
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
                  <path d="M18 8h2M4 8H2"/>
                </svg>
              )
            },
            {
              bg: "#E6FAF5", iconBg: "#00C48C",
              title: "Project Health",
              desc: "Real-time health scores from actual data. AI explains, database decides.",
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                </svg>
              )
            },
            {
              bg: "#FFF8E6", iconBg: "#FFB800",
              title: "Sprint Planning",
              desc: "AI-assisted sprint planning with velocity tracking and capacity management.",
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                </svg>
              )
            },
            {
              bg: "#FFF0F0", iconBg: "#FF6B6B",
              title: "Smart Docs",
              desc: "PRDs, meeting notes, and wikis with AI extraction and semantic search.",
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
                </svg>
              )
            },
            {
              bg: "#F0F8FF", iconBg: "#3B9EFF",
              title: "Team Workload",
              desc: "Visual workload management so no one burns out and nothing falls through.",
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              )
            },
            {
              bg: "#F8F0FF", iconBg: "#9B59B6",
              title: "Integrations",
              desc: "Connect Slack, GitHub, Figma, Google Drive and 50+ tools seamlessly.",
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                </svg>
              )
            },
          ].map(f => (
            <div key={f.title} style={{
              background: "white", borderRadius: "16px", padding: "28px",
              border: "1px solid #EBEBF0", boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              transition: "box-shadow 0.2s"
            }}>
              <div style={{
                width: "44px", height: "44px", borderRadius: "12px",
                background: f.iconBg,
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: "16px"
              }}>{f.icon}</div>
              <div style={{ fontWeight: "700", fontSize: "16px", color: "#1A1A2E", marginBottom: "8px" }}>{f.title}</div>
              <div style={{ fontSize: "14px", color: "#6B6B80", lineHeight: "1.6" }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA BANNER */}
      <div style={{ margin: "0 48px 80px", background: "#1A1A2E", borderRadius: "24px", padding: "56px 48px", textAlign: "center" }}>
        <h2 style={{ fontSize: "40px", fontWeight: "800", color: "white", marginBottom: "16px", letterSpacing: "-1px" }}>Start managing smarter today</h2>
        <p style={{ fontSize: "16px", color: "#9B9BAD", marginBottom: "32px" }}>Join teams who ship faster with AI-native project management.</p>
        <a href="/register" style={{ padding: "14px 36px", borderRadius: "99px", background: "#6C63FF", color: "white", textDecoration: "none", fontSize: "15px", fontWeight: "600", boxShadow: "0 4px 16px rgba(108,99,255,0.4)" }}>Get started for free</a>
      </div>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid #EBEBF0", padding: "32px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "white" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: "linear-gradient(135deg, #6C63FF, #9B8FFF)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: "800", fontSize: "13px" }}>N</div>
          <span style={{ fontWeight: "700", color: "#1A1A2E" }}>Nimbus</span>
        </div>
        <div style={{ fontSize: "13px", color: "#9B9BAD" }}>© 2026 Nimbus. Built for PMs and engineers.</div>
        <div style={{ display: "flex", gap: "24px" }}>
          {["Privacy", "Terms", "Contact"].map(link => (
            <a key={link} href="#" style={{ fontSize: "13px", color: "#9B9BAD", textDecoration: "none" }}>{link}</a>
          ))}
        </div>
      </footer>
    </div>
  );
}
