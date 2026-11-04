import type { Character } from "../types/character";

const CHARACTER_IMAGES = {
  main: "/images/characters/main-character.png",
  locked01: "/images/characters/character-02.jpg",
  locked02: "/images/characters/character-03.jpg",
  locked03: "/images/characters/character-04.jpg",
  locked04: "/images/characters/character-05.jpg",
} as const;

export const characters: Character[] = [
  {
    id: "locked-01",
    name: "Unknown Character",
    role: "Unknown",
    image: CHARACTER_IMAGES.locked01,
    status: "locked",
  },
  {
    id: "locked-02",
    name: "Unknown Character",
    role: "Unknown",
    image: CHARACTER_IMAGES.locked02,
    status: "locked",
  },
  {
    id: "rerbert",
    name: "Rerbert Viana",
    role: "Fullstack Developer",
    image: CHARACTER_IMAGES.main,
    status: "available",
  },
  {
    id: "locked-03",
    name: "Unknown Character",
    role: "Unknown",
    image: CHARACTER_IMAGES.locked03,
    status: "locked",
  },
  {
    id: "locked-04",
    name: "Unknown Character",
    role: "Unknown",
    image: CHARACTER_IMAGES.locked04,
    status: "locked",
  },
];
