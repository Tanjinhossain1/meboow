"use client";
import { BrandTypes } from "@/types/category";
import { Box, Container, Grid, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Image from "next/image";
import Link from "next/link";

export default function BrandDisplayComponent({
  brands,
}: {
  brands: BrandTypes[];
}) {
  console.log(" brands rfghfh", brands);
  return (
    brands &&
    brands.slice(0,5).map((data: BrandTypes) => {
      return (
        <Grid
          key={data?.id}
          xs={5}
          sm={3} 
          md={2}

        >
         <Link href={`/article/brand-wise/${data.title}`}>
         <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              border: "1px solid lightgray",
              p: 2,
              cursor: "pointer",
              height: "50px",
            }}
          >
            <Image
              alt={data?.title}
              src={`${process.env.NEXT_PUBLIC_IMAGE_SERVER_URL}/get/${data?.image}`}
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
          <Typography variant="h6" sx={{ textAlign: "center",color:"gray",fontSize:14 }}>
            {data?.title}
          </Typography></Link>
        </Grid>
      );
    })
  );
}
