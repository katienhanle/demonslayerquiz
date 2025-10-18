// app/quiz/page.js
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import questions from "@/lib/questions";
import AvatarComposer from "@/components/AvatarComposer";

export default function QuizPage() {
  const router = useRouter();

  const [answers, setAnswers] = useState({});
  const [index, setIndex] = useState(0);

  // Keep avatar in sync (read once; update on cross-tab storage events)
  const [avatar, setAvatar] = useState(null);
  useEffect(() => {
    const readAvatar = () => {
      try {
        const raw = localStorage.getItem("avatar");
        if (!raw) return;
        const parsed = JSON.parse(raw);
        setAvatar(parsed);
      } catch {}
    };

    // initial read
    readAvatar();

    // cross-tab updates only (no polling → fixes preview flicker)
    const onStorage = (e) => {
      if (e?.key && e.key !== "avatar") return;
      readAvatar();
    };
    window.addEventListener("storage", onStorage);

    return () => {
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  // Slide-in animation when arriving from Customize
  const [enterAnim, setEnterAnim] = useState(false);
  useEffect(() => {
    try {
      if (sessionStorage.getItem("enterFromCustomize") === "1") {
        setEnterAnim(true);
        sessionStorage.removeItem("enterFromCustomize");
      }
    } catch {}
  }, []);

  // Persist progress as you go
  useEffect(() => {
    try {
      localStorage.setItem("dsq_answers_progress", JSON.stringify(answers));
    } catch {}
  }, [answers]);

  const total = questions.length;
  const q = questions[index];
  const currentAnswer = q ? answers[q.id] : undefined;
  const canGoNext = currentAnswer !== undefined && currentAnswer !== null;

  function selectOption(optionId) {
    if (!q) return;
    setAnswers((prev) => ({ ...prev, [q.id]: optionId }));
  }

  function goNext() {
    if (index < total - 1) {
      setIndex((i) => i + 1);
    } else {
      // final save + route
      try {
        localStorage.setItem("dsq_answers_final", JSON.stringify(answers));
        localStorage.removeItem("dsq_answers_progress");
      } catch {}
      router.push("/result");
    }
  }

  function goBack() {
    if (index > 0) setIndex((i) => i - 1);
  }

  return (
    <main className="screen-wrap">
      <div className={`box ${enterAnim ? "slide-in-right" : ""}`}>
        <div className="quiz-grid">
          {/* Left: avatar preview (matches Result layout: 192x192) */}
          <aside
            className="panel"
            aria-label="Your avatar"
            style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
          >
            <div className="preview-card" style={{ width: 192, height: 192, position: "relative" }}>
              <AvatarComposer avatar={avatar || {}} />
            </div>
          </aside>

          {/* Right: question box */}
          <section className="panel">
            <header style={{ marginBottom: 12 }}>
              <h1 style={{ fontSize: "clamp(24px, 3.5vw, 36px)", margin: 0 }}>
                Which Demon Slayer are you?
              </h1>
              <p style={{ color: "rgba(255,255,255,.7)", margin: "6px 0 0" }}>
                Question {index + 1} of {total}
              </p>
            </header>

            <h2 style={{ fontSize: "clamp(18px, 2.6vw, 24px)", margin: "8px 0 16px" }}>
              {q.prompt}
            </h2>

            <div style={{ display: "grid", gap: 12, marginBottom: 16 }}>
              {(q.options || []).map((opt) => {
                const optId = opt.id ?? opt.value ?? opt.label;
                const checked = currentAnswer === optId;
                return (
                  <label
                    key={optId}
                    style={{
                      display: "flex",
                      gap: 12,
                      alignItems: "center",
                      border: `1px solid ${checked ? "#fff" : "rgba(255,255,255,.2)"}`,
                      borderRadius: 12,
                      padding: "10px 12px",
                      background: "rgba(255,255,255,.05)",
                      cursor: "pointer",
                    }}
                  >
                    <input
                      type="radio"
                      name={`q-${q.id}`}
                      checked={checked || false}
                      onChange={() => selectOption(optId)}
                    />
                    <span>{opt.label}</span>
                  </label>
                );
              })}
            </div>

            {/* Buttons: desktop side-by-side; mobile stacks with Next on top, Back below */}
            <footer className="nav-buttons">
              {index > 0 && (
                <button onClick={goBack} className="btn ghost back">
                  Back
                </button>
              )}
              <button onClick={goNext} className="btn primary next" disabled={!canGoNext}>
                {index === total - 1 ? "See Result" : "Next"}
              </button>
            </footer>
          </section>
        </div>
      </div>
    </main>
  );
}
