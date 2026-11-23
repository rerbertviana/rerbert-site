import { beforeEach, describe, expect, it, jest } from "@jest/globals";

type MockAudio = {
  src: string;
  loop: boolean;
  volume: number;
  preload: string;
  paused: boolean;
  currentTime: number;
  play: jest.Mock<() => Promise<void>>;
  pause: jest.Mock<() => void>;
  cloneNode: jest.Mock<() => MockAudio>;
  addEventListener: jest.Mock<(event: string, callback: () => void) => void>;
  dispatchEvent: (event: string) => void;
};

const audioInstances: MockAudio[] = [];

function createMockAudio(src = ""): MockAudio {
  const listeners = new Map<string, Array<() => void>>();

  const audio: MockAudio = {
    src,
    loop: false,
    volume: 1,
    preload: "",
    paused: true,
    currentTime: 0,

    play: jest.fn<() => Promise<void>>(() => {
      audio.paused = false;
      return Promise.resolve();
    }),

    pause: jest.fn<() => void>(() => {
      audio.paused = true;
    }),

    cloneNode: jest.fn<() => MockAudio>(() => {
      const clone = createMockAudio(audio.src);
      clone.volume = audio.volume;

      return clone;
    }),

    addEventListener: jest.fn<(event: string, callback: () => void) => void>(
      (event, callback) => {
        const callbacks = listeners.get(event) ?? [];

        callbacks.push(callback);
        listeners.set(event, callbacks);
      },
    ),

    dispatchEvent: (event: string) => {
      const callbacks = listeners.get(event) ?? [];

      callbacks.forEach((callback) => callback());
    },
  };

  audioInstances.push(audio);

  return audio;
}

describe("audioManager", () => {
  let audioManager: typeof import("@/shared/lib/audio/audioManager");

  beforeEach(async () => {
    jest.resetModules();
    audioInstances.length = 0;

    const AudioMock = jest.fn<(src: string) => MockAudio>((src) =>
      createMockAudio(src),
    );

    Object.defineProperty(window, "Audio", {
      configurable: true,
      writable: true,
      value: AudioMock,
    });

    audioManager = await import("@/shared/lib/audio/audioManager");
  });

  describe("audio state", () => {
    it("should start with audio disabled", () => {
      expect(audioManager.isSoundEnabled()).toBe(false);
    });

    it("should notify listeners when audio is enabled", async () => {
      const listener = jest.fn();

      audioManager.subscribeAudioState(listener);

      await audioManager.toggleAudio();

      expect(listener).toHaveBeenCalledTimes(1);
      expect(audioManager.isSoundEnabled()).toBe(true);
    });

    it("should notify listeners when audio is disabled", async () => {
      const listener = jest.fn();

      audioManager.subscribeAudioState(listener);

      await audioManager.toggleAudio();
      await audioManager.toggleAudio();

      expect(listener).toHaveBeenCalledTimes(2);
      expect(audioManager.isSoundEnabled()).toBe(false);
    });

    it("should allow listeners to unsubscribe", async () => {
      const listener = jest.fn();

      const unsubscribe = audioManager.subscribeAudioState(listener);

      unsubscribe();

      await audioManager.toggleAudio();

      expect(listener).not.toHaveBeenCalled();
    });

    it("should report ambient music as not playing initially", () => {
      expect(audioManager.isAmbientMusicPlaying()).toBe(false);
    });
  });

  describe("toggleAudio", () => {
    it("should enable audio and start ambient music", async () => {
      const result = await audioManager.toggleAudio();

      const ambientAudio = audioInstances.find(
        (audio) => audio.src === "/audio/ambient/ambient-theme.wav",
      );

      expect(result).toBe(true);
      expect(audioManager.isSoundEnabled()).toBe(true);
      expect(ambientAudio).toBeDefined();
      expect(ambientAudio?.play).toHaveBeenCalled();
      expect(audioManager.isAmbientMusicPlaying()).toBe(true);
    });

    it("should disable audio and pause ambient music", async () => {
      await audioManager.toggleAudio();

      const ambientAudio = audioInstances.find(
        (audio) => audio.src === "/audio/ambient/ambient-theme.wav",
      );

      await audioManager.toggleAudio();

      expect(audioManager.isSoundEnabled()).toBe(false);
      expect(ambientAudio?.pause).toHaveBeenCalled();
      expect(audioManager.isAmbientMusicPlaying()).toBe(false);
    });

    it("should configure ambient music correctly", async () => {
      await audioManager.toggleAudio();

      const ambientAudio = audioInstances.find(
        (audio) => audio.src === "/audio/ambient/ambient-theme.wav",
      );

      expect(ambientAudio?.loop).toBe(true);
      expect(ambientAudio?.volume).toBe(0.18);
      expect(ambientAudio?.preload).toBe("auto");
    });

    it("should not recreate ambient audio when toggled repeatedly", async () => {
      await audioManager.toggleAudio();
      await audioManager.toggleAudio();
      await audioManager.toggleAudio();

      const ambientAudios = audioInstances.filter(
        (audio) => audio.src === "/audio/ambient/ambient-theme.wav",
      );

      expect(ambientAudios).toHaveLength(1);
    });

    it("should stop ambient playback if audio is disabled while play is pending", async () => {
      let resolvePlay!: () => void;

      const pendingPlay = new Promise<void>((resolve) => {
        resolvePlay = resolve;
      });

      const AudioMock = window.Audio as unknown as jest.Mock<
        (src: string) => MockAudio
      >;

      AudioMock.mockImplementation((src) => {
        const audio = createMockAudio(src);

        if (src === "/audio/ambient/ambient-theme.wav") {
          audio.play.mockImplementation(() => pendingPlay);
        }

        return audio;
      });

      const enablePromise = audioManager.toggleAudio();

      await audioManager.toggleAudio();

      resolvePlay();

      await enablePromise;

      const ambientAudio = audioInstances.find(
        (audio) => audio.src === "/audio/ambient/ambient-theme.wav",
      );

      expect(audioManager.isSoundEnabled()).toBe(false);
      expect(ambientAudio?.pause).toHaveBeenCalled();
    });
  });

  describe("playSound", () => {
    it("should not play a sound when audio is disabled", () => {
      audioManager.playSound("buttonConfirm");

      expect(audioInstances).toHaveLength(0);
    });

    it("should play the requested sound when audio is enabled", async () => {
      await audioManager.toggleAudio();

      audioManager.playSound("buttonConfirm");

      const soundAudio = audioInstances.find(
        (audio) => audio.src === "/audio/sfx/button-confirm.wav",
      );

      expect(soundAudio).toBeDefined();
      expect(soundAudio?.cloneNode).toHaveBeenCalled();
    });

    it("should configure sound effects with the correct volume and preload", async () => {
      await audioManager.toggleAudio();

      audioManager.playSound("characterNavigation");

      const soundAudio = audioInstances.find(
        (audio) => audio.src === "/audio/sfx/character-navigation.wav",
      );

      expect(soundAudio?.volume).toBe(0.35);
      expect(soundAudio?.preload).toBe("auto");
    });

    it("should allow multiple overlapping sound effects", async () => {
      await audioManager.toggleAudio();

      audioManager.playSound("buttonConfirm");
      audioManager.playSound("buttonConfirm");

      const soundAudio = audioInstances.find(
        (audio) => audio.src === "/audio/sfx/button-confirm.wav",
      );

      expect(soundAudio?.cloneNode).toHaveBeenCalledTimes(2);

      const playbackInstances = audioInstances.filter(
        (audio) => audio.src === "/audio/sfx/button-confirm.wav",
      );

      expect(playbackInstances).toHaveLength(3);
    });

    it("should remove a playback from active sounds when it ends", async () => {
      await audioManager.toggleAudio();

      audioManager.playSound("buttonConfirm");

      const playback = audioInstances[audioInstances.length - 1];

      expect(playback).toBeDefined();

      playback.dispatchEvent("ended");

      await audioManager.toggleAudio();

      expect(playback.pause).not.toHaveBeenCalled();
    });
  });

  describe("preloadAudioAssets", () => {
    it("should preload ambient music and sound effects", () => {
      audioManager.preloadAudioAssets();

      expect(audioInstances).toHaveLength(9);
    });

    it("should not recreate audio assets when preloaded repeatedly", () => {
      audioManager.preloadAudioAssets();
      audioManager.preloadAudioAssets();

      expect(audioInstances).toHaveLength(9);
    });
  });
});
