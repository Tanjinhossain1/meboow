import Navbar from "@/Component/Shared/Navbar";
import Banner from "@/Component/HomePage/Banner";
import Footer from "@/Component/HomePage/Footer";
import {
  fetchArticles,
  fetchBrands,
  fetchCategories,
  fetchMobileArticles,
  fetchMobileTags,
} from "@/services/articleServices";
import { Suspense } from "react";
import HomePageLoadingSkeleton from "@/Component/LoadingSkeleton/HomePageLoadingSkeleton";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";

interface HomePropsType {
  searchParams: {
    page: string;
    limit: string;
  };
}

async function Home({ searchParams }: HomePropsType) {
  const { page, limit } = searchParams;
  const articles = await fetchArticles({ page, limit });
  const LatestArticles = await fetchArticles({
    page,
    limit,
    latestDevice: "latest",
  });
  const MobilesArticles = await fetchArticles({
    page,
    limit,
    category: "Mobiles",
  });
  const newsAndReviews = await fetchArticles({ showInNewsWithAll: "show" });
  const ApplesMobile = await fetchMobileArticles({ limit: "20",brands:"Apple" });
  const GoogleMobiles = await fetchMobileArticles({ limit: "20",brands:"Google" });
  const DailyInterestMobiles = await fetchMobileArticles({
    limit: "10",
    is_daily_interest: "YES",
  });
  const ByFansMobiles = await fetchMobileArticles({
    limit: "10",
    is_by_fans: "YES",
  });
  const LatestDeviceMobiles = await fetchMobileArticles({
    limit: "10",
    is_latest_device: "YES",
  });
  const Category = await fetchCategories();
  const brands = await fetchBrands();
  // const AllMobilesTags = await fetchMobileTags({});

  const session = await getServerSession(authConfig);
  console.log("this is the user  in app/page", session);
  const user = session?.user;
  return (
    <>
      <Suspense>
        <Navbar />
      </Suspense>
      {articles.data && articles.data[0] ? (
        <Suspense>
          <Banner
            // tags={AllMobilesTags.data}
            dailyInterestMobiles={DailyInterestMobiles.data}
            byFansMobiles={ByFansMobiles.data}
            latestDeviceMobiles={LatestDeviceMobiles.data}
            newsAndReviews={newsAndReviews.data}
            mobilesArticles={MobilesArticles.data}
            user={user}
            brands={brands.data}
            latestArticles={LatestArticles.data}
            category={Category.data}
            articles={articles.data}
            total={articles.total}
            mobileArticles={ApplesMobile.data}
            googleMobiles={GoogleMobiles.data}
          />
        </Suspense>
      ) : (
        <HomePageLoadingSkeleton isOffNavbar />
      )}
      <Suspense>
        <Footer />
      </Suspense>
    </>
  );
}
export default Home;
