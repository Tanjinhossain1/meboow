import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import { MobileArticleType } from "@/types/mobiles";
import dynamic from "next/dynamic";

const CommonMobileSlider = dynamic(() => import("./CommonMobileSlider"), {
  ssr: true,
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
      <CommonMobileSlider brandsName="Apple" mobiles={apple} user={user} />
      <CommonMobileSlider brandsName="Samsung" mobiles={samsungData} user={user} />
      <CommonMobileSlider brandsName="Google" mobiles={google} user={user} />
      <CommonMobileSlider mobiles={lastUpdate} user={user} />
    </Paper>
  );
}
