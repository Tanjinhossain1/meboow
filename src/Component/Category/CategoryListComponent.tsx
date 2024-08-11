
import { CategoryTypes } from "@/types/category";
import { Container, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

export default function CategoryListComponent({
  category,
}: {
  category: CategoryTypes[];
}) {
  return (
    <>
      <Container sx={{ bgcolor: "#023359", p: 1,mt:3 }}>
        <Typography sx={{ fontSize: 18, fontWeight: 600, color: "#f5f5f5" }}>
          Categories
        </Typography>
      </Container>

      {category?.map((value: CategoryTypes) => {
        return (
          <Link href={`/category/${value.title}`}>
          <Typography
            sx={{
              p: 1,
              backgroundColor: "#deebff",
              ":hover": { backgroundColor: "#023359",color:"white" },
              cursor: "pointer",
              borderBottom: "1px solid white",
            }}
            key={value.id}
            // onClick={() => {
            //   history.push(`/category/${value.title}`);
            // }}
          >
            {value.title}
          </Typography>
          </Link>
        );
      })}
    </>
  );
}
