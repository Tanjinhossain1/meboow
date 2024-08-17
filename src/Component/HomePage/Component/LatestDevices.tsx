import { MobileArticleType } from "@/types/mobiles";
import { formatForUrl } from "@/utils/utils";
import { Grid, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment } from "react";

export default function LatestDevices({
  mobiles,
  isRelated,
  name
}: {
  mobiles: MobileArticleType[];
  isRelated?:boolean;
  name?:string;
}) {
  return (
    <Fragment>
      <Typography sx={{ fontSize: 25, fontWeight: 600, mt: 3, mb: 1 }}>
      {isRelated ? `Popular From ${name} `: "Latest Devices"}  
      </Typography>
      <Grid sx={{mb:2}} container>
        {mobiles?.slice(0, 6)?.map((mobile: MobileArticleType) => {
          return (
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              xs={3.7}
              key={mobile.id}
              sx={{
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
                mt: 1,
              }}
            >
              <Link href={`/mobile/${formatForUrl(mobile?.title)}`}>
                <Image
                  src={`${process.env.NEXT_PUBLIC_IMAGE_SERVER_URL}/get/${mobile.display_image}`}
                  alt={mobile.title}
                  width={45}
                  height={45}
                />
              </Link>
              <Link href={`/mobile/${formatForUrl(mobile?.title)}`}>
                <Typography
                  sx={{ fontSize: 11, mt: 1, ":hover": { color: "red" } }}
                >
                  {mobile.title}
                </Typography>
              </Link>
            </Grid>
          );
        })}
      </Grid>
    </Fragment>
  );
}
