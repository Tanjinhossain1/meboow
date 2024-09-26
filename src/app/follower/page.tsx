import React from "react";
import NewOrder from "./_components/NewOrder";
import RootLayout from "./_components/RootLayout";

export default function page() {
  return (
    <RootLayout isNewOrder>
      <NewOrder />
    </RootLayout>
  );
}
