"use client";

import { useLanguage } from "@/shared/i18n/LanguageProvider";
import { View as PageTitle } from "@/shared/components/page-title/View";

export function View() {
  const { dictionary } = useLanguage();
  const { pageLabel, title, subtitle } = dictionary.skills;

  return (
    <PageTitle
      id="skills-title"
      pageLabel={pageLabel}
      subtitle={subtitle}
      title={<span className="text-[#8AFF00]">{title}</span>}
      decoration="side-lines"
      brackets="angle"
    />
  );
}
