import { RecentArticleDataType } from "@/types/RecentArticle";
import { Grid, Typography } from "@mui/material";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid as SwiperGrid, Pagination, Scrollbar } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
// import "swiper/css/pagination";
import "swiper/css/scrollbar";

import "./MobileReviews.css";
import Image from "next/image";
import { formatDate } from "@/utils/utils";
import Link from "next/link";

// import required modules
export default function NewsAndReviews({
  mobilesArticles,
  isTrending,
}: {
  mobilesArticles: RecentArticleDataType[];
  isTrending?: boolean;
}) {
  console.log(
    "mobilesArticlesmobilesArticlesmobilesArticles ",
    mobilesArticles
  );

  return (
    <Fragment>
      <Typography sx={{ fontSize: 25, fontWeight: 600 }}>
        News And Reviews
      </Typography>
      <Swiper
        slidesPerView={3}
        grid={{
          rows: 2,
        }}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        style={{height:"800px"}}
        modules={[SwiperGrid, Scrollbar]}
        //  pagination={{ clickable: true, el: '.swiper-pagination', type: 'progressbar' }}
      >
        {mobilesArticles
          .slice(1, mobilesArticles.length)
          .map((article: RecentArticleDataType) => (
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
                      <Link   href={`/details/${article?.id}/${
                      article.category
                    }?${new URLSearchParams({
                      page: `2`,
                      limit: "3",
                    })}`}>

                      <Image
                        src={`${process.env.NEXT_PUBLIC_IMAGE_SERVER_URL}/get/${article.image}`}
                        alt="Article Image"
                        layout="responsive"
                        width={10} // Aspect ratio: width
                        height={40} // Aspect ratio: height
                        className="object-cover"
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
                    <Link   href={`/details/${article?.id}/${
                      article.category
                    }?${new URLSearchParams({
                      page: `2`,
                      limit: "3",
                    })}`}>

                    <p className="text-sm font-bold hover:text-red-600 text-gray-700 overflow-hidden text-ellipsis line-clamp-3 text-left">
                      {article.title}
                    </p>
                    </Link>
                    <Link   href={`/details/${article?.id}/${
                      article.category
                    }?${new URLSearchParams({
                      page: `2`,
                      limit: "3",
                    })}`}>

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
