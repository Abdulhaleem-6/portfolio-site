import type { Metadata, Viewport } from "next";
import { Archivo, Geist_Mono } from "next/font/google";
import { site } from "@/content/site";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { RouteTransition } from "@/components/RouteTransition";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-archivo",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const viewport: Viewport = {
  // Matches --bg in each scheme so the browser chrome does not band against the page.
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fcfbfa" },
    { media: "(prefers-color-scheme: dark)", color: "#0d0c0b" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.role}`,
    template: `%s · ${site.name}`,
  },
  description: site.hero,
  openGraph: {
    title: `${site.name} | ${site.role}`,
    description: site.hero,
    url: site.url,
    siteName: site.name,
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

/**
 * Applied before first paint so an explicitly-chosen theme never flashes the
 * other one. Absent a stored choice we stamp nothing, leaving the document in
 * the "system" state that prefers-color-scheme resolves on its own.
 */
const themeScript = `
(function () {
  try {
    var stored = localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') {
      document.documentElement.setAttribute('data-theme', stored);
    }
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a
          href="#main"
          className="label sr-only focus:not-sr-only focus:fixed focus:left-5 focus:top-5 focus:z-[200] focus:border focus:border-signal focus:bg-signal focus:px-4 focus:py-3 focus:text-signal-fg"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">
          <RouteTransition>{children}</RouteTransition>
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
