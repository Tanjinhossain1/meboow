import { authConfig } from "@/lib/auth";
import {
  fetchArticles,
  fetchCategories,
  fetchMobileArticles,
} from "@/services/articleServices";
import { Metadata, ResolvingMetadata } from "next";
import { getServerSession } from "next-auth";
import dynamic from "next/dynamic";
import { headers } from "next/headers";
import React, { Suspense } from "react";

const NavbarHelper = dynamic(
  () => import("@/Component/Shared/NavbarHelperComponent"),
  {
    ssr: true, // or true, based on whether you want SSR support
  }
);
const CategoryPageComponent = dynamic(
  () => import("@/Component/Category/CategoryPageComponent"),
  {
    ssr: true, // or true, based on whether you want SSR support
  }
);
const Footer = dynamic(() => import("@/Component/HomePage/Footer"), {
  ssr: true,
});

export async function generateMetadata(
  { searchParams }: { searchParams: { search: string } },
  parent: ResolvingMetadata
): Promise<Metadata | undefined> {
  const entries = Object.entries(searchParams);
  const combinedSearch = entries
  .map(([key, value], index) => {
    if (index === 0) {
      return value?.replace(/ /g, "+"); // First value only, replace spaces with '+'
    }
    return `${key}${value?.replace(/ /g, "+")}`; // Subsequent key-value pairs
  })
  .join("&"); // Join all parts with '&'

  const formatSearch = combinedSearch
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  const title = `${formatSearch} - Articles Reviews Mobiles Lists`;
  const desc = `IN Safari List ${formatSearch} Search page you can see all of articles and mobiles you search `;
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
      url: `${process.env.NEXT_APP_CANONICAL_URL}/search?search=${combinedSearch}`,
      siteName: "Safari List",
      type: "website",
      images: [...previousImages],
    },
    alternates: {
      canonical: `${process.env.NEXT_APP_CANONICAL_URL}/search?search=${combinedSearch}`,
    },
  };
}

interface CategoryPropsType {
  searchParams: {
    page: string;
    limit: string;
    search: string;
  };
}
export default async function SearchFieldSearchPage({
  searchParams,
}: CategoryPropsType) {
  const { page, limit } = searchParams;
  const entries = Object.entries(searchParams);

  // Start with the first value only, and append subsequent key-value pairs
  const combinedSearch = entries
    .map(([key, value], index) => {
      if (index === 0) {
        return value?.replace(/ /g, "+"); // First value only, replace spaces with '+'
      }
      return `${key}${value?.replace(/ /g, "+")}`; // Subsequent key-value pairs
    })
    .join("&"); // Join all parts with '&'

  // Decode and handle the search parameter
  
  const articles = await fetchArticles({
    page,
    limit: limit ? limit : "6",
    search: combinedSearch,
  });
  const Category = await fetchCategories();
  const mobileSearch = await fetchMobileArticles({
    search: combinedSearch,
    limit: "32",
  });
  const mobileArticles = await fetchMobileArticles({ page: "1", limit: "20" });

  const session = await getServerSession(authConfig);
  const user = session?.user;
  return (
    <Suspense>
      <NavbarHelper categories={Category?.data} isLoginUser={user} />
      <CategoryPageComponent
        mobileSearchDefault={mobileSearch}
        isSearch
        category={Category.data}
        categoryWiseArticles={articles.data}
        total={articles.total}
        mobileArticles={mobileArticles?.data}
      />
      <Footer />
    </Suspense>
  );
}
