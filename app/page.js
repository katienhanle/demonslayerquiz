// app/page.js
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import NextImage from "next/image";

const FRAME_COUNT = 5;  // update to match your /public/assets/home frames
const FRAME_MS = 1500;   // 0.8s per frame

export default function HomePage() {
  const [frame, setFrame] = useState(1);
  const [reduceMotion, setReduceMotion] = useState(false);
  const timerRef = useRef(null);

  // Respect reduced motion
  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const apply = () => setReduceMotion(!!mq?.matches);
    apply();
    mq?.addEventListener?.("change", apply);
    return () => mq?.removeEventListener?.("change", apply);
  }, []);

  // Preload frames (use the DOM Image constructor explicitly)
  useEffect(() => {
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new window.Image();
      img.src = `/assets/home/home_${i}.png`;
    }
  }, []);

  // Advance frames
  useEffect(() => {
    if (reduceMotion) return; // show first frame only
    timerRef.current = setInterval(() => {
      setFrame((f) => (f >= FRAME_COUNT ? 1 : f + 1));
    }, FRAME_MS);
    return () => clearInterval(timerRef.current);
  }, [reduceMotion]);

  const iconWrapStyle = {
    width: "clamp(40px, 7vw, 64px)",
    height: "clamp(40px, 7vw, 64px)",
    marginInline: "auto",
    marginBottom: "10px",
    borderRadius: 12,
    padding: 6,
    boxShadow:
      "0 0 0 2px rgba(255,255,255,.15) inset, 0 10px 30px rgba(0,0,0,.25)",
    background: "rgba(0,0,0,.25)",
    display: "grid",
    placeItems: "center",
  };

  const iconImgStyle = {
    width: "100%",
    height: "100%",
    imageRendering: "pixelated",
  };

  return (
    <main className="landing-wrap">
      <div className="landing-content">
        {/* Rotating avatar icon */}
        <div style={iconWrapStyle} aria-hidden="true">
          <NextImage
            src={`/assets/home/home_${frame}.png`}
            alt=""
            width={64}
            height={64}
            priority
            style={iconImgStyle}
          />
        </div>

        <h1
          style={{
            fontFamily: "'Jersey 25', sans-serif",
            fontSize: "clamp(44px, 8vw, 70px)",
            marginBottom: "1rem",
            lineHeight: 1.1,
            textAlign: "center",
          }}
        >
          Corps Exam (Personality Quiz)
        </h1>

        <p
          style={{
            fontSize: "clamp(18px, 3vw, 22px)",
            opacity: 0.85,
            marginBottom: "2rem",
            textAlign: "center",
          }}
        >
          Inspired by Demon Slayer. Find your breathing style.
        </p>

        <div style={{ display: "grid", placeItems: "center" }}>
          <Link href="/name" className="btn primary">
            Start Quiz
          </Link>
        </div>
      </div>

      <footer className="landing-footer" style={{ marginTop: 28 }}>
        <p style={{ opacity: 0.9 }}>
          All Style names, pixel art, and descriptions are original creations by{" "}
          <strong>K.L</strong>. Inspired by elemental and folkloric motifs
          from East Asian storytelling traditions. Fan project for personal/educational use. Heavily inspired by <em>Demon Slayer</em>.
          No affiliation with or endorsement by the original IP holders. Non-commercial. This fan-made project is not
          affiliated with or endorsed by any existing anime or manga franchise.
        </p>
      </footer>
    </main>
  );
}
