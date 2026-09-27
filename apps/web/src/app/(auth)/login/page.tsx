"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:8001/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.detail || "Login failed");

      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);

      window.location.href = "/dashboard";
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "Inter, sans-serif" }}>

      {/* LEFT PANEL — Dark */}
      <div
        style={{
          width: "55%",
          background: "#1A1A2E",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "48px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background dots */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle, rgba(108,99,255,0.15) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Logo */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              background: "linear-gradient(135deg, #6C63FF, #9B8FFF)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontWeight: "800",
              fontSize: "18px",
            }}
          >
            N
          </div>

          <span
            style={{
              color: "white",
              fontWeight: "700",
              fontSize: "20px",
            }}
          >
            Nimbus
          </span>
        </div>

        {/* Center content */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <p
            style={{
              color: "#9B9BAD",
              fontSize: "13px",
              fontWeight: "500",
              marginBottom: "32px",
              letterSpacing: "1px",
            }}
          >
            WHAT OUR USERS SAY
          </p>

          <h2
            style={{
              color: "white",
              fontSize: "32px",
              fontWeight: "700",
              lineHeight: "1.3",
              marginBottom: "48px",
              maxWidth: "400px",
            }}
          >
            "From idea to execution — in one workspace"
          </h2>

          {/* Floating preview cards */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            {/* Card 1 — Project Health */}
            <div
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.10)",
                borderRadius: "16px",
                padding: "16px 20px",
                backdropFilter: "blur(10px)",
                display: "flex",
                alignItems: "center",
                gap: "14px",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  background: "rgba(255,184,0,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#FFB800"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              </div>

              <div>
                <div
                  style={{
                    color: "white",
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                >
                  Project Phoenix — AT RISK
                </div>

                <div
                  style={{
                    color: "#9B9BAD",
                    fontSize: "12px",
                    marginTop: "2px",
                  }}
                >
                  6 overdue tasks · 2 blockers found
                </div>
              </div>

              <div
                style={{
                  marginLeft: "auto",
                  background: "rgba(255,184,0,0.15)",
                  color: "#FFB800",
                  fontSize: "11px",
                  fontWeight: "600",
                  padding: "4px 10px",
                  borderRadius: "99px",
                }}
              >
                AT RISK
              </div>
            </div>

            {/* Card 2 — AI Message */}
            <div
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.10)",
                borderRadius: "16px",
                padding: "16px 20px",
                backdropFilter: "blur(10px)",
                display: "flex",
                alignItems: "center",
                gap: "14px",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  background: "rgba(108,99,255,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#6C63FF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
              </div>

              <div>
                <div
                  style={{
                    color: "white",
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                >
                  Nimbus AI found 3 blockers
                </div>

                <div
                  style={{
                    color: "#9B9BAD",
                    fontSize: "12px",
                    marginTop: "2px",
                  }}
                >
                  Sprint 12 · Analyzed 2 mins ago
                </div>
              </div>

              <div
                style={{
                  marginLeft: "auto",
                  background: "rgba(108,99,255,0.2)",
                  color: "#9B8FFF",
                  fontSize: "11px",
                  fontWeight: "600",
                  padding: "4px 10px",
                  borderRadius: "99px",
                }}
              >
                AI
              </div>
            </div>

            {/* Card 3 — Task */}
            <div
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.10)",
                borderRadius: "16px",
                padding: "16px 20px",
                backdropFilter: "blur(10px)",
                display: "flex",
                alignItems: "center",
                gap: "14px",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  background: "rgba(0,196,140,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#00C48C"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>

              <div>
                <div
                  style={{
                    color: "white",
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                >
                  Fix payment timeout · PHX-142
                </div>

                <div
                  style={{
                    color: "#9B9BAD",
                    fontSize: "12px",
                    marginTop: "2px",
                  }}
                >
                  Assigned to Rahul · HIGH priority
                </div>
              </div>

              <div
                style={{
                  marginLeft: "auto",
                  background: "rgba(255,107,107,0.15)",
                  color: "#FF6B6B",
                  fontSize: "11px",
                  fontWeight: "600",
                  padding: "4px 10px",
                  borderRadius: "99px",
                }}
              >
                HIGH
              </div>
            </div>
          </div>
        </div>

        {/* Bottom quote */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <div
            style={{
              display: "flex",
              gap: "4px",
              marginBottom: "12px",
            }}
          >
            {[1, 2, 3, 4, 5].map((i) => (
              <span
                key={i}
                style={{
                  color: "#FFB800",
                  fontSize: "16px",
                }}
              >
                ★
              </span>
            ))}
          </div>

          <p
            style={{
              color: "#9B9BAD",
              fontSize: "14px",
              lineHeight: "1.6",
              maxWidth: "380px",
            }}
          >
            "Nimbus transformed how our team ships. The AI agents actually do
            the work — not just suggest it."
          </p>

          <div
            style={{
              marginTop: "12px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #6C63FF, #9B8FFF)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "12px",
                fontWeight: "700",
              }}
            >
              MS
            </div>

            <div>
              <div
                style={{
                  color: "white",
                  fontSize: "13px",
                  fontWeight: "600",
                }}
              >
                Manu Shukla
              </div>

              <div
                style={{
                  color: "#9B9BAD",
                  fontSize: "12px",
                }}
              >
                Product Manager, Acme Technologies
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL — White Form */}
      <div
        style={{
          width: "45%",
          background: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "48px 56px",
        }}
      >
        <div style={{ maxWidth: "360px", width: "100%" }}>
          <h1
            style={{
              fontSize: "28px",
              fontWeight: "800",
              color: "#1A1A2E",
              marginBottom: "8px",
            }}
          >
            Welcome back
          </h1>

          <p
            style={{
              fontSize: "14px",
              color: "#9B9BAD",
              marginBottom: "32px",
            }}
          >
            Sign in to your Nimbus workspace
          </p>

          {error && (
            <div
              style={{
                background: "#FFF0F0",
                border: "1px solid rgba(255,107,107,0.3)",
                borderRadius: "10px",
                padding: "12px 16px",
                color: "#FF6B6B",
                fontSize: "13px",
                marginBottom: "20px",
              }}
            >
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            {/* Email */}
            <div style={{ marginBottom: "16px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: "600",
                  color: "#1A1A2E",
                  marginBottom: "6px",
                }}
              >
                Email address
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                required
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  border: "1px solid #EBEBF0",
                  borderRadius: "10px",
                  fontSize: "14px",
                  color: "#1A1A2E",
                  outline: "none",
                  boxSizing: "border-box",
                  background: "#FAFAFA",
                }}
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: "8px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: "600",
                  color: "#1A1A2E",
                  marginBottom: "6px",
                }}
              >
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  border: "1px solid #EBEBF0",
                  borderRadius: "10px",
                  fontSize: "14px",
                  color: "#1A1A2E",
                  outline: "none",
                  boxSizing: "border-box",
                  background: "#FAFAFA",
                }}
              />
            </div>

            <div
              style={{
                textAlign: "right",
                marginBottom: "24px",
              }}
            >
              <a
                href="#"
                style={{
                  fontSize: "13px",
                  color: "#6C63FF",
                  textDecoration: "none",
                  fontWeight: "500",
                }}
              >
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "13px",
                background: loading ? "#9B9BAD" : "#1A1A2E",
                color: "white",
                border: "none",
                borderRadius: "10px",
                fontSize: "15px",
                fontWeight: "600",
                cursor: loading ? "not-allowed" : "pointer",
                marginBottom: "16px",
              }}
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>

            {/* Divider */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  flex: 1,
                  height: "1px",
                  background: "#EBEBF0",
                }}
              />

              <span
                style={{
                  fontSize: "12px",
                  color: "#9B9BAD",
                }}
              >
                or
              </span>

              <div
                style={{
                  flex: 1,
                  height: "1px",
                  background: "#EBEBF0",
                }}
              />
            </div>

            {/* Google Button */}
            <button
              type="button"
              style={{
                width: "100%",
                padding: "13px",
                background: "white",
                color: "#1A1A2E",
                border: "1px solid #EBEBF0",
                borderRadius: "10px",
                fontSize: "14px",
                fontWeight: "500",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />

                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />

                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />

                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>

              Continue with Google
            </button>
          </form>

          <p
            style={{
              textAlign: "center",
              fontSize: "13px",
              color: "#9B9BAD",
              marginTop: "24px",
            }}
          >
            Don&apos;t have an account?{" "}

            <Link
              href="/register"
              style={{
                color: "#6C63FF",
                fontWeight: "600",
                textDecoration: "none",
              }}
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
