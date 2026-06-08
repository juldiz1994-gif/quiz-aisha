"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const INSTAGRAM_USERNAME = process.env.NEXT_PUBLIC_INSTAGRAM_USERNAME || "ai_aisha_kz";
const YOUTUBE_LINK = process.env.NEXT_PUBLIC_YOUTUBE_LINK || "https://youtube.com";

function ResultContent() {
  const searchParams = useSearchParams();
  const raw = searchParams.get("data");

  let aiResult = "";
  let path: "A" | "B" | null = null;

  try {
    const parsed = JSON.parse(decodeURIComponent(raw || "{}"));
    aiResult = parsed.result || "";
    path = parsed.path || null;
  } catch {}

  const igLink = `https://ig.me/m/${INSTAGRAM_USERNAME}`;

  const isService = path === "A";

  return (
    <>
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
        <div style={{ maxWidth: 540, width: "100%", textAlign: "center" }}>

          {/* Icon */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
            <div
              className="animate-float"
              style={{
                width: 88,
                height: 88,
                borderRadius: "50%",
                background: "linear-gradient(135deg, rgba(139,92,246,0.2), rgba(236,72,153,0.2))",
                border: "1px solid rgba(139,92,246,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 40,
              }}
            >
              🤖
            </div>
          </div>

          {/* Headline */}
          <h1
            style={{
              fontSize: "clamp(24px, 5vw, 34px)",
              fontWeight: 800,
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
              marginBottom: 12,
            }}
          >
            <span className="text-gradient">AI талдауы дайын!</span>
          </h1>

          {/* AI result block */}
          {aiResult ? (
            <div
              className="glass"
              style={{
                padding: "24px 28px",
                marginBottom: 24,
                textAlign: "left",
              }}
            >
              <p
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "rgba(167,139,250,0.6)",
                  marginBottom: 12,
                  fontFamily: "'Space Mono', monospace",
                }}
              >
                🤖 Сіздің нәтижеңіз
              </p>
              <p
                style={{
                  fontSize: 15,
                  lineHeight: 1.75,
                  color: "rgba(241,240,255,0.85)",
                }}
              >
                {aiResult}
              </p>
            </div>
          ) : (
            <p
              style={{
                fontSize: 15,
                lineHeight: 1.7,
                color: "rgba(241,240,255,0.5)",
                marginBottom: 24,
              }}
            >
              Жауаптарыңызға сүйеніп, сізге арнайы ұсыныс бар.
            </p>
          )}

          {/* Offer card */}
          <div
            style={{
              position: "relative",
              marginBottom: 24,
              padding: "1px",
              borderRadius: 20,
              background: isService
                ? "linear-gradient(135deg, rgba(139,92,246,0.6), rgba(6,182,212,0.6))"
                : "linear-gradient(135deg, rgba(236,72,153,0.6), rgba(251,191,36,0.6))",
            }}
          >
            <div
              className="glass-strong"
              style={{ padding: "24px 28px", borderRadius: 19 }}
            >
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: isService ? "rgba(6,182,212,0.8)" : "rgba(251,191,36,0.8)",
                  marginBottom: 10,
                  fontFamily: "'Space Mono', monospace",
                }}
              >
                {isService ? "⚡ Кызмет" : "🎓 Курс"}
              </p>
              <p
                style={{
                  fontSize: 17,
                  fontWeight: 700,
                  color: "#f1f0ff",
                  lineHeight: 1.5,
                  marginBottom: 8,
                }}
              >
                {isService
                  ? "Бизнесіңізді толық автоматтандырып береміз — сіз тек нәтижені аласыз."
                  : "Курста бизнесіңізді өзіңіз автоматтандыруды үйренесіз — нақты тапсырмалармен."}
              </p>
              <p
                style={{
                  fontSize: 13,
                  color: "rgba(241,240,255,0.45)",
                  lineHeight: 1.6,
                }}
              >
                {isService
                  ? "Instagram боты · Telegram · Төлем жүйесі · Лид воронкасы"
                  : "Нөлдан бастап · Видео + тапсырма · Нақты нәтиже · Ментор қолдауы"}
              </p>
            </div>
          </div>

          {/* CTA section */}
          <div
            style={{
              marginBottom: 24,
              padding: "20px 24px",
              borderRadius: 16,
              background: "rgba(251,191,36,0.07)",
              border: "1px solid rgba(251,191,36,0.25)",
            }}
          >
            <p style={{ fontSize: 22, marginBottom: 8 }}>🎁</p>
            <p style={{ fontSize: 16, fontWeight: 700, color: "#fbbf24", lineHeight: 1.5, marginBottom: 6 }}>
              20% скидка алу үшін —
            </p>
            <p style={{ fontSize: 14, color: "rgba(241,240,255,0.6)", lineHeight: 1.6 }}>
              Instagram-ға өтіп, хабарлама жіберіңіз.<br />
              Скидканы сол жерде растаймыз.
            </p>
          </div>

          {/* Buttons */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <a
              href={igLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "block",
                padding: "20px 32px",
                fontSize: 17,
                fontWeight: 700,
                color: "white",
                textDecoration: "none",
                letterSpacing: "0.02em",
                borderRadius: 16,
                background: "linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)",
                boxShadow: "0 0 30px rgba(253,29,29,0.35)",
              }}
            >
              📩 20% скидканы Instagram-дан алу →
            </a>

            <a
              href={YOUTUBE_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="glass"
              style={{
                display: "block",
                padding: "16px 32px",
                fontSize: 15,
                fontWeight: 600,
                color: "rgba(241,240,255,0.65)",
                textDecoration: "none",
              }}
            >
              ▶️ Курс жайлы тегін сабақты көру
            </a>
          </div>

          <p
            style={{
              marginTop: 32,
              fontSize: 11,
              color: "rgba(241,240,255,0.15)",
              letterSpacing: "0.08em",
            }}
          >
            AISHA AI STUDIO · БИЗНЕС АВТОМАТТАНДЫРУ
          </p>
        </div>
      </main>
    </>
  );
}

export default function ResultPage() {
  return (
    <Suspense
      fallback={
        <>
          <div className="bg-scene">
            <div className="stars" /><div className="blob blob-1" /><div className="blob blob-2" />
          </div>
          <main
            style={{
              position: "relative",
              zIndex: 1,
              minHeight: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                border: "3px solid transparent",
                borderTopColor: "#8b5cf6",
                animation: "spin 0.8s linear infinite",
              }}
            />
          </main>
        </>
      }
    >
      <ResultContent />
    </Suspense>
  );
}
