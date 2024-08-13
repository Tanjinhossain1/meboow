"use client";
import PhoneFinder from "@/Component/Common/PhoneFinder";
import { SampleBrands } from "@/Component/HomePage/Banner";
import LatestDevices from "@/Component/HomePage/Component/LatestDevices";
import MobileReviews from "@/Component/HomePage/Component/MobileReviews";
import AllImageDisplaying from "@/Component/Mobile/AllImageDisplay";
import BottomMobileDetails from "@/Component/Mobile/BottomDetails";
import ExpertViewComponent from "@/Component/Mobile/ExpertView";
import LatestNews from "@/Component/Mobile/LatestNews";
import { BrandTypes } from "@/types/category";
import { MobileArticleType, MobileOpinionType } from "@/types/mobiles";
import { RecentArticleDataType } from "@/types/RecentArticle";
import { Grid, Paper } from "@mui/material";
import React, { Fragment } from "react";
import IphoneCard from "./TopSortDetails";
import Image from "next/image";
import Opinion from "./Opinion";

export default function MainMobileDetails({
  mobileArticles,
  articles,
  latestArticles,
  latestDevices,
  relatedMobileDevices,
  brands,
  isPicture,
  isOpinion,
  user,
  allMobilesOpinion,
}: {
  mobileArticles: MobileArticleType;
  latestDevices: MobileArticleType[];
  relatedMobileDevices: MobileArticleType[];
  articles: RecentArticleDataType[];
  latestArticles: RecentArticleDataType[];
  brands: BrandTypes[];
  isPicture?: boolean;
  isOpinion?: boolean;
  allMobilesOpinion?: MobileOpinionType[];
  user?: any;
}) {
  return (
    <Fragment>
      {" "}
      {/* <TopMobileDetails mobileArticles={mobileArticles.data[0]} /> */}
      <Grid container> 
        <Paper elevation={0} className=" max-w-full md:max-w-[1000px] mx-auto p-1">
          <Grid container>
            <Grid
              item
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
              {/* <AllImageDisplaying mobileArticles={mobileArticles} /> */}

              <PhoneFinder brands={SampleBrands} />

              <MobileReviews
                isGap
                isTrending
                mobilesArticles={latestArticles}
              />

              <LatestDevices mobiles={latestDevices} />
              <LatestDevices
                name={mobileArticles?.brands}
                isRelated
                mobiles={relatedMobileDevices}
              />
            </Grid> 
            <Grid container item xs={12} sm={8}>
              <IphoneCard
                isPicture={isPicture}
                isOpinion={isOpinion}
                mobileDetail={mobileArticles}
              /> 
              
              {isPicture ? (
                <Grid sx={{ mt: 2 }} container>
                  {mobileArticles?.image?.map((image) => {
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
                          alt={mobileArticles.title}
                          width={300}
                          height={300}
                          //   layout="responsive"
                        />
                      </Grid>
                    );
                  })}
                </Grid>
              ) : isOpinion ? (
                <Grid container>
                  <Opinion
                    allMobilesOpinion={allMobilesOpinion}
                    user={user}
                    mobileDetail={mobileArticles}
                  />
                </Grid>
              ) : (
                <>
                  {" "}
                  <BottomMobileDetails mobileArticles={mobileArticles} />
                  <ExpertViewComponent mobileArticles={mobileArticles} />
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
      {/* <ExpertViewComponent mobileArticles={mobileArticles} />
      <LatestNews articles={articles} />
      <AllImageDisplaying mobileArticles={mobileArticles} /> */}
    </Fragment>
  );
}
