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
  { params }: { params: { id: string } },
  parent: ResolvingMetadata
): Promise<Metadata | undefined> {
  const articleDetail = await fetchArticlesDetails({ id: params?.id });
  if(articleDetail?.data && articleDetail?.data[0]){
  const title = articleDetail?.data[0]?.title;
  const desc = articleDetail?.data[0]?.description.slice(0, 130);
  const previousImages = (await parent).openGraph?.images || [];
  const image = articleDetail?.data[0].image;

  return {
    title: title,
    description: desc,

    openGraph: {
      images: [image, ...previousImages],
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
    id: string;
    category: string;
    title: string;
  };
}

export default async function Details({ params, searchParams }: DetailsParams) {
  const data = await fetchArticlesDetails({ id: params?.id });
  const Category = await fetchCategories();
  const Brands = await fetchBrands();
  const mobileArticles = await fetchMobileArticles({page:'1',limit:'10'});
  const articlesOpinion = await fetchArticleOpinions({page:'1',limit:'20',articleId: params?.id});
  const articles = await fetchArticles({
    category: params?.category,
    page: "1",
    limit: "5",
    isRelated: params?.id,
  });
  
  const session = await getServerSession(authConfig);
  console.log("this is the user  in app/page", session);
  const user = session?.user;
  return (
    <>
      <link
        rel="canonical"
        href={`${process.env.NEXT_APP_CANONICAL_URL}/details/${params.id}/${params.category}`}
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
