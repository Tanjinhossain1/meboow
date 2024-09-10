import React, { Suspense } from "react";
import { fetchArticles, fetchMobileArticles } from "@/services/articleServices";
import dynamic from "next/dynamic";

const FooterHelper = dynamic(() => import("./FooterHelper"), {
  suspense: true,
  ssr: false,
});

export default async function Footer() {
  const [newsAndReviews, mobileArticles] = await Promise.all([
    fetchArticles({ limit: "10" }),
    fetchMobileArticles({ limit: "10" }),
  ]);
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <FooterHelper
        mobileArticles={mobileArticles.data}
        newsAndReviews={newsAndReviews.data}
      />
    </Suspense>
  );
}
