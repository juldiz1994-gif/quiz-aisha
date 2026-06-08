"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  q1,
  serviceQuestions,
  courseQuestions,
  q7,
  type Question,
  type QuizAnswers,
} from "@/lib/quizData";

export default function QuizPage() {
  const router = useRouter();
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [path, setPath] = useState<"A" | "B" | null>(null);
  const [loading, setLoading] = useState(false);
  const [animKey, setAnimKey] = useState(0);

  function getQuestionList(): Question[] {
    if (path === "A") return [q1, ...serviceQuestions, q7];
    if (path === "B") return [q1, ...courseQuestions, q7];
    return [q1];
  }

  const questions = getQuestionList();
  const current = questions[currentIndex];
  const totalQuestions = 7;
  const progress = Math.round(((currentIndex + 1) / totalQuestions) * 100);

  function handleAnswer(optionId: string) {
    const newAnswers = { ...answers, [current.id]: optionId };
    setAnswers(newAnswers);

    if (current.id === "q1") {
      setPath(optionId as "A" | "B");
      setAnimKey((k) => k + 1);
      setCurrentIndex(1);
      return;
    }

    if (currentIndex === totalQuestions - 1) {
      submitQuiz(newAnswers);
      return;
    }

    setAnimKey((k) => k + 1);
    setCurrentIndex((i) => i + 1);
  }

  async function submitQuiz(finalAnswers: QuizAnswers) {
    setLoading(true);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: finalAnswers, path }),
      });
      const data = await res.json();
      const encoded = encodeURIComponent(JSON.stringify({ result: data.result, path }));
      router.push(`/result?data=${encoded}`);
    } catch {
      const encoded = encodeURIComponent(JSON.stringify({ result: "", path }));
      router.push(`/result?data=${encoded}`);
    }
  }

  function handleBack() {
    if (currentIndex === 0) return;
    if (currentIndex === 1) setPath(null);
    setAnimKey((k) => k + 1);
    setCurrentIndex((i) => i - 1);
  }

  if (loading) {
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
          }}
        >
          <div style={{ textAlign: "center", padding: "0 24px" }}>
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: "50%",
                border: "3px solid transparent",
                borderTopColor: "#8b5cf6",
                borderRightColor: "#ec4899",
                animation: "spin 0.8s linear infinite",
                margin: "0 auto 28px",
              }}
            />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } } @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }`}</style>
            <p style={{ fontSize: 22, fontWeight: 700, marginBottom: 10 }}>
              AI талдап жатыр
              <span style={{ animation: "blink 1.2s ease-in-out infinite" }}>...</span>
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "center" }}>
              {[
                "🔍 Жауаптарыңыз оқылуда",
                "🧠 Профиль жасалуда",
                "✨ Ұсыныс дайындалуда",
              ].map((text, i) => (
                <p
                  key={text}
                  style={{
                    fontSize: 13,
                    color: "rgba(241,240,255,0.4)",
                    animation: `blink 2s ease-in-out ${i * 0.6}s infinite`,
                  }}
                >
                  {text}
                </p>
              ))}
            </div>
          </div>
        </main>
      </>
    );
  }

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
          padding: "40px 20px",
        }}
      >
        <div style={{ maxWidth: 520, width: "100%" }}>

          {/* Top bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 20,
            }}
          >
            <span
              style={{
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "rgba(167,139,250,0.7)",
              }}
            >
              Aisha AI Studio
            </span>
            <span
              className="glass"
              style={{
                padding: "4px 12px",
                fontSize: 12,
                fontFamily: "'Space Mono', monospace",
                color: "rgba(241,240,255,0.4)",
              }}
            >
              {currentIndex + 1} / {totalQuestions}
            </span>
          </div>

          {/* Progress */}
          <div className="progress-track" style={{ marginBottom: 36 }}>
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>

          {/* Question card */}
          <div
            key={animKey}
            className="glass-strong animate-scaleIn"
            style={{ padding: "36px 32px", marginBottom: 16 }}
          >
            <p
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(167,139,250,0.6)",
                marginBottom: 16,
                fontFamily: "'Space Mono', monospace",
              }}
            >
              Сұрақ {currentIndex + 1}
            </p>

            <h2
              style={{
                fontSize: "clamp(18px, 3.5vw, 24px)",
                fontWeight: 700,
                lineHeight: 1.4,
                color: "#f1f0ff",
                marginBottom: 28,
                letterSpacing: "-0.01em",
              }}
            >
              {current.question}
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {current.options.map((option, i) => (
                <button
                  key={option.id}
                  onClick={() => handleAnswer(option.id)}
                  className="option-btn animate-fadeUp"
                  style={{
                    animationDelay: `${i * 0.07}s`,
                    opacity: 0,
                  }}
                >
                  <span className="option-letter">{option.id}</span>
                  <span style={{ fontSize: 14, lineHeight: 1.5, fontWeight: 500 }}>
                    {option.text}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Back */}
          {currentIndex > 0 && (
            <button
              onClick={handleBack}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "rgba(241,240,255,0.25)",
                fontSize: 13,
                fontFamily: "'Sora', sans-serif",
                padding: "8px 4px",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "rgba(241,240,255,0.6)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(241,240,255,0.25)")
              }
            >
              ← Артқа
            </button>
          )}
        </div>
      </main>
    </>
  );
}
