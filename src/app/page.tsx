import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "@/Component/Shared/Navbar";
import Banner from "@/Component/HomePage/Banner";
import Footer from "@/Component/HomePage/Footer"; 
import { fetchArticles } from "@/services/articleServices";
import { SAMPLE_DATA } from "@/Component/HomePage/RecentArticleDataType";
import { details } from "./details/[id]/[category]/[title]/SAMPLE_DATA";
 
async function Home() {
  let page = 1;
  let limit = 3;
  const articles = details // await fetchArticles({ page, limit }); 
   
  return (
    <>
      <Navbar />
      {articles ? (
        <Banner articles={articles} page={page} limit={limit} />
      ) : null}
      <Footer />
    </>
  );
}
export default Home;
