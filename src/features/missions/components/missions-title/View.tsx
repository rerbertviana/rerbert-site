"use client";

import { useLanguage } from "@/shared/i18n/LanguageProvider";
import { View as PageTitle } from "@/shared/components/page-title/View";

export function View() {
  const { dictionary } = useLanguage();
  const { pageLabel, title, subtitle } = dictionary.missions;

  return (
    <PageTitle
      id="missions-title"
      pageLabel={pageLabel}
      subtitle={subtitle}
      decoration="side-lines"
      brackets="angle"
      title={<span className="text-[#8AFF00]">{title}</span>}
    />
  );
}
