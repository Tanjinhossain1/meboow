import { BrandTypes, CategoryTypes } from "@/types/category";
import { Box, Container, Divider, Typography } from "@mui/material";
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
        <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
        <Typography
          className="text-red-600"
          sx={{ fontSize: 18, fontWeight: 600 }}
        >
          Brands
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

      {brands?.map((value: BrandTypes) => {
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
