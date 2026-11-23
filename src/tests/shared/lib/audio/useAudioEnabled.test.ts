import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, jest } from "@jest/globals";

import { useAudioEnabled } from "@/shared/lib/audio/useAudioEnabled";
import { isSoundEnabled, toggleAudio } from "@/shared/lib/audio/audioManager";

describe("useAudioEnabled", () => {
  beforeEach(async () => {
    Object.defineProperty(window, "Audio", {
      configurable: true,
      writable: true,
      value: jest.fn(() => ({
        src: "",
        loop: false,
        volume: 1,
        preload: "",
        paused: true,
        currentTime: 0,
        play: jest.fn(() => Promise.resolve()),
        pause: jest.fn(),
        cloneNode: jest.fn(),
        addEventListener: jest.fn(),
      })),
    });

    if (isSoundEnabled()) {
      await toggleAudio();
    }
  });

  it("should return false when audio is initially disabled", () => {
    const { result } = renderHook(() => useAudioEnabled());

    expect(result.current).toBe(false);
  });

  it("should update to true when audio is enabled", async () => {
    const { result } = renderHook(() => useAudioEnabled());

    await act(async () => {
      await toggleAudio();
    });

    expect(result.current).toBe(true);
  });

  it("should update to false when audio is disabled", async () => {
    const { result } = renderHook(() => useAudioEnabled());

    await act(async () => {
      await toggleAudio();
    });

    expect(result.current).toBe(true);

    await act(async () => {
      await toggleAudio();
    });

    expect(result.current).toBe(false);
  });
});
