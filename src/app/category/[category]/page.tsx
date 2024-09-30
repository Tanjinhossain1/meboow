import CategoryPageComponent from "@/Component/Category/CategoryPageComponent";
import Navbar from "@/Component/Shared/Navbar";
import { fetchArticles, fetchCategories } from "@/services/articleServices";
import { Metadata, ResolvingMetadata } from "next";
import React, { Suspense } from "react";

export async function generateMetadata(
  { params }: { params: { category: string } },
  parent: ResolvingMetadata
): Promise<Metadata | undefined> {
  const formattedCategory = params?.category
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  const title = `${formattedCategory}`;
  const desc = `in our Safari List  Category you will ${title} have the category wise articles published and here you will fiend all of articles, mobiles with this category`;
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: title,
    description: desc,
    keywords: [
      "Article",
      "Safari List",
      "article",
      "published",
      "mobile",
      "category",
      title,
    ],
    openGraph: {
      title: title,
      description: desc,
      url: `${process.env.NEXT_APP_CANONICAL_URL}/category/${params?.category}`,
      siteName: "Safari List",
      type: "website",
      images: [...previousImages],
    },
    alternates: {
      canonical: `${process.env.NEXT_APP_CANONICAL_URL}/category/${params?.category}`,
    },
  };
}

interface CategoryPropsType {
  searchParams: {
    page: string;
    limit: string;
    category: string;
  };
  params: {
    category: string;
  };
}

export default async function CategoryPage({
  searchParams,
  params,
}: CategoryPropsType) {
  const formattedCategory = params?.category
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  const { page, limit } = searchParams;
  const articles = await fetchArticles({
    page,
    limit,
    category: formattedCategory,
  });
  const Category = await fetchCategories();
  return (
    <Suspense>
      <Navbar />
      <CategoryPageComponent
        category={Category.data}
        categoryWiseArticles={articles.data}
        total={articles.total}
      />
    </Suspense>
  );
}
