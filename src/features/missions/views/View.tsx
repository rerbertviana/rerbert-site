"use client";

import { View as BackButton } from "@/shared/components/navigation/back-button/View";
import { View as DigitalReconstructionEntrance } from "@/shared/components/animations/digital-reconstruction-entrance/View";
import { useLanguage } from "@/shared/i18n/LanguageProvider";

import { View as MissionsTitle } from "../components/missions-title/View";

export function View() {
  const { dictionary } = useLanguage();

  return (
    <DigitalReconstructionEntrance>
      <main
        aria-labelledby="missions-title"
        className="flex w-full flex-1 flex-col"
      >
        <MissionsTitle />

        {/* Back button */}
        <section className="mx-auto w-full max-w-[1080px] px-4 pt-6">
          <BackButton
            href="/profile"
            label={dictionary.missions.backToProfile}
          />
        </section>

        {/* Missions content */}
        <section
          aria-label={dictionary.missions.title}
          className="mx-auto w-full max-w-[1200px] flex-1 px-4 pb-8"
        >
          {/* Filters and timeline will be added here. */}
        </section>
      </main>
    </DigitalReconstructionEntrance>
  );
}
