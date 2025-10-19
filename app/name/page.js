// app/name/page.js
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function NamePage() {
  const router = useRouter();
  const [name, setName] = useState("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("dsq_player_name");
      if (saved) setName(saved);
    } catch {}
  }, []);

  function onSubmit(e) {
    e.preventDefault();
    const trimmed = name.trim().slice(0, 24); // light sanity limit
    if (!trimmed) return;
    try {
      localStorage.setItem("dsq_player_name", trimmed);
    } catch {}
    router.push("/customize");
  }

  return (
    <main className="screen-wrap">
      <div className="box" style={{ maxWidth: 560, marginInline: "auto" }}>
        <header style={{ marginBottom: 12 }}>
          <h1 style={{ margin: 0, fontSize: "clamp(28px, 4.5vw, 40px)" }}>
            What should we call you?
          </h1>
          <p style={{ margin: "6px 0 0", color: "rgba(255,255,255,.75)" }}>
            Your name shows up on your result for a more personal touch.
          </p>
        </header>
        <form className="name-form" onSubmit={onSubmit}>
        <form onSubmit={onSubmit} style={{ display: "grid", gap: 12, }}>
          <label>
            <span className="form-label">Name</span>
            <input
              className="input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Joseph"
              autoFocus
              required
              maxLength={24}
            />
          </label>
          </form>

          <div className="form-actions">
            <button
              type="button"
              className="btn ghost"
              onClick={() => router.push("/customize")}
              aria-label="Skip entering a name"
            >
              Skip
            </button>
            <button type="submit" className="btn primary">
              Continue
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
