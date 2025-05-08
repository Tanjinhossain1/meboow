"use client"

import { useState } from "react"
import { Copy } from "lucide-react"

export default function ReferralProgram({user, referralData}:{user:any, referralData:any}) {
  const [copied, setCopied] = useState(false)
  const referralUrl = `${process.env.NEXT_PUBLIC_DOMAIN_URL}/register?user=${user?.id}`
    console.log('referralData ', referralData)
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(referralUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-4 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-[#e63946] text-white p-6 rounded-lg flex items-center">
          <div className="bg-white rounded-full p-3 mr-4">
            <span className="text-[#e63946] text-2xl font-bold">₹</span>
          </div>
          <div>
            <div className="text-2xl font-bold">$ {referralData?.length * 0.5}</div>
            <div className="text-sm">Referrals Balance</div>
          </div>
        </div>

        <div className="bg-[#ffc107] text-white p-6 rounded-lg flex items-center">
          <div className="bg-white rounded-full p-3 mr-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 12.75C8.83 12.75 6.25 10.17 6.25 7C6.25 3.83 8.83 1.25 12 1.25C15.17 1.25 17.75 3.83 17.75 7C17.75 10.17 15.17 12.75 12 12.75ZM12 2.75C9.66 2.75 7.75 4.66 7.75 7C7.75 9.34 9.66 11.25 12 11.25C14.34 11.25 16.25 9.34 16.25 7C16.25 4.66 14.34 2.75 12 2.75Z"
                fill="#ffc107"
              />
              <path
                d="M20.5901 22.75C20.1801 22.75 19.8401 22.41 19.8401 22C19.8401 18.55 16.3601 15.75 12.0001 15.75C7.64008 15.75 4.16008 18.55 4.16008 22C4.16008 22.41 3.82008 22.75 3.41008 22.75C3.00008 22.75 2.66008 22.41 2.66008 22C2.66008 17.73 6.85008 14.25 12.0001 14.25C17.1501 14.25 21.3401 17.73 21.3401 22C21.3401 22.41 21.0001 22.75 20.5901 22.75Z"
                fill="#ffc107"
              />
            </svg>
          </div>
          <div>
            <div className="text-2xl font-bold">{referralData?.length}</div>
            <div className="text-sm">Sign Ups</div>
          </div>
        </div>
      </div>

      <div className="text-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Earn ₹50 for every friend that signs up</h2>
      </div>

      <div className="text-center mb-6">
        <p className="text-gray-600">You can earn by referring others to register</p>
      </div>

      <div className="mb-4">
        <div className="border border-gray-300 rounded p-3 bg-white">
          <input type="text" value={referralUrl} readOnly className="w-full outline-none text-gray-700" />
        </div>
      </div>

      <button
        onClick={copyToClipboard}
        className="w-full bg-[#6c63ff] hover:bg-[#5a52d5] text-white py-3 rounded flex items-center justify-center transition-colors"
      >
        <Copy className="w-5 h-5 mr-2" />
        {copied ? "Copied!" : "Copy Referral Link"}
      </button>
    </div>
  )
}
