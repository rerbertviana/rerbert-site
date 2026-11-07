import Image from "next/image";

import { SiteFooter } from "@/shared/components/layout/site-footer/SiteFooter";
import { SiteHeader } from "@/shared/components/layout/site-header/SiteHeader";

import { View } from "./views/View";

export function CharacterSelectionPage() {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#080516]"
      >
        <picture className="absolute inset-0 block">
          <source
            media="(max-width: 767px)"
            srcSet="/images/developer-room-mobile.png"
          />

          <Image
            src="/images/developer-room.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </picture>

        <div className="absolute inset-0 bg-gradient-to-b from-[#080516]/20 via-[#080516]/10 to-[#080516]/50" />
      </div>

      <main
        aria-label="RERBERT.EXE"
        className="relative z-10 flex min-h-screen flex-col"
      >
        <SiteHeader />
        <View />
        <SiteFooter />
      </main>
    </>
  );
}
