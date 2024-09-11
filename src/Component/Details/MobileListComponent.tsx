import { MobileArticleType } from "@/types/mobiles";
import {
  Avatar,
  Box,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { formatDate, formatForUrl } from "@/utils/utils";
import Image from "next/image";

export default function MobileListComponent({
  mobileArticles,
}: {
  mobileArticles: MobileArticleType[];
}) {
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
        <Typography
          className="text-red-600"
          sx={{ fontSize: 18, fontWeight: 600 }}
        >
          Top Mobile Lists
        </Typography>
        <Divider
          sx={{
            flexGrow: 1, // Allows the divider to fill the remaining space
            marginLeft: 2, // Add space between the text and divider
            backgroundColor: "red", // Set the divider color
            height: "2px", // Adjust the divider's thickness
          }}
        />
      </Box>
      {mobileArticles?.map((article: MobileArticleType, index: number) => {
        return (
          <Box
            key={article.id}
            sx={{ mt: 1 }}
            display="flex"
            alignItems="start"
            gap={2}
          >
            {/* Left Image */}
            <Box sx={{ height: "80px", width: "80px" }}>
              <Link href={`/mobile/${formatForUrl(article?.title)}`}>
                <Image
                  src={`${process.env.NEXT_PUBLIC_IMAGE_SERVER_URL}/get/${article.display_image}`}
                  // variant="square"
                  // src={article.display_image}
                  alt={article.title}
                  layout="cover"
                  width={50}
                  height={50}
                  // sx={{ width: 80, height: 80 }}
                  // className="object-cover"
                />
              </Link>
            </Box>

            {/* Right Content */}
            <Stack>
              {/* Category and Read Time */}
              <Box display="flex" alignItems="center" gap={1}>
              <Link href={`/mobile/${formatForUrl(article?.title)}`}><Typography
                  variant="caption"
                  sx={{ color: "red", fontWeight: 600, fontSize: 12 }}
                >
                  {article?.brands}
                </Typography>
                </Link>
                <Link href={`/mobile/${formatForUrl(article?.title)}`}>
                <Typography variant="caption" color="gray">
                  {formatDate(article.createdAt)}
                </Typography>
                <AccessTimeIcon sx={{ fontSize: 10, color: "gray" }} />
                </Link>
              </Box>
              <Link href={`/mobile/${formatForUrl(article?.title)}`}>
              {/* Title */}
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 600, lineHeight: 1.2, mt: 2 }}
              >
                {article.title}
              </Typography>
              </Link>
            </Stack>
          </Box>
          // <Link key={value?.id} href={`/mobile/${formatForUrl(article?.title)
          //   <Typography
          //     sx={{
          //       p: 1,
          //       backgroundColor: "#deebff",
          //       ":hover": { backgroundColor: "#023359", color: "white" },
          //       cursor: "pointer",
          //       borderBottom: "1px solid white",
          //     }}
          //     key={value.id}
          //   >
          //     {value.title}
          //   </Typography>
          // </Link>
        );
      })}
    </>
  );
}
