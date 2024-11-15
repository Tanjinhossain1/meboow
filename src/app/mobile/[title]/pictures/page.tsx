import React, { Fragment } from "react";
import Navbar from "@/Component/Shared/Navbar";
import Footer from "@/Component/HomePage/Footer";
import {
  fetchArticles,
  fetchMobileArticleDetails,
} from "@/services/articleServices";
import { Metadata, ResolvingMetadata } from "next";
import MainMobileDetails from "../_components/MainMobileDetails";
import { redirect } from "next/navigation";

export async function generateMetadata(
  { params }: { params: { title: string } },
  parent: ResolvingMetadata
): Promise<Metadata | undefined> {
  const decodedTitle = decodeURIComponent(params?.title || "");
  const formattedTitle = params?.title
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  const mobileArticles = await fetchMobileArticleDetails({ title:formattedTitle });
  if (mobileArticles?.data && mobileArticles?.data[0]) {
    const title = `${mobileArticles?.data[0]?.title} - Pictures`;
    const desc = `Here will show this ${mobileArticles?.data[0]?.title} mobile Images or Pictures and specifications this mobile is this ${mobileArticles?.data[0]?.brands} brand. you can see all of Images of ${mobileArticles?.data[0]?.title}.`;
    const previousImages = (await parent).openGraph?.images || [];
    const image = mobileArticles?.data[0]?.display_image;
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
        "Pictures",
        title,
      ],
      openGraph: {
        title: title,
        description: desc,
        url: `${process.env.NEXT_APP_CANONICAL_URL}/mobile/${decodedTitle}/pictures`,
        siteName: "Safari List",
        type: "website",
        images: [image, ...previousImages],
      },
      alternates: {
        canonical: `${process.env.NEXT_APP_CANONICAL_URL}/mobile/${decodedTitle}/pictures`,
      },
    };
  }
}

const ProductDetails = async ({ params }: { params: { title: string } }) => {
  const formattedTitle = params?.title
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  const mobileArticles = await fetchMobileArticleDetails({
    title: formattedTitle,
  });
  const LatestArticles = await fetchArticles({
    page: "1",
    limit: "8",
    latestDevice: "latest",
  });
  
  if(mobileArticles.data && !mobileArticles.data[0]){
    redirect('/mobile')
  }
  return (
    <Fragment>
      <Navbar />
      {mobileArticles.data && mobileArticles.data[0] ? (
        <>
          <MainMobileDetails
            isPicture
            latestArticles={LatestArticles.data}
            mobileArticles={mobileArticles.data[0]}
          />
        </>
      ) : null}
      <Footer />
    </Fragment>
  );
};

export default ProductDetails;
