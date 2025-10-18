// app/result/ResultClient.jsx
"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import AvatarComposer from "@/components/AvatarComposer";
import { score } from "@/lib/scoring";
import { STYLES, MBTI_TO_STYLE } from "@/lib/styles";

const ANSWER_KEYS = ["dsq_answers_final","dsq_answers_progress","quiz_answers","answers"];

function readSavedAnswers() {
  for (const key of ANSWER_KEYS) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) continue;
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === "object" && Object.keys(parsed).length) return parsed;
    } catch {}
  }
  return null;
}

export default function ResultClient() {
  const router = useRouter();
  const [avatar, setAvatar] = useState(null);
  const [result, setResult] = useState(null);
  const [styleKey, setStyleKey] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const a = localStorage.getItem("avatar");
      if (a) setAvatar(JSON.parse(a));
    } catch {}

    try {
      const answers = readSavedAnswers();
      if (!answers) { setError("No saved answers were found. Please finish the quiz first."); return; }

      const s = score(answers);
      if (!s) { setError("Scoring returned no result. Please retry the quiz."); return; }

      let key = s.styleKey;
      if (!key && s.mbti) key = MBTI_TO_STYLE[String(s.mbti).toUpperCase()];
      if (!key) { setError("Could not resolve a style key from scoring output."); setResult(s); return; }
      if (!STYLES[key]) { setError(`Unknown style key: ${key}. Add it to STYLES.`); setResult(s); return; }

      setResult(s);
      setStyleKey(key);
    } catch (e) {
      console.error("[result] scoring failed:", e);
      setError("Scoring failed. Please retry the quiz.");
    }
  }, []);

  if (!result && !error) {
    return <div className="box"><p>Scoring…</p></div>;
  }

  if (error) {
    return (
      <div className="box" style={{ display: "flow-root" }}>
        <h2 style={{ marginTop: 0 }}>Uh oh.</h2>
        <p style={{ opacity: 0.9 }}>{error}</p>
        <div style={{ display: "flex", gap: 12 }}>
          <button className="btn ghost" onClick={() => router.replace("/quiz")}>Back to Quiz</button>
          <button className="btn primary" onClick={() => router.replace("/")}>Return Home</button>
        </div>
      </div>
    );
  }

  const style = STYLES[styleKey];
  const [p1, p2] = style.palette || ["#00d1b2", "#0b2b2b"];
  const byKey = (k) => STYLES[k];
  const allies = (style.allies || []).map(byKey).filter(Boolean);
  const clashes = (style.clashes || []).map(byKey).filter(Boolean);

  return (
    <div className="box" style={{ borderColor: p1, display:"flow-root", paddingBottom:16 }}>

      <header style={{ marginBottom: 18 }}>
        <h1 style={{ margin: 0, fontSize: "clamp(28px,4vw,42px)" }}>
          Your Style: <span style={{ color: p1 }}>{style.name}</span>
        </h1>
        <p style={{ color: "rgba(255,255,255,.82)", marginTop: 6 }}>
          {style.tagline} <span style={{ opacity: .7 }}>({style.code})</span>
        </p>
      </header>

      <div className="quiz-grid result-grid">        {/* LEFT: Avatar + overlay */}
        <aside
          className="panel"
          style={{
            background: "rgba(255,255,255,.05)",
            border: `1px solid ${p1}33`,
            borderRadius: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
          }}
        >
          <div style={{ position: "relative", width: 192, height: 192, lineHeight: 0 }}>
            <AvatarComposer avatar={avatar || {}} />
            <img
              src={`/assets/overlays/${style.key.toLowerCase()}_overlay.png`}
              alt={`${style.name} overlay`}
              onError={(e) => { e.currentTarget.style.display = "none"; }}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                imageRendering: "pixelated",
                pointerEvents: "none",
                display: "block",
              }}
            />
          </div>
        </aside>

        {/* RIGHT: Description + chips + CTA */}
        <section
          className="panel"
          style={{
            background: `linear-gradient(180deg, ${p1}22, ${p2}11)`,
            border: `1px solid ${p1}55`,
            borderRadius: 16,
            padding: 22,
          }}
        >
          <p style={{ marginTop: 0, lineHeight: 1.65, opacity: .92, whiteSpace: "pre-line" }}>
            {style.description}
          </p>

          <div className="meta-rows" style={{ display: "grid", gap: 14, marginTop: 18 }}>
            {allies.length > 0 && (
              <div>
                <div className="meta-label">Fights well alongside</div>
                <div className="chip-row">
                  {allies.map((s) => (
                    <span key={s.key} className="chip" style={{ borderColor: s.palette[0] }}>
                      <i className="chip-dot" style={{ background: s.palette[0] }} />
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {clashes.length > 0 && (
              <div>
                <div className="meta-label">Tends to clash with</div>
                <div className="chip-row">
                  {clashes.map((s) => (
                    <span key={s.key} className="chip chip-danger" style={{ borderColor: `${s.palette[0]}66` }}>
                      <i className="chip-dot" style={{ background: s.palette[0], boxShadow: `0 0 0 2px ${s.palette[0]}33 inset` }} />
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {style.rank && (
              <div>
                <div className="meta-label">Corps role</div>
                <div className="chip-row">
                  <span className="chip" style={{ borderColor: p1 }}>
                    <i className="chip-dot" style={{ background: p1 }} />
                    {style.rank}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 24 }}>
            <button
              className="btn primary return-home"
              style={{ background: p1, borderColor: p1 }}
              onClick={() => router.push("/")}
            >
              Return Home
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
