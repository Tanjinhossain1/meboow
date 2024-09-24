"use client";
import { MobileArticleType } from "@/types/mobiles";
import { formatForUrl } from "@/utils/utils";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment, useEffect, useState } from "react";
import { getAllMobiles } from "@/lib/queries/services";

export default function LatestDevices({
  mobiles,
  isRelated,
  name,
  isSelfDataFetch,
}: {
  mobiles?: MobileArticleType[];
  isRelated?: boolean;
  name?: string;
  isSelfDataFetch?: boolean;
}) {
  const [allMobiles, setAllMobiles] = useState<MobileArticleType[]>(
    mobiles ? mobiles : []
  );
  useEffect(() => {
    if (isSelfDataFetch) {
      const fetchMobile = async () => {
        const LatestDeviceMobiles = await getAllMobiles({
          limits: "12",
          is_latest_device: "YES",
        });
        setAllMobiles(LatestDeviceMobiles.data as any);
      };
      fetchMobile();
    }
  }, [isSelfDataFetch]);
  return (
    <Fragment>
      <Typography sx={{ fontSize: 25, fontWeight: 600, mt: 3, mb: 1 }}>
        {isRelated ? `Popular From ${name} ` : "Latest Devices"}
      </Typography>
      <Grid sx={{ mb: 2 }} container>
        {allMobiles?.map((mobile: MobileArticleType) => {
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
              <Link
                aria-label={`Mobile ${formatForUrl(mobile?.title)}`}
                href={`/mobile/${formatForUrl(mobile?.title)}`}
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_IMAGE_SERVER_URL}/get/${mobile.display_image}`}
                  alt={mobile.title}
                  width={45}
                  height={45}
                  loading="lazy" // lazy loading for reduce loading time
                />
              </Link>
              <Link
                aria-label={`Mobile ${formatForUrl(mobile?.title)}`}
                href={`/mobile/${formatForUrl(mobile?.title)}`}
              >
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
