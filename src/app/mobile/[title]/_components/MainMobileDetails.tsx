"use client";
import PhoneFinder from "@/Component/Common/PhoneFinder";
import LatestDevices from "@/Component/HomePage/Component/LatestDevices";
import MobileReviews from "@/Component/HomePage/Component/MobileReviews";
import BottomMobileDetails from "@/Component/Mobile/BottomDetails";
import ExpertViewComponent from "@/Component/Mobile/ExpertView";
import {
  MobileArticleType,
  MobileOpinionType,
} from "@/types/mobiles";
import { RecentArticleDataType } from "@/types/RecentArticle";
import { Button, Grid, Paper } from "@mui/material";
import React, { Fragment } from "react";
import IphoneCard from "./TopSortDetails";
import Image from "next/image";
import Opinion from "./Opinion";
import Link from "next/link";
import Tags from "./Tags";
import { formatForUrl } from "@/utils/utils";
import { SampleBrands } from "@/Component/HomePage/ContentBox";

export default function MainMobileDetails({
  mobileArticles,

  latestArticles,
  latestDevices,
  relatedMobileDevices,

  isPicture,
  isOpinion,
  user,
  allMobilesOpinion,
}: {
  mobileArticles: MobileArticleType;
  latestDevices: MobileArticleType[];
  relatedMobileDevices: MobileArticleType[];

  latestArticles: RecentArticleDataType[];

  isPicture?: boolean;
  isOpinion?: boolean;
  allMobilesOpinion?: MobileOpinionType[];
  user?: any;
}) {
  const formattedTitle = mobileArticles.title
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("-");
  return (
    <Fragment>
      {" "}
      <Grid container>
        <Paper
          elevation={0}
          className=" max-w-full md:max-w-[1000px] mx-auto p-1"
        >
          <Grid container>
            <Grid
              sx={{
                mt: 1,
                mr: {
                  xs: 0,
                  md: 1,
                },
                display: {
                  xs: "none",
                  sm: "block",
                },
              }}
              xs={12}
              sm={3.9}
            >
              <PhoneFinder />

              <MobileReviews
                isGap
                isTrending
                mobilesArticles={latestArticles}
              />

              <LatestDevices mobiles={latestDevices?.slice(0, 6)} />
              <LatestDevices
                name={mobileArticles?.brands}
                isRelated
                mobiles={relatedMobileDevices?.slice(0, 6)}
              />
            </Grid>
            <Grid xs={12} sm={8}>
              <IphoneCard
                user={user}
                isPicture={isPicture}
                isOpinion={isOpinion}
                mobileDetail={mobileArticles}
              />

              {isPicture ? (
                mobileArticles?.image?.map((image) => {
                  return (
                    <Grid
                      sx={{ mt: 5 }}
                      display={"flex"}
                      justifyContent={"center"}
                      xs={12}
                      key={image}
                    >
                      <Image
                        src={`${process.env.NEXT_PUBLIC_IMAGE_SERVER_URL}/get/${image}`}
                        alt={`Image of ${mobileArticles.title}`}
                        title={mobileArticles.title}
                        width={300}
                        height={300}
                        priority={false} // Set to true if it's above-the-fold or important
                      />
                    </Grid>
                  );
                })
              ) : isOpinion ? (
                <Opinion
                  allMobilesOpinion={allMobilesOpinion}
                  user={user}
                  mobileDetail={mobileArticles}
                />
              ) : (
                <>
                  {" "}
                  <BottomMobileDetails mobileArticles={mobileArticles} />
                  <ExpertViewComponent mobileArticles={mobileArticles} />
                  <Paper
                    elevation={1}
                    style={{
                      background: mobileArticles.top_background_color,
                    }}
                    className="w-full bg-gradient-to-tr from-blue-500 to-purple-500 flex justify-end gap-2 "
                  >
                    {mobileArticles?.selected_articles?.title ? (
                      <Link
                        href={`/review/${formatForUrl(
                          mobileArticles?.selected_articles?.title
                        )}`}
                      >
                        <Button
                          aria-label="Review"
                          sx={{ color: "white" }}
                          className="hover:bg-red-600 px-3"
                        >
                          Review
                        </Button>
                      </Link>
                    ) : null}
                    {isOpinion ? null : (
                      <Link href={`/mobile/${formattedTitle}/opinion`}>
                        <Button
                          aria-label="Opinions"
                          sx={{ color: "white" }}
                          className="hover:bg-red-600 px-3"
                        >
                          Opinions
                        </Button>
                      </Link>
                    )}
                    {isPicture || isOpinion ? (
                      <Link href={`/mobile/${formattedTitle}`}>
                        <Button
                          aria-label="Specification"
                          sx={{ color: "white" }}
                          className="hover:bg-red-600 px-3"
                        >
                          Specification
                        </Button>
                      </Link>
                    ) : null}
                    {isPicture ? null : mobileArticles?.image[0] ? (
                      <Link href={`/mobile/${formattedTitle}/pictures`}>
                        <Button
                          aria-label="Picture"
                          sx={{ color: "white" }}
                          className="hover:bg-red-600 px-3"
                        >
                          Picture
                        </Button>
                      </Link>
                    ) : null}
                  </Paper>
                  {mobileArticles?.tags &&
                  mobileArticles?.tags[0]?.name !== "" ? (
                    <Tags pageTag={mobileArticles?.tags} />
                  ) : null}
                  <Opinion
                    allMobilesOpinion={allMobilesOpinion}
                    user={user}
                    mobileDetail={mobileArticles}
                  />
                </>
              )}
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Fragment>
  );
}
