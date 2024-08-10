import { MobileArticleType } from "@/types/mobiles";
import { Grid, Typography } from "@mui/material";
import Image from "next/image";
import React, { Fragment } from "react";

export default function LatestDevices({
  mobiles,
}: {
  mobiles: MobileArticleType[];
}) {
  return (
    <Fragment>
      <Typography sx={{ fontSize: 25, fontWeight: 600, mt: 3, mb: 1 }}>
        Latest Devices
      </Typography>
      <Grid container>
      {mobiles?.slice(0,6)?.map((mobile: MobileArticleType) => {
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
                mt:1
              }}
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_IMAGE_SERVER_URL}/get/${mobile.display_image}`}
                alt={mobile.title}
                width={45}
                height={45}
              />
              <Typography sx={{ fontSize: 11, mt: 1 }}>
                {mobile.title}
              </Typography>
            </Grid>
          );
        })}
        
      </Grid>
    </Fragment>
  );
}