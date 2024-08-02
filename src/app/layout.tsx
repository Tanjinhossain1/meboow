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
  title: "Safari List",
  description: "Show here all articles",
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
          <SnackbarProviderComponent>
            {children}
            </SnackbarProviderComponent>
        </BackdropProviderComponent>
        <Toaster />
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
