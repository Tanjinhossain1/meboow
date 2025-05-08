'use client'

import { toUpper } from "lodash";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function UserInformation({watchedData,user, referralData}:{watchedData:any,user:any,referralData:any}) {
    const [totalBalance, setTotalBalance] = useState(0);
console.log('first ',watchedData)
  
  useEffect(() => {
       let calculateBalance = 0;
        if(watchedData?.length > 0){
           watchedData.map((e:any)=>{
                 calculateBalance = calculateBalance + +e?.income
           })
        }
        setTotalBalance(calculateBalance + (referralData?.length * 0.5))
     }, [watchedData])

    return (
      <div className="  bg-white rounded-lg shadow-sm">
        
  
        <div className="p-4">
          <h3 className="text-base font-bold text-gray-800 mb-4 ">{toUpper(user?.fullName)}</h3>
  
          <div className="border-t border-gray-200 py-4 flex justify-between">
            <span className="text-gray-700">Email Address:</span>
            <span className="text-gray-900">{user?.email}</span>
          </div>
  
          <div className="border-t border-gray-200 py-4 flex justify-between">
            <span className="text-gray-700">Payment Frequency:</span>
            <span className="text-gray-900">Weekly</span>
          </div>
  
          
  
          <div className="border-t border-gray-200 py-4 flex justify-between">
            <span className="text-gray-700">Account Balance:</span>
            <span className="text-gray-900">${totalBalance}</span>
          </div> 
  
          <div className="mt-4">
            <Link href={'/earning/withdraw'}>
            <button className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-3 px-4 rounded flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              Withdraw Earnings
            </button></Link>
          </div>
        </div>
      </div>
    )
  }
  