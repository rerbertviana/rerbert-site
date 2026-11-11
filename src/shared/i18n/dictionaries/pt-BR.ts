import type { Dictionary } from "../types";

const ptBR: Dictionary = {
  common: {
    confirm: "Confirmar",
    cancel: "Cancelar",
    back: "Voltar",
  },

  header: {
    developerPortfolio: "Portfólio de Desenvolvedor",
    selectLanguage: "Selecionar idioma",
    languageOptions: "Opções de idioma",
    enableSound: "Ativar som",
    disableSound: "Desativar som",
    downloadCv: "Baixar currículo",
    cv: "CV",
  },

  navigation: {
    home: "Início",
    profile: "Perfil",
    projects: "Projetos",
    career: "Carreira",
    contact: "Contato",
  },

  characterSelection: {
    pageLabel: "Página inicial de seleção de personagem do RERBERT.EXE",
    sectionLabel: "Seleção de Personagem",

    title: {
      first: "Escolha seu",
      highlight: "Desenvolvedor",
    },

    subtitle:
      "Selecione um personagem para explorar perfil, habilidades, projetos e carreira.",

    carousel: {
      label: "Carrossel de personagens",
      previousCharacter: "Personagem anterior",
      nextCharacter: "Próximo personagem",
    },

    card: {
      locked: "BLOQUEADO",
      lockedCharacter: "Personagem bloqueado",
      characterIllustration: "ilustração do personagem",
    },

    information: {
      label: "Informações do personagem",
      experience: "Experiência",
      education: "Formação",
      location: "Localização",
      status: "Status",
      available: "Disponível para oportunidades",
      unavailable: "Indisponível para oportunidades",
      level: "Nível",
    },

    button: {
      select: "SELECIONAR PERSONAGEM",
      confirm: "CONFIRMAR PERSONAGEM",
    },

    characters: {
      rerbert: {
        role: "Desenvolvedor Fullstack",
        seniority: "PLENO",
        education: "Sistemas de Informação - IFBA",
        experience: "6+ anos",
      },

      locked: {
        name: "Personagem desconhecido",
        role: "Desconhecido",
      },
    },
  },

  profile: {
    pageLabel: "PERFIL",
    title: "PERFIL DESENVOLVEDOR",
    subtitle:
      "Uma visão geral das minhas habilidades, trajetória profissional e links.",
    backButton: "VOLTAR À SELEÇÃO",

    skills: {
      title: "HABILIDADES",
      description:
        "Principais tecnologias, ferramentas e conhecimentos que utilizo para desenvolver soluções.",
      viewMore: "VER MAIS",
      technologiesLabel: "Principais tecnologias",
    },

    missions: {
      title: "MISSÕES",
      description:
        "Explore minha trajetória profissional e os projetos que desenvolvi.",
      viewMore: "VER MAIS",
    },

    links: {
      title: "LINKS",
      description: "Meus principais canais profissionais e presença online.",
    },
  },

  skills: {
    pageLabel: "ARSENAL TÉCNICO",
    title: "HABILIDADES",
    subtitle:
      "Tecnologias, ferramentas e práticas que utilizo para desenvolver soluções.",

    categoryNavigationLabel: "Categorias de habilidades",
    skillListLabel: "Tecnologias e níveis de proficiência",
    technologiesLabel: "Tecnologias",

    categories: {
      "frameworks-libraries": "Frameworks e Bibliotecas",
      "languages-core": "Linguagens e Fundamentos",
      "state-management": "Gerenciamento de Estado",
      "apis-data-fetching": "APIs e Busca de Dados",
      "testing-quality": "Testes e Qualidade",
      "databases-infrastructure": "Bancos de Dados e Infraestrutura",
      "methodologies-workflow": "Metodologias e Fluxo de Trabalho",
      "devops-collaboration-ai": "DevOps, Colaboração e IA",
    },

    categoryDetails: {
      "frameworks-libraries": {
        title: "FRAMEWORKS E DESENVOLVIMENTO",
        description:
          "Frameworks, runtimes e ambientes que utilizo para construir aplicações modernas e escaláveis.",
      },

      "languages-core": {
        title: "LINGUAGENS E FUNDAMENTOS",
        description:
          "Linguagens de programação e tecnologias fundamentais que utilizo para desenvolver software confiável.",
      },

      "state-management": {
        title: "GERENCIAMENTO DE ESTADO",
        description:
          "Ferramentas e soluções que utilizo para gerenciar estados e fluxos de dados das aplicações.",
      },

      "apis-data-fetching": {
        title: "APIs E BUSCA DE DADOS",
        description:
          "Ferramentas e abordagens que utilizo para integrar serviços e gerenciar dados das aplicações.",
      },

      "testing-quality": {
        title: "TESTES E QUALIDADE",
        description:
          "Ferramentas e práticas que utilizo para garantir a confiabilidade do software e a qualidade do código.",
      },

      "databases-infrastructure": {
        title: "BANCOS DE DADOS E INFRAESTRUTURA",
        description:
          "Tecnologias que utilizo para armazenar, gerenciar e dar suporte à infraestrutura das aplicações.",
      },

      "methodologies-workflow": {
        title: "METODOLOGIAS E FLUXO DE TRABALHO",
        description:
          "Princípios e fluxos de trabalho que sigo para desenvolver software sustentável e colaborar com equipes.",
      },

      "devops-collaboration-ai": {
        title: "DEVOPS, COLABORAÇÃO E IA",
        description:
          "Ferramentas que utilizo para controle de versão, automação, colaboração e desenvolvimento assistido por IA.",
      },
    },

    proficiency: {
      basic: "Básico",
      intermediate: "Intermediário",
      advanced: "Avançado",
    },
  },
};

export default ptBR;
