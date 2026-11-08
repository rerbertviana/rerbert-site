import { SiteLayout } from "@/shared/components/layout/site-layout/View";

import { View } from "./views/View";

export function CharacterSelectionPage() {
  return (
    <SiteLayout>
      <main aria-label="RERBERT.EXE" className="flex flex-1 flex-col">
        <View />
      </main>
    </SiteLayout>
  );
}
