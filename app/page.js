"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function HomePage() {
  // Clear leftover session/localStorage flags
  useEffect(() => {
    sessionStorage.removeItem("enterFromCustomize");
    sessionStorage.removeItem("fromQuiz");
    localStorage.removeItem("dsq_demos_draft");
  }, []);

  return (
    <main className="landing-wrap">
      <div className="landing-content">
        <h1
          style={{
            fontFamily: "'Jersey 25', sans-serif",
            fontSize: "clamp(44px, 8vw, 70px)",
            marginBottom: "1rem",
            lineHeight: 1.1,
          }}
        >
          Demon Slayer-Inspired Personality Quiz
        </h1>
        <p
          style={{
            fontSize: "clamp(18px, 3vw, 22px)",
            opacity: 0.8,
            marginBottom: "2rem",
          }}
        >
          Inspired by Demon Slayer. Find your breathing style.
        </p>

        <Link href="/customize" className="btn primary">
          Start Quiz
        </Link>
      </div>

      {/* Footer */}
      <footer className="landing-footer">
        <p>
          All Style names and descriptions are original creations by{" "}
          <strong>Katie L.</strong>. Inspired by elemental and folkloric motifs
          from East Asian storytelling traditions. This fan-made project is not
          affiliated with or endorsed by any existing anime or manga franchise.
          Pixel art is also done by site creator.
        </p>
      </footer>
    </main>
  );
}
