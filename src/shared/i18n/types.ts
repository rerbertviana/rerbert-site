export interface Dictionary {
  common: {
    confirm: string;
    cancel: string;
    back: string;
  };

  header: {
    developerPortfolio: string;
    selectLanguage: string;
    languageOptions: string;
    enableSound: string;
    disableSound: string;
    downloadCv: string;
    cv: string;
  };

  navigation: {
    home: string;
    profile: string;
    projects: string;
    career: string;
    contact: string;
  };

  characterSelection: {
    pageLabel: string;
    sectionLabel: string;

    title: {
      first: string;
      highlight: string;
    };

    subtitle: string;

    carousel: {
      label: string;
      previousCharacter: string;
      nextCharacter: string;
    };

    card: {
      locked: string;
      lockedCharacter: string;
      characterIllustration: string;
    };

    information: {
      label: string;
      experience: string;
      education: string;
      location: string;
      status: string;
      available: string;
      unavailable: string;
      level: string;
    };

    button: {
      select: string;
      confirm: string;
    };

    characters: {
      rerbert: {
        role: string;
        seniority: string;
        education: string;
        experience: string;
      };

      locked: {
        name: string;
        role: string;
      };
    };
  };

  profile: {
    pageLabel: string;
    title: string;
    subtitle: string;

    skills: {
      title: string;
      description: string;
      viewMore: string;
      technologiesLabel: string;
    };

    missions: {
      title: string;
      description: string;
      viewMore: string;
    };

    links: {
      title: string;
      description: string;
    };
  };
}
