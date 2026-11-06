import type { Dictionary } from "../types";

const en: Dictionary = {
  common: {
    confirm: "Confirm",
    cancel: "Cancel",
    back: "Back",
  },

  header: {
    developerPortfolio: "Developer Portfolio",
    selectLanguage: "Select language",
    languageOptions: "Language options",
    enableSound: "Enable sound",
    disableSound: "Disable sound",
    downloadCv: "Download CV",
    cv: "CV",
  },

  navigation: {
    home: "Home",
    profile: "Profile",
    projects: "Projects",
    career: "Career",
    contact: "Contact",
  },

  characterSelection: {
    pageLabel: "RERBERT.EXE character selection homepage",
    sectionLabel: "Character Selection",

    title: {
      first: "Choose Your",
      highlight: "Developer",
    },

    subtitle:
      "Select a character to explore profile, skills, projects and career.",

    carousel: {
      label: "Character carousel",
      previousCharacter: "Previous character",
      nextCharacter: "Next character",
    },

    card: {
      locked: "LOCKED",
      lockedCharacter: "Locked character",
      characterIllustration: "character illustration",
    },

    information: {
      label: "Character information",
      experience: "Experience",
      education: "Education",
      location: "Location",
      status: "Status",
      available: "Available for opportunities",
      unavailable: "Not available for opportunities",
      level: "Level",
    },

    button: {
      select: "SELECT CHARACTER",
      confirm: "CONFIRM CHARACTER",
    },

    characters: {
      rerbert: {
        role: "Fullstack Developer",
        seniority: "MID",
        education: "Information Systems - IFBA",
        experience: "6+ years",
      },

      locked: {
        name: "Unknown Character",
        role: "Unknown",
      },
    },
  },
};

export default en;
