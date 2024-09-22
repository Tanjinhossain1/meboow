import React, { lazy } from "react";
import { fetchMobileArticles } from "@/services/articleServices";

const Navbar = lazy(() => import("@/Component/Shared/Navbar"));
const Footer = lazy(() => import("@/Component/HomePage/Footer"));
const MainComponent = lazy(() => import("./_components/MainComponent"));

export const metadata = {
  title: "Network Bands - Safari List",
  description:
    "In Safari List Network Bands page have list of network in country wise by default show your country network but you can change the country to see your Network Bands .",
  keywords: ["Network", "Safari List", "country", "Network Bands"],
  openGraph: {
    title: "Network Bands - Safari List",
    description:
      "In Safari List Network Bands page have list of network in country wise by default show your country network but you can change the country to see your Network Bands .",
    url: `${process.env.NEXT_PUBLIC_META_URL}/network-bands`,
    siteName: "Safari List",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Network Bands - Safari List",
    description:
      "In Safari List Network Bands page have list of network in country wise by default show your country network but you can change the country to see your Network Bands .",
    // images: ['https://yourwebsite.com/static/images/aboutus.jpg'],
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_META_URL}/network-bands`,
  },
};

export default async function page() {
  const LatestDeviceMobiles = await fetchMobileArticles({
    limit: "10",
    is_latest_device: "YES",
  });
  return (
    <>
      <Navbar />
      <MainComponent latestDeviceMobiles={LatestDeviceMobiles.data} />
      <Footer />
    </>
  );
}
