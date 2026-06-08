"use client";

import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  return (
    <>
      {/* Animated background */}
      <div className="bg-scene">
        <div className="stars" />
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>

      <main
        style={{
          position: "relative",
          zIndex: 1,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "48px 20px",
        }}
      >
        <div style={{ maxWidth: 560, width: "100%", textAlign: "center" }}>

          {/* Badge */}
          <div
            className="animate-fadeUp glass"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 16px",
              marginBottom: 32,
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "rgba(167,139,250,0.9)",
            }}
          >
            <span style={{ fontSize: 8 }}>●</span>
            Aisha AI Studio
          </div>

          {/* Subtext */}
          <p
            className="animate-fadeUp delay-2"
            style={{
              fontSize: 17,
              lineHeight: 1.7,
              color: "rgba(241,240,255,0.5)",
              marginBottom: 40,
            }}
          >
            Небары <strong style={{ color: "rgba(241,240,255,0.85)" }}>7 сұрақ</strong> —
            біздің курс немесе кызмет<br />сізге керек пе, жоқ па — AI талдап береді.
          </p>

          {/* Discount card */}
          <div
            className="animate-pulse-glow"
            style={{
              position: "relative",
              marginBottom: 40,
              borderRadius: 20,
              overflow: "hidden",
              padding: "1px",
              background: "linear-gradient(135deg, rgba(139,92,246,0.6), rgba(236,72,153,0.6))",
            }}
          >
            <div
              className="glass-strong"
              style={{
                padding: "28px 32px",
                borderRadius: 19,
              }}
            >
              <div style={{ fontSize: 36, marginBottom: 12 }}>🎁</div>
              <p style={{ fontSize: 15, color: "rgba(241,240,255,0.6)", marginBottom: 10, lineHeight: 1.6 }}>
                Осы тесттен өтіп,{" "}
                <strong style={{ color: "#fbbf24" }}>60% және одан жоғары</strong>{" "}
                жинасаңыз —
              </p>
              <p
                className="text-gradient"
                style={{ fontSize: 24, fontWeight: 800, marginBottom: 10, lineHeight: 1.3 }}
              >
                Курсқа да, кызметке де<br />20% жеңілдік аласыз!
              </p>
              <p style={{ fontSize: 12, color: "rgba(241,240,255,0.3)" }}>
                Тек осы тест арқылы ғана қолжетімді
              </p>
            </div>
          </div>

          {/* Stats */}
          <div
            className="animate-fadeUp delay-3"
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 0,
              marginBottom: 40,
            }}
          >
            {[
              { value: "7", label: "сұрақ" },
              { value: "2 мин", label: "уақыт" },
              { value: "AI", label: "талдау" },
            ].map((s, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  maxWidth: 120,
                  padding: "16px 8px",
                  borderRight: i < 2 ? "1px solid rgba(255,255,255,0.06)" : "none",
                }}
              >
                <div
                  className="text-gradient"
                  style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}
                >
                  {s.value}
                </div>
                <div style={{ fontSize: 11, color: "rgba(241,240,255,0.3)", letterSpacing: "0.08em" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="animate-fadeUp delay-4">
            <button
              onClick={() => router.push("/quiz")}
              className="btn-glow"
              style={{
                width: "100%",
                padding: "18px 32px",
                fontSize: 17,
                fontWeight: 700,
                color: "white",
                border: "none",
                cursor: "pointer",
                letterSpacing: "0.02em",
              }}
            >
              Тексеруді бастау →
            </button>
            <p
              style={{
                marginTop: 14,
                fontSize: 12,
                color: "rgba(241,240,255,0.2)",
                letterSpacing: "0.06em",
              }}
            >
              ТЕГІН · ТІРКЕЛУ ТАЛАП ЕТІЛМЕЙДІ
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
