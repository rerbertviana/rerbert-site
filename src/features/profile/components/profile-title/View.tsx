"use client";

import { useLanguage } from "@/shared/i18n/LanguageProvider";
import { View as PageTitle } from "@/shared/components/page-title/View";

export function View() {
  const { dictionary } = useLanguage();
  const { pageLabel, title, subtitle } = dictionary.profile;

  const lastSpaceIndex = title.lastIndexOf(" ");

  const titlePrefix = lastSpaceIndex >= 0 ? title.slice(0, lastSpaceIndex) : "";

  const highlightedWord =
    lastSpaceIndex >= 0 ? title.slice(lastSpaceIndex + 1) : title;

  return (
    <PageTitle
      id="profile-title"
      pageLabel={pageLabel}
      subtitle={subtitle}
      decoration="side-lines"
      brackets="angle"
      title={
        <>
          {titlePrefix && <span className="text-white">{titlePrefix}</span>}

          <span className="text-[#8AFF00]">{highlightedWord}</span>
        </>
      }
    />
  );
}
