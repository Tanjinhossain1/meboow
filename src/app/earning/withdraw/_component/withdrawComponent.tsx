"use client"

import { useEffect, useState } from "react"

export default function PaymentWithdraw({
  user,
  watchedData,
}: {
  user: any
  watchedData: any
}) {
  const [step, setStep] = useState<"method" | "details">("method")
  const [selectedMethod, setSelectedMethod] = useState<"binance" | "payoneer" | "bkash" | "nagad" | null>(null)
  const [phoneNumber, setPhoneNumber] = useState("")
  const [amount, setAmount] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [totalBalance, setTotalBalance] = useState(0)

  useEffect(() => {
    let calculateBalance = 0
    if (watchedData?.length > 0) {
      watchedData.map((e: any) => {
        calculateBalance = calculateBalance + +e?.income
      })
    }
    setTotalBalance(calculateBalance)
  }, [watchedData])

  const handleWithdraw = (method: "binance" | "payoneer" | "bkash" | "nagad") => {
    setSelectedMethod(method)
    setStep("details")
  }

  const handleSubmit = async () => {
    if (!phoneNumber) {
      setError(getInputLabel() + " is required")
      return
    }

    if (!amount) {
      setError("Amount is required")
      return
    }

    setIsSubmitting(true)
    setError("")

    try {
      const response = await fetch("/api/earning/withdraw", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          method: selectedMethod,
          phoneNumber: phoneNumber, // This will contain UID for Binance or email for Payoneer
          amount: `${amount}`,
          email: user?.email,
          status: "Pending",
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to process withdrawal")
      }

      // Reset form and show success
      setPhoneNumber("")
      setAmount("")
      setStep("method")
      setSelectedMethod(null)
    } catch (err) {
      setError("Failed to process withdrawal. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const getInputLabel = () => {
    switch (selectedMethod) {
      case "binance":
        return "Binance UID"
      case "payoneer":
        return "Payoneer Email"
      case "bkash":
        return "bKash phone number"
      case "nagad":
        return "Nagad phone number"
      default:
        return "Phone number"
    }
  }

  const getInputType = () => {
    switch (selectedMethod) {
      case "payoneer":
        return "email"
      default:
        return "text"
    }
  }

  const getInputPlaceholder = () => {
    switch (selectedMethod) {
      case "binance":
        return "Enter your Binance UID"
      case "payoneer":
        return "Enter your Payoneer email"
      case "bkash":
        return "e.g., 01XXXXXXXXX"
      case "nagad":
        return "e.g., 01XXXXXXXXX"
      default:
        return ""
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => step === "details" && setStep("method")}
          className={`flex items-center justify-center w-1/2 py-3 px-4 ${
            step === "method" ? "bg-indigo-600 text-white" : "bg-white text-gray-600"
          } ${step === "details" ? "cursor-pointer" : "cursor-default"}`}
        >
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
              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
            />
          </svg>
          Method
        </button>
        <div
          className={`flex items-center justify-center w-1/2 py-3 px-4 ${
            step === "details" ? "bg-indigo-600 text-white" : "bg-white text-gray-600"
          } cursor-default`}
        >
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
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          Details
        </div>
      </div>

      {/* Method Selection */}
      {step === "method" && (
        <div className="border border-gray-200 rounded-b-lg">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-800">Choose Payment Method</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 p-6">
            {/* Binance */}
            <div className="border border-gray-200 rounded-lg p-6 flex flex-col items-center">
              <div className="w-32 h-12 mb-4 flex items-center justify-center">
                <svg viewBox="0 0 100 40" radius={50} className="h-10 w-24">
                  <rect width="100" height="40" fill=""  radius={50} />
                  <text
                    x="50"
                    y="25"
                    fontFamily="Arial"
                    fontSize="16"
                    fill="#F0B90B"
                    textAnchor="middle"
                    fontWeight="bold"
                    radius={50}
                  >
                    Binance
                  </text>
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">Binance</h3>
              
              <p className="text-center text-gray-600 mb-4">Get paid by direct transfer into your Binance account.</p>
              <button
                onClick={() => handleWithdraw("binance")}
                className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-6 rounded-md flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Withdraw
              </button>
            </div>

            {/* Payoneer */}
            <div className="border border-gray-200 rounded-lg p-6 flex flex-col items-center">
              <div className="w-32 h-12 mb-4 flex items-center justify-center">
                <svg viewBox="0 0 100 40" className="h-10 w-24">
                  <rect width="100" height="40" fill="#f5e291" />
                  <text
                    x="50"
                    y="25"
                    fontFamily="Arial"
                    fontSize="16"
                    fill="#FF4800"
                    textAnchor="middle"
                    fontWeight="bold"
                  >
                    Payoneer
                  </text>
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">Payoneer</h3>
              <p className="text-center text-gray-600 mb-4">Get paid by direct transfer into your Payoneer account.</p>
              <button
                onClick={() => handleWithdraw("payoneer")}
                className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-6 rounded-md flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Withdraw
              </button>
            </div>

            {/* bKash */}
            <div className="border border-gray-200 rounded-lg p-6 flex flex-col items-center">
              <div className="w-32 h-12 mb-4 flex items-center justify-center">
                <svg viewBox="0 0 100 40" className="h-10 w-24">
                  <rect width="100" height="40" fill="#ffcfd2" />
                  <text
                    x="50"
                    y="25"
                    fontFamily="Arial"
                    fontSize="16"
                    fill="#E2136E"
                    textAnchor="middle"
                    fontWeight="bold"
                  >
                    bKash
                  </text>
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">bKash</h3>
              <p className="text-center text-gray-600 mb-4">Get paid by direct transfer into your bKash wallet.</p>
              <button
                onClick={() => handleWithdraw("bkash")}
                className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-6 rounded-md flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Withdraw
              </button>
            </div>

            {/* Nagad */}
            <div className="border border-gray-200 rounded-lg p-6 flex flex-col items-center">
              <div className="w-32 h-12 mb-4 flex items-center justify-center">
                <svg viewBox="0 0 100 40" className="h-10 w-24">
                  <rect width="100" height="40" fill="#fae3cd" />
                  <text
                    x="50"
                    y="25"
                    fontFamily="Arial"
                    fontSize="16"
                    fill="#F15A29"
                    textAnchor="middle"
                    fontWeight="bold"
                  >
                    Nagad
                  </text>
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">Nagad</h3>
              <p className="text-center text-gray-600 mb-4">Get paid by direct transfer into your Nagad wallet.</p>
              <button
                onClick={() => handleWithdraw("nagad")}
                className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-6 rounded-md flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Withdraw
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Details Entry */}
      {step === "details" && (
        <div className="border border-gray-200 rounded-b-lg">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-800">Enter Payment Details</h2>
          </div>

          <div className="p-6">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Enter your {getInputLabel()} <span className="text-red-500">*</span>
              </label>
              <input
                type={getInputType()}
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder={getInputPlaceholder()}
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Enter amount to withdraw <span className="text-red-500">*</span>
              </label>
              <p className="text-xs ">
                Currently Have:{" "}
                <b>
                  $ ( <span className="text-green-600 font-bold">{totalBalance}</span>
                </b>{" "}
                )
              </p>
              <input
                type="number"
                value={amount}
                min={5}
                max={totalBalance}
                onChange={(e) => {
                  setAmount(e.target.value)
                  if (+e.target.value > +totalBalance) {
                    setError(`You don't have this much balance`)
                  } else if (+e.target.value < 5) {
                    setError("Minimum Withdraw Balance 5$")
                  } else {
                    setError("")
                  }
                }}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Amount"
                required
              />
            </div>

            {error && <p className="mt-1 mb-4 text-sm text-red-600">{error}</p>}

            <button
              onClick={handleSubmit}
            //   disabled={isSubmitting || error !== ""}
              className={`w-64 ${error !== "" ? "bg-indigo-300" : "bg-indigo-500 hover:bg-indigo-600"} text-white py-3 px-6 rounded-md flex items-center justify-center`}
            >
              {isSubmitting ? (
                "Processing..."
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Withdraw Now
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
