import DetailsComponent from "@/Component/Details/Details";
import Footer from "@/Component/HomePage/Footer";
import Navbar from "@/Component/Shared/Navbar";
import { authConfig } from "@/lib/auth";
import { getAllArticles } from "@/lib/queries/services";
import {
  fetchArticleOpinions,
  fetchArticles,
  fetchArticlesDetails,
  fetchBrands,
  fetchCategories,
  fetchMobileArticles,
} from "@/services/articleServices";
import { Metadata, ResolvingMetadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

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
  if (articleDetail && articleDetail[0]) {
    const title = articleDetail[0]?.title;
    const desc = `in this ${title} article have this ${articleDetail[0]?.description.slice(
      0,
      110
    )}`;
    const previousImages = (await parent).openGraph?.images || [];
    const image = articleDetail[0].image;

    return {
      title: title,
      description: desc,
      // keywords: ['Article', 'Safari List', 'article', 'have', 'mobile','category', title],
      openGraph: {
        images: [{
          url: `${process.env.NEXT_PUBLIC_IMAGE_SERVER_URL}/get/${image}`,
          alt: `${title} image`,
          width: 800, // optional, adjust based on your image size
          height: 600, // optional, adjust based on your image size
        }, ...previousImages],
      },
      alternates: {
        canonical: `${process.env.NEXT_APP_CANONICAL_URL}/article/${decodedTitle}`,
      },
     
    };
  }
}

interface DetailsParams {
  params: {
    title: string;
  };
}

export default async function Details({ params }: DetailsParams) {
  const formattedTitle = params?.title
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
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
      <Navbar />
      {data && mobileArticles.data && data[0] ? (
        <DetailsComponent
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
