import type { Metadata } from "next";
import { Oxanium } from "next/font/google";

import "./globals.css";

const oxanium = Oxanium({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-oxanium",
  display: "swap",
});

export const metadata: Metadata = {
  title: "RERBERT.EXE — Developer Portfolio",
  description: "Interactive developer portfolio of Rerbert Viana.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={oxanium.variable}>{children}</body>
    </html>
  );
}
