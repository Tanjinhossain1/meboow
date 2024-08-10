import { RecentArticleDataType } from "@/types/RecentArticle";
import { Grid, Typography } from "@mui/material";
import React, { Fragment } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Grid as SwiperGrid } from "swiper/modules";
import Image from "next/image";
import { formatDate } from "@/utils/utils";

// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";

import "./MobileReviews.css";
import Link from "next/link";

// import required modules
export default function MobileReviews({
  mobilesArticles,
  isTrending,
}: {
  mobilesArticles: RecentArticleDataType[];
  isTrending?: boolean;
}) {
  return (
    <Fragment>
      <Typography sx={{ fontSize: 25, fontWeight: 600 }}>
        {isTrending ? "Trending" : "Mobile Reviews"}
      </Typography>
      <Grid
        sx={{ display: "flex", mt: 1, mb: isTrending ? 0 : 3 }}
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
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGE_SERVER_URL}/get/${mobilesArticles[0]?.image}`}
              alt="Article Image"
              layout="responsive"
              width={10} // Aspect ratio: width
              height={40} // Aspect ratio: height
              className="object-cover"
            />
          </div>
        </Grid>
        <Grid item xs={isTrending ? 12 : 8}>
          {isTrending ? null : (
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
              {formatDate(mobilesArticles[0]?.updateAt)}
            </Typography>
          )}
          <p className="text-sm font-bold text-gray-600 overflow-hidden text-ellipsis line-clamp-3 text-left">
            {mobilesArticles[0]?.title}
          </p>
          {isTrending ? null : (
            <p className="text-[12px] mt-2 text-gray-600 overflow-hidden text-ellipsis line-clamp-3 text-left">
              {mobilesArticles[0]?.description}
            </p>
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
              {formatDate(mobilesArticles[0]?.updateAt)}
            </Typography>
          ) : null}
        </Grid>
      </Grid>
      {isTrending ? (
        mobilesArticles.slice(1, 5).map((article: RecentArticleDataType) => (
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
                  <Image
                    src={`${process.env.NEXT_PUBLIC_IMAGE_SERVER_URL}/get/${article.image}`}
                    alt="Article Image"
                    layout="responsive"
                    width={10} // Aspect ratio: width
                    height={40} // Aspect ratio: height
                    className="object-cover"
                  />
                </div>
              </Grid>
              <Grid item xs={8}>
                <p className="text-xs font-bold text-gray-700 overflow-hidden text-ellipsis line-clamp-3 text-left">
                  {article.title}
                </p>
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
                  {formatDate(article.updateAt)}
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
        >
          {mobilesArticles
            .slice(1, mobilesArticles.length)
            .map((article: RecentArticleDataType) => (
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
                        <Image
                          src={`${process.env.NEXT_PUBLIC_IMAGE_SERVER_URL}/get/${article.image}`}
                          alt="Article Image"
                          layout="responsive"
                          width={10} // Aspect ratio: width
                          height={40} // Aspect ratio: height
                          className="object-cover"
                        />
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
                        {formatDate(article.updateAt)}
                      </Typography>
                      <Link
                        href={`/details/${article.id}/${
                          article.category
                        }?${new URLSearchParams({
                          page: `2`,
                          limit: "3",
                        })}`}
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
            ))}
        </Swiper>
      )}
      {/* <Grid container>
        {mobilesArticles.map((article: RecentArticleDataType) => {
          return (
            <Fragment key={article.id}>
              <Grid></Grid>
            </Fragment>
          );
        })}
        <Grid></Grid>
      </Grid> */}
    </Fragment>
  );
}