"use client";
import { RecentArticleDataType } from "@/types/RecentArticle";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import React, { Fragment } from "react";
import { SwiperSlide } from "swiper/react";
import { Pagination, Grid as SwiperGrid } from "swiper/modules";
import Image from "next/image";
import { formatForUrl } from "@/utils/utils";
import Link from "next/link";

import "./MobileReviews.css";
import dynamic from "next/dynamic";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Dynamically import Swiper components
const Swiper = dynamic(() => import('swiper/react').then(mod => mod.Swiper), { ssr: true });

export default function MobileReviewSwiper({
  mobilesArticles,
}: {
  mobilesArticles: RecentArticleDataType[];
}) { 
  return (
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
        {mobilesArticles
              .slice(1, mobilesArticles.length)
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
                              mobilesArticles[0]?.title
                            )}`}
                            href={
                              article?.category === "Mobiles"
                                ? `/review/${formatForUrl(article?.route)}`
                                : `/article/${formatForUrl(article?.route)}`
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
                            mobilesArticles[0]?.title
                          )}`}
                          href={
                            article?.category === "Mobiles"
                              ? `/review/${formatForUrl(article?.route)}`
                              : `/article/${formatForUrl(article?.route)}`
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
          }
      </Swiper>
  );
}
