// import DetailsReviewComponent from "@/Component/Details/ReviewDetails";
import { authConfig } from "@/lib/auth";
import { getAllArticles } from "@/lib/queries/services";
import {
  fetchArticleOpinions,
  fetchArticles,
  fetchBrands,
  fetchCategories,
  fetchMobileArticles,
} from "@/services/articleServices";
import { Metadata, ResolvingMetadata } from "next";
import { getServerSession } from "next-auth";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";
import React from "react";

const NavbarHelper = dynamic(
  () => import("@/Component/Shared/NavbarHelperComponent"),
  {
    ssr: true, // or true, based on whether you want SSR support
  }
);
const DetailsReviewComponent = dynamic(
  () => import("@/Component/Details/ReviewDetails"),
  {
    ssr: true, // or true, based on whether you want SSR support
  }
);
const Footer = dynamic(() => import("@/Component/HomePage/Footer"), {
  ssr: true,
});
export async function generateMetadata(
  { params }: { params: { title: string } },
  parent: ResolvingMetadata
): Promise<Metadata | undefined> {
  const decodedTitle = decodeURIComponent(params?.title);
  const formattedTitle = params?.title
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const articleDetail = await getAllArticles({ route: formattedTitle });
  const previousImages = (await parent).openGraph?.images || [];
  if (articleDetail && articleDetail[0]) {
    const title = `${articleDetail[0]?.title}`;
    const desc = `${
      articleDetail[0]?.title
    } ${articleDetail[0]?.description.slice(0, 100)}`;
    const image = articleDetail[0].image;

    return {
      title: title,
      description: desc,

      openGraph: {
        images: [image, ...previousImages],
      },
      
    alternates: {
      canonical: `${process.env.NEXT_APP_CANONICAL_URL}/review/${decodedTitle}`,
    },
    };
  }
}

interface DetailsParams {
  searchParams: {
    page: string;
    limit: string;
    category: string;
  };
  params: {
    title: string;
  };
}

export default async function Details({ params, searchParams }: DetailsParams) {
  const formattedTitle = params?.title
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  console.log(
    "this is the formattedTitle inthe the review title",
    formattedTitle
  );
  const data = await getAllArticles({ route: formattedTitle });
  const Category = await fetchCategories();
  const Brands = await fetchBrands();
  const mobileArticles = await fetchMobileArticles({ page: "1", limit: "10" });
  const articlesOpinion = await fetchArticleOpinions({
    page: "1",
    limit: "20",
    articleId: data[0]?.id,
  });
  const articles = await fetchArticles({
    category: data[0]?.category,
    page: "1",
    limit: "5",
    isRelated: data[0]?.id,
  });
 
  const session = await getServerSession(authConfig);
  console.log("this is the user  in app/page", session);
  const user = session?.user;
  
  if(data && !data[0]){
    redirect('/article')
  }
  return (
    <>
      <NavbarHelper categories={Category?.data} isLoginUser={user} />
      {data && mobileArticles.data && data[0] ? (
        <DetailsReviewComponent
          user={user}
          articlesOpinion={articlesOpinion.data}
          mobileArticles={mobileArticles.data}
          brands={Brands?.data}
          articles={articles.data}
          category={Category.data}
          articleDetail={data[0]}
        />
      ) : null}

      <Footer />
    </>
  );
}
