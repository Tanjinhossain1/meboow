import CategoryPageComponent from "@/Component/Category/CategoryPageComponent";
import Navbar from "@/Component/Shared/Navbar";
import {
  fetchArticles,
  fetchCategories,
  fetchMobileArticles,
} from "@/services/articleServices";
import { Metadata, ResolvingMetadata } from "next";
import React, { Suspense } from "react";

export async function generateMetadata(
  { searchParams }: { searchParams: { search: string } },
  parent: ResolvingMetadata
): Promise<Metadata | undefined> {
  const title = `${searchParams?.search} - Articles Reviews Mobiles Lists`;
  const desc = `IN Safari List ${searchParams?.search} Search page you can see all of articles and mobiles you search `;
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: title,
    description: desc,
    keywords: [
      "Article",
      "search",
      "brand",
      "mobiles",
      "details",
      "Safari List",
      title,
    ],
    openGraph: {
      title: title,
      description: desc,
      url: `${process.env.NEXT_APP_CANONICAL_URL}/search?search=${searchParams?.search}`,
      siteName: "Safari List",
      type: "website",
      images: [...previousImages],
    },
    alternates: {
      canonical: `${process.env.NEXT_APP_CANONICAL_URL}/search?search=${searchParams?.search}`,
    },
  };
}

interface CategoryPropsType {
  searchParams: {
    page: string;
    limit: string;
    search: string;
  };
  params: {
    search: string;
  };
}
export default async function SearchFieldSearchPage({
  searchParams,
  params,
}: CategoryPropsType) {
  const { page, limit, search } = searchParams;
  console.log("search", params, search);
  const articles = await fetchArticles({ page, limit, search });
  const Category = await fetchCategories();
  const mobileSearch = await fetchMobileArticles({ search: search });
  return (
    <Suspense>
      <Navbar />
      <CategoryPageComponent
        mobileSearch={mobileSearch.data}
        isSearch
        category={Category.data}
        categoryWiseArticles={articles.data}
        total={articles.total}
      />
    </Suspense>
  );
}
