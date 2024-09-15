import { getAllArticles } from "@/lib/queries/services";
import {
  fetchGlossary,
  fetchGlossaryList,
} from "@/services/articleServices";
import { Metadata, ResolvingMetadata } from "next";
import dynamic from "next/dynamic";
import React, { lazy } from "react";

const Navbar = lazy(() => import("@/Component/Shared/Navbar"));
const MainComponent = lazy(() => import("./_components/MainComponent"));
const Footer = dynamic(() => import("@/Component/HomePage/Footer"), {
  suspense: true,
  ssr: false,
});

export async function generateMetadata(
  { params }: { params: { route: string } },
  parent: ResolvingMetadata
): Promise<Metadata | undefined> {
  const formatCountry = params?.route
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const title = `${formatCountry} - Definition`;
  const desc = `Here will show this ${formatCountry} Glossary Details. ${title} show of details in this properly.`;
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: title,
    description: desc,
    keywords: ["Glossary", "Safari List", "details", formatCountry, title],
    openGraph: {
      title: title,
      description: desc,
      url: `${process.env.NEXT_APP_CANONICAL_URL}/glossary/${params?.route}`,
      siteName: "Safari List",
      type: "website",
      images: [...previousImages],
    },

    alternates: {
      canonical: `${process.env.NEXT_APP_CANONICAL_URL}/glossary/${params?.route}`,
    },
  };
}

export default async function page({ params }: { params: { route: string } }) {
  const formatRoute = params?.route
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const [MobilesArticles, glossaryList, glossary] = await Promise.all([
    getAllArticles({
      limits: "10",
      category: "Mobiles",
    }),
    fetchGlossaryList({ isList: true }),
    fetchGlossary({ route: formatRoute }),
  ]);
  return (
    <>
      <link
        rel="canonical"
        href={`${process.env.NEXT_APP_CANONICAL_URL}/glossary/${params?.route}`}
        key="canonical"
      />
      <Navbar />
      <MainComponent
        glossaryList={glossaryList.data}
        latestArticles={MobilesArticles as any}
        glossary={glossary.data && glossary.data[0] ? glossary.data[0] : null}
      />
      <Footer />
    </>
  );
}
