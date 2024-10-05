import { RecentArticleDataType } from "@/types/RecentArticle";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import React, { Fragment } from "react";
import Image from "next/image";
import { formatDate, formatForUrl } from "@/utils/utils";
import Link from "next/link";

import "./MobileReviews.css";
import dynamic from "next/dynamic";

const MobileReviewSwiper = React.memo(
  dynamic(() => import("./MobileReviewSwiper"), {
    ssr: true,
  })
);
// import required modules
export default function MobileReviews({
  mobilesArticles,
  isTrending,
  isGap,
  isText,
}: {
  mobilesArticles: RecentArticleDataType[];
  isTrending?: boolean;
  isGap?: boolean;
  isText?: boolean;
}) {
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
              aria-label={`Mobile & Review ${formatForUrl(
                mobilesArticles[0]?.title
              )}`}
              href={
                mobilesArticles[0]?.category === "Mobiles"
                  ? `/review/${formatForUrl(mobilesArticles[0]?.route)}`
                  : `/article/${formatForUrl(mobilesArticles[0]?.route)}`
              }
            >
              {isTrending ? (
                <Image
                  src={`${process.env.NEXT_PUBLIC_IMAGE_SERVER_URL}/get/${mobilesArticles[0]?.image}`}
                  alt={`Article Image ${mobilesArticles[0]?.title}`}
                  layout="responsive"
                  width={10} // Aspect ratio: width
                  height={40} // Aspect ratio: height
                  className="object-cover"
                  loading="lazy" // lazy loading for reduce loading time
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              ) : mobilesArticles[0]?.image ? (
                <Image
                  src={`${process.env.NEXT_PUBLIC_IMAGE_SERVER_URL}/get/${mobilesArticles[0]?.image}`}
                  alt={`Article Image ${mobilesArticles[0]?.title}`}
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
          {isTrending ? null : mobilesArticles.length > 0 ? (
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
              {formatDate(mobilesArticles[0]?.createdAt)}
            </Typography>
          ) : null}
          <Link
            aria-label={`Mobile & Review ${formatForUrl(
              mobilesArticles[0]?.title
            )}`}
            href={
              mobilesArticles[0]?.category === "Mobiles"
                ? `/review/${formatForUrl(mobilesArticles[0]?.route)}`
                : `/article/${formatForUrl(mobilesArticles[0]?.route)}`
            }
          >
            <p className="text-sm hover:text-red-600 font-bold text-gray-600 overflow-hidden text-ellipsis line-clamp-3 text-left">
              {mobilesArticles[0]?.title}
            </p>
          </Link>
          {isTrending ? null : (
            <Link
              aria-label={`Mobile & Review ${formatForUrl(
                mobilesArticles[0]?.title
              )}`}
              href={
                mobilesArticles[0]?.category === "Mobiles"
                  ? `/review/${formatForUrl(mobilesArticles[0]?.route)}`
                  : `/article/${formatForUrl(mobilesArticles[0]?.route)}`
              }
            >
              {" "}
              <p className="text-[12px] mt-2 hover:text-red-600 text-gray-600 overflow-hidden text-ellipsis line-clamp-3 text-left">
                {mobilesArticles[0]?.description}
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
              {formatDate(mobilesArticles[0]?.createdAt)}
            </Typography>
          ) : null}
        </Grid>
      </Grid>
      {isTrending ? (
        mobilesArticles?.slice(1, 5)?.map((article: RecentArticleDataType) => (
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
                      loading="lazy" // lazy loading for reduce loading time
                    />
                  </Link>
                </div>
              </Grid>
              <Grid item xs={8}>
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
        <MobileReviewSwiper mobilesArticles={mobilesArticles} />
      )}
    </Fragment>
  );
}
