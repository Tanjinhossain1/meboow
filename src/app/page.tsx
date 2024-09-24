import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { Metadata } from "next";
import { getAllArticles } from "@/lib/queries/services";
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

  const articles = await getAllArticles({ pages: "1", limits: "4" });
  const user = session?.user;
  return (
    <Fragment>
      <link
        rel="canonical"
        href={`${process.env.NEXT_APP_CANONICAL_URL}`}
        key="canonical"
      />
      <Suspense>
        <Navbar />
      </Suspense>
      <Suspense>
        <Banner user={user} articles={articles as any} />
      </Suspense>
      <Footer />
    </Fragment>
  );
}
export default Home;
