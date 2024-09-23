import Navbar from "@/Component/Shared/Navbar";
import React, { Fragment, Suspense } from "react";
import Footer from "@/Component/HomePage/Footer";
import { Metadata, ResolvingMetadata } from "next";
import { getAllMobiles } from "@/lib/queries/services";
import dynamic from "next/dynamic";
import LoadingComponent from "./_components/LoadingCompo";

const BrandWiseMobile = dynamic(() => import("./_components/BrandWiseMobile"), {
  suspense: true,
  ssr: true,
});

export async function generateMetadata(
  { params }: { params: { brand: string } },
  parent: ResolvingMetadata
): Promise<Metadata | undefined> {
  const title = `${params?.brand} - List Of Mobiles`;
  const desc = `Here will show this   ${params?.brand} brand wise List Of Mobiles you can see all of mobiles with this brand.`;
  const previousImages = (await parent).openGraph?.images || [];
  return {
    title: title,
    description: desc,
    keywords: ["Article", "Safari List", "article", "have", "mobile", title],
    openGraph: {
      title: title,
      description: desc,
      url: `${process.env.NEXT_APP_CANONICAL_URL}/mobile/brand-wise/${params?.brand}`,
      siteName: "Safari List",
      type: "website",
      images: [...previousImages],
    },
    alternates: {
      canonical: `${process.env.NEXT_APP_CANONICAL_URL}/mobile/brand-wise/${params?.brand}`,
    },
  };
}

export default async function page({ params }: { params: { brand: string } }) {
  // Format brand for display
  const formattedBrand = params?.brand
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  const [mobiles] = await Promise.all([
    getAllMobiles({ limits: "50", brands: params?.brand }),
  ]);
  return (
    <Fragment>
      <Navbar />
      <React.Suspense fallback={<LoadingComponent brand={formattedBrand} />}>
        <BrandWiseMobile defaultMobiles={mobiles as any} />
      </React.Suspense>
      <Footer />
    </Fragment>
  );
}
