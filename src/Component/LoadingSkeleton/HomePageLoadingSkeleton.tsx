import React, { Fragment } from "react";
import { Skeleton } from "@/components/ui/skeleton"; // Assuming you have a custom Skeleton component
import NavbarLoadingSkeleton from "../Shared/NavbarLoadingSkeleton";

export default function HomePageLoadingSkeleton({isOffNavbar}:{isOffNavbar?:boolean}) {
  return (
    <Fragment>
      {
        isOffNavbar ? null :
      <NavbarLoadingSkeleton />
      }
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-0 md:col-span-1 lg:col-span-1 xl:col-span-2"></div>
        <div className="col-span-12 md:col-span-10 lg:col-span-9 xl:col-span-8">
          <div className="p-4 mb-4 bg-white shadow-md">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 sm:col-span-8">
                <Skeleton className="h-[470px] w-full bg-gray-700" />
              </div>
              <div className="col-span-12 sm:col-span-4">
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-6 sm:col-span-12">
                    <Skeleton className="h-[228px] w-full bg-gray-700" />
                  </div>
                  <div className="col-span-6 sm:col-span-12">
                    <Skeleton className="h-[228px] w-full bg-gray-700" />
                  </div>
                </div>
              </div>
            </div>
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
            </div>
          </div>
        </div>
        <div className="col-span-0 md:col-span-1 lg:col-span-1 xl:col-span-2"></div>
      </div>
    </Fragment>
  );
}
