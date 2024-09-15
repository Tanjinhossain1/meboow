import React, { Fragment } from "react";
import Navbar from "@/Component/Shared/Navbar";
import Footer from "@/Component/HomePage/Footer";
import {
  fetchArticles,
  fetchMobileArticleDetails,
  fetchMobileArticles,
  fetchMobileOpinions,
} from "@/services/articleServices";
import { Metadata, ResolvingMetadata } from "next";
import MainMobileDetails from "./_components/MainMobileDetails";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";

export async function generateMetadata(
  { params }: { params: { title: string } },
  parent: ResolvingMetadata
): Promise<Metadata | undefined> {
  const formattedTitle = params?.title
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const mobileArticles = await fetchMobileArticleDetails({
    title: formattedTitle,
  });
  if (mobileArticles?.data && mobileArticles?.data[0]) {
    const title = `${formattedTitle} - Full phone Specification`;
    const desc = `Here will show this ${formattedTitle} mobile details and specification this mobile is this ${mobileArticles?.data[0]?.brands} brand. you can see all of details of this phone.`;
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
        title,
      ],
      openGraph: {
        title: title,
        description: desc,
        url: `${process.env.NEXT_APP_CANONICAL_URL}/mobile/${params?.title}`,
        siteName: "Safari List",
        type: "website",
        images: [
          {
            url: `${process.env.NEXT_PUBLIC_IMAGE_SERVER_URL}/get/${image}`,
            alt: `${title} image`,
            width: 400, // optional, adjust based on your image size
            height: 400, // optional, adjust based on your image size
            
          },
          ...previousImages,
        ],
      },
      alternates: {
        canonical: `${process.env.NEXT_APP_CANONICAL_URL}/mobile/${params?.title}`,
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

  const LatestDeviceMobiles = await fetchMobileArticles({
    limit: "10",
    is_latest_device: "YES",
  });
  const RelatedMobileDevices = await fetchMobileArticles({
    brands: mobileArticles.data[0]?.brands,
    page: "1",
    limit: "10",
  });
  console.log(" this is the data mobile   ", mobileArticles);

  const AllMobilesOpinion = await fetchMobileOpinions({
    mobileId: `${mobileArticles.data[0]?.id}`,
  });

  const session = await getServerSession(authConfig);
  console.log("this is the user  in app/page", session);
  const user = session?.user;
  return (
    <Fragment>
      <link
        rel="canonical"
        href={`${process.env.NEXT_APP_CANONICAL_URL}/mobile/${params?.title}`}
        key="canonical"
      />
      <Navbar />

      {mobileArticles.data && mobileArticles.data[0] ? (
        <>
          <MainMobileDetails
            user={user}
            allMobilesOpinion={AllMobilesOpinion.data}
            relatedMobileDevices={RelatedMobileDevices.data}
            latestDevices={LatestDeviceMobiles.data}
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
