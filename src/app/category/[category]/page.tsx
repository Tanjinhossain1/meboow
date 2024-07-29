import CategoryPageComponent from "@/Component/Category/CategoryPageComponent";
import Navbar from "@/Component/Shared/Navbar";
import { fetchArticles, fetchCategories } from "@/services/articleServices";
import React, { Suspense } from "react";

interface CategoryPropsType {
    searchParams: {
      page: string;
      limit: string;
      category:string
    };
    params: {
      category: string;
    };
  }
 
export default async function CategoryPage({ searchParams,params }: CategoryPropsType) {
    const { page, limit } = searchParams;
    const articles = await fetchArticles({ page, limit,category:params?.category });
    const Category = await fetchCategories();
    console.log('Category.data Category.data', articles,articles.data)
  return (
    <Suspense>
      <Navbar />
     <CategoryPageComponent category={Category.data} categoryWiseArticles={articles.data} total={articles.total} />
    </Suspense>
  );
}
