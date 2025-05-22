"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

export default function PaymentRules() {
  const [isOpen, setIsOpen] = useState(true)

  const toggleAccordion = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-xl font-medium text-gray-800 mb-4">Payment rules</h2>
      <div className="border border-gray-200 rounded-sm">
        <div className="flex items-center justify-between p-4 cursor-pointer" onClick={toggleAccordion}>
          <h3 className="text-base font-medium text-gray-800">How to get the date of your payment</h3>
          <button
            className="text-gray-500 focus:outline-none"
            aria-expanded={isOpen}
            aria-label={isOpen ? "Collapse" : "Expand"}
          >
            {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>

        {isOpen && (
          <div className="px-4 pb-4">
            <div className="space-y-3 text-sm text-gray-700">
              <p>
                Payment dates are <strong>1-2</strong> and <strong>16-17</strong> of each month,{" "}
                <span className="text-orange-600">from 9:00 am till 6:00 pm GMT</span>.
              </p>
              <p>
                If these dates fall on <strong>weekends or holidays</strong> the payments will be processed{" "}
                <strong>on nearest business day</strong>.
              </p>
              <p>Once you reach the minimum payout amount, the money is put on a two-week hold.</p>
              <p>You will get the payout during the first payment period available after your hold period ends.</p>

              <div className="mt-4">
                <p>For example:</p>
                <p>
                  You reach the minimum payout amount on June 8. The two-week hold period ends on June 22. The next
                  available payment period is July 1-2.
                </p>
                <p>
                  You reach the minimum payout amount on June 17. The two-week hold period ends on July 1. The next
                  available payment period is July 16-17.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <p className="text-sm text-gray-600 mt-4">
        In the Help Center, you can find a list of all the payment methods we offer. Please keep in mind that the
        availability of these payment methods may vary depending on your account.
      </p>
    </div>
  )
}
