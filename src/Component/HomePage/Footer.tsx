import React, { lazy, Suspense } from "react";
import { fetchArticles, fetchMobileArticles } from "@/services/articleServices";

const FooterHelper = lazy(() => import("./FooterHelper"));

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
