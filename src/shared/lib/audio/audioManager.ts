type SoundEffect =
  | "characterNavigation"
  | "characterSelect"
  | "buttonConfirm"
  | "interfaceBack"
  | "interfaceOpen"
  | "interfaceClose"
  | "skillHover";

const AMBIENT_MUSIC_PATH = "/audio/ambient/ambient-theme.wav";

const SOUND_EFFECT_PATHS: Record<SoundEffect, string> = {
  characterNavigation: "/audio/sfx/character-navigation.wav",
  characterSelect: "/audio/sfx/character-select.wav",
  buttonConfirm: "/audio/sfx/button-confirm.wav",
  interfaceBack: "/audio/sfx/interface-back.wav",
  interfaceOpen: "/audio/sfx/interface-open.wav",
  interfaceClose: "/audio/sfx/interface-close.wav",
  skillHover: "/audio/sfx/skill-hover-wind.wav",
};

const AMBIENT_VOLUME = 0.18;
const SFX_VOLUME = 0.35;

let ambientAudio: HTMLAudioElement | null = null;
let isAmbientPlaying = false;

const soundCache = new Map<SoundEffect, HTMLAudioElement>();

function getAmbientAudio() {
  if (typeof window === "undefined") return null;

  if (!ambientAudio) {
    ambientAudio = new Audio(AMBIENT_MUSIC_PATH);
    ambientAudio.loop = true;
    ambientAudio.volume = AMBIENT_VOLUME;
    ambientAudio.preload = "auto";
  }

  return ambientAudio;
}

function getSoundAudio(sound: SoundEffect) {
  if (typeof window === "undefined") return null;

  let audio = soundCache.get(sound);

  if (!audio) {
    audio = new Audio(SOUND_EFFECT_PATHS[sound]);
    audio.preload = "auto";
    audio.volume = SFX_VOLUME;

    soundCache.set(sound, audio);
  }

  return audio;
}

export async function toggleAmbientMusic(): Promise<boolean> {
  const audio = getAmbientAudio();

  if (!audio) return false;

  if (isAmbientPlaying) {
    audio.pause();
    audio.currentTime = 0;
    isAmbientPlaying = false;

    return false;
  }

  try {
    await audio.play();
    isAmbientPlaying = true;

    return true;
  } catch (error) {
    console.warn("Unable to play ambient music:", error);
    isAmbientPlaying = false;

    return false;
  }
}

export function isAmbientMusicPlaying() {
  return isAmbientPlaying;
}

export function playSound(sound: SoundEffect) {
  const audio = getSoundAudio(sound);

  if (!audio) return;

  // Clone the cached audio so rapid interactions can overlap.
  const playback = audio.cloneNode() as HTMLAudioElement;

  playback.volume = SFX_VOLUME;
  playback.currentTime = 0;

  void playback.play().catch((error: unknown) => {
    console.warn(`Unable to play sound effect "${sound}":`, error);
  });
}

export function preloadAudioAssets() {
  if (typeof window === "undefined") return;

  getAmbientAudio();

  Object.keys(SOUND_EFFECT_PATHS).forEach((sound) => {
    getSoundAudio(sound as SoundEffect);
  });
}
