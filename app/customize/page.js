// app/customize/page.js
"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import AvatarComposer from "@/components/AvatarComposer";
import { useRouter } from "next/navigation";

// Adjust these to match your files
const HAIR_STYLES = [
  "hair_1","hair_2","hair_3","hair_4",
  "hair_5","hair_6","hair_7","hair_8",
  "hair_9","hair_10","hair_11","hair_12",
  "hair_13","hair_14","hair_15","hair_16", "hair_17",
  "hair_18", "hair_19",
];
const EYE_STYLES  = [
  "eyes_1","eyes_2","eyes_3","eyes_4",
  "eyes_5","eyes_6","eyes_7","eyes_8",
  "eyes_9","eyes_10","eyes_11","eyes_12"
];
const SKIN_MIN = 1;   // base_skin-01.png (or -1.png if you removed padding)
const SKIN_MAX = 11;

export default function CustomizePage() {
  const router = useRouter();
  const [animating, setAnimating] = useState(false);

  const [hairIndex, setHairIndex] = useState(0);
  const [hairColor, setHairColor] = useState("#000000");
  const [skin, setSkin] = useState(SKIN_MIN);
  const [eyeIndex, setEyeIndex] = useState(0);

  // Load saved avatar
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("avatar") || "{}");
      if (saved.hairStyle) {
        const idx = HAIR_STYLES.indexOf(saved.hairStyle);
        if (idx >= 0) setHairIndex(idx);
      }
      if (saved.hairColor) setHairColor(saved.hairColor);
      if (saved.skin && saved.skin >= SKIN_MIN && saved.skin <= SKIN_MAX) {
        setSkin(saved.skin);
      }
      if (saved.eye) {
        const eIdx = EYE_STYLES.indexOf(saved.eye);
        if (eIdx >= 0) setEyeIndex(eIdx);
      }
    } catch {}
  }, []);

  // Save avatar
  useEffect(() => {
    const payload = {
      skin,
      hairStyle: HAIR_STYLES[hairIndex],
      hairColor,
      eye: EYE_STYLES[eyeIndex],
    };
    localStorage.setItem("avatar", JSON.stringify(payload));
  }, [skin, hairIndex, hairColor, eyeIndex]);

  function handleContinue() {
    setAnimating(true);
    try {
      // Save the avatar immediately before navigating
      localStorage.setItem(
        "avatar",
        JSON.stringify({
          skin,
          hairStyle: HAIR_STYLES[hairIndex],
          hairColor,
          eye: EYE_STYLES[eyeIndex],
        })
      );
  
      // Set this flag so the quiz page knows you came from customize
      sessionStorage.setItem("enterFromCustomize", "1");
    } catch (err) {
      console.error("Failed to save avatar:", err);
    }
  
    // Navigate slightly later, after save completes
    setTimeout(() => router.push("/quiz"), 400);
  }
  
  function onAnimEnd() {
    if (animating) {
      router.push("/quiz");
    }
  }
  
  const hairStyleLabel = useMemo(() => `Hair ${hairIndex + 1}`, [hairIndex]);
  const eyeStyleLabel  = useMemo(() => `Eyes ${eyeIndex + 1}`, [eyeIndex]);

  const stepHair = (dir) =>
    setHairIndex(i => (i + (dir === "next" ? 1 : -1) + HAIR_STYLES.length) % HAIR_STYLES.length);
  const stepEye = (dir) =>
    setEyeIndex(i => (i + (dir === "next" ? 1 : -1) + EYE_STYLES.length) % EYE_STYLES.length);
  const stepSkin = (dir) =>
    setSkin(s => (dir === "next" ? (s >= SKIN_MAX ? SKIN_MIN : s + 1)
                                  : (s <= SKIN_MIN ? SKIN_MAX : s - 1)));
  
    return (
    <main className="screen-wrap">
      <div
        className={`box ${animating ? "slide-out-left" : ""}`}
        onAnimationEnd={onAnimEnd}
      >
        <header className="customize-header" style={{ marginBottom: 16 }}>
          <h1 style={{ fontSize: "clamp(28px, 4.5vw, 40px)", margin: 0 }}>
            Customize Your Slayer
          </h1>
          <p style={{ margin: "8px 0 0", color: "rgba(255,255,255,.75)" }}>
            Pick your hair, skin, and eyes. Watch your avatar update live!
          </p>
        </header>

        <div className="customize-grid">
          {/* LEFT: controls */}
          <section className="customize-panel panel controls-panel">
            {/* Hair style */}
            <div className="row">
              <label className="row-label">Hair Style</label>
              <div className="stepper">
                <button className="step" onClick={() => stepHair("prev")}>&lt;</button>
                <div className="step-value">{hairStyleLabel}</div>
                <button className="step" onClick={() => stepHair("next")}>&gt;</button>
              </div>
            </div>

            {/* Hair color */}
            <div className="row">
              <label className="row-label">Hair Color</label>
              <input
                type="color"
                value={hairColor}
                onChange={(e) => setHairColor(e.target.value)}
                className="color-input"
              />
              <span className="swatch-text">{hairColor.toUpperCase()}</span>
            </div>

            {/* Skin tone */}
            <div className="row">
              <label className="row-label">Skin Tone</label>
              <div className="stepper">
                <button className="step" onClick={() => stepSkin("prev")}>&lt;</button>
                <div className="step-value">#{String(skin).padStart(2,"0")}</div>
                <button className="step" onClick={() => stepSkin("next")}>&gt;</button>
              </div>
            </div>

            {/* Eyes */}
            <div className="row">
              <label className="row-label">Eyes</label>
              <div className="stepper">
                <button className="step" onClick={() => stepEye("prev")}>&lt;</button>
                <div className="step-value">{eyeStyleLabel}</div>
                <button className="step" onClick={() => stepEye("next")}>&gt;</button>
              </div>
            </div>

            <div className="actions" style={{ display:"flex", gap:12, marginTop:12 }}>
              <button onClick={handleContinue} className="btn primary">Continue</button>
              <Link href="/" className="btn ghost">Back</Link>
            </div>
          </section>

          {/* RIGHT: preview */}
          <section className="panel preview-panel">
            <div className="preview-card">
              <AvatarComposer
                avatar={{
                  skin,
                  hairStyle: HAIR_STYLES[hairIndex],
                  hairColor,
                  eye: EYE_STYLES[eyeIndex],
                }}
              />
            </div>
          </section>
        </div>
      </div>

    </main>
  );
}
