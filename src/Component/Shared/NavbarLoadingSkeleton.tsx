import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function NavbarLoadingSkeleton() {
  return (
    <div className="grid w-full grid-cols-12 gap-0">
      <div className="col-span-12    m-0 p-0">
        <Skeleton className="mb-1 h-[70px] w-full" />
        <div className="w-full h-[40px] bg-gray-200 animate-pulse"></div>
      </div>
    </div>
  );
}

export default NavbarLoadingSkeleton;
