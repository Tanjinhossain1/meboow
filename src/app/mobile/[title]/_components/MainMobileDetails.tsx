import { MobileArticleType, MobileOpinionType } from "@/types/mobiles";
import { RecentArticleDataType } from "@/types/RecentArticle";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import React, { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import Tags from "./Tags";
import { formatForUrl } from "@/utils/utils";
import dynamic from "next/dynamic";
import { getAllMobiles } from "@/lib/queries/services";
import RecentMobiles from "./RecentMobiles";
import { Box, Typography } from "@mui/material";
import CommonAutoAds from "@/Component/GoogleAds/CommonAutoAds";

const PhoneFinder = dynamic(() => import("@/Component/Common/PhoneFinder"), {
  ssr: true, // or true, based on whether you want SSR support
});
const Opinion = dynamic(() => import("./Opinion"), {
  ssr: true, // or true, based on whether you want SSR support
});
const IphoneCard = dynamic(() => import("./TopSortDetails"), {
  ssr: true, // or true, based on whether you want SSR support
});
const LatestDevices = dynamic(
  () => import("@/Component/HomePage/Component/LatestDevices"),
  {
    ssr: true, // or true, based on whether you want SSR support
  }
);
const MobileReviews = dynamic(
  () => import("@/Component/HomePage/Component/MobileReviews"),
  {
    ssr: true, // or true, based on whether you want SSR support
  }
);
const BottomMobileDetails = dynamic(
  () => import("@/Component/Mobile/BottomDetails"),
  {
    ssr: true, // or true, based on whether you want SSR support
  }
);
const ExpertViewComponent = dynamic(
  () => import("@/Component/Mobile/ExpertView"),
  {
    ssr: true, // or true, based on whether you want SSR support
  }
);

export default async function MainMobileDetails({
  mobileArticles,

  latestArticles,

  isPicture,
  isOpinion,
  user,
  allMobilesOpinion,
}: {
  mobileArticles: MobileArticleType;

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
  const recentMobiles = await getAllMobiles({
    limits: "30",
    brands: mobileArticles?.brands,
  });
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
              <Typography className="text-end text-gray-400 mt-1 text-xs">
                ADVERTISEMENT
              </Typography>
              <CommonAutoAds adSlot="3314810506" />
              <MobileReviews
                isGap
                isTrending
                mobilesArticles={latestArticles}
              />

              <Typography className="text-end text-gray-400 mt-1 text-xs">
                ADVERTISEMENT
              </Typography>
              <CommonAutoAds adSlot="1583497259" />

              <LatestDevices />
              <LatestDevices name={mobileArticles?.brands} isRelated />
              <Box
                sx={{
                  position: "sticky", // Make the left side sticky
                  top: 0, // Stick to the top of the viewport
                  alignSelf: "flex-start", // Ensures alignment inside the parent container
                  overflow: "hidden",
                }}
              >
                <Typography className="text-end text-gray-400 mt-1 text-xs">
                  ADVERTISEMENT
                </Typography>
                <CommonAutoAds adSlot="9824378539" adFormat="vertical" />
              </Box>
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
                  <Typography className="text-end text-gray-400 mt-1 text-xs">
                    ADVERTISEMENT
                  </Typography>
                  <CommonAutoAds adSlot="6752063450" />

                  <ExpertViewComponent mobileArticles={mobileArticles} />
                  <Typography className="text-end text-gray-400 mt-1 text-xs">
                    ADVERTISEMENT
                  </Typography>
                  <CommonAutoAds adSlot="8237407651" />
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
                          mobileArticles?.selected_articles?.route
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
                  <RecentMobiles
                    data={recentMobiles?.data as MobileArticleType[]}
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
