import { authConfig } from "@/lib/auth";
import {
  fetchArticles,
  fetchCategories,
  fetchMobileArticles,
} from "@/services/articleServices";
import { Metadata, ResolvingMetadata } from "next";
import { getServerSession } from "next-auth";
import dynamic from "next/dynamic";
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
  const decodedTitle = decodeURIComponent(searchParams?.search);

  // Replace spaces back to '+'
  const formattedSearch = decodedTitle.replace(/ /g, "+");

  console.log("checker generated mata metadata", formattedSearch, searchParams);
  const formatSearch = searchParams?.search
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
      url: `${process.env.NEXT_APP_CANONICAL_URL}/search?search=${encodeURIComponent(searchParams?.search)}`,
      siteName: "Safari List",
      type: "website",
      images: [...previousImages],
    },
    alternates: {
      canonical: `${process.env.NEXT_APP_CANONICAL_URL}/search?search=${encodeURIComponent(searchParams?.search)}`,
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
  const { page, limit,search } = searchParams;

  
  // Replace spaces back to '+'
  const formattedSearch = search.replace(/ /g, "+");
  
  const formatSearch = formattedSearch
  .split("_")
  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  .join(" ");
  const decodedTitle = decodeURIComponent(formatSearch);

  const articles = await fetchArticles({
    page,
    limit: limit ? limit : "6",
    search: formatSearch,
  });
  const Category = await fetchCategories();
  const mobileSearch = await fetchMobileArticles({
    search: formatSearch,
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
