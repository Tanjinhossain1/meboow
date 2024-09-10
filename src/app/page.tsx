import {
  fetchArticles,
  fetchBrands,
  fetchMobileArticles,
} from "@/services/articleServices";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import HomePageLoadingSkeleton from "@/Component/LoadingSkeleton/HomePageLoadingSkeleton";

const Navbar = dynamic(() => import("@/Component/Shared/Navbar"), {
  suspense: true,
  ssr: true, // or true, based on whether you want SSR support
});
const Banner = dynamic(() => import("@/Component/HomePage/Banner"), {
  suspense: true,
  ssr: true, // or true, based on whether you want SSR support
});
const Footer = dynamic(() => import("@/Component/HomePage/Footer"), {
  suspense: true,
  ssr: true, 
});

interface HomePropsType {
  searchParams: {
    page: string;
    limit: string;
  };
}
export const metadata: Metadata = {
  title:
    "Safari List - Tech News, Reviews, Prices | Latest in Mobiles, Audio, and More",
  description:
    "Safari List provides the latest tech news, in-depth reviews, and accurate price comparisons for all categories in technology, including mobile phones, audio devices, gadgets, and more.",
  keywords:
    "tech news, mobile reviews, audio reviews, gadget prices, technology advice, Safari List",
  openGraph: {
    title: "Safari List - Latest Tech News, Reviews, and Prices",
    description:
      "Stay updated with Safari List's latest tech news, in-depth reviews, and accurate price comparisons for mobiles, audio devices, and more.",
    url: "https://safarilist.com/",
    type: "website",
    images: [
      {
        url: "https://safarilist.com/favicon.ico", // replace with actual image
        width: 1200,
        height: 630,
        alt: "Safari List Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Safari List - Latest Tech News, Reviews, and Prices",
    description:
      "Explore Safari List for the latest tech news, reviews, and price comparisons. Covering mobiles, audio, and more!",
    images: [
      {
        url: "https://safarilist.com/favicon.ico", // replace with actual image
        alt: "Safari List Logo",
      },
    ],
  },
};

async function Home({ searchParams }: HomePropsType) {
  const { page, limit } = searchParams;
  const [
    articles,
    LatestArticles,
    MobilesArticles,
    newsAndReviews,
    ApplesMobile,
    GoogleMobiles,
    SamsungMobiles,
    LastUpdatedMobiles,
    DailyInterestMobiles,
    ByFansMobiles,
    LatestDeviceMobiles,
    brands,
  ] = await Promise.all([
    fetchArticles({ page, limit }),
    fetchArticles({ page, limit, latestDevice: "latest" }),
    fetchArticles({ page, limit, category: "Mobiles" }),
    fetchArticles({ showInNewsWithAll: "show" }),
    fetchMobileArticles({ limit: "30", brands: "Apple" }),
    fetchMobileArticles({ limit: "30", brands: "Google" }),
    fetchMobileArticles({ limit: "30", brands: "Samsung" }),
    fetchMobileArticles({ limit: "30" }),
    fetchMobileArticles({ limit: "10", is_daily_interest: "YES" }),
    fetchMobileArticles({ limit: "10", is_by_fans: "YES" }),
    fetchMobileArticles({ limit: "10", is_latest_device: "YES" }),
    fetchBrands(),
  ]);

  const session = await getServerSession(authConfig);
  console.log("this is the user  in app/page", session);
  const user = session?.user;
  return (
    <>
      {/* <link
        rel="canonical"
        href={`${process.env.NEXT_APP_CANONICAL_URL}`}
        key="canonical"
      /> */}
      {/* <Suspense fallback={<NavbarLoadingSkeleton />}> */}
      {/* </Suspense> */}

      <Navbar />
      <Suspense fallback={<HomePageLoadingSkeleton isOffNavbar />}>
        <Banner
          LastUpdatedMobiles={LastUpdatedMobiles.data}
          SamsungMobiles={SamsungMobiles.data}
          dailyInterestMobiles={DailyInterestMobiles.data}
          byFansMobiles={ByFansMobiles.data}
          latestDeviceMobiles={LatestDeviceMobiles.data}
          newsAndReviews={newsAndReviews.data}
          mobilesArticles={MobilesArticles.data}
          user={user}
          brands={brands.data}
          latestArticles={LatestArticles.data}
          articles={articles.data}
          mobileArticles={ApplesMobile.data}
          googleMobiles={GoogleMobiles.data}
        />
      </Suspense>

      <Suspense fallback={<p>Loading...</p>}>
        <Footer />
      </Suspense>
    </>
  );
}
export default Home;
