"use client";
import React, { useState } from "react";
import { Paper, Typography, IconButton, Card, Grid } from "@mui/material";
import Image from "next/image";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useRouter } from "next/navigation";
import { MobileArticleType } from "@/types/mobiles";
import MemoryIcon from "@mui/icons-material/Memory";
import BatteryChargingFullIcon from "@mui/icons-material/BatteryChargingFull";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import EditNoteIcon from "@mui/icons-material/EditNote";
import Link from "next/link";
import { formatForUrl } from "@/utils/utils";
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
