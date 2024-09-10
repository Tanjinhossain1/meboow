"use client";
import React from "react";
import { Paper, Typography } from "@mui/material";
import { MobileArticleType } from "@/types/mobiles";
import CommonMobileSlider from "./CommonMobileSlider";

export default function PopularMobiles({
  articles,
  googleMobiles,
  SamsungMobiles,
  LastUpdatedMobiles,
  user,
}: {
  articles: MobileArticleType[];
  googleMobiles: MobileArticleType[];
  SamsungMobiles: MobileArticleType[];
  LastUpdatedMobiles: MobileArticleType[];
  user: any;
}) {
  return (
    <Paper sx={{ width: "100%" }} elevation={0}>
      <Typography sx={{ fontSize: 25, fontWeight: 600 }}>
        Popular Mobiles
      </Typography>
      <CommonMobileSlider articles={articles} user={user} />
      <CommonMobileSlider articles={googleMobiles} user={user} />
      <CommonMobileSlider articles={SamsungMobiles} user={user} />
      <CommonMobileSlider articles={LastUpdatedMobiles} user={user} />
    </Paper>
  );
}
