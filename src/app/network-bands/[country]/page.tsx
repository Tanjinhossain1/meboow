import React, { lazy } from "react";
import { Metadata, ResolvingMetadata } from "next";
import { getAllMobiles } from "@/lib/queries/services";
import dynamic from "next/dynamic";

const Navbar = lazy(() => import("@/Component/Shared/Navbar"));
const Footer = dynamic(() => import("@/Component/HomePage/Footer"),{
  suspense: true,
  ssr: false,
});
const MainComponent = lazy(() => import("../_components/MainComponent"));

export async function generateMetadata(
  { params }: { params: { country: string } },
  parent: ResolvingMetadata
): Promise<Metadata | undefined> {
  const formatCountry = params?.country
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const title = `${formatCountry} - Network Bands`;
  const desc = `Here will show this ${formatCountry} Network Bands Details. ${title} here country wise details you get.`;
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: title,
    description: desc,
    keywords: [
      "Article",
      "Safari List",
      "article",
      "brand",
      "mobile",
      "details",
      "Specification",
      title,
    ],
    openGraph: {
      title: title,
      description: desc,
      url: `${process.env.NEXT_APP_CANONICAL_URL}/network-bands/${params?.country}`,
      siteName: "Safari List",
      type: "website",
      images: [...previousImages],
    },
    alternates: {
      canonical: `${process.env.NEXT_APP_CANONICAL_URL}/network-bands/${params?.country}`,
    },
  };
}

export default async function page({
  params,
}: {
  params: { country: string };
}) {
  const formatCountry = params?.country
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const [LatestDeviceMobiles] = await Promise.all([
    getAllMobiles({ limits: "10", is_latest_device: "YES" }),
  ]);
  return (
    <>
      <Navbar />
      {
        <MainComponent
          isEdit={{
            isEdit: true,
            country: formatCountry,
          }}
          latestDeviceMobiles={LatestDeviceMobiles?.data as any}
        />
      }
      <Footer />
    </>
  );
}
