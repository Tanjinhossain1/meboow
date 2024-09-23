"use client";
import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import { MobileArticleType } from "@/types/mobiles";
import CommonMobileSlider from "./CommonMobileSlider";
import { getAllMobiles } from "@/lib/queries/services";

export default function PopularMobiles({ user }: { user: any }) {
  const [appleMobiles, setAppleMobiles] = useState<MobileArticleType[]>([]);
  const [samsungMobiles, setSamsungMobiles] = useState<MobileArticleType[]>([]);
  const [googleMobiles, setGoogleMobiles] = useState<MobileArticleType[]>([]);
  const [lastUpdatedMobiles, setLastUpdatedMobiles] = useState<
    MobileArticleType[]
  >([]);
  useEffect(() => {
    const fetchData = async () => {
      const apple = await getAllMobiles({ limits: "30", brands: "Apple" });
      const samsungData = await getAllMobiles({
        limits: "30",
        brands: "Samsung",
      });
      const google = await getAllMobiles({ limits: "30", brands: "Google" });
      const lastUpdate = await getAllMobiles({ limits: "30" });
      setAppleMobiles(apple.data as any);
      setSamsungMobiles(samsungData.data as any);
      setGoogleMobiles(google.data as any);
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
