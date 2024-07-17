import React, { Fragment, Suspense } from "react";
import Navbar from "@/Component/Shared/Navbar";
import Footer from "@/Component/HomePage/Footer";
import { fetchMobileArticleDetails } from "@/services/articleServices";
import { Metadata, ResolvingMetadata } from "next";
import dynamic from "next/dynamic";
import MobileDetailsPageLoadingSkeleton, {
  BottomBox,
  TopBox,
} from "@/Component/LoadingSkeleton/MobileDetailsPageLoadingSkeleton";
import NavbarLoadingSkeleton from "@/Component/Shared/NavbarLoadingSkeleton";

// Dynamic imports with SSR disabled
const TopMobileDetails = dynamic(() => import("./_components/TopDetail"), {
  ssr: false,
});
const BottomMobileDetails = dynamic(
  () => import("./_components/BottomDetails"),
  {
    ssr: false,
  }
);

// Function to generate metadata
export async function generateMetadata(
  { params }: { params: { id: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  try {
    const mobileArticles = await fetchMobileArticleDetails({ id: params?.id });
    const title = mobileArticles?.data[0]?.title;
    const desc = `Here will show this ${mobileArticles?.data[0]?.title} mobile details and specifications this mobile is this ${mobileArticles?.data[0]?.brands} brand. you can see all of details of this phone.`;
    const previousImages = (await parent).openGraph?.images || [];
    const image = mobileArticles?.data[0]?.display_image;

    return {
      title: title || "Default Title", // Provide a default title if not found
      description: desc,
      openGraph: {
        images: [image, ...previousImages],
      },
    };
  } catch (error) {
    console.error("Error fetching metadata:", error);
    // Return a default metadata object or handle error case as needed
    return {
      title: "Default Title",
      description: "Default Description",
      openGraph: {
        images: [],
      },
    };
  }
}

// Component to render product details
const ProductDetails = ({ params }: { params: { id: string } }) => {
  const [mobileArticles, setMobileArticles] = React.useState<any>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchArticleDetails = async () => {
      try {
        const result = await fetchMobileArticleDetails({ id: params?.id });
        setMobileArticles(result.data[0]);
      } catch (error) {
        console.error("Error fetching article details:", error);
        setError("Failed to fetch article details.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticleDetails();
  }, [params?.id]);

  if (loading) {
    return <MobileDetailsPageLoadingSkeleton />;
  }

  if (error) {
    return <p>{error}</p>; // Display error message if fetch fails
  }

  return (
    <Fragment>
      <Suspense fallback={<NavbarLoadingSkeleton />}>
        <Navbar />
      </Suspense>
      {mobileArticles && (
        <Fragment>
          <Suspense fallback={<TopBox />}>
            <TopMobileDetails mobileArticles={mobileArticles} />
          </Suspense>
          <Suspense fallback={<BottomBox />}>
            <BottomMobileDetails mobileArticles={mobileArticles} />
          </Suspense>
        </Fragment>
      )}
      <Suspense fallback={<p></p>}>
        <Footer />
      </Suspense>
    </Fragment>
  );
};

export default ProductDetails;
