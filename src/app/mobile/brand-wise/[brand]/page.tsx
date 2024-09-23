import Navbar from "@/Component/Shared/Navbar";
import React, { Fragment } from "react";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import Footer from "@/Component/HomePage/Footer";
import { Metadata, ResolvingMetadata } from "next";
import BrandWiseMobile from "./_components/BrandWiseMobile";

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

export default async function page() {
  const session = await getServerSession(authConfig);
  const user = session?.user;
  return (
    <Fragment>
      <Navbar />
      <BrandWiseMobile user={user} />
      <Footer />
    </Fragment>
  );
}
