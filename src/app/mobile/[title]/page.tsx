import React, { Fragment } from "react";
import {
  fetchArticles,
  fetchCategories,
  fetchMobileArticleDetails,
  fetchMobileOpinions,
} from "@/services/articleServices";
import { Metadata, ResolvingMetadata } from "next";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import dynamic from "next/dynamic";

const NavbarHelper = dynamic(
  () => import("@/Component/Shared/NavbarHelperComponent"),
  {
    ssr: true, // or true, based on whether you want SSR support
  }
);
const MainMobileDetails = dynamic(
  () => import("./_components/MainMobileDetails"),
  { ssr: true }
);

const Footer = dynamic(() => import("@/Component/HomePage/Footer"), {
  ssr: true,
});
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

  const AllMobilesOpinion = await fetchMobileOpinions({
    mobileId: `${mobileArticles.data[0]?.id}`,
  });

  const categories = await fetchCategories();

  const session = await getServerSession(authConfig);
  const user = session?.user;
  return (
    <Fragment>
      <link
        rel="canonical"
        href={`${process.env.NEXT_APP_CANONICAL_URL}/mobile/${params?.title}`}
        key="canonical"
      />
      <NavbarHelper categories={categories?.data} isLoginUser={user} />
      {mobileArticles.data && mobileArticles.data[0] ? (
        <>
          <MainMobileDetails
            user={user}
            allMobilesOpinion={AllMobilesOpinion.data} 
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
