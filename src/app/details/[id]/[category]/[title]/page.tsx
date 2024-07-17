import DetailsComponent from "@/Component/Details/Details";
import Navbar from "@/Component/Shared/Navbar";
import { fetchArticles, fetchArticlesDetails, fetchCategories } from "@/services/articleServices";
import { Metadata, ResolvingMetadata } from "next";
import React from "react";



export async function generateMetadata(
  { params }: { params: { id: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const articleDetail = await fetchArticlesDetails({ id: params?.id });
  const title = articleDetail?.data[0]?.title;
  const desc = articleDetail?.data[0]?.description.slice(0,130)
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

interface DetailsParams{
  searchParams: {
    page: string;
    limit: string;
    category:string
  };
  params: {
    id: string;
    category: string;
  };
}
export default async function Details({ params,searchParams }: DetailsParams) {
  const data = await fetchArticlesDetails({ id: params?.id });
  const Category = await fetchCategories();
  const articles = await fetchArticles({category: params?.category,page:searchParams?.page,limit:searchParams?.limit});
  return (
    <>
    
    <Navbar />
    {
      data?.data ? 
      <DetailsComponent articles={articles.data} category={Category.data} articleDetail={data?.data[0]} />
    : null}
    </>
  );
}
