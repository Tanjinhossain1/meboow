"use client";
import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import { MobileArticleType } from "@/types/mobiles";
import dynamic from "next/dynamic";

const CommonMobileSlider = dynamic(() => import("./CommonMobileSlider"), {
  ssr: true,
  suspense: true,
});

export default function PopularMobiles({
  user,
  apple,
  samsungData,
  google,
  lastUpdate,
}: {
  user: any;
  apple: MobileArticleType[];
  samsungData: MobileArticleType[];
  google: MobileArticleType[];
  lastUpdate: MobileArticleType[];
}) {
  return (
    <Paper sx={{ width: "100%" }} elevation={0}>
      <Typography sx={{ fontSize: 25, fontWeight: 600 }}>
        Popular Mobiles
      </Typography>
      <CommonMobileSlider articles={apple} user={user} />
      <CommonMobileSlider articles={samsungData} user={user} />
      <CommonMobileSlider articles={google} user={user} />
      <CommonMobileSlider articles={lastUpdate} user={user} />
    </Paper>
  );
}
