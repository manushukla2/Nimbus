export default function LandingPage() {

  const integrationIcons = [
    {
      top: "0%", left: "42%", bg: "#fff",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24">
          <path fill="#E01E5A" d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52z"/>
          <path fill="#E01E5A" d="M6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313z"/>
          <path fill="#36C5F0" d="M8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834z"/>
          <path fill="#36C5F0" d="M8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312z"/>
          <path fill="#2EB67D" d="M18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834z"/>
          <path fill="#2EB67D" d="M17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312z"/>
          <path fill="#ECB22E" d="M15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52z"/>
          <path fill="#ECB22E" d="M15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/>
        </svg>
      )
    },
    {
      top: "12%", left: "88%", bg: "#fff",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24">
          <path fill="#FF9900" d="M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.056.127.056.183 0 .08-.048.16-.152.24l-.503.335a.383.383 0 0 1-.208.072c-.08 0-.16-.04-.239-.112a2.47 2.47 0 0 1-.287-.375 6.18 6.18 0 0 1-.248-.471c-.622.734-1.405 1.101-2.347 1.101-.67 0-1.205-.191-1.596-.574-.391-.384-.59-.894-.59-1.533 0-.678.239-1.23.726-1.644.487-.415 1.133-.623 1.955-.623.272 0 .551.024.846.064.296.04.6.104.918.176v-.583c0-.607-.127-1.030-.375-1.277-.255-.248-.686-.367-1.3-.367-.28 0-.568.031-.863.103-.295.072-.583.16-.862.272a2.287 2.287 0 0 1-.28.104.488.488 0 0 1-.127.023c-.112 0-.168-.08-.168-.247v-.391c0-.128.016-.224.056-.28a.597.597 0 0 1 .224-.167c.279-.144.614-.264 1.005-.36a4.84 4.84 0 0 1 1.246-.151c.95 0 1.644.216 2.091.647.439.43.662 1.085.662 1.963v2.586zm-3.24 1.214c.263 0 .534-.048.822-.144.287-.096.543-.271.758-.51.128-.152.224-.32.272-.512.047-.191.08-.423.08-.694v-.335a6.66 6.66 0 0 0-.735-.136 6.02 6.02 0 0 0-.75-.048c-.535 0-.926.104-1.19.32-.263.215-.39.518-.39.917 0 .375.095.655.295.846.191.2.47.296.838.296zm6.41.862c-.144 0-.240-.024-.304-.08-.064-.048-.12-.16-.168-.311L7.586 5.55a1.398 1.398 0 0 1-.072-.32c0-.128.064-.2.191-.2h.783c.151 0 .255.025.31.08.065.048.113.16.16.312l1.342 5.284 1.245-5.284c.04-.16.088-.264.151-.312a.549.549 0 0 1 .32-.08h.638c.152 0 .256.025.32.08.063.048.12.16.151.312l1.261 5.348 1.381-5.348c.048-.16.104-.264.16-.312a.52.52 0 0 1 .311-.08h.743c.127 0 .2.065.2.2 0 .04-.009.08-.017.128a1.137 1.137 0 0 1-.056.2l-1.924 6.17c-.048.16-.104.263-.168.311a.51.51 0 0 1-.303.08h-.687c-.151 0-.255-.024-.32-.08-.063-.056-.119-.16-.15-.32l-1.238-5.148-1.23 5.14c-.04.16-.087.264-.15.32-.065.056-.177.08-.32.08zm10.256.215c-.415 0-.83-.048-1.229-.143-.399-.096-.71-.2-.918-.32-.128-.071-.215-.151-.247-.223a.563.563 0 0 1-.048-.224v-.407c0-.167.064-.247.183-.247.048 0 .096.008.144.024.048.016.12.048.2.08.271.12.566.215.878.279.319.064.63.096.95.096.502 0 .894-.088 1.165-.264a.86.86 0 0 0 .415-.758.777.777 0 0 0-.215-.559c-.144-.151-.416-.287-.807-.415l-1.157-.36c-.583-.183-1.014-.454-1.277-.813a1.902 1.902 0 0 1-.4-1.158c0-.335.073-.63.216-.886.144-.255.335-.479.575-.654.24-.184.51-.32.83-.415.32-.096.655-.136 1.006-.136.175 0 .359.008.535.032.183.024.35.056.518.088.16.04.312.08.455.127.144.048.256.096.336.144a.69.69 0 0 1 .24.2.43.43 0 0 1 .071.263v.375c0 .168-.064.256-.184.256a.83.83 0 0 1-.303-.096 3.652 3.652 0 0 0-1.532-.311c-.455 0-.815.071-1.062.223-.248.152-.375.383-.375.71 0 .224.08.416.24.567.159.152.454.304.877.44l1.134.358c.574.184.99.44 1.237.767.247.327.367.702.367 1.117 0 .343-.072.655-.207.926-.144.272-.336.511-.583.703-.248.2-.543.343-.886.447-.36.111-.734.167-1.142.167z"/>
          <path fill="#FF9900" d="M21.814 18.956c-2.847 2.104-6.978 3.217-10.531 3.217-4.981 0-9.468-1.843-12.863-4.908-.264-.24-.032-.567.296-.383 3.666 2.135 8.194 3.417 12.878 3.417 3.154 0 6.626-.655 9.82-2.01.479-.2.878.32.4.667z"/>
          <path fill="#FF9900" d="M23.044 17.543c-.367-.47-2.415-.223-3.337-.111-.28.032-.32-.208-.072-.383 1.636-1.15 4.323-.821 4.635-.432.312.391-.088 3.08-1.612 4.366-.24.2-.463.096-.359-.167.343-.854 1.112-2.79.745-3.273z"/>
        </svg>
      )
    },
    {
      top: "42%", left: "96%", bg: "#fff",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24">
          <path fill="#F24E1E" d="M8 24c2.208 0 4-1.792 4-4v-4H8c-2.208 0-4 1.792-4 4s1.792 4 4 4z"/>
          <path fill="#FF7262" d="M4 12c0-2.208 1.792-4 4-4h4v8H8c-2.208 0-4-1.792-4-4z"/>
          <path fill="#A259FF" d="M4 4c0-2.208 1.792-4 4-4h4v8H8C5.792 8 4 6.208 4 4z"/>
          <path fill="#1ABCFE" d="M12 0h4c2.208 0 4 1.792 4 4s-1.792 4-4 4h-4V0z"/>
          <path fill="#0ACF83" d="M20 12c0 2.208-1.792 4-4 4s-4-1.792-4-4 1.792-4 4-4 4 1.792 4 4z"/>
        </svg>
      )
    },
    {
      top: "75%", left: "82%", bg: "#fff",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24">
          <path fill="#0052CC" d="M.778 1.213a.768.768 0 0 0-.768.892l3.263 19.81c.084.5.515.868 1.022.873H19.95a.772.772 0 0 0 .77-.646l3.27-20.03a.768.768 0 0 0-.768-.891zM14.52 15.53H9.522L8.17 8.466h7.561z"/>
        </svg>
      )
    },
    {
      top: "88%", left: "42%", bg: "#1A1A2E",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24">
          <path fill="white" d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z"/>
        </svg>
      )
    },
    {
      top: "75%", left: "4%", bg: "#fff",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
      )
    },
    {
      top: "42%", left: "-4%", bg: "#fff",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24">
          <path fill="#181717" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
        </svg>
      )
    },
    {
      top: "12%", left: "4%", bg: "#fff",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24">
          <path fill="#7B68EE" d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933z"/>
        </svg>
      )
    },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#F8F8FA", fontFamily: "Inter, -apple-system, sans-serif" }}>

      {/* NAVBAR */}
      <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 48px", height: "64px", background: "#FFFFFF", borderBottom: "1px solid #EBEBF0", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "linear-gradient(135deg, #6C63FF, #9B8FFF)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: "800", fontSize: "16px" }}>N</div>
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

      {/* HERO */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "80px 48px", position: "relative" }}>

        {/* ORBITAL */}
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "800px", height: "800px", pointerEvents: "none", zIndex: 0 }}>
          <div style={{ position: "absolute", inset: 0, border: "1px solid #E2E2EE", borderRadius: "50%" }} />
          <div style={{ position: "absolute", inset: "100px", border: "1px solid #E2E2EE", borderRadius: "50%" }} />
          <div style={{ position: "absolute", inset: "200px", border: "1px solid #E2E2EE", borderRadius: "50%" }} />
          {integrationIcons.map((item, i) => (
            <div key={i} style={{
              position: "absolute", top: item.top, left: item.left,
              transform: "translate(-50%, -50%)",
              width: "56px", height: "56px", borderRadius: "16px",
              background: item.bg, border: "1px solid #EBEBF0",
              boxShadow: "0 4px 16px rgba(0,0,0,0.10)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>{item.icon}</div>
          ))}
        </div>

        {/* HERO CONTENT */}
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
          <p style={{ fontSize: "16px", color: "#6B6B80", lineHeight: "1.7", maxWidth: "480px", margin: "0 auto 36px" }}>
            From small tasks to complex projects, manage everything in one place and keep your team moving forward.
          </p>

          <div style={{ display: "flex", gap: "12px", justifyContent: "center", marginBottom: "60px" }}>
            <a href="/register" style={{ padding: "13px 28px", borderRadius: "99px", background: "#1A1A2E", color: "white", textDecoration: "none", fontSize: "15px", fontWeight: "600", boxShadow: "0 4px 12px rgba(26,26,46,0.3)" }}>Get started free</a>
            <a href="#" style={{ padding: "13px 28px", borderRadius: "99px", border: "1px solid #EBEBF0", color: "#1A1A2E", textDecoration: "none", fontSize: "15px", fontWeight: "500", background: "white" }}>Talk to sales team</a>
          </div>

          {/* ACTIVITY CARDS */}
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
            { iconBg: "#6C63FF", title: "AI Agents", desc: "Agents that create tasks, assign work, analyze blockers — not just answer questions.", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg> },
            { iconBg: "#00C48C", title: "Project Health", desc: "Real-time health scores from actual data. AI explains, database decides.", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg> },
            { iconBg: "#FFB800", title: "Sprint Planning", desc: "AI-assisted sprint planning with velocity tracking and capacity management.", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> },
            { iconBg: "#FF6B6B", title: "Smart Docs", desc: "PRDs, meeting notes, and wikis with AI extraction and semantic search.", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg> },
            { iconBg: "#3B9EFF", title: "Team Workload", desc: "Visual workload management so no one burns out and nothing falls through.", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
            { iconBg: "#9B59B6", title: "Integrations", desc: "Connect Slack, GitHub, Figma, Google Drive and 50+ tools seamlessly.", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg> },
          ].map(f => (
            <div key={f.title} style={{ background: "white", borderRadius: "16px", padding: "28px", border: "1px solid #EBEBF0", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
              <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: f.iconBg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>{f.icon}</div>
              <div style={{ fontWeight: "700", fontSize: "16px", color: "#1A1A2E", marginBottom: "8px" }}>{f.title}</div>
              <div style={{ fontSize: "14px", color: "#6B6B80", lineHeight: "1.6" }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
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
