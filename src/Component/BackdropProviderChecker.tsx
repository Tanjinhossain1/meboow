
"use client";
import { createContext, ReactNode, useEffect, useState } from "react";

// Define the types for the context values
interface DekstopAndMobileViewType {
  desktopView: boolean;
  toggleDesktopView: () => void;
  setDesktopView: React.Dispatch<React.SetStateAction<boolean>>;
}

// Define default values (you can set them to functions that do nothing or any initial values)
const defaultValues: DekstopAndMobileViewType = {
  desktopView: false,
  toggleDesktopView: () => {},
  setDesktopView: () => {}, // Safe default function
};

// Create the context with the defined types
const DekstopAndMobileViewContext =
  createContext<DekstopAndMobileViewType>(defaultValues);

// Define the props for the provider component
interface DekstopAndMobileViewProps {
  children: ReactNode;
}
export const DekstopAndMobileViewComponent = ({
  children,
}: DekstopAndMobileViewProps) => {
  const [desktopView, setDesktopView] = useState<boolean>(false
    // localStorage.getItem("desktopView") === "true" ? true : false
  );
  useEffect(() => {
    // Check localStorage only after the component has mounted
    const savedDesktopView = localStorage?.getItem("desktopView") === "true";
    setDesktopView(savedDesktopView);
  }, []);
  const toggleDesktopView = () => {
    setDesktopView(!desktopView);
  };

  return (
    <DekstopAndMobileViewContext.Provider
      value={{
        desktopView,
        toggleDesktopView,
        setDesktopView,
      }}
    >
      {children}
    </DekstopAndMobileViewContext.Provider>
  );
};

export default DekstopAndMobileViewContext;
