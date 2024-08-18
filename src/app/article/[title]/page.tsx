import DetailsComponent from "@/Component/Details/Details";
import Footer from "@/Component/HomePage/Footer";
import Navbar from "@/Component/Shared/Navbar";
import { authConfig } from "@/lib/auth";
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
import React from "react";

export async function generateMetadata(
  { params }: { params: { title: string } },
  parent: ResolvingMetadata
): Promise<Metadata | undefined> {
  const formattedTitle = params?.title
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const articleDetail = await fetchArticlesDetails({ title: formattedTitle });
  if (articleDetail?.data && articleDetail?.data[0]) {
    const title = articleDetail?.data[0]?.title;
    const desc = `in this ${title} article have this ${articleDetail?.data[0]?.description.slice(
      0,
      110
    )}`;
    const previousImages = (await parent).openGraph?.images || [];
    const image = articleDetail?.data[0].image;

    return {
      title: title,
      description: desc,
      // keywords: ['Article', 'Safari List', 'article', 'have', 'mobile','category', title],
      openGraph: {
        images: [image, ...previousImages],
      },
      alternates: {
        canonical: `${process.env.NEXT_APP_CANONICAL_URL}/article/${params?.title}`,
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
  const data = await fetchArticlesDetails({ title: formattedTitle });
  const Category = await fetchCategories();
  const Brands = await fetchBrands();
  const mobileArticles = await fetchMobileArticles({ page: "1", limit: "10" });
  const articlesOpinion = await fetchArticleOpinions({
    page: "1",
    limit: "20",
    articleId: data?.data[0]?.id,
  });
  const articles = await fetchArticles({
    category: data?.data[0]?.category,
    page: "1",
    limit: "5",
    isRelated: data?.data[0]?.id,
  });

  const session = await getServerSession(authConfig);
  console.log("this is the user  in app/page", session);
  const user = session?.user;
  return (
    <>
      <link
        rel="canonical"
        href={`${process.env.NEXT_APP_CANONICAL_URL}/article/${params?.title}`}
        key="canonical"
      />
      <Navbar />
      {data?.data && mobileArticles.data && data?.data[0] ? (
        <DetailsComponent
          user={user}
          articlesOpinion={articlesOpinion.data}
          mobileArticles={mobileArticles.data}
          brands={Brands?.data}
          articles={articles.data}
          category={Category.data}
          articleDetail={data?.data[0]}
        />
      ) : null}

      <Footer />
    </>
  );
}