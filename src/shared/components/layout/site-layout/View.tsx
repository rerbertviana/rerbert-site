import Image from "next/image";
import type { ReactNode } from "react";

import { SiteFooter } from "../site-footer/View";
import { SiteHeader } from "../site-header/View";

interface SiteLayoutProps {
  children: ReactNode;
}

export function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <>
      {/* Shared background */}
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

      {/* Shared page structure */}
      <div className="relative z-10 flex min-h-screen flex-col">
        <SiteHeader />

        <div className="flex flex-1 flex-col">{children}</div>

        <SiteFooter />
      </div>
    </>
  );
}
