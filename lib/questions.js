// lib/questions.js

// MBTI scoring axes
export const AXES = ["E_I", "S_N", "T_F", "J_P"];

/**
 * Each option contributes to one side of a specific MBTI axis.
 * Example:
 *   axis: "E_I", value: "E" → +1 toward Extroversion
 *   axis: "E_I", value: "I" → +1 toward Introversion
 */
const questions = [
  {
    id: "q1",
    prompt:
      "The first night of the Slayer Exam. A demon’s roar echoes through the mist. Looks like you’re not alone. What’s your instinct?",
    options: [
      { id: "q1_a", label: "Call out to nearby examinees and coordinate an ambush.", axis: "E_I", value: "E" },
      { id: "q1_b", label: "Move silently and observe the demon’s behavior before acting.", axis: "E_I", value: "I" },
    ],
  },
  {
    id: "q2",
    prompt:
      "A spirit’s riddle blocks your path: its solution could open the gate or trigger a trap. How do you approach it?",
    options: [
      { id: "q2_a", label: "Examine each symbol carefully. There must be a tangible pattern.", axis: "S_N", value: "S" },
      { id: "q2_b", label: "Look for hidden meaning or emotional cues in the riddle’s phrasing.", axis: "S_N", value: "N" },
    ],
  },
  {
    id: "q3",
    prompt:
      "Your teammate slips and injures their leg during pursuit. The demon is fleeing deeper into the woods.",
    options: [
      { id: "q3_a", label: "Stay and tend to your teammate. The mission can wait.", axis: "T_F", value: "F" },
      { id: "q3_b", label: "Continue pursuit; every second lost could cost more lives later.", axis: "T_F", value: "T" },
    ],
  },
  {
    id: "q4",
    prompt:
      "A map shows five potential paths to the demon’s lair, each changing as the mist shifts.",
    options: [
      { id: "q4_a", label: "Pick one route and commit before hesitation dulls your instincts.", axis: "J_P", value: "J" },
      { id: "q4_b", label: "Keep adapting as the environment changes; flow with uncertainty.", axis: "J_P", value: "P" },
    ],
  },
  {
    id: "q5",
    prompt:
      "You’re assigned to a four-person team. The captain asks everyone to share their strategy before the fight.",
    options: [
      { id: "q5_a", label: "Speak up first. You thrive on exchanging energy and momentum.", axis: "E_I", value: "E" },
      { id: "q5_b", label: "Listen to others before offering your thoughts, reflection sharpens action.", axis: "E_I", value: "I" },
    ],
  },
  {
    id: "q6",
    prompt:
      "You find a mural showing past Slayers’ victories, faded symbols, broken swords, old names.",
    options: [
      { id: "q6_a", label: "Focus on what each weapon reveals about battle technique.", axis: "S_N", value: "S" },
      { id: "q6_b", label: "Sense the emotion behind their legacy. Their will still lingers here.", axis: "S_N", value: "N" },
    ],
  },
  {
    id: "q7",
    prompt:
      "A fellow examinee argues your plan is reckless. How do you respond?",
    options: [
      { id: "q7_a", label: "Explain your reasoning logically and defend your decision calmly.", axis: "T_F", value: "T" },
      { id: "q7_b", label: "Seek harmony and find a compromise that keeps morale intact.", axis: "T_F", value: "F" },
    ],
  },
  {
    id: "q8",
    prompt:
      "You’re setting up camp for the night. How do you prepare?",
    options: [
      { id: "q8_a", label: "Lay out an organized plan: guard shifts, meal times, training slots.", axis: "J_P", value: "J" },
      { id: "q8_b", label: "Keep things loose. The night’s mood will decide your rhythm.", axis: "J_P", value: "P" },
    ],
  },
  {
    id: "q9",
    prompt:
      "You encounter a demon who claims to regret its actions and seeks redemption.",
    options: [
      { id: "q9_a", label: "Listen closely. There’s always a chance for change.", axis: "T_F", value: "F" },
      { id: "q9_b", label: "Stay guarded. Emotion shouldn’t cloud duty.", axis: "T_F", value: "T" },
    ],
  },
  {
    id: "q10",
    prompt:
      "At dawn, the final gate opens. Only those who endured may pass. What drives you to step forward?",
    options: [
      { id: "q10_a", label: "Discipline and planning. I prepared for this from the start.", axis: "J_P", value: "J" },
      { id: "q10_b", label: "Curiosity and instinct. Every trial reveals something new.", axis: "J_P", value: "P" },
    ],
  },
];

export default questions;
