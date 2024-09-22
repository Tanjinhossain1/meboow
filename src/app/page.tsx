import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { Metadata } from "next";
import {
  getAllArticles,
  getAllArticlesWithShowInNews,
  getAllBrands,
  getAllMobiles,
} from "@/lib/queries/services";
import dynamic from "next/dynamic";
import { Fragment } from "react";

// const Navbar = lazy(() => import("@/Component/Shared/Navbar"));
// const Banner = lazy(() => import("@/Component/HomePage/Banner"));
const Navbar = dynamic(() => import("@/Component/Shared/Navbar"), {
  suspense: true,
  ssr: false, // or true, based on whether you want SSR support
});
const Banner = dynamic(() => import("@/Component/HomePage/Banner"), {
  suspense: true,
  ssr: false, // or true, based on whether you want SSR support
});
const Footer = dynamic(() => import("@/Component/HomePage/Footer"), {
  suspense: true,
  ssr: false,
});
// const Footer = lazy(() => import("@/Component/HomePage/Footer"));

interface HomePropsType {
  searchParams: {
    page: string;
    limit: string;
  };
}
export const metadata: Metadata = {
  title: "SafariList",
  description:
    "SafariList - Tech News, Reviews, Prices | Latest Mobiles Phones in-depth for all categories in technology, Mobiles Phones",
  keywords: "tech news, mobile reviews, prices, technology advice, SafariList",
  openGraph: {
    title: "SafariList",
    description:
      "SafariList - Tech News, Reviews, Prices | Latest Mobiles Phones in-depth for all categories in technology, Mobiles Phones",
    url: "https://www.safarilist.com/",
    type: "website",
    images: [
      {
        url: "https://www.safarilist.com/favicon.ico", // replace with actual image
        width: 1200,
        height: 630,
        alt: "SafariList Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:"SafariList",
    description:
      "SafariList - Tech News, Reviews, Prices | Latest Mobiles Phones in-depth for all categories in technology, Mobiles Phones",
    images: [
      {
        url: "https://www.safarilist.com/favicon.ico", // replace with actual image
        alt: "SafariList Logo",
      },
    ],
  },
};

async function Home({ searchParams }: HomePropsType) {
  const { page, limit } = searchParams;
  const session = await getServerSession(authConfig);

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
    getAllArticles({ pages: page, limits: limit }),
    getAllArticles({ pages: page, limits: limit, latestDevice: "latest" }),
    getAllArticles({ limits: "20", category: "Mobiles" }),
    getAllArticlesWithShowInNews({ limits: "30" }),
    // mobiles
    getAllMobiles({ limits: "30", brands: "Apple" }),
    getAllMobiles({ limits: "30", brands: "Google" }),
    getAllMobiles({ limits: "30", brands: "Samsung" }),
    getAllMobiles({ limits: "30" }),
    getAllMobiles({ limits: "10", is_daily_interest: "YES" }),
    getAllMobiles({ limits: "10", is_by_fans: "YES" }),
    getAllMobiles({ limits: "12", is_latest_device: "YES" }),
    // brands
    getAllBrands(),
  ]);

  const user = session?.user;
  return (
    <Fragment>
      <link
        rel="canonical"
        href={`${process.env.NEXT_APP_CANONICAL_URL}`}
        key="canonical"
      />
      <Navbar />
      {/* <Suspense fallback={<HomePageLoadingSkeleton isOffNavbar />}> */}
      <Banner
        LastUpdatedMobiles={LastUpdatedMobiles as any}
        SamsungMobiles={SamsungMobiles as any}
        dailyInterestMobiles={DailyInterestMobiles as any}
        byFansMobiles={ByFansMobiles as any}
        latestDeviceMobiles={LatestDeviceMobiles as any}
        newsAndReviews={newsAndReviews as any}
        mobilesArticles={MobilesArticles as any}
        user={user}
        brands={brands}
        latestArticles={LatestArticles as any}
        articles={articles as any}
        AppleMobiles={ApplesMobile as any}
        googleMobiles={GoogleMobiles as any}
      />
      <Footer />
      {/* </Suspense> */}

      {/* <Suspense fallback={<p>loading...</p>}>
      </Suspense> */}
    </Fragment>
  );
}
export default Home;
