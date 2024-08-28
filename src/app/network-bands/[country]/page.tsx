import React from "react";
import Navbar from "@/Component/Shared/Navbar";
import Footer from "@/Component/HomePage/Footer";
import {
  fetchBrands,
  fetchMobileArticles,
  fetchNetworkBands,
} from "@/services/articleServices";
import MainComponent from "../_components/MainComponent";
import { Metadata, ResolvingMetadata } from "next";

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

  const brands = await fetchBrands();
  const LatestDeviceMobiles = await fetchMobileArticles({
    limit: "10",
    is_latest_device: "YES",
  });
  return (
    <>
      <Navbar />
      {
          <MainComponent
        isEdit={{
          isEdit: true,
          country:formatCountry
        }}
        latestDeviceMobiles={LatestDeviceMobiles.data}
        brands={brands.data}
      />  
      }
     
      <Footer />
    </>
  );
}
