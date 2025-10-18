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
      description: `Ember slayers burn with commanding intensity. Their clarity in crisis rallies allies, their voice cuts through fear. 
  They channel passion into precision, igniting the battlefield with resolve and direction. In the Corps, Ember slayers often become mission captains — leading charges through spirit domains with unshaken confidence.
  They value strength and decisiveness, sometimes to a fault, driving others as hard as they drive themselves.`,
      allies: ["ECHO", "VOLT", "RADIANT"],
      clashes: ["BLOOM", "WISP", "VIPER"],
      rank: "Squad Captain / Commander"
    },
    // PIXEL ART DONE
    CURRENT: {
      key: "CURRENT",
      code: "INFJ",
      name: "Current Style",
      tagline: "Harmony and renewal",
      palette: ["#3E57A8", "#C9D1D9"],
      description: `Current slayers move like moonlit water — gentle, perceptive, and balanced. They sense emotional tides before they shift, guiding others toward calm in the chaos of spirit encounters. 
  They rarely seek glory; instead, they strengthen the Corps through intuition and understanding. When spirits rage, they see not only the danger but the sorrow beneath.`,
      allies: ["ECHO", "BLOOM", "ECLIPSE"],
      clashes: ["VOLT", "GALE", "TERRA"],
      rank: "Advisor / Soul Healer / Recon Captain"
    },

     // PIXEL ART DONE
    VOLT: {
      key: "VOLT",
      code: "ENTP",
      name: "Volt Style",
      tagline: "Energy and curiosity",
      palette: ["#E6C400", "#000000"],
      description: `Volt slayers embody pure momentum — inventive, daring, and unpredictable. They test traps, provoke spirits, and think faster than most can react. 
  Their creativity makes them invaluable in dynamic situations, but their restlessness can cause friction with more grounded teammates.`,
      allies: ["EMBER", "MIRAGE", "ECLIPSE"],
      clashes: ["TERRA", "WISP", "CURRENT"],
      rank: "Field Strategist / Recon Vanguard"
    },
     // PIXEL ART DONE
    GALE: {
      key: "GALE",
      code: "ESTP",
      name: "Gale Style",
      tagline: "Independence and boldness",
      palette: ["#1F5A33", "#6E7A86"],
      description: `Gale slayers strike like wind blades — fast, bold, unrelenting. They trust instinct over hesitation and thrive in close combat. 
  Their confidence inspires others, though it sometimes borders on recklessness. In the Corps, Gale slayers are relied upon to break spirit formations or lead rapid-response assaults.`,
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
      description: `Terra slayers stand unshaken, forming the bedrock of the Corps. They believe order brings survival, and their discipline ensures every mission holds. 
  They may not move quickly, but they never falter. Even in endless fog, their presence reminds others what endurance looks like.`,
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
      palette: ["#B7BAC2", "#8E70C6"],
      description: `Mirage slayers see patterns others miss. They deconstruct spirit domains like puzzles, mapping illusions and hidden threats. 
  They work best with thinkers and tacticians who let them analyze before the strike. Though aloof at times, their insights save lives when the mist thickens.`,
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
      description: `Viper slayers move like flowing ink — graceful, quiet, and lethal. They study the rhythm of spirits and strike with perfect timing. 
  They thrive in missions where stealth, precision, and intuition decide the outcome. Their artistry on the battlefield is both beautiful and deadly.`,
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
      palette: ["#EFA1AF", "#4CA37C"],
      description: `Bloom slayers transform empathy into resilience. Their will blooms through even the darkest mists. 
  They don’t seek destruction but understanding, offering peace where possible. Their compassion can inspire entire squads — or cloud their resolve when faced with moral conflict.`,
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
      description: `Wisp slayers are the quiet guardians of the Corps. They watch, protect, and endure, shielding others from harm. 
  Their subtle awareness of spirit motion allows them to block attacks unseen by others. They rarely boast — their victories are in those who return home.`,
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
      palette: ["#21A6A1", "#C9D1D9"],
      description: `Echo slayers fight through resonance. Their energy binds squads into rhythm, turning chaos into harmony. 
  They are charismatic leaders who can lift morale in moments of despair and synchronize teams mid-battle. Spirits often fall when faced with their coordinated symphony of strikes.`,
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
      palette: ["#FF8DA1", "#FF7F50"],
      description: `Heart slayers embody warmth in the midst of war. Their emotions blaze with purpose, and their spontaneity keeps allies inspired. 
  They are storytellers and spark bearers — constantly reminding the Corps why they fight. Their optimism keeps darkness at bay, even when the odds seem grim.`,
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
      palette: ["#45506B", "#C2872A"],
      description: `Fang slayers trust raw instinct. They read the mist by movement, sound, and scent. Every strike they make is decisive and powerful. 
  They excel in the thick of battle but often bristle under command. Their independence makes them both asset and challenge to the Corps.`,
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
      description: `Radiant slayers wield insight like sunlight — precise, methodical, and pure. They analyze spirit behavior, plan five moves ahead, and rarely act without reason. 
  They guide other slayers with foresight and control, orchestrating victories before the first strike.`,
      allies: ["EMBER", "MIRAGE", "ECLIPSE"],
      clashes: ["GALE", "HEART", "WISP"],
      rank: "Strategist / Corps Commander"
    },
  
    ECLIPSE: {
      key: "ECLIPSE",
      code: "INFJ/INTP",
      name: "Eclipse Style",
      tagline: "Reflection and equilibrium",
      palette: ["#7D63C6", "#FFFFFF"],
      description: `Eclipse slayers walk between shadow and light. They balance emotion and intellect, understanding the motives of both spirits and slayers. 
  Their empathy is tempered by analysis, making them exceptional negotiators and mediators in spiritual conflicts.`,
      allies: ["CURRENT", "MIRAGE", "RADIANT"],
      clashes: ["GALE", "EMBER", "HEART"],
      rank: "Domain Mediator / Scholar"
    },
  
    ARIA: {
      key: "ARIA",
      code: "ENFJ/ESFP",
      name: "Aria Style",
      tagline: "Expression and charisma",
      palette: ["#E4A3B3", "#41D6C3"],
      description: `Aria slayers turn combat into choreography. Their movements are expressive, rhythmic, and mesmerizing. 
  They disorient spirits through artistry and morale, uplifting allies with flair and emotion. Though dramatic, their energy can shift the course of battles.`,
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
      description: `Dream slayers walk unseen paths, guided by intuition and vision. They perceive patterns in spirit movement that others overlook, and use this to guide teams safely. 
  They are calm, creative, and deeply introspective — the ones who find beauty even in tragedy.`,
      allies: ["BLOOM", "VIPER", "CURRENT"],
      clashes: ["TERRA", "GALE", "EMBER"],
      rank: "Recon / Spirit Navigator"
    },
  };
  