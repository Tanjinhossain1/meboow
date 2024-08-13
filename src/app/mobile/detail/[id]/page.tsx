import React, { Fragment } from "react";
import Navbar from "@/Component/Shared/Navbar";
import Footer from "@/Component/HomePage/Footer";
import {
  fetchArticles,
  fetchBrands,
  fetchMobileArticleDetails,
  fetchMobileArticles,
  fetchMobileOpinions,
  fetchMobileTags,
} from "@/services/articleServices";
import { Metadata, ResolvingMetadata } from "next";
import MainMobileDetails from "./_components/MainMobileDetails";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";


export async function generateMetadata(
  { params }: { params: { id: string } },
  parent: ResolvingMetadata
): Promise<Metadata | undefined> {
  const mobileArticles = await fetchMobileArticleDetails({ id: params?.id });
  if (mobileArticles?.data && mobileArticles?.data[0]) {
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
  const AllMobilesOpinion = await fetchMobileOpinions({mobileId:params?.id});
  const AllMobilesTags = await fetchMobileTags({});
  
  const session = await getServerSession(authConfig);
  console.log("this is the user  in app/page", session);
  const user = session?.user;
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
        <MainMobileDetails tags={AllMobilesTags.data} user={user} allMobilesOpinion={AllMobilesOpinion.data} brands={brands.data} relatedMobileDevices={RelatedMobileDevices.data} latestDevices={LatestDeviceMobiles.data} latestArticles={LatestArticles.data} articles={articles.data} mobileArticles={mobileArticles.data[0]} />
        </>
      ) : null}
      <Footer />
    </Fragment>
  );
};

export default ProductDetails;
