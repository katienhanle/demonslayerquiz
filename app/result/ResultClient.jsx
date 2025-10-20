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

  // NEW: track player name
  const [playerName, setPlayerName] = useState("");

  useEffect(() => {
    try {
      const a = localStorage.getItem("avatar");
      if (a) setAvatar(JSON.parse(a));
    } catch {}

    // NEW: read saved name from /name/page.js
    try {
      const storedName = localStorage.getItem("dsq_player_name"); // set in name page
      if (storedName) setPlayerName(storedName);
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

  // NEW: helper to personalize style.description with the name
  function personalizeDescription(desc, name) {
    if (!name) return desc;

    // Gentle substitution: first “They/they” → name
    let out = desc.replace(/\bThey\b/, name).replace(/\bthey\b/, name);

    // Optional broader pass (uncomment if you want):
    out = out
      .replace(/\bThey're\b/g, `${name}'s`)
      .replace(/\bthey're\b/g, `${name}'s`)
      .replace(/\bTheir\b/g, `${name}'s`)
      .replace(/\btheir\b/g, `${name}'s`)
      .replace(/\bThem\b/g, name)
      .replace(/\bthem\b/g, name);

    return out;
  }

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
  function personalizeDescription(desc, name) {
    if (!name) return desc;
  
    // Replace only the first "They/they <verb>" with "Name <verb3sg>"
    return desc.replace(/\b([Tt]hey)\b\s+([A-Za-z']+)/, (match, pron, verb) => {
      const v = toThirdPerson(verb);
      return `${name} ${v}`;
    });
  }
  
  function toThirdPerson(verbRaw) {
    const verb = verbRaw; // keep original case as given in text
  
    // Irregulars / common auxiliaries
    const irregular = {
      are: "is",
      Are: "Is",
      have: "has",
      Have: "Has",
      do: "does",
      Do: "Does",
      go: "goes",
      Go: "Goes",
      were: "was",
      Were: "Was",
    };
    if (irregular[verb] != null) return irregular[verb];
  
    // Already looks like 3rd person (very light guard)
    if (/s$/.test(verb)) return verb;
  
    // Consonant + y → ies
    if (/[b-df-hj-np-tv-z]y$/.test(verb)) return verb.replace(/y$/, "ies");
  
    // Add "es" for sibilant endings or …o
    if (/(s|sh|ch|x|z|o)$/i.test(verb)) return `${verb}es`;
  
    // Default: add "s"
    return `${verb}s`;
  }
  

  const style = STYLES[styleKey];
  const [p1, p2] = style.palette || ["#00d1b2", "#0b2b2b"];
  const byKey = (k) => STYLES[k];
  const allies = (style.allies || []).map(byKey).filter(Boolean);
  const clashes = (style.clashes || []).map(byKey).filter(Boolean);
  async function generateShareCard() {
    const style = STYLES[styleKey];
    const [p1] = style.palette || ["#ff7a00"]; // style color (orange for Ember)
    const byKey  = (k) => STYLES[k];
    const allies  = (style.allies  || []).map(byKey).filter(Boolean);
    const clashes = (style.clashes || []).map(byKey).filter(Boolean);
    const playerName = (typeof window !== "undefined" && localStorage.getItem("dsq_player_name")) || "";
  
    // Site purple base (card background)
    const SITE_PURPLE = "#1a0a2e";
  
    const hexToRgb = (hex) => {
      const h = hex.replace("#", "");
      return `${parseInt(h.slice(0,2),16)}, ${parseInt(h.slice(2,4),16)}, ${parseInt(h.slice(4,6),16)}`;
    };
    const p1rgb = hexToRgb(p1);
  
    // A calmer orange for the panel (less saturated than raw p1)
    const PANEL_ORANGE = `rgba(${p1rgb}, 0.1)`; // tweak 0.85–0.95 to taste
  
    // ---------- Offscreen root ----------
    const container = document.createElement("div");
    container.style.cssText = `
      position: fixed; left: -9999px; top: 0;
      width: 1080px; height: 1920px;
      display: flex; align-items: center; justify-content: center;
      font-family: 'Jersey 25', sans-serif; color: white;
      box-sizing: border-box;
    `;
  
    // ---------- Frame (captured) ----------
    const frame = document.createElement("div");
    frame.style.cssText = `
      position: relative;
      width: 100%; height: 100%;
      border-radius: 40px;
      border: 4px solid ${p1};
      box-shadow: 0 0 0 1px rgba(255,255,255,.06) inset;
      overflow: hidden;
    `;
    container.appendChild(frame);
  
    // Background (reliable for iOS/html2canvas)
    const bg = document.createElement("div");
    bg.style.cssText = `
      position: absolute; inset: 0; z-index: 0;
      background:
        radial-gradient(120% 80% at 50% 20%,
          rgba(0,0,0,0) 0%,
          rgba(0,0,0,.35) 70%,
          rgba(0,0,0,.55) 100%),
        linear-gradient(160deg, #1a0a2e 0%, #2b0a3d 50%, #1f0d33 100%);
      background-color: ${SITE_PURPLE};
    `;
    frame.appendChild(bg);
  
    // Content
    const content = document.createElement("div");
    content.style.cssText = `
      position: relative; z-index: 1;
      width: 100%; height: 100%;
      padding: 160px 96px 120px; /* keep header clear of IG top chrome */
      box-sizing: border-box;
      display: flex; flex-direction: column;
      align-items: center; justify-content: space-between;
    `;
    frame.appendChild(content);
  
    // ---------- Header ----------
    const header = document.createElement("div");
    header.style.cssText = `text-align:center; width:100%;`;
    const displayName = playerName ? `${playerName}'s` : "Your";
    header.innerHTML = `
      <h1 style="font-size:64px; margin:0 0 8px 0; color:#fff; font-weight:400;">
        ${displayName} Corps Card
      </h1>
      <h2 style="font-size:96px; margin:0 0 6px 0; color:${p1}; font-weight:400;">
        ${style.name}
      </h2>
      <p style="font-size:48px; margin:0; opacity:.85;">
        ${style.tagline} <span style="opacity:.6;">(${style.code})</span>
      </p>
    `;
  
    // ---------- Avatar (crisp + purple background to kill corner bleed) ----------
    const avatarBox = document.createElement("div");
    avatarBox.style.cssText = `
      width:560px; height:560px; border-radius:40px;
      overflow:hidden; background-clip:padding-box;
      background-color: ${SITE_PURPLE};
      border: 3px solid ${p1}88;
      display:flex; align-items:center; justify-content:center;
      margin:24px 0 72px 0;
      box-shadow: 0 12px 40px rgba(0,0,0,.35);
    `;
  
    const originalCanvas =
      document.querySelector("[data-avatar-root] canvas") ||
      document.querySelector(".preview-card canvas") ||
      document.querySelector("aside.panel canvas");
    if (!originalCanvas) { console.error("Avatar canvas not found!"); return; }
  
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
  
    const baseImg = new Image();
    baseImg.src = originalCanvas.toDataURL("image/png");
    await baseImg.decode();
  
    const overlay = new Image();
    overlay.src = `/assets/overlays/${style.key.toLowerCase()}_overlay.png`;
    try { await overlay.decode(); } catch {}
  
    const OUT = document.createElement("canvas");
    OUT.width = OUT.height = 560;
    const ctx = OUT.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    ctx.fillStyle = SITE_PURPLE;  // 👈 fill first so corners are pure purple
    ctx.fillRect(0, 0, 560, 560);
    ctx.drawImage(baseImg, 0, 0, 560, 560);
    if (overlay.width) ctx.drawImage(overlay, 0, 0, 560, 560);
  
    const avatar = new Image();
    avatar.src = OUT.toDataURL("image/png");
    avatar.style.cssText = "width:560px;height:560px;image-rendering:pixelated;display:block;";
    avatarBox.appendChild(avatar);
  
    // ---------- Meta panel (flat orange, no shadows/gradients/gloss) ----------
    const meta = document.createElement("div");
    meta.style.cssText = `
      position: relative;
      width:100%; max-width:760px; margin:0 auto; align-self:center;
      box-sizing:border-box;
      padding: 28px 32px;
      border-radius: 24px;
      overflow: hidden;
      background: ${PANEL_ORANGE};     /* 👈 flat subdued orange */
      border: 3px solid ${p1};         /* style-colored border */
      color: #fff;
    `;
    // Perfectly radius-matched inner stroke (no corner artifacts)
    const inner = document.createElement("div");
    inner.style.cssText = `
      position:absolute; inset:0; pointer-events:none;
      border-radius: inherit;
      border: 1px solid rgba(255,255,255,0.18);
      box-sizing: border-box;
    `;
    meta.appendChild(inner);
  
    const chip = (label, color) => `
      <span style="
        display:inline-flex;align-items:center;gap:14px;
        padding:14px 26px;border-radius:999px;
        background: rgba(0,0,0,.12);
        border:2px solid ${color};
        font-size:32px;margin:0 12px 12px 0;">
        <i style="width:16px;height:16px;border-radius:50%;background:${color};display:inline-block;"></i>
        ${label}
      </span>
    `;
  
    const alliesHTML = allies.length
      ? `<div style="margin-bottom:8px;">
           <div style="font-size:32px; opacity:.95; margin:0 0 12px 0;">Fights well alongside</div>
           <div>${allies.map(s => chip(s.name, s.palette[0])).join("")}</div>
         </div>`
      : "";
  
    const clashesHTML = clashes.length
      ? `<div style="margin-bottom:8px;">
           <div style="font-size:32px; opacity:.95; margin:0 0 12px 0;">Tends to clash with</div>
           <div>${clashes.map(s => chip(s.name, s.palette[0])).join("")}</div>
         </div>`
      : "";
  
    const roleHTML = style.rank
      ? `<div>
           <div style="font-size:32px; opacity:.95; margin:0 0 12px 0;">Corps role</div>
           <span style="
             display:inline-flex;align-items:center;gap:14px;
             padding:16px 28px;border-radius:999px;
             background: rgba(0,0,0,.16);
             border:2px solid #fff; font-size:34px;">
             <i style="width:16px;height:16px;border-radius:50%;background:#fff;display:inline-block;"></i>
             ${style.rank}
           </span>
         </div>`
      : "";
  
    meta.insertAdjacentHTML("beforeend", alliesHTML + clashesHTML + roleHTML);
  
    // ---------- Footer ----------
    const footer = document.createElement("div");
    footer.style.cssText = "text-align:center;width:100%;";
    footer.innerHTML = `
      <p style="font-size:40px; opacity:.6; margin:0 0 12px 0;">Take the quiz at</p>
      <p style="font-size:56px; margin:0; color:${p1};">bit.ly/corpsquiz</p>
    `;
  
    // Assemble
    content.append(header, avatarBox, meta, footer);
    document.body.appendChild(container);
  
    // Allow paint before capture
    await new Promise((r) => setTimeout(r, 60));
  
    // Capture
    const html2canvas = (await import("html2canvas")).default;
    const canvas = await html2canvas(frame, {
      scale: window.devicePixelRatio || 2,
      backgroundColor: SITE_PURPLE,
      useCORS: true,
      logging: false,
    });
  
    document.body.removeChild(container);
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      sessionStorage.setItem("shareCardUrl", url);
      router.push("/share");
    }, "image/png");
  }
  
  
  
  
  return (
    <>
    
    <div className="box" style={{ borderColor: p1, display:"flow-root", paddingBottom:16 }}>
      <header style={{ marginBottom: 18 }}>
        <h1 style={{ margin: 0, fontSize: "clamp(28px,4vw,42px)" }}>
          Your Style: <span style={{ color: p1 }}>{style.name}</span>
        </h1>
        <p style={{ color: "rgba(255,255,255,.82)", marginTop: 6 }}>
          {style.tagline} <span style={{ opacity: .7 }}>({style.code})</span>
        </p>
      </header>

      <div className="quiz-grid result-grid">
        {/* LEFT: Avatar + overlay */}
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
          <div data-avatar-root style={{ position: "relative", width: 192, height: 192, lineHeight: 0 }}>

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
        <button
          onClick={generateShareCard}
          className="btn primary share-btn"
          style={{
            display: 'none',          // hidden on desktop
            width: '100%',
            marginTop: '16px',
            background: p1,
            borderColor: p1,
          }}
          aria-label="Download shareable card"
        >
          View Your Card
        </button>

        <style jsx>{`
          @media (max-width: 900px) {
            button[aria-label="Download shareable card"] {
              display: block !important;
            }
            .share-btn {
              font-size: 20px;        /* bump text size on mobile */
              padding: 16px 18px;     /* a touch more padding */
              letter-spacing: 0.02em; /* slight tracking for legibility */
            }
          }
        `}</style>

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
          

          <div className="meta-rows" style={{ display: "grid", gap: 14, marginTop: 0 }}>
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

          <p style={{ marginTop: 10, lineHeight: 1.65, opacity: .92, whiteSpace: "pre-line" }}>
            {personalizeDescription(style.description, playerName)}
          </p>

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
    </>
  );
}
