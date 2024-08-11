import Footer from "@/Component/HomePage/Footer";
import Navbar from "@/Component/Shared/Navbar";
import { fetchArticles } from "@/services/articleServices";
import React, { Suspense } from "react";
import NewsMainComponent from "./_components/NewsMainComponent";

interface NewsPagePropsType {
  searchParams: {
    page: string;
    limit: string;
  };
}

export default async function NewsPage({ searchParams }: NewsPagePropsType) {
  const { page, limit } = searchParams;
  const articles = await fetchArticles({ page, limit, showInNews: "show" });
  const MobilesArticles = await fetchArticles({
    page,
    limit,
    category: "Mobiles",
  });

  return (
    <>
      <Suspense>
        {" "}
        <Navbar />
      </Suspense>
      <NewsMainComponent mobilesArticles={MobilesArticles?.data} articles={articles?.data} total={articles?.total} />
      <Suspense>
        {" "}
        <Footer />
      </Suspense>
    </>
  );
}
