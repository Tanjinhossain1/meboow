import { Fragment } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import { getDb } from "@/drizzle/db";
import { FollowerOrderParams } from "@/types/order";
import { FollowerOrders } from "@/drizzle/schema";
import { UsersTypes } from "@/types/users";

const ParentShortCompo = dynamic(() => import("./ParentShortCompo"), {
  ssr: false,
});

export interface CreateReturnType {
  success: boolean;
  message: string;
}
const getTheDate = async () => {
  const params = new URLSearchParams({
    key: process.env.NEXT_PUBLIC_FOLLOWER_SERVICES_KEY!, // Your API key
    action: "services",
  });

  try {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_FOLLOWER_SERVICES_URL!,
      params.toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    // Get unique categories from the services
    const categories = Array.from(
      new Set(response?.data?.map((service: any) => service.category))
    );

    return {
      categories,
      services: response?.data,
    };
  } catch (error) {
    console.error("Error fetching services:", error);
    return error;
  }
};
export default async function NewOrder({ user }: { user: UsersTypes }) {
  const response: any = await getTheDate();
  const createOrder = async (
    data: FollowerOrderParams
  ): Promise<CreateReturnType> => {
    "use server";
    if (user?.ballance && +user?.ballance > 0) {
      const db = await getDb();
      const { category, charge, link, quantity, service } = data;
      if(+user?.ballance > +charge){

        const { email, fullName, role } = user;
        try {
          await db.insert(FollowerOrders).values({
            category,
            charge,
            link,
            quantity,
            service,
            email,
            fullName,
            role,
          });
          
          return { success: true,message:'Success Fully Order Create' };
        } catch (err:any) {
          return { success: false,message: err?.message};
        } 
      }else{
        return {
          success: false,
          message: "You don't have Enough Ballance😅 ! Add Fund🥰",
        };
      }
    } else {
      return {
        success: false,
        message: "You Don't Have Balance Please😅 ! Add Fund🥰",
      };
    }
  };
  return (
    <Fragment>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4 w-full">
        <div className="bg-white p-4 shadow-md rounded-lg">
          <div className="flex items-center space-x-2">
            <div className="bg-purple-500 text-white p-2 rounded-full">
              {/* Avatar Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5.121 19.121A12.083 12.083 0 0112 21a12.083 12.083 0 016.879-1.879M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <div>
              <p className="text-gray-700">{user?.fullName}</p>
              <p className="text-gray-500 text-sm">Username</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 shadow-md rounded-lg">
          <div className="flex items-center space-x-2">
            <div className="bg-purple-500 text-white p-2 rounded-full">
              {/* Balance Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.1 0-2 .9-2 2h-1c0-1.66 1.34-3 3-3s3 1.34 3 3a3 3 0 01-3 3h-1c0-1.1.9-2 2-2m0 8h-1v-2h1v2z"
                />
              </svg>
            </div>
            <div>
              <p className="text-gray-700">${user?.ballance ? user?.ballance : "0"}</p>
              <p className="text-gray-500 text-sm">Balance</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 shadow-md rounded-lg">
          <div className="flex items-center space-x-2">
            <div className="bg-purple-500 text-white p-2 rounded-full">
              {/* Spend Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 11V9h1V5h2v2h2v2h1v2h-6zm2 5v-2h-1v-1h-2v2h-1v2h6v-1h-2zm-5.293-5.293a1 1 0 011.414 0l1.414 1.414a1 1 0 11-1.414 1.414L7.707 11.707a1 1 0 010-1.414zM18.707 9.707l-1.414-1.414a1 1 0 10-1.414 1.414l1.414 1.414a1 1 0 101.414-1.414z"
                />
              </svg>
            </div>
            <div>
              <p className="text-gray-700">${user?.totalSpend ? user?.totalSpend : "0"}</p>
              <p className="text-gray-500 text-sm">Total Spend</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 shadow-md rounded-lg">
          <div className="flex items-center space-x-2">
            <div className="bg-purple-500 text-white p-2 rounded-full">
              {/* Orders Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 2a1 1 0 00-1 1v18a1 1 0 001 1h12a1 1 0 001-1V3a1 1 0 00-1-1H6zm1 6h10V5H7v3zm0 8h10v-5H7v5zm0 3h10v-2H7v2z"
                />
              </svg>
            </div>
            <div>
              <p className="text-gray-700">4</p>
              <p className="text-gray-500 text-sm">Active Orders</p>
            </div>
          </div>
        </div>
      </div>
      <ParentShortCompo createOrder={createOrder} response={response} />
    </Fragment>
  );
}
