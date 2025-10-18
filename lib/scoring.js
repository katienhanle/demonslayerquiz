// lib/scoring.js
import questions from "./questions";
import { STYLES, MBTI_TO_STYLE } from "./styles";

/**
 * Our quiz options are tagged with one of four traits: bravery, analysis, support, intuition.
 * We translate those into MBTI-ish axis votes:
 *   bravery  -> E + P (+ a touch of T)
 *   analysis -> T + J (+ a touch of I)
 *   support  -> F + J (+ a touch of E)
 *   intuition-> N + P (+ a touch of I)
 *
 * This is a simple, editable mapping that fits your prompts.
 */
const TRAIT_TO_AXIS = {
  bravery:  { E: 1, P: 1, T: 0.5 },
  analysis: { T: 1, J: 1, I: 0.5 },
  support:  { F: 1, J: 1, E: 0.5 },
  intuition:{ N: 1, P: 1, I: 0.5 },
};

function axisFromTrait(trait) {
  return TRAIT_TO_AXIS[trait] || {};
}

export function score(answers) {
  const countsTraits = { bravery: 0, analysis: 0, support: 0, intuition: 0 };
  const axes = { E: 0, I: 0, N: 0, S: 0, T: 0, F: 0, J: 0, P: 0 };

  for (const q of questions) {
    const pickedId = answers?.[q.id];
    if (!pickedId) continue;
    const opt = (q.options || []).find(o => (o.id ?? o.value ?? o.label) === pickedId);
    if (!opt) continue;

    const trait = opt.trait;
    if (countsTraits[trait] !== undefined) countsTraits[trait] += 1;

    const votes = axisFromTrait(trait);
    for (const k of Object.keys(votes)) axes[k] += votes[k];
  }

  // Derived opposites (S, F, P exist explicitly in votes; but if you want, keep as is)
  // We'll keep all axes as-is because our mapping already sets both sides when needed.

  // Decide letters by higher score within each pair (ties break toward hybrids below)
  const pair = (a, b) => (axes[a] > axes[b] ? a : axes[b] > axes[a] ? b : "_");
  const EI = pair("E", "I");
  const NS = pair("N", "S");
  const TF = pair("T", "F");
  const JP = pair("J", "P");

  // Build MBTI with placeholders for ties
  const rawMBTI = `${EI}${NS}${TF}${JP}`;

  // Helper to compute margins
  const margin = (a, b) => axes[a] - axes[b];

  // --- Hybrid handling ---
  // 14) Eclipse: INFJ / INTP — show when I & N lead, and both (T~F) and (J~P) are near ties
  const near = (v) => Math.abs(v) <= 0.25; // tolerance; tweakable
  if ((EI !== "E") && (NS !== "S")) { // I & N leaning (not E/S)
    if (near(margin("T", "F")) && near(margin("J", "P"))) {
      return {
        mbti: "INFJ/INTP",
        styleKey: "ECLIPSE",
        countsTraits,
        axes,
      };
    }
  }

  // 15) Aria: ENFJ / ESFP — E & F lead; ambiguity on N vs S or J vs P
  if ((EI !== "I") && (TF !== "T")) { // E & F leaning
    if (near(margin("N", "S")) || near(margin("J", "P"))) {
      return {
        mbti: "ENFJ/ESFP",
        styleKey: "ARIA",
        countsTraits,
        axes,
      };
    }
  }

  // 16) Dream: INFP / ISFP — I, F, P lead; ambiguity N vs S
  if ((EI !== "E") && (TF !== "T") && (JP !== "J")) { // I, F, P leaning
    if (near(margin("N", "S"))) {
      return {
        mbti: "INFP/ISFP",
        styleKey: "DREAM",
        countsTraits,
        axes,
      };
    }
  }

  // Resolve ties simply (fallback): choose first letter on tie
  const mbti = rawMBTI
    .replace("_", axes.E >= axes.I ? "E" : "I")
    .replace("_", axes.N >= axes.S ? "N" : "S")
    .replace("_", axes.T >= axes.F ? "T" : "F")
    .replace("_", axes.J >= axes.P ? "J" : "P");

  // Base mapping
  let styleKey = MBTI_TO_STYLE[mbti];

  // ESTP duplicate case: choose Gale by default, Fang if "bravery" dominates
  if (mbti === "ESTP") {
    styleKey = countsTraits.bravery > (countsTraits.analysis + countsTraits.support + countsTraits.intuition) / 2
      ? "FANG"
      : "GALE";
  }

  // If the MBTI isn't in the table for some reason, fall back gracefully
  if (!styleKey) styleKey = "EMBER";

  return { mbti, styleKey, countsTraits, axes };
}
