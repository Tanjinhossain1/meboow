import React, { Fragment } from "react";
import {
  fetchCategories,
  fetchMobileArticleDetails,
  fetchMobileOpinions,
} from "@/services/articleServices";
import { Metadata, ResolvingMetadata } from "next";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import dynamic from "next/dynamic";
import { getAllArticles } from "@/lib/queries/services";
import { PhoneOffIcon as SmartphoneOff, Home } from 'lucide-react'
import Link from "next/link";
import { redirect } from "next/navigation";
import { MobileArticleType } from "@/types/mobiles";

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
  const decodedTitle = decodeURIComponent(params?.title || "");
  const formattedTitle = decodedTitle
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
        url: `${process.env.NEXT_APP_CANONICAL_URL}/mobile/${decodedTitle}`,
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
        canonical: `${process.env.NEXT_APP_CANONICAL_URL}/mobile/${decodedTitle}`,
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
  
  const [LatestArticles, AllMobilesOpinion, categories, session] = await Promise.all([
    getAllArticles({pages: "1", limits: "8", latestDevice: "latest"}),
    fetchMobileOpinions({ mobileId: `${mobileArticles?.data?.[0]?.id}` }),
    fetchCategories(),
    getServerSession(authConfig),
  ]);


  const user = session?.user;
  if(!mobileArticles?.data && !mobileArticles?.data?.[0]){
    redirect('/mobile')
  }
  return (
    <Fragment>
      <NavbarHelper categories={categories?.data} isLoginUser={user} />
      {mobileArticles?.data && mobileArticles?.data?.[0] ? (
        <>
          <MainMobileDetails
            user={user}
            allMobilesOpinion={AllMobilesOpinion.data} 
            latestArticles={LatestArticles}
            mobileArticles={mobileArticles?.data?.[0] as MobileArticleType}
          />
        </>
      ) : 
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="animate-fade-in">
          <SmartphoneOff className="mx-auto h-24 w-24 text-gray-400" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            This phone does not exist
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Oops! It seems the phone {`you're`} looking for is out of service.
          </p>
        </div>
        <div className="animate-fade-in animation-delay-300">
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Home className="mr-2 -ml-1 h-5 w-5" aria-hidden="true" />
            Return to Home
          </Link>
        </div>
      </div>
    </div>
      }
      <Footer />
    </Fragment>
  );
};

export default ProductDetails;
