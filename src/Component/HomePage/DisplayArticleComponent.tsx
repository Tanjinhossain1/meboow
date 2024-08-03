"use client";
import { RecentArticleDataType } from "@/types/RecentArticle";
import { formatDate, truncateText } from "@/utils/utils";
import { Button, Grid, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import EditNoteIcon from "@mui/icons-material/EditNote";

export default function DisplayArticleComponent({
  data,
  asSmall,
  user
}: {
  data: RecentArticleDataType;
  asSmall?: boolean;
  user?: any; // Replace with actual user data type
}) {
  const history = useRouter();

  const searchParams = useSearchParams();
  const page = searchParams.get("page") ?? "1";
  const limit = searchParams.get("limit") ?? "3";

  return (
    <Grid
      container
      sx={{
        borderBottom: asSmall ? "1px solid lightgray" : "none",
        border: "1px solid lightgray",
        // height:"150px",
        borderRadius: "5px",
        mr: 1,
        p: 1,
        mb: 1,
      }}
      xs={12}
      sm={5.6}
    >
      <Grid xs={asSmall ? 5 : 12} sm={5.5} sx={{ height: "100%" }}>
        <Image
          style={{ width: "100%", cursor: "pointer", height: "100%" }}
          alt=""
          src={`${process.env.NEXT_PUBLIC_IMAGE_SERVER_URL}/get/${data.image}`}
          // layout="responsive"
          width={300}
          height={300}
          onClick={() => {
            const joinTitle = data.title
              .split(" ")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join("-");
            history.push(
              `/details/${data.id}/${
                data.category
              }/${joinTitle}?${new URLSearchParams({
                page: `${Number(page) + 1}`,
                limit: limit,
              })}`,
              {
                scroll: false,
              }
            );
          }}
        />
      </Grid>
      <Grid xs={0} sm={0.5}></Grid>
      <Grid xs={asSmall ? 7 : 12} sm={6}>
        <Typography
          sx={{
            fontSize: asSmall ? 14 : 18,
            fontWeight: 600,
            // fontFamily: "revert",
            ml: 1,
            cursor: "pointer",
            ":hover": { color: "#c4007c" },
          }}
          onClick={() => {
            const joinTitle = data.title
              .split(" ")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join("-");
            history.push(
              `/details/${data.id}/${
                data.category
              }/${joinTitle}?${new URLSearchParams({
                page: `${Number(page) + 1}`,
                limit: limit,
              })}`,
              {
                scroll: false,
              }
            );
          }}
        >
          {data.title}
        </Typography>
        <Typography
          sx={{
            fontSize: 13,
            fontWeight: 500,
            mt: asSmall ? 0.5 : 2,
            ml: 1,
          }}
        >
          {formatDate(data.createdAt)}
          {/* {asSmall ? formatDate(data.createdAt) : null} */}
        </Typography>
        {user?.role === "admin" ? 
        <Typography
          sx={{
            color: "#055491",
            fontWeight: 800,
            fontSize: "16px",
            textAlign: "center",
            cursor: "pointer",
          }}
          onClick={() => {
            history.push(`/admin/article/edit/${data.id}`);
          }}
        >
          <EditNoteIcon />
        </Typography>
        : null}
      </Grid>
    </Grid>
  );
}
