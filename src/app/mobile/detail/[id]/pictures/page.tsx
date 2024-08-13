import React, { Fragment } from "react";
import Navbar from "@/Component/Shared/Navbar";
import Footer from "@/Component/HomePage/Footer";
import {
  fetchArticles,
  fetchBrands,
  fetchMobileArticleDetails,
  fetchMobileArticles,
} from "@/services/articleServices";
import { Metadata, ResolvingMetadata } from "next";
import MainMobileDetails from "../_components/MainMobileDetails";


export async function generateMetadata(
  { params }: { params: { id: string } },
  parent: ResolvingMetadata
): Promise<Metadata | undefined> {
  const mobileArticles = await fetchMobileArticleDetails({ id: params?.id });
  if (mobileArticles?.data && mobileArticles?.data[0]) {
    const title = mobileArticles?.data[0]?.title;
    const desc = `Here will show this ${mobileArticles?.data[0]?.title} mobile Images and specifications this mobile is this ${mobileArticles?.data[0]?.brands} brand. you can see all of Images of ${mobileArticles?.data[0]?.title}.`;
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

const ProductDetails = async ({ params }: { params: { id: string } }) => {
  const mobileArticles = await fetchMobileArticleDetails({ id: params?.id });
  const articles = await fetchArticles({ page:'1',limit:'12' });
  const LatestArticles = await fetchArticles({
    page:'1',
    limit:"8",
    latestDevice: "latest",
  });
  
  const LatestDeviceMobiles = await fetchMobileArticles({
    limit: "10",
    is_latest_device: "YES",
  });
  const RelatedMobileDevices = await fetchMobileArticles({brands:mobileArticles.data[0].brands,page:'1',limit:'10'});
  console.log(" this is the data mobile   ", mobileArticles);
  const brands = await fetchBrands();
  return (
    <Fragment>
      <link
        rel="canonical"
        href={`${process.env.NEXT_APP_CANONICAL_URL}/mobile/detail/${params?.id}`}
        key="canonical"
      />
      <Navbar />
      {mobileArticles.data && mobileArticles.data[0] ? (
        <>
        <MainMobileDetails isPicture brands={brands.data} relatedMobileDevices={RelatedMobileDevices.data} latestDevices={LatestDeviceMobiles.data} latestArticles={LatestArticles.data} articles={articles.data} mobileArticles={mobileArticles.data[0]} />
        </>
      ) : null}
      <Footer />
    </Fragment>
  );
};

export default ProductDetails;
