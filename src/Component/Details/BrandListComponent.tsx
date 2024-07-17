import { BrandTypes, CategoryTypes } from "@/types/category";
import { Container, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

export default function BrandListComponent({
  brands,
}: {
  brands: BrandTypes[];
}) {
    const history = useRouter();
  return (
    <>
      <Container sx={{ bgcolor: "#023359", p: 1,mt:3 }}>
        <Typography sx={{ fontSize: 18, fontWeight: 600, color: "#f5f5f5" }}>
          Brands
        </Typography>
      </Container>

      {brands.map((value: BrandTypes) => {
        return (
          <Typography
            sx={{
              p: 1,
              backgroundColor: "#deebff",
              ":hover": { backgroundColor: "#023359",color:"white" },
              cursor: "pointer",
              borderBottom: "1px solid white",
            }}
            key={value.id}
            onClick={() => {
              history.push(`/category/${value.title}`);
            }}
          >
            {value.title}
          </Typography>
        );
      })}
    </>
  );
}
