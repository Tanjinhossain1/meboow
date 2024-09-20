"use client";
import React from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Image from "next/image";
import { MobileArticleType } from "@/types/mobiles";
import MemoryIcon from "@mui/icons-material/Memory";
import BatteryChargingFullIcon from "@mui/icons-material/BatteryChargingFull";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import Link from "next/link";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { formatForUrl } from "@/utils/utils";

export default function MobileCommonDetails({
  articles,
}: {
  articles: MobileArticleType[];
}) {
  return (
    articles &&
    articles?.map((data: MobileArticleType) => {
      return (
        <Card
          key={data.id}
          className="m-2 flex-shrink-0"
          sx={{
            p: 1,
            border: "1px solid lightgray",
            borderRadius: "10px",
            textAlign: "center",
            width: "178px", // Adjusted width
            height: "290px", // Adjusted height
            position: "relative",
            cursor: "pointer",
          }}
        >
          <Grid container direction="column" alignItems="center">
            <Grid
              sx={{
                width: "192px", // Ensure the image takes the full width of the card
                height: "98px", // Adjust the height for uniformity
              }}
              xs={3}
              // item
            >
              <Link
                aria-label={`Mobile ${formatForUrl(data?.title)}`}
                href={`/mobile/${formatForUrl(data?.title)}`}
              >
                <Image
                  style={{
                    width: "195px", // Ensure the image takes the full width of the card
                    height: "95px", // Adjust the height for uniformity
                    cursor: "pointer",
                  }}
                  alt={data.title}
                  src={`${process.env.NEXT_PUBLIC_IMAGE_SERVER_URL}/get/${data.display_image}`}
                  width={50}
                  height={50}
                  loading="lazy"
                />
              </Link>
            </Grid>
            <Grid item sx={{ width: "100%", mt: 2, height: "45px" }}>
              <Link
                aria-label={`Mobile ${formatForUrl(data?.title)}`}
                style={{ textDecoration: "none" }}
                href={`/mobile/${formatForUrl(data?.title)}`}
              >
                <Typography
                  sx={{
                    color: "#364473",
                    // fontWeight: 600,
                    fontSize: 15,

                    textAlign: "center",
                  }}
                >
                  {data?.title}
                </Typography>
              </Link>
            </Grid>

            <Grid textAlign={"left"} item sx={{ width: "100%" }}>
              <Link
                aria-label={`Mobile ${formatForUrl(data?.title)}`}
                href={`/mobile/${formatForUrl(data?.title)}`}
              >
                <Typography
                  sx={{
                    color: "#45517a",
                    width: "148px",
                    height: "14px",
                    mt: "13px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    fontSize: 12,
                  }}
                >
                  <MemoryIcon sx={{ fontSize: 15, color: "gray" }} />{" "}
                  {data?.key_specifications.ram_chipset}
                </Typography>
              </Link>
            </Grid>
            <Grid item textAlign={"left"} sx={{ width: "100%" }}>
              <Link
                aria-label={`Mobile ${formatForUrl(data?.title)}`}
                href={`/mobile/${formatForUrl(data?.title)}`}
              >
                <Typography
                  sx={{
                    color: "#45517a",
                    width: "148px",
                    height: "14px",
                    mt: "7px",
                    fontSize: 12,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  <CameraAltIcon sx={{ fontSize: 15, color: "gray" }} />{" "}
                  {data?.key_specifications.camera}
                </Typography>
              </Link>
            </Grid>
            <Grid item textAlign={"left"} sx={{ width: "100%" }}>
              <Link
                aria-label={`Mobile ${formatForUrl(data?.title)}`}
                href={`/mobile/${formatForUrl(data?.title)}`}
              >
                {" "}
                <Typography
                  sx={{
                    color: "#45517a",
                    width: "148px",
                    height: "14px",
                    mt: "7px",
                    fontSize: 12,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    mb: "15px",
                  }}
                >
                  <BatteryChargingFullIcon
                    sx={{ fontSize: 15, color: "gray" }}
                  />{" "}
                  {data?.key_specifications.battery}
                </Typography>
              </Link>
            </Grid>

            <Grid
              item
              sx={{
                width: "100%",
                mt: 1,
                ":hover": {
                  textDecoration: "underline",
                },
              }}
            >
              <Link
                aria-label={`Mobile ${formatForUrl(data?.title)}`}
                style={{ textDecoration: "none" }}
                href={`/mobile/${formatForUrl(data?.title)}`}
              >
                <Typography sx={{ fontSize: 14, color: "#1866c0" }}>
                  See Full Specification{" "}
                  <KeyboardArrowRightIcon sx={{ fontSize: 15 }} />
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Card>
      );
    })
  );
}
