import type { Metadata } from "next";
import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
