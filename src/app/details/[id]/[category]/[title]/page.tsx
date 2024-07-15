import DetailsComponent from "@/Component/Details/Details";
import Navbar from "@/Component/Shared/Navbar";
import { fetchArticles, fetchArticlesDetails, fetchCategories } from "@/services/articleServices";
import React from "react";

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
