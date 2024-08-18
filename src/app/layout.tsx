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
    "Safari List is one of the biggest platforms for tech news, reviews, prices, and advice. We cover all categories in tech including mobiles, TVs, laptops, cameras, and audio.",
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
      "Stay updated with the latest tech news, in-depth reviews, and price comparisons on Safari List. Covering everything from smartphones to laptops and more.",
    url: "https://safarilist.com",
    siteName: "Safari List",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@SafariList", // Your Twitter handle
    title: "Safari List - Latest Tech News, Reviews, and Prices",
    description:
      "Get the latest tech news and in-depth reviews on Safari List. From smartphones to laptops, we cover all major technology categories.",
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
