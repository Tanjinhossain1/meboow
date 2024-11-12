"use client";

import Link from "next/link";
import { Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { MobileArticleType } from "@/types/mobiles";
import { formatForUrl } from "@/utils/utils";
import { SampleBrands } from "@/Component/HomePage/ContentBox";

// Helper function to shuffle an array
function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function removeBrandFromTitle(title: string) {
  let modifiedTitle = title;

  for (const brand of SampleBrands) {
    const regex = new RegExp(`\\b${brand}\\b`, "i"); // Regex for case-insensitive, whole-word match
    if (regex.test(modifiedTitle)) {
      modifiedTitle = modifiedTitle.replace(regex, "").trim();
      break; // Stop after the first match
    }
  }

  return modifiedTitle;
}
export default function RecentMobiles({ data }: { data: MobileArticleType[] }) {
  const [displayedMobiles, setDisplayedMobiles] = useState<MobileArticleType[]>(
    []
  );

  useEffect(() => {
    const shuffledMobiles = shuffleArray(data.slice(0, -5));
    const fixedMobiles = data.slice(-5);
    setDisplayedMobiles([...shuffledMobiles, ...fixedMobiles]);
  }, [data]);

  return (
    <section className="py-8  ">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Recent Mobiles
        </h2>
        <div className="flex flex-wrap -mx-2">
          {displayedMobiles.map((mobile, index) => (
            <div
              key={mobile.id}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 px-1 mb-4"
            >
              <Link
                href={`/mobile/${formatForUrl(mobile?.title)}`}
                className={`block bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg border-t-2 border-blue-500 hover:underline hover:text-red-600`}
              >
                <div className="p-2 flex items-center">
                  <Phone
                    className="w-5 h-5 mr-2 text-blue-500"
                    aria-hidden="true"
                  />
                  <span className="text-gray-800 font-medium truncate text-sm">
                    {removeBrandFromTitle(mobile.title)}
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
