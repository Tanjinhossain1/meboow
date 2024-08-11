import { MobileArticleType } from "@/types/mobiles";
import { Container, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function MobileListComponent({
  mobileArticles,
}: {
  mobileArticles: MobileArticleType[];
}) {
  return (
    <>
      <Container sx={{ bgcolor: "#023359", p: 1 }}>
        <Typography sx={{ fontSize: 18, fontWeight: 600, color: "#f5f5f5" }}>
          Top Mobile Lists
        </Typography>
      </Container>

      {mobileArticles?.map((value: MobileArticleType) => {
        return (
          <Link href={`/mobile/detail/${value.id}`}>
          <Typography
            sx={{
              p: 1,
              backgroundColor: "#deebff",
              ":hover": { backgroundColor: "#023359",color:"white" },
              cursor: "pointer",
              borderBottom: "1px solid white",
            }}
            key={value.id}
             
          >
            {value.title}
          </Typography>
          </Link>
        );
      })}
    </>
  );
}
