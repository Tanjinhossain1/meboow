import Navbar from "@/Component/Shared/Navbar";
import React, { Fragment } from "react";
import BrandWiseDetails from "./_components/BrandWiseDetails";
import { fetchArticles, fetchMobileArticles } from "@/services/articleServices";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import Footer from "@/Component/HomePage/Footer";
import { Metadata, ResolvingMetadata } from "next";
import { formatForUrlWith_under_score } from "@/utils/utils";

export async function generateMetadata(
  { params }: { params: { brand: string } },
  parent: ResolvingMetadata
): Promise<Metadata | undefined> {
  const formattedBrand = params?.brand
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  const mobileArticles = await fetchMobileArticles({
    page: "1",
    limit: "20",
    brands: formattedBrand,
  });
  if (mobileArticles?.data && mobileArticles?.data[0]) {
    const title = `${params?.brand} - List Of Mobiles`;
    const desc = `Here will show this   ${params?.brand} brand wise List Of Mobiles you can see all of mobiles with this brand.`;
    const previousImages = (await parent).openGraph?.images || [];
    return {
      title: title,
      description: desc,
      keywords: ["Article", "Safari List", "article", "have", "mobile", title],
      openGraph: {
        title: title,
        description: desc,
        url: `${process.env.NEXT_APP_CANONICAL_URL}/mobile/brand-wise/${params?.brand}`,
        siteName: "Safari List",
        type: "website",
        images: [...previousImages],
      },
      alternates: {
        canonical: `${process.env.NEXT_APP_CANONICAL_URL}/mobile/brand-wise/${params?.brand}`,
      },
    };
  }
}
export default async function page({ params }: { params: { brand: string } }) {
  const formattedBrand = params?.brand
  .split("_")
  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  .join(" ");

  const mobileArticles = await fetchMobileArticles({
    page: "1",
    limit: "20",
    brands: formattedBrand,
  });
  return (
    <Fragment>
      <Navbar />
      <BrandWiseDetails mobileArticles={mobileArticles.data} />
      <Footer />
    </Fragment>
  );
}
