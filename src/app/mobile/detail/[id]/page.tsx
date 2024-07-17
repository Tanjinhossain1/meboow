import React, { Fragment, Suspense } from "react";
import Navbar from "@/Component/Shared/Navbar";
import Footer from "@/Component/HomePage/Footer";
import { fetchMobileArticleDetails } from "@/services/articleServices";
import { Metadata, ResolvingMetadata } from "next";
import dynamic from "next/dynamic";

const TopMobileDetails = dynamic(() => import("./_components/TopDetail"));
const BottomMobileDetails = dynamic(
  () => import("./_components/BottomDetails")
);

export async function generateMetadata(
  { params }: { params: { id: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const mobileArticles = await fetchMobileArticleDetails({ id: params?.id });
  const title = mobileArticles?.data[0]?.title;
  const desc = `Here will show this ${mobileArticles?.data[0]?.title} mobile details and specifications this mobile is this ${mobileArticles?.data[0]?.brands} brand. you can see all of details of this phone.`;
  const previousImages = (await parent).openGraph?.images || [];
  const image = mobileArticles?.data[0]?.display_image;
 
  return{
    title: title,
    description: desc,

    openGraph: {
      images: [image, ...previousImages],
    },
  };
 
}

const ProductDetails = async ({ params }: { params: { id: string } }) => {
  const mobileArticles = await fetchMobileArticleDetails({ id: params?.id });

  // const schema = {
  //   "@context": "https://schema.org",
  //   "@type": "Product",
  //   name: mobileArticles?.data[0]?.title,
  //   description: `Here will show this ${mobileArticles?.data[0]?.title} mobile details and specifications this mobile is this ${mobileArticles?.data[0]?.brands} brand. you can see all of details of this phone.`,
  //   image: mobileArticles?.data[0]?.display_image,
  //   brand: {
  //     "@type": "Brand",
  //     name: mobileArticles?.data[0]?.brands,
  //   },

  //   offers: {
  //     "@type": "Offer",
  //     url: `https://meboow.vercel.app/mobile/detail/${mobileArticles?.data[0]?.id}`,
  //     priceCurrency: "USD",
  //     price: mobileArticles?.data[0]?.prices[0]?.start_from,
  //     availability: "https://schema.org/InStock",
  //   },
  // };

  return (
    <Fragment> 
      {/* <Suspense>
        <Navbar />
      </Suspense> */}
      {/* {mobileArticles.data[0] ? (
        <TopMobileDetails mobileArticles={mobileArticles.data[0]} />
      ) : null} */}
      {mobileArticles.data[0] ? (
        <BottomMobileDetails mobileArticles={mobileArticles.data[0]} />
      ) : null}
      {/* <Suspense>
        <Footer />
      </Suspense> */}
    </Fragment>
  );
};

export default ProductDetails;
