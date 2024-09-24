"use client";
import { RecentArticleDataType } from "@/types/RecentArticle";
import { Grid, Typography } from "@mui/material";
import React, { Fragment, lazy, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Grid as SwiperGrid } from "swiper/modules";
import Image from "next/image";
import { formatDate, formatForUrl } from "@/utils/utils";

// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";

import "./MobileReviews.css";
import Link from "next/link";
import { getAllArticles } from "@/lib/queries/services";

// import required modules
export default function MobileReviews({
  mobilesArticles,
  isTrending,
  isGap,
  isText,
  isMobileReviews,
  isTrendingBanner,
}: {
  mobilesArticles?: RecentArticleDataType[];
  isTrending?: boolean;
  isGap?: boolean;
  isText?: boolean;
  isMobileReviews?: boolean;
  isTrendingBanner?: boolean;
}) {
  const [articles, setArticles] = useState<RecentArticleDataType[]>(
    mobilesArticles ? mobilesArticles : []
  );
  useEffect(() => {
    const fetchArticles = async (isMobile: "isMobile" | "isTrendingBanner") => {
      const MobileArticles =
        // isMobile === "isMobile"
        // ? await getAllArticles({
        //     limits: "20",
        //     category: "Mobiles",
        //   })
        //   :
        await getAllArticles({
          pages: "1",
          limits: "5",
          latestDevice: "latest",
        });
      setArticles(MobileArticles);
    };
    // if (isMobileReviews) {
    //   fetchArticles("isMobile");
    // } else
    if (isTrendingBanner) {
      fetchArticles("isTrendingBanner");
    }
  }, [isMobileReviews, isTrendingBanner]);
  return (
    <Fragment>
      <Typography sx={{ fontSize: 25, fontWeight: 600, mt: isGap ? 4 : 0 }}>
        {isTrending
          ? isText
            ? "Popular Reviews"
            : "Trending"
          : "Mobile Reviews"}
      </Typography>
      <Grid
        sx={{ display: "flex", mt: 1, mb: isTrending ? 0 : 2 }}
        container
        spacing={2}
      >
        <Grid
          item
          xs={isTrending ? 12 : 4}
          container
          justifyContent="center"
          alignItems="center"
        >
          <div style={{ width: "100%" }}>
            <Link
              aria-label={`Mobile & Review ${formatForUrl(articles[0]?.title)}`}
              href={
                articles[0]?.category === "Mobiles"
                  ? `/review/${formatForUrl(articles[0]?.title)}`
                  : `/article/${formatForUrl(articles[0]?.title)}`
              }
            >
              {isTrending ? (
                <Image
                  src={`${process.env.NEXT_PUBLIC_IMAGE_SERVER_URL}/get/${articles[0]?.image}`}
                  alt={`Article Image ${articles[0]?.title}`}
                  layout="responsive"
                  width={10} // Aspect ratio: width
                  height={40} // Aspect ratio: height
                  className="object-cover"
                  loading="lazy" // lazy loading for reduce loading time
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              ) : articles[0]?.image ? (
                <Image
                  src={`${process.env.NEXT_PUBLIC_IMAGE_SERVER_URL}/get/${articles[0]?.image}`}
                  alt={`Article Image ${articles[0]?.title}`}
                  layout="responsive"
                  width={10} // Aspect ratio: width
                  height={40} // Aspect ratio: height
                  className="object-cover"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              ) : null}
            </Link>
          </div>
        </Grid>
        <Grid item xs={isTrending ? 12 : 8}>
          {isTrending ? null : articles.length > 0 ? (
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
              {formatDate(articles[0]?.createdAt)}
            </Typography>
          ) : null}
          <Link
            aria-label={`Mobile & Review ${formatForUrl(articles[0]?.title)}`}
            href={
              articles[0]?.category === "Mobiles"
                ? `/review/${formatForUrl(articles[0]?.title)}`
                : `/article/${formatForUrl(articles[0]?.title)}`
            }
          >
            <p className="text-sm hover:text-red-600 font-bold text-gray-600 overflow-hidden text-ellipsis line-clamp-3 text-left">
              {articles[0]?.title}
            </p>
          </Link>
          {isTrending ? null : (
            <Link
              aria-label={`Mobile & Review ${formatForUrl(articles[0]?.title)}`}
              href={
                articles[0]?.category === "Mobiles"
                  ? `/review/${formatForUrl(articles[0]?.title)}`
                  : `/article/${formatForUrl(articles[0]?.title)}`
              }
            >
              {" "}
              <p className="text-[12px] mt-2 hover:text-red-600 text-gray-600 overflow-hidden text-ellipsis line-clamp-3 text-left">
                {articles[0]?.description}
              </p>
            </Link>
          )}
          {isTrending ? (
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
              {formatDate(articles[0]?.createdAt)}
            </Typography>
          ) : null}
        </Grid>
      </Grid>
      {isTrending ? (
        articles?.slice(1, 5)?.map((article: RecentArticleDataType) => (
          <Fragment key={article.id}>
            {/* Content Section */}
            <Grid sx={{ display: "flex", mt: 1 }} container spacing={2}>
              <Grid
                item
                xs={4}
                container
                justifyContent="center"
                alignItems="center"
              >
                <div style={{ width: "100%" }}>
                  <Link
                    aria-label={`Mobile & Review ${formatForUrl(
                      articles[0]?.title
                    )}`}
                    href={
                      article?.category === "Mobiles"
                        ? `/review/${formatForUrl(article?.title)}`
                        : `/article/${formatForUrl(article?.title)}`
                    }
                  >
                    <Image
                      src={`${process.env.NEXT_PUBLIC_IMAGE_SERVER_URL}/get/${article.image}`}
                      alt={`Article Image ${article.title}`}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      layout="responsive"
                      width={10} // Aspect ratio: width
                      height={40} // Aspect ratio: height
                      className="object-cover"
                      loading="lazy" // lazy loading for reduce loading time
                    />
                  </Link>
                </div>
              </Grid>
              <Grid item xs={8}>
                <Link
                  aria-label={`Mobile & Review ${formatForUrl(
                    articles[0]?.title
                  )}`}
                  href={
                    article?.category === "Mobiles"
                      ? `/review/${formatForUrl(article?.title)}`
                      : `/article/${formatForUrl(article?.title)}`
                  }
                >
                  <p className="text-xs hover:text-red-600 font-bold text-gray-700 overflow-hidden text-ellipsis line-clamp-3 text-left">
                    {article.title}
                  </p>
                </Link>
                <Typography sx={{ fontSize: 12, textAlign: "left", mt: 1 }}>
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
                  {formatDate(article.createdAt)}
                </Typography>
              </Grid>
            </Grid>
          </Fragment>
        ))
      ) : (
        <Swiper
          slidesPerView={2}
          grid={{
            rows: 2,
          }}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          style={{ height: "220px", paddingTop: "30px" }}
          modules={[SwiperGrid, Pagination]}
          breakpoints={{
            // when window width is >= 320px (for mobile)
            0: {
              slidesPerView: 1,
            },
            // when window width is >= 768px (for tablets and larger devices)
            768: {
              slidesPerView: 2,
            },
          }}
        >
          {articles?.length > 2
            ? articles
                .slice(1, articles.length)
                ?.map((article: RecentArticleDataType) => (
                  <Fragment key={article.id}>
                    <SwiperSlide style={{ height: "200px" }}>
                      {/* Content Section */}
                      <Grid sx={{ display: "flex" }} container spacing={2}>
                        <Grid
                          item
                          xs={4}
                          container
                          justifyContent="center"
                          alignItems="center"
                        >
                          <div style={{ width: "100%" }}>
                            <Link
                              aria-label={`Mobile & Review ${formatForUrl(
                                articles[0]?.title
                              )}`}
                              href={
                                article?.category === "Mobiles"
                                  ? `/review/${formatForUrl(article?.title)}`
                                  : `/article/${formatForUrl(article?.title)}`
                              }
                            >
                              <Image
                                src={`${process.env.NEXT_PUBLIC_IMAGE_SERVER_URL}/get/${article.image}`}
                                alt={`Article Image ${article.title}`}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                layout="responsive"
                                width={10} // Aspect ratio: width
                                height={40} // Aspect ratio: height
                                className="object-cover"
                                loading="lazy"
                              />
                            </Link>
                          </div>
                        </Grid>
                        <Grid item xs={8}>
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
                            {/* {formatDate(article.createdAt)} */}
                          </Typography>
                          <Link
                            aria-label={`Mobile & Review ${formatForUrl(
                              articles[0]?.title
                            )}`}
                            href={
                              article?.category === "Mobiles"
                                ? `/review/${formatForUrl(article?.title)}`
                                : `/article/${formatForUrl(article?.title)}`
                            }
                          >
                            {" "}
                            <p className="text-sm font-bold hover:text-red-600 text-gray-700 overflow-hidden text-ellipsis line-clamp-3 text-left">
                              {article.title}
                            </p>
                          </Link>
                        </Grid>
                      </Grid>
                    </SwiperSlide>
                  </Fragment>
                ))
            : null}
        </Swiper>
      )}
    </Fragment>
  );
}
