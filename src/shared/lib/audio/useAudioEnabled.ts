"use client";

import { useSyncExternalStore } from "react";

import { isSoundEnabled, subscribeAudioState } from "./audioManager";

export function useAudioEnabled() {
  return useSyncExternalStore(subscribeAudioState, isSoundEnabled, () => false);
}
