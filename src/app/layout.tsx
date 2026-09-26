import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://resellerpro.mind-reply.com"),
  title: { default: "ResellerPro — Deployment control", template: "%s | ResellerPro" },
  description: "Provider-neutral deployment, domain, hosting and release control.",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
