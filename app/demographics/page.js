"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DemographicsPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    age: "",
    gender: "",
    found_via: "",
    feedback: "",
    consent: true,
  });

  // Load any draft data
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("dsq_demos_draft") || "{}");
      if (saved && typeof saved === "object") setForm((f) => ({ ...f, ...saved }));
    } catch {}
  }, []);

  // Save draft to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("dsq_demos_draft", JSON.stringify(form));
    } catch {}
  }, [form]);

  const setField = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  function skip() {
    router.push("/result");
  }

  function submit() {
    setSaving(true);
    try {
      const payload = {
        ...form,
        timestamp: new Date().toISOString(),
        version: "v3-short",
      };
      localStorage.setItem("dsq_demographics", JSON.stringify(payload));
      localStorage.removeItem("dsq_demos_draft");
    } catch {}
    router.push("/result");
  }

  return (
    <main className="screen-wrap">
      <div className="box">
        <header style={{ marginBottom: 12 }}>
          <h1 style={{ margin: 0, fontSize: "clamp(26px,4vw,36px)" }}>
            Survey
          </h1>
          <p style={{ margin: "6px 0 0", color: "rgba(255,255,255,.75)" }}>
            For insights, only takes 15 seconds!
          </p>
        </header>

        <form
          className="form-grid"
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
        >
          {/* Age */}
          <label>
            <span className="form-label">Age Range</span>
            <select
              className="input"
              value={form.age}
              onChange={(e) => setField("age", e.target.value)}
            >
              <option value="">Prefer not to say</option>
              <option>Under 18</option>
              <option>18–24</option>
              <option>25–34</option>
              <option>35–44</option>
              <option>45+</option>
            </select>
          </label>

          {/* Gender */}
          <label>
            <span className="form-label">Gender</span>
            <select
              className="input"
              value={form.gender}
              onChange={(e) => setField("gender", e.target.value)}
            >
              <option value="">Prefer not to say</option>
              <option>Female</option>
              <option>Male</option>
              <option>Nonbinary</option>
              <option>Other</option>
            </select>
          </label>

          {/* How found */}
          <label className="span-2">
            <span className="form-label">How did you find this quiz?</span>
            <select
              className="input"
              value={form.found_via}
              onChange={(e) => setField("found_via", e.target.value)}
            >
              <option value="">Prefer not to say</option>
              <option>Friend</option>
              <option>Social media</option>
              <option>Search</option>
              <option>Portfolio site</option>
              <option>Other</option>
            </select>
          </label>

          {/* Feedback */}
          <label className="span-2">
            <span className="form-label">Any quick feedback? (optional)</span>
            <textarea
              className="input"
              rows={3}
              placeholder="What stood out to you?"
              value={form.feedback}
              onChange={(e) => setField("feedback", e.target.value)}
            />
          </label>

          {/* Consent */}
          <label
            className="span-2"
            style={{ display: "flex", gap: 10, alignItems: "flex-start" }}
          >
            <input
              type="checkbox"
              checked={form.consent}
              onChange={(e) => setField("consent", e.target.checked)}
              aria-label="Consent to use anonymous responses in portfolio"
              style={{ marginTop: 4 }}
            />
            <span className="form-hint">
              I consent to my anonymous responses being used for portfolio
              insights.
            </span>
          </label>

          {/* Actions */}
          <div className="form-actions span-2">
            <button type="button" className="btn ghost" onClick={skip}>
              Skip
            </button>
            <button
              type="submit"
              className="btn primary"
              disabled={saving || !form.consent}
            >
              {saving ? "Saving..." : "Continue to Result"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
