import type { Metadata } from "next";
import "./globals.css";

const appUrl = process.env.NEXT_PUBLIC_APP_URL;

export const metadata: Metadata = {
  metadataBase: appUrl ? new URL(appUrl) : undefined,
  title: {
    default: "ResellerPro — Domains, deployment and business infrastructure",
    template: "%s | ResellerPro",
  },
  description: "A premium, provider-neutral platform for domains, deployment, infrastructure, commerce and verified release operations.",
  applicationName: "ResellerPro",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "ResellerPro — Domains, deployment and business infrastructure",
    description: "Control the business layer from discovery through verified release.",
    type: "website",
    siteName: "ResellerPro",
  },
  twitter: {
    card: "summary_large_image",
    title: "ResellerPro",
    description: "Domains, deployment, infrastructure and commerce in one controlled platform.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
