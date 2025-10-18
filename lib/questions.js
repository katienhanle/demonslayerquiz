// lib/questions.js

// four simple axes you can map to characters later
export const TRAITS = ["bravery", "analysis", "support", "intuition"];

/**
 * Each option has a single dominant trait.
 * You can compute results by tallying trait counts across answers.
 */
const questions = [
  {
    id: "q1",
    prompt:
      "In the Exam Zone, you must last seven nights while mysterious spirits hunt in the mist. What’s your plan to make it through?",
    options: [
      { id: "q1_a", label: "Avoid the spirits completely, heading north toward the safe zone.", trait: "analysis" },
      { id: "q1_b", label: "Attack the spirits head-on to learn their patterns. Every battle is a chance to grow stronger.", trait: "bravery" },
      { id: "q1_c", label: "Help defend other participants whenever you see them struggling.", trait: "support" },
      { id: "q1_d", label: "Observe from a distance to study how the spirits move before taking action.", trait: "intuition" },
    ],
  },
  {
    id: "q2",
    prompt:
      "On a mission, you have to climb a mountain with invisible traps. What do you do?",
    options: [
      { id: "q2_a", label: "Charge ahead and trust your instincts to dodge whatever comes.", trait: "bravery" },
      { id: "q2_b", label: "Memorize your surroundings and move carefully, step by step.", trait: "analysis" },
      { id: "q2_c", label: "Stop to analyze the wind to predict where traps might lie.", trait: "intuition" },
      { id: "q2_d", label: "Encourage your peers as you descend together, keeping morale high.", trait: "support" },
    ],
  },
  {
    id: "q3",
    prompt:
      "A masked spirit appears before you, offering to critique your technique. You’re already overwhelmed by feelings. How do you respond?",
    options: [
      { id: "q3_a", label: "Thank them and ask for more advice to refine your skill.", trait: "support" },
      { id: "q3_b", label: "Stay silent, analyze their words, and test what they said on your own.", trait: "analysis" },
      { id: "q3_c", label: "Argue back. No one knows your strength better than you.", trait: "bravery" },
      { id: "q3_d", label: "Accept their challenge immediately to prove your growth with action.", trait: "bravery" },
    ],
  },
  {
    id: "q4",
    prompt:
      "On your next mission, a spirit seems to have the art of mirror. The mirrors reflect false versions of you, each beckoning. What do you do?",
    options: [
      { id: "q4_a", label: "Ignore the reflections, and find the mirror that seems different from the rest.", trait: "intuition" },
      { id: "q4_b", label: "Study the reflections to spot the odd one.", trait: "analysis" },
      { id: "q4_c", label: "Call your friends, attack and break all of the mirrors.", trait: "support" },
      { id: "q4_d", label: "Sit, breathe, and use your senses to figure out where to go.", trait: "intuition" },
    ],
  },
  {
    id: "q5",
    prompt:
      "You enter a vendor that supplies the demon slayers. Choose from the tools the vendors are offering:",
    options: [
      { id: "q5_a", label: "Compass, I need to know where I am at all times.", trait: "analysis" },
      { id: "q5_b", label: "Flare, I need to create openings, and seize momentum.", trait: "bravery" },
      { id: "q5_c", label: "Rope, I can keep people connected.", trait: "support" },
      { id: "q5_d", label: "Charm, I’ll trust intuition and unseen cues.", trait: "intuition" },
    ],
  },
  {
    id: "q6",
    prompt:
      "You’re fighting a spirit that has its own domain. The doors in this domain open on a timer and the patterns are getting less and less obvious.",
    options: [
      { id: "q6_a", label: "Sprint door-to-door and use brute-force timing.", trait: "bravery" },
      { id: "q6_b", label: "Chart the ticks in your head, test hypotheses to find your way to the spirit.", trait: "analysis" },
      { id: "q6_c", label: "Assign roles and run a timed relay with your allies.", trait: "support" },
      { id: "q6_d", label: "Wait, listen, feel the rhythm of the door openings.", trait: "intuition" },
    ],
  },
  {
    id: "q7",
    prompt:
      "You’re walking along the dock when a lone ferryman asks a fare: truth, courage, or patience.",
    options: [
      { id: "q7_a", label: "Truth, I can share what I fear most.", trait: "bravery" },
      { id: "q7_b", label: "Courage, I promise to always strike first.", trait: "bravery" },
      { id: "q7_c", label: "Patience, I’m okay with taking the longer route.", trait: "intuition" },
      { id: "q7_d", label: "None, but I’ll offer a plan to protect the other riders on the ferry.", trait: "support" },
    ],
  },
  {
    id: "q8",
    prompt:
      "In this forest, the trees seem to rearrange every second you hesitate.",
    options: [
      { id: "q8_a", label: "Keep moving, commit to a line and don’t look back.", trait: "bravery" },
      { id: "q8_b", label: "Climb a tree, map the forest, and pick the best path.", trait: "analysis" },
      { id: "q8_c", label: "Split the team and find a way to communicate even when you’re separated.", trait: "support" },
      { id: "q8_d", label: "Find direction in the ground or sky, nature knows the exit.", trait: "intuition" },
    ],
  },
  {
    id: "q9",
    prompt:
      "You encounter a harmless spirit. However, the corps does not show mercy to spirits.",
    options: [
      { id: "q9_a", label: "Kill the spirit, a spirit is a spirit.", trait: "bravery" },
      { id: "q9_b", label: "Try to communicate with the spirit, find out their intentions.", trait: "support" },
      { id: "q9_c", label: "Contact higher-ups before continuing.", trait: "analysis" },
      { id: "q9_d", label: "See if this spirit can help you with future missions.", trait: "intuition" },
    ],
  },
  {
    id: "q10",
    prompt:
      "To pass this gate, you have to choose one and answer without hesitation.",
    options: [
      { id: "q10_a", label: "A rule that guides you under pressure.", trait: "analysis" },
      { id: "q10_b", label: "A question that keeps you searching.", trait: "intuition" },
      { id: "q10_c", label: "A promise you made to yourself.", trait: "bravery" },
      { id: "q10_d", label: "A story of a failure that you learned from.", trait: "support" },
    ],
  },
];

export default questions;
