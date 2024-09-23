import { Breadcrumbs, Link, Typography } from "@mui/material";
import React from "react";

export default function LoadingComponent({ brand }: { brand: string }) {
  return (
    <div className="min-h-screen md:max-w-[1000px] mx-auto shadow-md bg-white">
      <Breadcrumbs sx={{ fontSize: 12,pt:2,pl:2 }} aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>
        <Link underline="hover" color="inherit" href="/brands">
          Brand
        </Link>
        <Typography sx={{ fontSize: 12 }}>{brand}</Typography>
      </Breadcrumbs>
      <div className="container mx-auto px-4 py-3">
        <h1 className="text-[30px] font-bold mb-4">{brand} Mobile Phones</h1>
        {/* Grid with responsive breakpoints */}
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {Array(15) // Displaying 12 skeleton items to match the grid
            .fill(0)
            .map((_, idx) => (
              <div key={idx} className="space-y-2 animate-pulse">
                {/* Skeleton for Image */}
                <div className="w-[100px] mx-auto h-40 bg-gray-300 rounded"></div>
                {/* Skeleton for Product Name */}
                <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
