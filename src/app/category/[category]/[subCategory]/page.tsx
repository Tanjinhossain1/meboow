// import CategoryPageComponent from "@/Component/Category/CategoryPageComponent";
import { authConfig } from "@/lib/auth";
import { fetchArticles, fetchCategories, fetchMobileArticles } from "@/services/articleServices";
import { formatForUrlWith_under_score } from "@/utils/utils";
import { Metadata, ResolvingMetadata } from "next";
import { getServerSession } from "next-auth";
import dynamic from "next/dynamic";
import React, { Fragment } from "react";

const NavbarHelper = dynamic(
  () => import("@/Component/Shared/NavbarHelperComponent"),
  {
    ssr: true, // or true, based on whether you want SSR support
  }
);
const CategoryPageComponent = dynamic(() => import("@/Component/Category/CategoryPageComponent"), {
  ssr: true, // or true, based on whether you want SSR support
});
const Footer = dynamic(() => import("@/Component/HomePage/Footer"), {
  ssr: true,
});

export async function generateMetadata(
  { params }: { params: { category: string; subCategory: string } },
  parent: ResolvingMetadata
): Promise<Metadata | undefined> {
  const formattedCategory = params?.category
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const formattedSubCategory = params?.subCategory
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const title = `${formattedSubCategory} - ${formattedCategory}`;
  const desc = `in our Safari List sub Category you will ${title} have the sub category wise articles published and here you will fiend all of articles, mobiles with this sub category`;
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
      "sub category",
      title,
    ],
    openGraph: {
      title: title,
      description: desc,
      url: `${process.env.NEXT_APP_CANONICAL_URL}/category/${formatForUrlWith_under_score(params?.category)}/${formatForUrlWith_under_score(params?.subCategory)}`,
      siteName: "Safari List",
      type: "website",
      images: [...previousImages],
    },
    alternates: {
      canonical: `${process.env.NEXT_APP_CANONICAL_URL}/category/${formatForUrlWith_under_score(params?.category)}/${formatForUrlWith_under_score(params?.subCategory)}`,
    },
  };
}

interface CategoryPropsType {
  params: {
    subCategory: string;
    category: string;
  };
  searchParams: {
    page: string;
    limit: string;
    category: string;
  };
}

export default async function SubCategoryPage({
  params,
  searchParams,
}: CategoryPropsType) {
  const formattedCategory = params?.category
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  const formattedSubCategory = params?.subCategory
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  const { page, limit } = searchParams;
  const articles = await fetchArticles({
    sub_categories: formattedSubCategory,
    main_category_for_sub:formattedCategory,
    page,
    limit,
  });
  const Category = await fetchCategories();
  const session = await getServerSession(authConfig);
  const user = session?.user;
  const mobileArticles = await fetchMobileArticles({ page: "1", limit: "20" });
  return (
    <Fragment>
      <NavbarHelper categories={Category?.data} isLoginUser={user} />
      <CategoryPageComponent
      mobileArticles={mobileArticles?.data}
        category={Category.data}
        isSubCategory
        categoryWiseArticles={articles?.data}
        total={articles.total}
      />
      <Footer />
    </Fragment>
  );
}
