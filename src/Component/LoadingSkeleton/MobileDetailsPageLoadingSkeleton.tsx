"use client";
import React, { Fragment } from "react";
import { Skeleton } from "@/components/ui/skeleton"; // Assuming you have a custom Skeleton component
import NavbarLoadingSkeleton from "../Shared/NavbarLoadingSkeleton";
import { Box, Grid, Typography } from "@mui/material";
import { specifications } from "../Mobile/TopDetail";

export const TopBox = ()=>{
  return(
    <div className="grid grid-cols-12 gap-4">
    <div className="col-span-0 md:col-span-1 lg:col-span-1 xl:col-span-2"></div>
    <div className="col-span-12 md:col-span-10 lg:col-span-9 xl:col-span-8">
      <div className="p-4 mb-4 bg-white shadow-md">
        <Skeleton className="h-[35px] w-full lg:w-[500px] bg-gray-700 mb-2" />
        <Skeleton className="h-[25px] w-full lg:w-[440px] bg-gray-700 mb-2" />

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 sm:col-span-6">
            <Skeleton className="h-[500px] w-full lg:w-[450px] bg-gray-700" />
          </div>
          <div className="col-span-12 sm:col-span-6 ">
              <h3>Kye Specification</h3>
            <div className="grid grid-cols-12 gap-1 border-b-2 pb-3">
              {/* Adjusted grid structure to display two items per row */}
              {specifications.map((spec, index) => (
                <div className="col-span-6 sm:col-span-6 mt-5" key={index}>
                  <div className="flex items-center ">
                    <p className="text-3xl">{spec.icon}</p>{" "}
                    <div>
                      {" "}
                      <p className="text-2xl ml-5">{spec.label}</p>
                      <Skeleton className="h-[20px] ml-5 w-full bg-gray-700" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Skeleton className="h-[40px] mt-2 w-full bg-gray-700" />
            <Skeleton className="h-[40px] mt-2 w-full bg-gray-700" />
            <Skeleton className="h-[40px] mt-2 w-full bg-gray-700" />
          </div>
        </div>
              <BottomBox />
      </div>
    </div>
    <div className="col-span-0 md:col-span-1 lg:col-span-1 xl:col-span-2"></div>
  </div>
  )
}
export const BottomBox = ()=>{
  return(
    <div className="mt-4 grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-8">
            <Skeleton className="h-[40px] w-full bg-gray-700" />
            <div className="mt-2 grid grid-cols-12 gap-4">
           
              {[0, 1, 2, 3].map((x) => (
                <Fragment key={x}>
                  <div className="col-span-12 sm:col-span-5 ">
                    <Skeleton className="h-[200px] w-[350px] bg-gray-700" />
                  </div>
                  <div className="col-span-0 sm:col-span-1 "></div>
                  <div className="col-span-12 sm:col-span-6 ">
                    <Skeleton className="h-[20px] w-full bg-gray-700 mt-2" />
                    <Skeleton className="h-[20px] w-[120px] bg-gray-700 mt-2" />
                    <Skeleton className="h-[60px] w-full bg-gray-700 mt-2" />
                    <Skeleton className="h-[40px] w-[130px] bg-gray-700 mt-2 mb-5" />
                  </div>
                </Fragment>
              ))}
            </div>
          </div>
          <div className="col-span-12 md:col-span-4">
            <Skeleton className="h-[40px] w-full bg-gray-700" />
            <Skeleton className="h-[30px] mt-1 w-full bg-gray-700" />
            <Skeleton className="h-[30px] mt-1 w-full bg-gray-700" />
            <Skeleton className="h-[30px] mt-1 w-full bg-gray-700" />
            <Skeleton className="h-[30px] mt-1 w-full bg-gray-700" />
            <Skeleton className="h-[30px] mt-1 w-full bg-gray-700" />
            <Skeleton className="h-[30px] mt-1 w-full bg-gray-700" />
            <Skeleton className="h-[30px] mt-1 w-full bg-gray-700" />
            <Skeleton className="h-[30px] mt-1 w-full bg-gray-700" />
            <Skeleton className="h-[30px] mt-1 w-full bg-gray-700" />
            <Skeleton className="h-[30px] mt-1 w-full bg-gray-700" />
          </div>
          <div className="col-span-12 md:col-span-0.3"></div>
          <div className="col-span-12 md:col-span-3.7">
            <Skeleton className="h-[40px] w-full bg-gray-700" />
            {[0, 1, 2, 3, 4, 5].map((x) => (
              <Fragment key={x}>
                <Skeleton className="h-[30px] w-full bg-gray-700" />
              </Fragment>
            ))}
          </div>
          <div className="mt-3 grid grid-cols-12 gap-4">
            <div className="col-span-12">
              <Skeleton className="h-[30px] w-full bg-gray-700" />
              <Skeleton className="h-[200px] w-full bg-gray-700" />
            </div>
            <div className="col-span-12">
              <Skeleton className="h-[50px] w-full bg-gray-700" />
              <Skeleton className="h-[200px] w-full bg-gray-700" />
            </div>
          </div>
        </div>
  )
}
export default function MobileDetailsPageLoadingSkeleton() {
  return (
    <Fragment>
      <NavbarLoadingSkeleton />
      <TopBox />
    </Fragment>
  );
}
