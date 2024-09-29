"use client";
import { RecentArticleDataType } from "@/types/RecentArticle";
import { formatDate, formatForUrl } from "@/utils/utils";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Image from "next/image";
import React from "react";
import EditNoteIcon from "@mui/icons-material/EditNote";
import Link from "next/link";

export default function DisplayArticleComponent({
  data,
  asSmall,
  user,
}: {
  data: RecentArticleDataType;
  asSmall?: boolean;
  user?: any; // Replace with actual user data type
}) {
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
        <Link
          aria-label="Article Image"
          href={
            data?.category === "Mobiles"
              ? `/review/${formatForUrl(data?.route)}`
              : `/article/${formatForUrl(data?.route)}`
          }
        >
          <Image
            style={{ width: "100%", cursor: "pointer", height: "100%" }}
            alt={data?.title}
            src={`${process.env.NEXT_PUBLIC_IMAGE_SERVER_URL}/get/${data.image}`}
            // layout="responsive"
            width={300}
            height={300}
          />
        </Link>
      </Grid>
      <Grid xs={0} sm={0.5}></Grid>
      <Grid xs={asSmall ? 7 : 12} sm={6}>
        <Link
          aria-label="Review & Article"
          href={
            data?.category === "Mobiles"
              ? `/review/${formatForUrl(data?.route)}`
              : `/article/${formatForUrl(data?.route)}`
          }
        >
          <Typography
            sx={{
              fontSize: asSmall ? 14 : 18,
              fontWeight: 600,
              // fontFamily: "revert",
              ml: 1,
              cursor: "pointer",
              ":hover": { color: "#c4007c" },
            }}
          >
            {data.title}
          </Typography>
        </Link>
        <Link
          aria-label="Date"
          href={
            data?.category === "Mobiles"
              ? `/review/${formatForUrl(data?.route)}`
              : `/article/${formatForUrl(data?.route)}`
          }
        >
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
        </Link>
        {user?.role === "admin" || user?.role === "sub_admin" ? (
          <Typography
            sx={{
              color: "#055491",
              fontWeight: 800,
              fontSize: "16px",
              textAlign: "center",
              cursor: "pointer",
            }}
          >
            <Link
              aria-label="Edit Not Icon"
              href={`/admin/article/edit/${data.id}`}
            >
              <EditNoteIcon />
            </Link>
          </Typography>
        ) : null}
      </Grid>
    </Grid>
  );
}
