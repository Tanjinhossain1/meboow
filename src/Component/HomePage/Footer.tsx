import React from "react";
import { fetchArticles, fetchMobileArticles } from "@/services/articleServices";
import dynamic from "next/dynamic";

const FooterHelper = dynamic(() => import("./FooterHelper"), {
  ssr: false, // or true, based on whether you want SSR support
});

export default async function Footer() {
  const [newsAndReviews, mobileArticles] = await Promise.all([
    fetchArticles({ limit: "10" }),
    fetchMobileArticles({ limit: "10" }),
  ]);
  return (
    <FooterHelper
      mobileArticles={mobileArticles.data}
      newsAndReviews={newsAndReviews.data}
    />
  );
}
