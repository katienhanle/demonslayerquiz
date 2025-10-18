// lib/styles.js
// lib/styles.js

// ... keep your STYLES object as you have it ...

// Cover ALL 16 MBTI codes. Hybrids (ARIA, DREAM, ECLIPSE) are still handled
// in scoring if you detect ties — this table is the primary "direct" map.
export const MBTI_TO_STYLE = {
    // NT & NF
    ENTJ: "EMBER",    // Commander
    ENTP: "VOLT",     // Debater
    INTJ: "RADIANT",  // Architect
    INTP: "MIRAGE",   // Logician
  
    ENFJ: "ECHO",     // Protagonist
    ENFP: "HEART",    // Campaigner
    INFJ: "CURRENT",  // Advocate
    INFP: "BLOOM",    // Mediator
  
    // SJ & SP
    ESTJ: "TERRA",    // Executive (discipline/structure ~ Terra)
    ESFJ: "WISP",     // Consul (support/defense ~ Wisp)
    ISTJ: "TERRA",    // Logistician (your original Terra)
    ISFJ: "WISP",     // Defender (your original Wisp)
  
    ESTP: "GALE",     // Entrepreneur (fast/decisive ~ Gale)
    ESFP: "ARIA",     // Performer (your hybrid’s primary fit)
    ISTP: "FANG",     // Virtuoso (this is the classic match for ISTP)
    ISFP: "VIPER",    // Adventurer
  };
  
export const STYLES = {

    // PIXEL ART DONE
    EMBER: {
      key: "EMBER",
      code: "ENTJ",
      name: "Ember Style",
      tagline: "Leadership through conviction",
      palette: ["#FF9A2E", "#B10000"],
      description: `Ember Slayers burn with commanding intensity. They move through the battlefield with a sense of purpose that few can match, turning every plan into decisive action. When chaos unfolds, their voice cuts through the noise, guiding others with absolute confidence. These Slayers treat every mission as a test of strength and clarity. They lead not for glory but for efficiency, believing that hesitation is a slow death. Their passion blazes like wildfire, inspiring allies to push beyond fear, though that same heat can scorch anyone who lingers in doubt. Within the Corps, Ember Slayers often rise to command squads or coordinate entire fronts. They are strategists, motivators, and field captains who embody relentless drive. They may not always stop to comfort others, but when the flames clear, victory follows in their wake.`,
      allies: ["ECHO", "VOLT", "RADIANT"],
      clashes: ["BLOOM", "WISP", "VIPER"],
      rank: "Squad Captain / Commander"
    },
    CURRENT: {
      key: "CURRENT",
      code: "INFJ",
      name: "Current Style",
      tagline: "Harmony and renewal",
      palette: ["#19B4C2", "#0D2E2E"],
      description: `Current Slayers move like moonlit water. Quiet yet powerful, they bring balance wherever the Corps begins to fracture. They read the emotions of their comrades as easily as ripples in a pond, guiding teams with calm precision when fear threatens to overtake reason. Their strength lies not in aggression but in depth. They believe that to defeat darkness, one must first understand its source. This insight allows them to soothe conflicts that others cannot see. Though they are often misunderstood, those who fight beside them come to feel their steady influence, like a tide that never recedes. Current Slayers are healers, advisors, and mediators within the Corps. They walk between empathy and discipline, merging intuition with resolve. In their quiet conviction, they remind others that even in endless night, the river always finds its way to light.`,
      allies: ["ECHO", "BLOOM", "ECLIPSE"],
      clashes: ["VOLT", "GALE", "TERRA"],
      rank: "Advisor / Soul Healer / Recon Captain"
    },
    VOLT: {
      key: "VOLT",
      code: "ENTP",
      name: "Volt Style",
      tagline: "Energy and curiosity",
      palette: ["#E6C400", "#000000"],
      description: `Volt Slayers embody pure momentum. They leap into battle with ideas as fast as their blades, testing theories even as they strike. Rules are merely suggestions to them, and convention is the first thing they cut down. Their wit sparks as brightly as lightning, electrifying those around them with possibility. These Slayers thrive in uncertainty. Every spirit encounter is an experiment, every mistake a data point to refine the next move. Some see them as reckless, yet their innovation has turned countless missions from failure to triumph. In the Corps, Volt Slayers serve as tacticians and innovators, crafting new formations and unconventional battle plans. They thrive when challenged and grow sharper under pressure. To fight beside one is to experience the thrill of chaos made brilliant, a storm guided by intellect and instinct alike.`,
      allies: ["EMBER", "MIRAGE", "ECLIPSE"],
      clashes: ["TERRA", "WISP", "CURRENT"],
      rank: "Field Strategist / Recon Vanguard"
    },
    GALE: {
      key: "GALE",
      code: "ESTP",
      name: "Gale Style",
      tagline: "Independence and boldness",
      palette: ["#1F5A33", "#6E7A86"],
      description: `Gale Slayers strike as fast as wind blades. They trust movement over thought and instincts over hesitation. Every breath is a challenge to see who dares to act first. They live for motion and impact. Rules slow them down, so they bend them if it means getting results. In battle, they dive straight into the heart of danger, trusting their reflexes to carry them through. The Corps depends on Gale Slayers for quick assaults and decisive strikes. They are fearless scouts, often first to charge and last to retreat. Their courage inspires others to move, even when fear freezes the air.`,
      allies: ["FANG", "ECHO", "EMBER"],
      clashes: ["CURRENT", "MIRAGE", "BLOOM"],
      rank: "Assault Division / Frontline Raider"
    },
    // PIXEL ART DONE
    TERRA: {
      key: "TERRA",
      code: "ISTJ",
      name: "Terra Style",
      tagline: "Stability and loyalty",
      palette: ["#6C7886", "#758C63"],
      description: `Terra Slayers are the foundation of every mission. Steady, disciplined, and patient, they bring structure where others bring chaos. They move deliberately, choosing action only when certain. Their strength is not speed but reliability. When the ground shakes, Terra Slayers do not falter. Within the Corps, they serve as commanders of logistics and defense. Their sense of duty holds the line, proving that true power is persistence without complaint.`,
      allies: ["WISP", "CURRENT", "EMBER"],
      clashes: ["VOLT", "GALE", "BLOOM"],
      rank: "Logistics Commander / Line Defense"
    },

    // PIXEL ART DONE
    MIRAGE: {
      key: "MIRAGE",
      code: "INTP",
      name: "Mirage Style",
      tagline: "Imagination and introspection",
      palette: ["#8E5AD5", "#C9A7FF"],
      description: `Mirage Slayers perceive what others overlook. They study illusions, traps, and spiritual domains as if reading a secret language. Their curiosity often leads them deep into unknown territory. They do not rush. They observe, break down, and rebuild the truth until it fits. When others are blinded by panic, Mirage Slayers remain still, connecting patterns no one else can see. They are the Corps’ thinkers and codebreakers. Quiet, elusive, and endlessly inventive, they transform confusion into understanding, one hidden insight at a time.`,
      allies: ["VOLT", "ECLIPSE", "RADIANT"],
      clashes: ["GALE", "CURRENT", "WISP"],
      rank: "Research Division / Tactical Analyst"
    },
    // PIXEL ART DONE
    VIPER: {
      key: "VIPER",
      code: "ISFP",
      name: "Viper Style",
      tagline: "Flexibility and artistry",
      palette: ["#2F7E57", "#F2F4F0"],
      description: `Viper slayers move like flowing ink: graceful, quiet, and lethal. They study the rhythm of spirits and strike with perfect timing. They thrive in missions where stealth, precision, and intuition decide the outcome. Their artistry on the battlefield is both beautiful and deadly.`,
      allies: ["BLOOM", "CURRENT", "ARIA"],
      clashes: ["EMBER", "TERRA", "VOLT"],
      rank: "Stealth Division / Recon Scout"
    },
    // PIXEL ART DONE
    BLOOM: {
      key: "BLOOM",
      code: "INFP",
      name: "Bloom Style",
      tagline: "Compassion and endurance",
      palette: ["#9CC7FF", "#2E4C8F"],
      description: `Bloom Slayers fight with the strength of empathy. Their hearts are their greatest weapon, and their will blooms even in despair. When others lose faith, they keep hope alive. They do not crave victory through destruction. Instead, they aim to understand. To heal. To remind others that mercy and courage can exist together. Bloom Slayers often lead support divisions, tending to the wounded and easing unrest. Their presence feels like spring after endless winter, bringing renewal where pain once ruled.`,
      allies: ["CURRENT", "VIPER", "ECHO"],
      clashes: ["EMBER", "GALE", "VOLT"],
      rank: "Healing Corps / Support Division"
    },
    // PIXEL ART DONE
    WISP: {
      key: "WISP",
      code: "ISFJ",
      name: "Wisp Style",
      tagline: "Dedication and resolve",
      palette: ["#BFAEE8", "#B5E9CF"],
      description: `Wisp Slayers are the quiet guardians of the Corps. They defend without recognition, shield without command. Their calm focus protects others when fear overwhelms them.
They watch the flow of battle like sentinels, always ready to intercept unseen attacks. To them, loyalty is sacred, and protection is purpose.
Wisp Slayers are the backbone of defense units. Their strength lies in subtlety and endurance. They do not shine to be seen. They shine so others can survive.`,
      allies: ["TERRA", "CURRENT", "ECHO"],
      clashes: ["VOLT", "GALE", "FANG"],
      rank: "Defense Corps / Guardian Unit"
    },
    // PIXEL ART DONE
    ECHO: {
      key: "ECHO",
      code: "ENFJ",
      name: "Echo Style",
      tagline: "Inspiration and unity",
      palette: ["#4C6BFF", "#9DB2FF"],
      description: `Echo Slayers command presence through resonance. Their words steady hearts, their rhythm aligns teams into harmony. When all seems lost, their conviction reignites courage. They understand the value of connection. By syncing others’ movements and emotions, they turn chaos into coordination. Their empathy shapes discipline into unity. In the Corps, Echo Slayers lead through influence rather than command. They are tacticians of morale, guiding others toward victory with voice, vision, and belief.`,
      allies: ["CURRENT", "HEART", "EMBER"],
      clashes: ["MIRAGE", "GALE", "TERRA"],
      rank: "Captain / Morale Officer"
    },
    // PIXEL ART DONE
    HEART: {
      key: "HEART",
      code: "ENFP",
      name: "Heart Style",
      tagline: "Passion and empathy",
      palette: ["#FF99B4", "#FFD1DC"],
      description: `Heart Slayers radiate energy. They fight with emotion and joy, turning the battlefield into a display of human spirit. Their optimism lifts entire squads when the mist grows heavy. They feel deeply and connect easily. Every fight means something to them, and every ally is someone worth protecting. Their emotions are their compass, guiding every choice they make. Heart Slayers serve as morale keepers and spiritual anchors. They remind others that fighting demons is not just about strength, but the purpose behind it.`,
      allies: ["ECHO", "BLOOM", "ARIA"],
      clashes: ["TERRA", "GALE", "MIRAGE"],
      rank: "Motivation Corps / Spirit Liaison"
    },
    // PIXEL ART DONE
    FANG: {
      key: "FANG",
      code: "ESTP",
      name: "Fang Style",
      tagline: "Instinct and freedom",
      palette: ["#4C63B6", "#C3862A"],
      description: `Fang Slayers hunt through silence. They move fast, strike hard, and disappear before the enemy understands what happened. To them, instinct is more trustworthy than orders. They rely on intuition and reflexes rather than plans. Their independence can make them unpredictable, but their precision in battle is unmatched. In the Corps, Fang Slayers handle high-risk solo missions and infiltration tasks. They are blades forged in solitude: sharp, swift, and untamed.`,
      allies: ["GALE", "VOLT", "ARIA"],
      clashes: ["WISP", "CURRENT", "MIRAGE"],
      rank: "Strike Team / Tactical Raider"
    },
  
    // 
    RADIANT: {
      key: "RADIANT",
      code: "INTJ",
      name: "Radiant Style",
      tagline: "Wisdom and foresight",
      palette: ["#E8C65A", "#FFF5E0"],
      description: `Radiant Slayers are strategists of light. They see several steps ahead, moving with calm precision even when chaos reigns. To them, every spirit domain is a puzzle waiting to be solved. They act with quiet authority, preferring to win before the battle begins. Their minds burn bright with vision, and they lead others not through power, but through clarity. In the Corps, Radiant Slayers guide missions and shape strategy. Their insight has saved countless lives, and though they may seem distant, their brilliance keeps darkness from consuming the horizon.`,
      allies: ["EMBER", "MIRAGE", "ECLIPSE"],
      clashes: ["GALE", "HEART", "WISP"],
      rank: "Strategist / Corps Commander"
    },
  
    ECLIPSE: {
      key: "ECLIPSE",
      code: "INFJ/INTP",
      name: "Eclipse Style",
      tagline: "Reflection and equilibrium",
      palette: ["#9A86FF", "#FFFFFF"],
      description: `Eclipse types are calm, reflective thinkers who blend emotion with reason. They notice patterns others miss and act with quiet purpose, always searching for meaning beneath the surface. Though they seem reserved, they care deeply and bring clarity where others feel lost. Guided by both intuition and logic, they rely on foresight instead of force, adapting to challenges with precision and grace. When their ideals align with action, they move with balance and purpose, shining with a quiet strength that bridges heart and mind.`,
      allies: ["CURRENT", "MIRAGE", "RADIANT"],
      clashes: ["GALE", "EMBER", "HEART"],
      rank: "Domain Mediator / Scholar"
    },
  
    ARIA: {
      key: "ARIA",
      code: "ENFJ/ESFP",
      name: "Aria Style",
      tagline: "Expression and charisma",
      palette: ["#FF9ECF", "#FFE0EC"],
      description: `Aria Slayers fight like performers on a stage. Every swing, every step flows with emotion and grace. They disorient enemies through rhythm, sound, and dazzling motion. Their confidence lights up the battlefield. They thrive on momentum, drawing attention and turning it into power. Their presence can shift morale in an instant. Aria Slayers excel at disruption and morale operations. Their artistry reminds the Corps that battle can be both survival and performance, courage and creation at once.`,
      allies: ["HEART", "ECHO", "VIPER"],
      clashes: ["TERRA", "MIRAGE", "EMBER"],
      rank: "Morale Division / Disruption Unit"
    },
  
    DREAM: {
      key: "DREAM",
      code: "INFP/ISFP",
      name: "Dream Style",
      tagline: "Sensitivity and imagination",
      palette: ["#B9A7F2", "#87CEFA"],
      description: `Viper Slayers move like ink in water, silent and graceful. Their strikes are precise, their timing perfect. They listen to rhythm and instinct, blending creativity with survival. They see combat as a form of expression. Each movement is deliberate, every step a part of a larger dance. Their artistry makes them unpredictable and dangerous. Viper Slayers thrive in stealth missions and reconnaissance. They adapt faster than most and follow intuition where maps fail. Beauty and lethality flow as one in their blade.`,
      allies: ["BLOOM", "VIPER", "CURRENT"],
      clashes: ["TERRA", "GALE", "EMBER"],
      rank: "Recon / Spirit Navigator"
    },
  };
  