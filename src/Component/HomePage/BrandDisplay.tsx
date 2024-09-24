"use client";
import { BrandTypes } from "@/types/category";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatForUrlWith_under_score } from "@/utils/utils";
import { getAllBrands } from "@/lib/queries/services";

export default function BrandDisplayComponent({
  brands,
  isSelfFetch,
}: {
  brands?: BrandTypes[];
  isSelfFetch?: boolean;
}) {
  const [listOfBrands, setListOfBrands] = useState<BrandTypes[]>(
    brands ? brands : []
  );
  useEffect(() => {
    const fetchArticles = async () => {
      const serverBrand = await getAllBrands({ pages: "1", limits: "10" });
      setListOfBrands(serverBrand);
    };
    if (isSelfFetch) {
      fetchArticles();
    }
  }, [isSelfFetch]);
  return (
    listOfBrands &&
    listOfBrands?.map((data: BrandTypes) => {
      return (
        <Grid key={data?.id} xs={5} sm={3} md={2}>
          <Link
            aria-label="Mobile Brands Wise"
            href={`/mobile/brand-wise/${formatForUrlWith_under_score(
              data?.title
            )}`}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "1px solid lightgray",
                width: "100px", // Consistent width for all images
                height: "70px", // Consistent height for all images
                padding: data?.title === "Yota" ? "15px" : "8px", // Padding around the image
                overflow: "hidden", // Prevent any overflow
              }}
            >
              <Image
                alt={`${data?.title} Brand Logo For Display`}
                src={`${process.env.NEXT_PUBLIC_IMAGE_SERVER_URL}/get/${data?.image}`}
                loading="lazy"
                layout="intrinsic"
                width={100} // Image will scale down/up while maintaining aspect ratio
                height={70}
                style={{ objectFit: "contain" }} // Ensures full image is visible
              />
            </Box>

            {/* <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                border: "1px solid lightgray",
                p: 0.5,
                cursor: "pointer",
                // height: "auto", // Adjust height as needed
                width: "100%", // Image will be responsive based on parent
                maxWidth: "150px", // Control max-width for responsiveness
              }}
            >
              <Image
                alt={` ${data?.title} Brand Logo For Display`}
                src={`${process.env.NEXT_PUBLIC_IMAGE_SERVER_URL}/get/${data?.image}`}
                loading="lazy" // lazy loading for reduce loading time
                layout="responsive"
                style={{ objectFit: "contain" }} // Maintain the aspect ratio
                width={
                  80
                }
                height={
                  50
                }
              />
            </Box> */}
            <Typography
              className="bg-[#FFFFFF]"
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
