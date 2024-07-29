import CategoryPageComponent from "@/Component/Category/CategoryPageComponent";
import Navbar from "@/Component/Shared/Navbar";
import { fetchArticles, fetchArticlesDetails, fetchCategories } from "@/services/articleServices";
import React, { Suspense } from "react";

interface CategoryPropsType {
    searchParams: {
      page: string;
      limit: string;
      category:string
    };
    params: {
      brand: string;
    };
  }

export default async function ArticleBrandWisePage({ searchParams,params }: CategoryPropsType) {
    const { page, limit } = searchParams;
    const articles = await fetchArticles({ page, limit,brands:params?.brand });
    const Category = await fetchCategories();
  
  return (
    <Suspense>
      <Navbar />
     <CategoryPageComponent  isBrandWise category={Category.data} categoryWiseArticles={articles.data} total={articles.total} />
    </Suspense>
  );
}
