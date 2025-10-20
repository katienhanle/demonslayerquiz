// app/share/page.js
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SharePage() {
  const router = useRouter();
  const [url, setUrl] = useState("");

  useEffect(() => {
    try {
      const u = sessionStorage.getItem("shareCardUrl");
      if (u) setUrl(u);
    } catch {}
  }, []);

  return (
    <div
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      {/* TOP helper */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          padding: "12px 16px",
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.55), rgba(0,0,0,0.0))",
          textAlign: "center",
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: "clamp(16px, 3.8vw, 20px)",
            color: "rgba(255,255,255,.92)",
            letterSpacing: ".01em",
            textShadow: "0 1px 0 rgba(0,0,0,.4)",
          }}
        >
          Tap & hold on the card below to save it to your device!
        </p>
      </div>

      {/* Card preview */}
      <div
        style={{
          flex: "1 1 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "16px 16px 12px",
        }}
      >
        {url ? (
          <img
            src={url}
            alt="Shareable card"
            style={{
              width: "min(95vw, 420px)",
              height: "auto",
              borderRadius: 16,
              display: "block",
              boxShadow: "0 20px 60px rgba(0,0,0,.45)",
            }}
          />
        ) : (
          <p style={{ opacity: 0.85 }}>Generating…</p>
        )}
      </div>

      {/* Bottom actions */}
      <div
        style={{
          padding: 16,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <button
          className="btn ghost"
          onClick={() => router.push("/result")}
          style={{
            fontSize: "16px",
            padding: "12px 16px",
            borderRadius: 12,
            backdropFilter: "blur(4px)",
          }}
        >
          ← Back to Results
        </button>
      </div>
    </div>
  );
}
