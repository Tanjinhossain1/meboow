import CategoryPageComponent from "@/Component/Category/CategoryPageComponent";
import Footer from "@/Component/HomePage/Footer";
import Navbar from "@/Component/Shared/Navbar";
import { fetchArticles, fetchArticlesDetails, fetchCategories } from "@/services/articleServices";
import { Breadcrumbs, Grid, Link, Paper, Typography } from "@mui/material";
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
  
  return (
    <Suspense>
     <CategoryPageComponent category={Category.data} categoryWiseArticles={articles.data} total={articles.total} />
    </Suspense>
  );
}
