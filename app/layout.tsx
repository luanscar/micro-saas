import "@/styles/globals.css";

import { fontHeading, fontSans, fontUrban } from "@/assets/fonts";
import { Providers } from "@/providers";
import { ModalProvider } from "@/providers/modal-provider";
import { ThemeProvider } from "next-themes";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@/components/analytics";
import Layout from "@/components/layout/container";
import { TailwindIndicator } from "@/components/tailwind-indicator";

interface RootLayoutProps {
  children: React.ReactNode;
}

export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Next.js",
    "React",
    "Prisma",
    "Neon",
    "Auth.js",
    "shadcn ui",
    "Resend",
    "React Email",
    "Stripe",
  ],
  authors: [
    {
      name: "luanaraujo",
    },
  ],
  creator: "luanaraujo",
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: "website",
    locale: "pt_br",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@luanaraujo",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "font-sans antialiased",
          fontSans.variable,
          fontUrban.variable,
          fontHeading.variable,
        )}
      >
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}
