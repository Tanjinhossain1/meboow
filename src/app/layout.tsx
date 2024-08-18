import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import ThemeProvider from "@/Component/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import { BackdropProviderComponent } from "@/Component/BackdropProvider";
import { SnackbarProviderComponent } from "@/Component/SnackbarProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Safari List - Latest Tech News, Reviews, and Prices",
  description:
    "Safari List - Latest Tech News, Reviews, and Prices and advice. We cover all categories in tech including mobiles and audio.",
  keywords: [
    "tech news",
    "tech reviews",
    "mobile phones",
    "laptops",
    "TV reviews",
    "audio devices",
    "technology advice",
    "latest gadgets",
    "smartphones",
    "price comparison",
  ],
  openGraph: {
    title: "Safari List - Latest Tech News, Reviews, and Prices",
    description:
      "Safari List - Latest Tech News, Reviews, and Prices and advice. We cover all categories in tech including mobiles and audio.",
    url: "https://safarilist.com",
    siteName: "Safari List",
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: "https://safarilist.com",
  },
  robots: {
    index: true,
    follow: true,
    noarchive: false,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
};


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <ThemeProvider> */}
        <BackdropProviderComponent>
          <SnackbarProviderComponent>{children}</SnackbarProviderComponent>
        </BackdropProviderComponent>
        <Toaster />
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
