import { BrandTypes } from '@/types/category'
import React from 'react'

export default function PhoneFinder({brands}:{brands:string[]}) {
// export default function PhoneFinder({brands}:{brands:BrandTypes[]}) {
  return (
    <div className=" mx-auto">
    <div className="bg-[#023359] text-white text-center py-2 rounded-t-lg">
      <h2 className="text-lg font-bold">
        <i className="fas fa-search"></i> PHONE FINDER
      </h2>
    </div>
    <div className="grid grid-cols-4   bg-gray-100  py-1 rounded-b-lg">
      {brands?.map((brand, index) => (
      // {brands.map((brand:BrandTypes, index) => (
        <a
          key={index}
          href={`/mobile/brand-wise/${brand}`}
          className="text-gray-800  p-[5px] text-[11px] border-l font-semibold   hover:text-white hover:bg-[#023359]"
        >
          {brand}
          {/* {brand?.title} */}
        </a>
      ))}
    </div>
    <div className="flex justify-between bg-[#023359] p-2 rounded-b-lg">
      <a
        href="/brands"
        className="text-white text-sm font-semibold hover:underline"
      >
        ALL BRANDS
      </a>
      <a
        href="#"
        className="text-white text-sm font-semibold hover:underline"
      >
        RUMOR MILL
      </a>
    </div>
  </div>
  )
}
