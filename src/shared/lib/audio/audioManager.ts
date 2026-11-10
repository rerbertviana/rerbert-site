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

// Audio starts disabled. The user must explicitly enable it.
let isAudioEnabled = false;

const soundCache = new Map<SoundEffect, HTMLAudioElement>();
const activeSoundEffects = new Set<HTMLAudioElement>();

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

export function isSoundEnabled() {
  return isAudioEnabled;
}

export function isAmbientMusicPlaying() {
  return Boolean(ambientAudio && !ambientAudio.paused);
}

function stopActiveSoundEffects() {
  activeSoundEffects.forEach((audio) => {
    audio.pause();
    audio.currentTime = 0;
  });

  activeSoundEffects.clear();
}

async function resumeAmbientMusic() {
  if (!isAudioEnabled) return false;

  const audio = getAmbientAudio();

  if (!audio) return false;

  try {
    await audio.play();

    // Prevent playback if audio was disabled while play() was pending.
    if (!isAudioEnabled) {
      audio.pause();
      return false;
    }

    return true;
  } catch (error) {
    console.warn("Unable to play ambient music:", error);
    return false;
  }
}

export async function toggleAudio(): Promise<boolean> {
  if (isAudioEnabled) {
    isAudioEnabled = false;

    const audio = getAmbientAudio();

    audio?.pause();

    stopActiveSoundEffects();

    return false;
  }

  isAudioEnabled = true;

  await resumeAmbientMusic();

  return true;
}

export function playSound(sound: SoundEffect) {
  if (!isAudioEnabled) return;

  const audio = getSoundAudio(sound);

  if (!audio) return;

  // Clone the cached audio so rapid interactions can overlap.
  const playback = audio.cloneNode() as HTMLAudioElement;

  playback.volume = SFX_VOLUME;
  playback.currentTime = 0;

  activeSoundEffects.add(playback);

  playback.addEventListener(
    "ended",
    () => {
      activeSoundEffects.delete(playback);
    },
    { once: true },
  );

  void playback.play().catch((error: unknown) => {
    activeSoundEffects.delete(playback);

    if (isAudioEnabled) {
      console.warn(`Unable to play sound effect "${sound}":`, error);
    }
  });
}

export function preloadAudioAssets() {
  if (typeof window === "undefined") return;

  getAmbientAudio();

  Object.keys(SOUND_EFFECT_PATHS).forEach((sound) => {
    getSoundAudio(sound as SoundEffect);
  });
}
