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

const NavbarHelper = dynamic(() => import("@/Component/Shared/NavbarHelperComponent"), {
  ssr: true, // or true, based on whether you want SSR support
});
const Banner = dynamic(() => import("@/Component/HomePage/Banner"), {
  ssr: true, // or true, based on whether you want SSR support
});
const Footer = dynamic(() => import("@/Component/HomePage/Footer"), {
  ssr: true,
});

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
    title: "SafariList",
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

async function Home() {
  const session = await getServerSession(authConfig);

  const [
    articles,
    mobileReviews,
    apple,
    samsungData,
    google,
    lastUpdate,
    serverBrand,
    MobileArticles,
    MobileNewsAndReviews,
  ] = await Promise.all([
    getAllArticles({ pages: "1", limits: "4" }),

    getAllArticles({
      limits: "20",
      category: "Mobiles",
    }),

    getAllMobiles({ limits: "30", brands: "Apple" }),

    getAllMobiles({ limits: "30", brands: "Samsung" }),

    getAllMobiles({ limits: "30", brands: "Google" }),

    getAllMobiles({ limits: "30" }),

    getAllBrands({ pages: "1", limits: "10" }),

    getAllArticles({
      pages: "1",
      limits: "5",
      latestDevice: "latest",
    }),

    getAllArticlesWithShowInNews({ limits: "30" }),
  ]);
  const user = session?.user;

  return (
    <Fragment>
      <link
        rel="canonical"
        href={`${process.env.NEXT_APP_CANONICAL_URL}`}
        key="canonical"
      />
        <NavbarHelper isLoginUser={user} />
        <Banner
          MobileNewsAndReviews={MobileNewsAndReviews}
          MobileArticles={MobileArticles}
          mobileReviews={mobileReviews}
          apple={apple?.data as any}
          samsungData={samsungData?.data as any}
          google={google?.data as any}
          lastUpdate={lastUpdate?.data as any}
          serverBrand={serverBrand}
          user={user}
          articles={articles as any}
        />
      <Footer />
    </Fragment>
  );
}
export default Home;
