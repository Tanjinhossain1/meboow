"use client";
import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import { MobileArticleType } from "@/types/mobiles";
// import CommonMobileSlider from "./CommonMobileSlider";
import { getAllMobiles } from "@/lib/queries/services";
import dynamic from "next/dynamic";

const CommonMobileSlider = dynamic(() => import("./CommonMobileSlider"), {
  ssr: true,
  suspense: true,
});

export default function PopularMobiles({ user }: { user: any }) {
  const [appleMobiles, setAppleMobiles] = useState<MobileArticleType[]>([]);
  const [samsungMobiles, setSamsungMobiles] = useState<MobileArticleType[]>([]);
  const [googleMobiles, setGoogleMobiles] = useState<MobileArticleType[]>([]);
  const [lastUpdatedMobiles, setLastUpdatedMobiles] = useState<
    MobileArticleType[]
  >([]);
  useEffect(() => {
    const fetchData = async () => {
      const apple = await getAllMobiles({ limits: "3", brands: "Apple" });
      setAppleMobiles(apple.data as any);
      const samsungData = await getAllMobiles({
        limits: "3",
        brands: "Samsung",
      });
      setSamsungMobiles(samsungData.data as any);
      const google = await getAllMobiles({ limits: "3", brands: "Google" });
      setGoogleMobiles(google.data as any);
      const lastUpdate = await getAllMobiles({ limits: "3" });
      setLastUpdatedMobiles(lastUpdate.data as any);
    };
    fetchData();
  }, []);
  return (
    <Paper sx={{ width: "100%" }} elevation={0}>
      <Typography sx={{ fontSize: 25, fontWeight: 600 }}>
        Popular Mobiles
      </Typography>
      <CommonMobileSlider articles={appleMobiles} user={user} />
      <CommonMobileSlider articles={samsungMobiles} user={user} />
      <CommonMobileSlider articles={googleMobiles} user={user} />
      <CommonMobileSlider articles={lastUpdatedMobiles} user={user} />
    </Paper>
  );
}
