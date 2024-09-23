"use client";
import { RecentArticleDataType } from "@/types/RecentArticle";
import { Grid, Typography } from "@mui/material";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid as SwiperGrid, Scrollbar } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/scrollbar";

import "./MobileReviews.css";
import Image from "next/image";
import { formatDate, formatForUrl } from "@/utils/utils";
import Link from "next/link";
import { getAllArticlesWithShowInNews } from "@/lib/queries/services";

// import required modules
export default function NewsAndReviews() {
// export default function NewsAndReviews({
//   mobilesArticles,
// }: {
//   mobilesArticles: RecentArticleDataType[];
// }) {
  
const [mobilesArticles,setMobileArticles] = useState<RecentArticleDataType[]>([])
  const [progress, setProgress] = useState(
    mobilesArticles.length >= 6 ? 0 : 100
  );
  const swiperRef = useRef<any>(null);
  useEffect(()=>{
    const fetchData =async ()=>{
      const news = await getAllArticlesWithShowInNews({ limits: "30" })
      setMobileArticles(news)
    }
    fetchData()
  },[])

  useEffect(() => { 
    const updateProgress = () => {
      if (swiperRef.current) {
        const swiper = swiperRef.current.swiper;
        const totalSlides = swiper.slides.length;
        const visibleSlides = mobilesArticles.length / 1.5;
        const currentIndex = swiper.activeIndex;
        const progressRatio = (currentIndex + visibleSlides) / totalSlides;
        setProgress(progressRatio);
      }
    };
    if (swiperRef.current) {
      const swiper = swiperRef.current.swiper;
      swiper.on("slideChange", updateProgress);
      updateProgress(); // Initial update

      return () => {
        swiper.off("slideChange", updateProgress);
      };
    }
    
  }, [mobilesArticles]);
  
  console.log('newsAndReviews ', mobilesArticles)
  return (
    <Fragment>
      <Typography sx={{ fontSize: 25, fontWeight: 600 }}>
        News And Reviews
      </Typography>
      <div className="h-1 bg-gray-200 rounded-full overflow-hidden mb-4">
        <div
          className="bg-blue-600 h-full transition-all duration-300"
          style={{ width: `${progress * 100}%` }}
        ></div>
      </div>
      <Swiper
        ref={swiperRef}
        slidesPerView={3}
        breakpoints={{
          320: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
        grid={{
          rows: 2,
        }}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        style={{ height: "800px" }}
        modules={[SwiperGrid, Scrollbar]}
      >
        {mobilesArticles
          .slice(0, mobilesArticles.length)
          ?.map((article: RecentArticleDataType) => (
            <Fragment key={article.id}>
              <SwiperSlide>
                {/* Content Section */}
                <Grid sx={{ display: "flex" }} container spacing={2}>
                  <Grid
                    item
                    xs={12}
                    container
                    justifyContent="center"
                    alignItems="center"
                  >
                    <div style={{ width: "100%" }}>
                      <Link
                      aria-label={`Mobile & Review ${formatForUrl(article?.title)}`}
                        href={
                          article?.category === "Mobiles"
                            ? `/review/${formatForUrl(article?.title)}`
                            : `/article/${formatForUrl(article?.title)}`
                        }
                      >
                        <Image
                          src={`${process.env.NEXT_PUBLIC_IMAGE_SERVER_URL}/get/${article.image}`}
                          alt={`Article Image ${article.title}`}
                          layout="responsive"
                          width={10} // Aspect ratio: width
                          height={40} // Aspect ratio: height
                          className="object-cover"
                          loading="lazy" // lazy loading for reduce loading time
                        />
                      </Link>
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography sx={{ fontSize: 12, textAlign: "left" }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 text-gray-500 inline-block mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 7V3m8 4V3m-9 4h10M4 12h16m-7 4h8m-8 4h8m-8-8h8m-8-4h8"
                        />
                      </svg>
                      {formatDate(article.updateAt)}
                    </Typography>
                    <Link
                    aria-label={`Mobile & Review ${formatForUrl(article?.title)}`}
                      href={
                        article?.category === "Mobiles"
                          ? `/review/${formatForUrl(article?.title)}`
                          : `/article/${formatForUrl(article?.title)}`
                      }
                    >
                      <p className="text-sm font-bold hover:text-red-600 text-gray-700 overflow-hidden text-ellipsis line-clamp-3 text-left">
                        {article.title}
                      </p>
                    </Link>
                    <Link
                    aria-label={`Mobile & Review ${formatForUrl(article?.title)}`}
                      href={
                        article?.category === "Mobiles"
                          ? `/review/${formatForUrl(article?.title)}`
                          : `/article/${formatForUrl(article?.title)}`
                      }
                    >
                      <p className="text-[12px] hover:text-red-600 mt-2 text-gray-600 overflow-hidden text-ellipsis line-clamp-3 text-left">
                        {article?.description}
                      </p>
                    </Link>
                  </Grid>
                </Grid>
              </SwiperSlide>
            </Fragment>
          ))}
      </Swiper>
    </Fragment>
  );
}
