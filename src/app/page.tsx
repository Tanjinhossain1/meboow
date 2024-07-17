import Navbar from "@/Component/Shared/Navbar";
import Banner from "@/Component/HomePage/Banner";
import Footer from "@/Component/HomePage/Footer";
import {
  fetchArticles,
  fetchBrands,
  fetchCategories,
  fetchMobileArticles,
} from "@/services/articleServices";
import { Suspense } from "react";
import { auth } from "@/auth";

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
  const mobileArticles = await fetchMobileArticles({});
  const Category = await fetchCategories();
  const brands = await fetchBrands();
  
  const session = await auth()
  const user =  session?.user;
 
  
  return (
    <>
      <Suspense>
        <Navbar />
      </Suspense>
      {articles ? (
        <Suspense>
          <Banner
          user={user}
            brands={brands.data}
            latestArticles={LatestArticles.data}
            category={Category.data}
            articles={articles.data}
            total={articles.total}
            mobileArticles={mobileArticles.data}
          />
        </Suspense>
      ) : null}
      <Suspense>
        <Footer />
      </Suspense>
    </>
  );
}
export default Home;
