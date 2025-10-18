// lib/scoring.js
import questions from "./questions";
import { STYLES, MBTI_TO_STYLE } from "./styles";

/**
 * answers: an object like { q1: "q1_a", q2: "q2_b", ... }
 * questions: each option shaped like { id, label, axis: "E_I"|"S_N"|"T_F"|"J_P", value: "E"|"I"|"S"|"N"|"T"|"F"|"J"|"P" }
 */

const OPPOSITE = { E: "I", I: "E", S: "N", N: "S", T: "F", F: "T", J: "P", P: "J" };

function initLetterScores() {
  return { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
}

function addVote(letterScores, axis, value) {
  // Increment the chosen side; you can also subtract from the opposite for stronger separation:
  // letterScores[value] += 1; letterScores[OPPOSITE[value]] -= 1;
  // But a simple +1 to the chosen side works well with clean tie logic.
  if (!axis || !value) return;
  if (!(value in letterScores)) return;
  letterScores[value] += 1;
}

function decidePair(letterScores, a, b) {
  const da = letterScores[a];
  const db = letterScores[b];
  if (da > db) return a;
  if (db > da) return b;
  return "_"; // unresolved tie for hybrid handling
}

function margin(letterScores, a, b) {
  return (letterScores[a] || 0) - (letterScores[b] || 0);
}

export function score(answers) {
  const letters = initLetterScores();

  // Tally votes across all answered questions
  for (const q of questions) {
    const pickedId = answers?.[q.id];
    if (!pickedId) continue;
    const opt = (q.options || []).find(o => (o.id ?? o.value ?? o.label) === pickedId);
    if (!opt) continue;
    addVote(letters, opt.axis, opt.value);
  }

  // Resolve each axis (allowing temporary "_" to flag ties)
  const EI = decidePair(letters, "E", "I");
  const SN = decidePair(letters, "S", "N");
  const TF = decidePair(letters, "T", "F");
  const JP = decidePair(letters, "J", "P");

  const rawMBTI = `${EI}${SN}${TF}${JP}`;

  // --- Hybrid detection (tweak thresholds to taste) ---
  // Use small absolute margins to detect "near ties" on decision axes.
  const near = v => Math.abs(v) <= 0; // exact tie only; raise to 1 for looser hybrids

  // ECLIPSE: INFJ / INTP — I & N lead; T vs F near-tie and J vs P near-tie
  if ((EI !== "E") && (SN !== "S")) {
    if (near(margin(letters, "T", "F")) && near(margin(letters, "J", "P"))) {
      return {
        mbti: "INFJ/INTP",
        styleKey: "ECLIPSE",
        axes: {
          E_I: { E: letters.E, I: letters.I },
          S_N: { S: letters.S, N: letters.N },
          T_F: { T: letters.T, F: letters.F },
          J_P: { J: letters.J, P: letters.P },
        },
      };
    }
  }

  // ARIA: ENFJ / ESFP — E & F lead; N vs S near-tie OR J vs P near-tie
  if ((EI !== "I") && (TF !== "T")) {
    if (near(margin(letters, "N", "S")) || near(margin(letters, "J", "P"))) {
      return {
        mbti: "ENFJ/ESFP",
        styleKey: "ARIA",
        axes: {
          E_I: { E: letters.E, I: letters.I },
          S_N: { S: letters.S, N: letters.N },
          T_F: { T: letters.T, F: letters.F },
          J_P: { J: letters.J, P: letters.P },
        },
      };
    }
  }

  // DREAM: INFP / ISFP — I, F, P lead; N vs S near-tie
  if ((EI !== "E") && (TF !== "T") && (JP !== "J")) {
    if (near(margin(letters, "N", "S"))) {
      return {
        mbti: "INFP/ISFP",
        styleKey: "DREAM",
        axes: {
          E_I: { E: letters.E, I: letters.I },
          S_N: { S: letters.S, N: letters.N },
          T_F: { T: letters.T, F: letters.F },
          J_P: { J: letters.J, P: letters.P },
        },
      };
    }
  }

  // Finalize code by breaking ties deterministically (first letter on tie)
  const mbti = rawMBTI
    .replace("_", letters.E >= letters.I ? "E" : "I")
    .replace("_", letters.S >= letters.N ? "S" : "N")
    .replace("_", letters.T >= letters.F ? "T" : "F")
    .replace("_", letters.J >= letters.P ? "J" : "P");

  // Map to style
  let styleKey = MBTI_TO_STYLE[mbti];

  // Special-case split for ESTP: GALE (default) vs FANG (more aggressive)
  // Heuristic: if E and P margins are both strong, lean FANG; else GALE.
  if (mbti === "ESTP") {
    const eMargin = margin(letters, "E", "I");
    const pMargin = margin(letters, "P", "J");
    const tMargin = margin(letters, "T", "F");
    const aggressive = (eMargin >= 2 && pMargin >= 2) || (eMargin >= 1 && tMargin >= 1);
    styleKey = aggressive ? "FANG" : "GALE";
  }

  if (!styleKey) styleKey = "EMBER"; // safe fallback

  return {
    mbti,
    styleKey,
    axes: {
      E_I: { E: letters.E, I: letters.I },
      S_N: { S: letters.S, N: letters.N },
      T_F: { T: letters.T, F: letters.F },
      J_P: { J: letters.J, P: letters.P },
    },
  };
}
