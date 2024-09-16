"use client";

import { useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import BackdropProviderContext from "@/Component/BackdropProvider";
import DekstopAndMobileViewContext from "@/Component/BackdropProviderChecker";

export default function DesktopViewToggle() {
  const [isMobile, setIsMobile] = useState(false);
//   const [desktopView, setDesktopView] = useState(
//     localStorage.getItem("desktopView") === "true" ? true : false
//   );
  const {desktopView,toggleDesktopView,setDesktopView} = useContext(DekstopAndMobileViewContext)
  const pathname = usePathname(); // Get the current path
  console.log("desktopView  on top     ", desktopView);
  useEffect(() => {
    // Check if the user previously enabled Desktop View
    // const savedView = localStorage.getItem('desktopView');
    // // console.log('savedView      ', savedView);
    // if (savedView === 'true') {
    //   setDesktopView(true);
    // }
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust the breakpoint as needed
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setDesktopView]);

  useEffect(() => {
    const metaViewport = document.querySelector('meta[name="viewport"]');
    console.log("desktopView      ", desktopView);
    if (desktopView) {
      // Simulate desktop view by adjusting the viewport meta tag
      metaViewport?.setAttribute("content", "width=1000");
      localStorage.setItem("desktopView", "true"); // Save preference
    } else {
      // Reset to the original viewport for mobile
      metaViewport?.setAttribute(
        "content",
        "width=device-width, initial-scale=1"
      );
      localStorage.setItem("desktopView", "false"); // Save preference
    }
  }, [desktopView]);

  useEffect(() => {
    // This effect will run on every route change because `pathname` changes
    const savedView = localStorage?.getItem("desktopView");
    if (savedView === "true") {
        setDesktopView(true)
    } else {
        setDesktopView(false);
    }
  }, [pathname,toggleDesktopView,setDesktopView]); // Re-run effect when `pathname` changes

//   const toggleDesktopView = () => {
//     setDesktopView(!desktopView);
//   };

  return (
    <>
      {desktopView && (
        <button
          className=" p-2 bg-gray-600 text-white  w-full"
          onClick={toggleDesktopView}
        >
          {desktopView ? "Mobile View" : "Desktop View"}
        </button>
      )}
      {isMobile && (
        <button
          className=" p-2 bg-gray-600 text-white  w-full"
          onClick={toggleDesktopView}
        >
          {desktopView ? "Mobile View" : "Desktop View"}
        </button>
      )}
    </>
  );
}
