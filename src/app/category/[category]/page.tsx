import CategoryPageComponent from "@/Component/Category/CategoryPageComponent";
import Navbar from "@/Component/Shared/Navbar";
import { fetchArticles, fetchCategories, fetchMobileArticles } from "@/services/articleServices";
import { formatForUrlWith_under_score } from "@/utils/utils";
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
      url: `${process.env.NEXT_APP_CANONICAL_URL}/category/${formatForUrlWith_under_score(params?.category)}`,
      siteName: "Safari List",
      type: "website",
      images: [...previousImages],
    },
    alternates: {
      canonical: `${process.env.NEXT_APP_CANONICAL_URL}/category/${formatForUrlWith_under_score(params?.category)}`,
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
  const mobileArticles = await fetchMobileArticles({ page: "1", limit: "20" });
  return (
    <Suspense>
      <Navbar />
      <CategoryPageComponent
      mobileArticles={mobileArticles?.data}
        category={Category.data}
        categoryWiseArticles={articles.data}
        total={articles.total}
      />
    </Suspense>
  );
}
