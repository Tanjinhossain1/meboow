import Footer from "@/Component/HomePage/Footer";
import Navbar from "@/Component/Shared/Navbar";
import {
  fetchArticles,
  fetchCategories,
  fetchMobileArticles,
} from "@/services/articleServices";
import React from "react";
// import NewsMainComponent from "./_components/NewsMainComponent";
import dynamic from "next/dynamic";

const NewsMainComponent = dynamic(() => import("./_components/NewsMainComponent"), {
  ssr: true, // or true, based on whether you want SSR support
});

export const metadata = {
  title: "News - Safari List",
  description:
    "In Safari List News page you get all of news related posts best articles also mobile and get many information about all article  .",
  keywords: ["News", "Safari List", "articles", "mobile"],
  openGraph: {
    title: "News - Safari List",
    description:
      "In Safari List News page you get all of news related posts best articles also mobile and get many information about all article .",
    url: `${process.env.NEXT_PUBLIC_META_URL}/news`,
    siteName: "Safari List",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "News - Safari List",
    description:
      "In Safari List News page you get all of news related posts best articles also mobile and get many information about all article .",
    // images: ['https://yourwebsite.com/static/images/aboutus.jpg'],
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_META_URL}/news`,
  },
};

interface NewsPagePropsType {
  searchParams: {
    page: string;
    limit: string;
  };
}

export default async function NewsPage({ searchParams }: NewsPagePropsType) {
  const { page, limit } = searchParams;
  // const articles = await fetchArticles({ page, limit, showInNews: "show" });
  // const MobilesArticles = await fetchArticles({
  //   page,
  //   limit,
  //   category: "Mobiles",
  // });
  // const LatestArticles = await fetchArticles({
  //   page,
  //   limit,
  //   latestDevice: "latest",
  // });
  // const Category = await fetchCategories();
  // const brands = await fetchBrands();

  // const newsAndReviews = await fetchArticles({ showInNewsWithAll: "show" });
  // // const mobileArticles = await fetchMobileArticles({ limit: "20" });
  // const DailyInterestMobiles = await fetchMobileArticles({
  //   limit: "10",
  //   is_daily_interest: "YES",
  // });
  // const ByFansMobiles = await fetchMobileArticles({
  //   limit: "10",
  //   is_by_fans: "YES",
  // });
  // const LatestDeviceMobiles = await fetchMobileArticles({
  //   limit: "10",
  //   is_latest_device: "YES",
  // });
  // const BestReviewsArticles = await fetchArticles({
  //   best_reviews: "YES",
  // });
  const [
    articles,
    MobilesArticles,
    LatestArticles,
    Category,
    newsAndReviews,
    LatestDeviceMobiles,
    BestReviewsArticles,
  ] = await Promise.all([
    fetchArticles({ page, limit, showInNews: "show" }),
    fetchArticles({ page, limit, category: "Mobiles" }),
    fetchArticles({ page, limit, latestDevice: "latest" }),
    fetchCategories(),
    fetchArticles({ showInNewsWithAll: "show" }),
    fetchMobileArticles({ limit: "10", is_latest_device: "YES" }),
    fetchArticles({ best_reviews: "YES" }),
  ]);
  
  return (
    <>
        <Navbar />
      <NewsMainComponent
        bestReviewsArticles={BestReviewsArticles.data}
        latestDeviceMobiles={LatestDeviceMobiles.data}
        newsAndReviews={newsAndReviews.data}
        category={Category.data}
        latestArticles={LatestArticles.data}
        mobilesArticles={MobilesArticles?.data}
        articles={articles?.data}
      />
        <Footer />
    </>
  );
}
