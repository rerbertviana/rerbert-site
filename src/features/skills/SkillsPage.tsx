import { Suspense } from "react";

import { SiteLayout } from "@/shared/components/layout/site-layout/View";

import { View } from "./views/View";

export function SkillsPage() {
  return (
    <SiteLayout>
      <Suspense fallback={null}>
        <View />
      </Suspense>
    </SiteLayout>
  );
}
