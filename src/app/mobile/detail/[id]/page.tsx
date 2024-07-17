import React, { Fragment, Suspense } from "react";
import Navbar from "@/Component/Shared/Navbar";
import Footer from "@/Component/HomePage/Footer";
import { fetchMobileArticleDetails } from "@/services/articleServices";
import { Metadata, ResolvingMetadata } from "next";
import dynamic from "next/dynamic";
import TopMobileDetails from "@/Component/Mobile/TopDetail";
import BottomMobileDetails from "@/Component/Mobile/BottomDetails";
import Head from "next/head";

// const TopMobileDetails = dynamic(() => import("./_components/TopDetail"));
// const BottomMobileDetails = dynamic(
//   () => import("./_components/BottomDetails")
// );

export async function generateMetadata(
  { params }: { params: { id: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const mobileArticles = await fetchMobileArticleDetails({ id: params?.id });
  const title = mobileArticles?.data[0]?.title;
  const desc = `Here will show this ${mobileArticles?.data[0]?.title} mobile details and specifications this mobile is this ${mobileArticles?.data[0]?.brands} brand. you can see all of details of this phone.`;
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

const ProductDetails = async ({ params }: { params: { id: string } }) => {
  const mobileArticles = await fetchMobileArticleDetails({ id: params?.id });

  return (
    <Fragment>
        <link
          rel="canonical"
          href={`${process.env.NEXT_APP_URL}/mobile/detail/${params?.id}`}
          key="canonical"
        />
      <Navbar />
      {mobileArticles.data[0] ? (
        <TopMobileDetails mobileArticles={mobileArticles.data[0]} />
      ) : null}
      {mobileArticles.data[0] ? (
        <BottomMobileDetails mobileArticles={mobileArticles.data[0]} />
      ) : null}
      <Footer />
    </Fragment>
  );
};

export default ProductDetails;