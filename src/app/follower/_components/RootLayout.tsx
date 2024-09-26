'use client'
import { useState } from "react";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import AvTimerIcon from "@mui/icons-material/AvTimer";
import FeaturedPlayListIcon from "@mui/icons-material/FeaturedPlayList";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

export default function RootLayout({
  children,
  isNewOrder,
  isOrders,
  addFunds,
}: {
  children: React.ReactNode;
  isNewOrder?: boolean;
  isOrders?: boolean;
  addFunds?: boolean;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="bg-gray-100">
        <div className="lg:hidden p-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-purple-800 focus:outline-none"
          >
            {sidebarOpen ? (
              <CloseIcon sx={{ fontSize: 28 }} />
            ) : (
              <MenuIcon sx={{ fontSize: 28 }} />
            )}
          </button>
        </div>
      <div className="flex ">
        {/* Mobile Menu Icon */}

        {/* Sidebar */}
        <aside
          className={`bg-purple-800 text-white lg:w-64 p-6 fixed lg:relative top-0 left-0 h-full transform lg:transform-none transition-transform duration-300 ease-in-out ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 z-20 min-h-screen`}
        >
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold">Follower</h1>
            <a href="/follower" className={`hover:text-yellow-300 `}>
              <div
                className={`${
                  isNewOrder ? "bg-purple-600" : ""
                } hover:bg-purple-600 mt-4 p-2 rounded-lg flex items-center`}
              >
                <LocalGroceryStoreIcon sx={{ mr: 2 }} />
                New Order
              </div>
            </a>
            <a href="/follower/orders" className="hover:text-yellow-300">
              <div
                className={`${
                  isOrders ? "bg-purple-600" : ""
                } hover:bg-purple-600 mt-4 p-2 rounded-lg flex items-center`}
              >
                <AvTimerIcon sx={{ mr: 2 }} />
                Orders
              </div>
            </a>
            <a href="/follower/add-fund" className="hover:text-yellow-300">
              <div
                className={`${
                  addFunds ? "bg-purple-600" : ""
                } hover:bg-purple-600 mt-4 p-2 rounded-lg flex items-center`}
              >
                <FeaturedPlayListIcon sx={{ mr: 2 }} />
                Add Funds
              </div>
            </a>
          </div>
        </aside>

        {/* Main Content */}
        <main  className="ml-5 w-full mr-5 mt-5">{children}</main>

        {/* Overlay for Mobile when Sidebar is Open */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black opacity-50 lg:hidden"
          ></div>
        )}
      </div>
    </div>
  );
}