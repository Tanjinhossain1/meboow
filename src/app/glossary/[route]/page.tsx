import Navbar from "@/Component/Shared/Navbar";
import {
  fetchArticles,
  fetchGlossary,
  fetchGlossaryList,
} from "@/services/articleServices";
import { Metadata, ResolvingMetadata } from "next";
import React from "react";
import MainComponent from "./_components/MainComponent";
import Footer from "@/Component/HomePage/Footer";

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
  };
}

export default async function page({ params }: { params: { route: string } }) {
  const formatRoute = params?.route
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  const glossary = await fetchGlossary({ route: formatRoute });
  const glossaryList = await fetchGlossaryList({ isList: true });

  const MobilesArticles = await fetchArticles({
    limit: "10",
    category: "Mobiles",
  });

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
        latestArticles={MobilesArticles?.data}
        glossary={glossary.data && glossary.data[0] ? glossary.data[0] : null}
      />
      <Footer />
    </>
  );
}
