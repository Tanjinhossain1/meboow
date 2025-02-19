import DetailsReviewComponent from "@/Component/Details/ReviewDetails";
import Footer from "@/Component/HomePage/Footer";
import Navbar from "@/Component/Shared/Navbar";
import { authConfig } from "@/lib/auth";
import { getAllArticles } from "@/lib/queries/services";
import {
  fetchArticleOpinions,
  fetchArticles,
  fetchArticlesDetails,
  fetchBrands,
  fetchCategories,
  fetchMobileArticles,
} from "@/services/articleServices";
import { Metadata, ResolvingMetadata } from "next";
import { getServerSession } from "next-auth";
import React from "react";

export async function generateMetadata(
  { params }: { params: { title: string; page: string } },
  parent: ResolvingMetadata
): Promise<Metadata | undefined> {
  const decodedTitle = decodeURIComponent(params?.title);
  const formattedTitle = params?.title
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const articleDetail = await getAllArticles({ route: formattedTitle });
  if (articleDetail && articleDetail[0]) {
    const title = articleDetail[0]?.title;
    const desc = `This is the Page for reviews mobile. page number is ${
      params?.page
    } ${articleDetail[0]?.description.slice(0, 130)}`;
    const previousImages = (await parent).openGraph?.images || [];
    const image = articleDetail[0].image;

    return {
      title: title,
      description: desc,

      keywords: [
        "reviews",
        "Page",
        "mobile",
        "details",
        "articles",
        "number",
        title,
      ],
      openGraph: {
        title: title,
        description: desc,
        url: `${process.env.NEXT_APP_CANONICAL_URL}/review/${decodedTitle}/${params?.page}`,
        siteName: "Safari List",
        type: "website",
        images: [
          {
            url: `${process.env.NEXT_PUBLIC_IMAGE_SERVER_URL}/get/${image}`,
            alt: `${title} image`,
            width: 800, // optional, adjust based on your image size
            height: 600, // optional, adjust based on your image size
          },
          ...previousImages,
        ],
      },

      alternates: {
        canonical: `${process.env.NEXT_APP_CANONICAL_URL}/review/${decodedTitle}/${params?.page}`,
      },
    };
  }
}

interface DetailsParams {
  searchParams: {
    page: string;
    limit: string;
    category: string;
  };
  params: {
    title: string;
    page: string;
  };
}

export default async function Details({ params, searchParams }: DetailsParams) {
  const formattedTitle = params?.title
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  console.log(
    "this is the formattedTitle inthe the review title",
    formattedTitle
  );
  const data = await getAllArticles({ route: formattedTitle });
  const Category = await fetchCategories();
  const Brands = await fetchBrands();
  const mobileArticles = await fetchMobileArticles({ page: "1", limit: "10" });
  const articlesOpinion = await fetchArticleOpinions({
    page: "1",
    limit: "20",
    articleId: data[0]?.id,
  });
  const articles = await fetchArticles({
    category: data[0]?.category,
    page: "1",
    limit: "5",
    isRelated: data[0]?.id,
  });

  const session = await getServerSession(authConfig);
  console.log("this is the user  in app/page", session);
  const user = session?.user;
  return (
    <>
      {/* <link
        rel="canonical"
        href={`${process.env.NEXT_APP_CANONICAL_URL}/review/${params?.title}/${params?.page}`}
        key="canonical"
      /> */}
      <Navbar />
      {data && mobileArticles.data && data[0] ? (
        <DetailsReviewComponent
          page={+params?.page}
          user={user}
          articlesOpinion={articlesOpinion.data}
          mobileArticles={mobileArticles.data}
          brands={Brands?.data}
          articles={articles.data}
          category={Category.data}
          articleDetail={data[0]}
        />
      ) : null}

      <Footer />
    </>
  );
}
