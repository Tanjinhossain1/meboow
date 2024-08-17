import Navbar from "@/Component/Shared/Navbar";
import React, { Fragment } from "react";
import BrandWiseDetails from "./_components/BrandWiseDetails";
import { fetchArticles, fetchMobileArticles } from "@/services/articleServices";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import Footer from "@/Component/HomePage/Footer";
import { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata(
  { params }: { params: { brand: string } },
  parent: ResolvingMetadata
): Promise<Metadata | undefined> {
  const mobileArticles = await fetchMobileArticles({
    page: "1",
    limit: "20",
    brands: params?.brand,
  });
  if (mobileArticles?.data && mobileArticles?.data[0]) {
    const title = params?.brand;
    const desc = `Here will show this ${mobileArticles?.data[0]?.title} mobile details and specifications this mobile is this ${params?.brand} brand. you can see all of details of this phone.`;
    const previousImages = (await parent).openGraph?.images || [];
    const image = mobileArticles?.data[0]?.display_image;
    return {
      title: title,
      description: desc,

      openGraph: {
        images: [image, ...previousImages],
      },
    };
  }
}
export default async function page({ params }: { params: { brand: string } }) {
  const session = await getServerSession(authConfig);
  console.log("this is the user  in app/page", session);
  const user = session?.user;

  const mobileArticles = await fetchMobileArticles({
    page: "1",
    limit: "20",
    brands: params?.brand,
  });
  return (
    <Fragment>
      <Navbar />
      <BrandWiseDetails mobileArticles={mobileArticles.data} />
      <Footer />
    </Fragment>
  );
}
