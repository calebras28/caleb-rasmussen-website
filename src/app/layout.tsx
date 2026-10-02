import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/layout/theme-provider";
import { siteSettings } from "@/lib/data/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteSettings.fullName} — ${siteSettings.tagline}`,
    template: `%s — ${siteSettings.fullName}`,
  },
  description: siteSettings.bio,
  keywords: [
    siteSettings.fullName,
    "software engineer",
    "full-stack developer",
    "portfolio",
    "web developer",
    "React",
    "Next.js",
    "TypeScript",
  ],
  authors: [{ name: siteSettings.fullName }],
  creator: siteSettings.fullName,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: `${siteSettings.fullName} — Portfolio`,
    title: `${siteSettings.fullName} — ${siteSettings.tagline}`,
    description: siteSettings.bio,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteSettings.fullName} — ${siteSettings.tagline}`,
    description: siteSettings.bio,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf6ec" },
    { media: "(prefers-color-scheme: dark)", color: "#0d0d0f" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
