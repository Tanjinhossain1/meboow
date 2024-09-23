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
import { Fragment, Suspense } from "react";

const Navbar = dynamic(() => import("@/Component/Shared/Navbar"), {
  suspense: true,
  ssr: false, // or true, based on whether you want SSR support
});
const Banner = dynamic(() => import("@/Component/HomePage/Banner"), {
  ssr: true, // or true, based on whether you want SSR support
  suspense: true,
});
const Footer = dynamic(() => import("@/Component/HomePage/Footer"), {
  suspense: true,
  ssr: false,
});

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
    // articles,
    // LatestArticles,
    // MobilesArticles,
    // newsAndReviews,
    ApplesMobile,
    GoogleMobiles,
    SamsungMobiles,
    LastUpdatedMobiles,
    // DailyInterestMobiles,
    // ByFansMobiles,
    // LatestDeviceMobiles,
    // brands,
  ] = await Promise.all([
    // getAllArticles({ pages: page, limits: limit }),
    // getAllArticles({ pages: page, limits: limit, latestDevice: "latest" }),
    // getAllArticles({ limits: "20", category: "Mobiles" }),
    // getAllArticlesWithShowInNews({ limits: "30" }),
    // mobiles
    getAllMobiles({ limits: "30", brands: "Apple" }),
    getAllMobiles({ limits: "30", brands: "Google" }),
    getAllMobiles({ limits: "30", brands: "Samsung" }),
    getAllMobiles({ limits: "30" }),
    // getAllMobiles({ limits: "10", is_daily_interest: "YES" }),
    // getAllMobiles({ limits: "10", is_by_fans: "YES" }),
    // getAllMobiles({ limits: "12", is_latest_device: "YES" }),
    // brands
    // getAllBrands(),
  ]);
  const articles = await getAllArticles({ pages: page, limits: limit })
  const LatestArticles = await getAllArticles({ pages: page, limits: limit, latestDevice: "latest" })
  const MobilesArticles = await getAllArticles({ limits: "20", category: "Mobiles" })
  const newsAndReviews = await getAllArticlesWithShowInNews({ limits: "30" })
  // const ApplesMobile = await getAllMobiles({ limits: "30", brands: "Apple" })
  // const GoogleMobiles = await getAllMobiles({ limits: "30", brands: "Google" })
  // const SamsungMobiles = await getAllMobiles({ limits: "30", brands: "Samsung" })
  // const LastUpdatedMobiles = await getAllMobiles({ limits: "30" })
  const DailyInterestMobiles = await getAllMobiles({ limits: "10", is_daily_interest: "YES" })
  const ByFansMobiles = await getAllMobiles({ limits: "10", is_by_fans: "YES" })
  const LatestDeviceMobiles = await getAllMobiles({ limits: "12", is_latest_device: "YES" })
  const brands = await getAllBrands()

  const user = session?.user;
  return (
    <Fragment>
      <link
        rel="canonical"
        href={`${process.env.NEXT_APP_CANONICAL_URL}`}
        key="canonical"
      />
      <Suspense fallback={<p>Loading....</p>}>
      <Navbar />
      </Suspense>
      <Suspense fallback={<p>Loading....</p>}>
      <Banner
        LastUpdatedMobiles={LastUpdatedMobiles?.data as any}
        SamsungMobiles={SamsungMobiles?.data as any}
        dailyInterestMobiles={DailyInterestMobiles?.data as any}
        byFansMobiles={ByFansMobiles?.data as any}
        latestDeviceMobiles={LatestDeviceMobiles?.data as any}
        newsAndReviews={newsAndReviews as any}
        mobilesArticles={MobilesArticles as any}
        user={user}
        brands={brands}
        latestArticles={LatestArticles as any}
        articles={articles as any}
        AppleMobiles={ApplesMobile?.data as any}
        googleMobiles={GoogleMobiles?.data as any}
        />
        </Suspense>
      <Footer />
    </Fragment>
  );
}
export default Home;
