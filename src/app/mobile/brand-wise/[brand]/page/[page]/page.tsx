import Navbar from "@/Component/Shared/Navbar";
import React, { Fragment } from "react";
import { fetchArticles, fetchMobileArticles } from "@/services/articleServices";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import Footer from "@/Component/HomePage/Footer";
import { Metadata, ResolvingMetadata } from "next";
import BrandWiseMobile from "../../_components/BrandWiseMobile";

export async function generateMetadata(
  { params }: { params: { brand: string,page:string } },
  parent: ResolvingMetadata
): Promise<Metadata | undefined> {
  const formattedBrand = params?.brand
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  
  const page = params.page

    const title = `All ${params?.brand} Phone - Page ${page}`;
    const desc = `Here will show this   ${params?.brand} brand wise List Of Mobiles you can see all of mobiles with this brand.`;
    const previousImages = (await parent).openGraph?.images || [];
    return {
      title: title,
      description: desc,
      keywords: ["Article", "Safari List", "article", "have", "mobile", title],
      openGraph: {
        title: title,
        description: desc,
        url: `${process.env.NEXT_APP_CANONICAL_URL}/mobile/brand-wise/${params?.brand}/page/${page}`,
        siteName: "Safari List",
        type: "website",
        images: [...previousImages],
      },
      alternates: {
        canonical: `${process.env.NEXT_APP_CANONICAL_URL}/mobile/brand-wise/${params?.brand}/page/${page}`,
      },
    };
}
export default async function page({ params }: { params: { brand: string } }) {

  const session = await getServerSession(authConfig);
  const user = session?.user;
  return (
    <Fragment>
      <Navbar />
      <BrandWiseMobile user={user} />
      <Footer />
    </Fragment>
  );
}
