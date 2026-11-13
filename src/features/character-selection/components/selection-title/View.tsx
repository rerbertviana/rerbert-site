"use client";

import { useLanguage } from "@/shared/i18n/LanguageProvider";
import { View as PageTitle } from "@/shared/components/page-title/View";

export function SelectionTitle() {
  const { dictionary } = useLanguage();
  const translations = dictionary.characterSelection;

  return (
    <PageTitle
      id="selection-title"
      pageLabel={translations.sectionLabel}
      subtitle={translations.subtitle}
      decoration="angular-divider"
      brackets="chevron"
      labelFont="default"
      title={
        <>
          <span className="text-white">{translations.title.first}</span>

          <span className="text-[#8AFF00]">{translations.title.highlight}</span>
        </>
      }
    />
  );
}
