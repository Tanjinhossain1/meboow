"use client";
import { BrandTypes } from "@/types/category";
import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { formatForUrlWith_under_score } from "@/utils/utils";

export default function BrandDisplayComponent({
  brands,
}: {
  brands: BrandTypes[];
}) {
  return (
    brands &&
    brands.slice(0, 10)?.map((data: BrandTypes) => {
      return (
        <Grid key={data?.id} xs={5} sm={3} md={2}>
          <Link
            href={`/mobile/brand-wise/${formatForUrlWith_under_score(
              data?.title
            )}`}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                border: "1px solid lightgray",
                p: 0.5,
                cursor: "pointer",
                height: "50px",
              }}
            >
              <Image
                alt={data?.title}
                src={`${process.env.NEXT_PUBLIC_IMAGE_SERVER_URL}/get/${data?.image}`}
                loading="lazy" // lazy loading for reduce loading time
                width={
                  data?.title === "Samsung"
                    ? 90
                    : data?.title === "Xiaomi"
                    ? 30
                    : data?.title === "OnePlus"
                    ? 90
                    : 70
                }
                height={
                  data?.title === "Samsung"
                    ? 10
                    : data?.title === "Xiaomi"
                    ? 30
                    : data?.title === "OnePlus"
                    ? 90
                    : 70
                }
              />
            </Box>
            <Typography
              variant="h6"
              sx={{ textAlign: "center", color: "gray", fontSize: 14 }}
            >
              {data?.title}
            </Typography>
          </Link>
        </Grid>
      );
    })
  );
}
