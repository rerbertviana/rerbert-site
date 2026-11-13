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

  profile: {
    pageLabel: "PROFILE",
    title: "CHARACTER PROFILE",
    subtitle:
      "A quick overview of my skills, professional journey and main links.",
    backButton: "BACK TO SELECTION",

    skills: {
      title: "SKILLS",
      description:
        "Main technologies, tools and expertise that I use to build solutions.",
      viewMore: "VIEW MORE",
      technologiesLabel: "Main technologies",
    },

    missions: {
      title: "MISSIONS",
      description:
        "Explore my professional journey and the projects I have developed.",
      viewMore: "VIEW MORE",
    },

    links: {
      title: "LINKS",
      description: "My main professional channels and online presence.",
    },
  },

  skills: {
    pageLabel: "TECHNICAL ARSENAL",
    title: "SKILLS",
    subtitle:
      "Explore the technologies, tools and practices I use to build digital solutions.",

    categoryNavigationLabel: "Skill categories",
    skillListLabel: "Technologies and proficiency levels",
    technologiesLabel: "Technologies",
    backToProfile: "BACK TO PROFILE",

    categories: {
      "frameworks-libraries": "Frameworks & Libraries",
      "languages-core": "Languages & Core",
      "state-management": "State Management",
      "apis-data-fetching": "APIs & Data Fetching",
      "testing-quality": "Testing & Quality",
      "databases-infrastructure": "Databases & Infrastructure",
      "methodologies-workflow": "Methodologies & Workflow",
      "devops-collaboration-ai": "DevOps, Collaboration & AI",
    },

    categoryDetails: {
      "frameworks-libraries": {
        title: "FRAMEWORKS & DEVELOPMENT",
        description: "Tools and environments for building modern applications.",
      },
      "languages-core": {
        title: "LANGUAGES & CORE",
        description: "Languages and fundamentals behind software development.",
      },
      "state-management": {
        title: "STATE MANAGEMENT",
        description: "Managing application data and interface states.",
      },
      "apis-data-fetching": {
        title: "APIs & DATA FETCHING",
        description: "Connecting applications and exchanging data.",
      },
      "testing-quality": {
        title: "TESTING & QUALITY",
        description: "Ensuring software reliability and code quality.",
      },
      "databases-infrastructure": {
        title: "DATABASES & INFRASTRUCTURE",
        description: "Storing data and supporting application systems.",
      },
      "methodologies-workflow": {
        title: "METHODOLOGIES & WORKFLOW",
        description: "Organizing development processes and teamwork.",
      },
      "devops-collaboration-ai": {
        title: "DEVOPS, COLLABORATION & AI",
        description:
          "Automating delivery, collaboration and AI-assisted development.",
      },
    },

    proficiency: {
      basic: "Basic",
      intermediate: "Intermediate",
      advanced: "Advanced",
    },
  },

  missions: {
    pageLabel: "CAREER & PROJECTS",
    title: "MISSIONS",
    subtitle:
      "Explore my professional journey and the projects I've built along the way.",
    backToProfile: "BACK TO PROFILE",

    filters: {
      label: "Filter missions",
      all: "ALL MISSIONS",
      experience: "PROFESSIONAL EXPERIENCE",
      project: "PERSONAL PROJECTS",
    },

    categories: {
      experience: "PROFESSIONAL EXPERIENCE",
      project: "PERSONAL PROJECT",
    },

    card: {
      technologies: "TECHNOLOGIES",
      responsibilities: "KEY RESPONSIBILITIES",
      highlights: "PROJECT HIGHLIGHTS",
      inProgress: "IN PROGRESS",
      completed: "COMPLETED",
    },
  },
};

export default en;
