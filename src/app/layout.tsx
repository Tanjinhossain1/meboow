import type { Metadata, ResolvingMetadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import ThemeProvider from "@/Component/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import { BackdropProviderComponent } from "@/Component/BackdropProvider";
import { SnackbarProviderComponent } from "@/Component/SnackbarProvider";
import Script from 'next/script';


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Safari List - Latest Tech News, Reviews, and Prices",
  description: "Safari List - Latest Tech News, Reviews, and Prices and advice. We cover all categories in tech including mobiles and audio",
};


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-57S9R35L');`,
          }}
        />
        {/* End Google Tag Manager */}
      </head>
      <body className={inter.className}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-57S9R35L"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}
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
