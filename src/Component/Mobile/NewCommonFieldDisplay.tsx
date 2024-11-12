"use client";
import { stripLinks } from "@/utils/utils";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import DateRangeIcon from "@mui/icons-material/DateRange";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import MonitorIcon from "@mui/icons-material/Monitor";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import MemoryIcon from "@mui/icons-material/Memory";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CameraFrontIcon from "@mui/icons-material/CameraFront";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import NatIcon from "@mui/icons-material/Nat";
import DraftsIcon from "@mui/icons-material/Drafts";
import BatteryCharging50Icon from "@mui/icons-material/BatteryCharging50";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import Link from "next/link";

function formatText(text: string) {
  return text.replace(/\n/g, "<br />").replace(/ {2}/g, " &nbsp;");
}
export default function NewCommonFieldDisplay({
  details,
}: {
  details: { blocks: any[] };
}) {
  return (
    <div className="container mx-auto pr-2 pl-2 pb-2">
      {details?.blocks.map((section) =>
        section?.type === "table" ? (
          <DeviceTable
            key={section?.id}
            title={section?.data?.content[0][0]} // You may adjust this based on the actual title of each section
            content={section?.data?.content}
            withHeadings={section?.data?.withHeadings}
          />
        ) : //  section?.type === "paragraph" && section?.data?.text.includes("Versions: ") ? (

        //     <div
        //       style={{ marginBottom: "10px",fontSize:12 }}
        //       key={section.id}
        //       dangerouslySetInnerHTML={{
        //         __html: section.data.text,
        //       }}
        //     />
        // ) :
        section?.type === "paragraph" ? (
          section?.data?.text.includes("Disclaimer") ? (
            <p>
              <b>Disclaimer.</b> We can not guarantee that the information on
              this page is 100% correct.{" "}
              <Link className="underline" href={"https://www.safarilist.com/"}>
                Read more
              </Link>
            </p>
          ) : (
            <div
              style={{ marginBottom: "10px", fontSize: 12 }}
              key={section.id}
              dangerouslySetInnerHTML={{
                __html: section.data.text,
              }}
            />
          )
        ) : null
      )}
    </div>
  );
}
const DeviceTable = ({ title, content, withHeadings }: any) => {
  console.log("first contentcontentcontent ", content);
  return (
    <div className="bg-white border  rounded-lg mb-4">
      <div className="flex justify-between align-middle bg-[#d5e4f7]  py-[3px] pl-1">
        <h2
          id={`item-${title}`}
          className="     hover:no-underline pr-2 text-[16px] font-semibold "
        >
          {title}
        </h2>
        {title === "Network" ? (
          <SignalCellularAltIcon className="text-gray-500" />
        ) : title === "Launch" ? (
          <DateRangeIcon className="text-gray-500" />
        ) : title === "Body" ? (
          <PhoneAndroidIcon className="text-gray-500" />
        ) : title === "Display" ? (
          <MonitorIcon className="text-gray-500" />
        ) : title === "Platform" ? (
          <AcUnitIcon className="text-gray-500" />
        ) : title === "Memory" ? (
          <MemoryIcon className="text-gray-500" />
        ) : title === "Main Camera" ? (
          <CameraAltIcon className="text-gray-500" />
        ) : title === "Selfie camera" ? (
          <CameraFrontIcon className="text-gray-500" />
        ) : title === "Sound" ? (
          <AudiotrackIcon className="text-gray-500" />
        ) : title === "Comms" ? (
          <NatIcon className="text-gray-500" />
        ) : title === "Features" ? (
          <DraftsIcon className="text-gray-500" />
        ) : title === "Battery" ? (
          <BatteryCharging50Icon className="text-gray-500" />
        ) : title === "Misc" ? (
          <MiscellaneousServicesIcon className="text-gray-500" />
        ) : (
          ""
        )}
      </div>
      <table className="w-full text-left">
        <tbody>
          {content?.map((row: any, rowIndex: any) => (
            <tr className="ml-1" key={rowIndex}>
              {row.map((cell: any, cellIndex: any) =>
                cell === title || cell === "" ? null : (
                  <td
                    key={cellIndex}
                    className={` py-2 ${
                      cellIndex === 0 && withHeadings ? "font-semibold" : ""
                    } ${
                      cellIndex === 0
                        ? "bg-gray-100 pl-2 w-[100px] sm:w-[200px]"
                        : "pl-2"
                    } border ${
                      rowIndex === 0 && cellIndex === 1
                        ? "sm:w-[200px] bg-gray-100 pl-2 font-semibold"
                        : "pl-2"
                    } `}
                    // dangerouslySetInnerHTML={{ __html: cell }}
                  >
                    {stripLinks(cell) === "Technology" ||
                    stripLinks(cell) === "2G bands" ||
                    stripLinks(cell) === "3G bands" ||
                    stripLinks(cell) === "4G bands" ||
                    stripLinks(cell) === "5G bands" ? (
                      <Link className="hover:underline" href={`/network-bands`}>
                        {stripLinks(cell)}
                      </Link>
                    ) : stripLinks(cell) === "Speed" ? (
                      <Link className="hover:underline" href={`/glossary/3g`}>
                        {stripLinks(cell)}
                      </Link>
                    ) : stripLinks(cell) === "Announced" ||
                      stripLinks(cell) === "Status" ? (
                      <Link
                        className="hover:underline"
                        href={`/glossary/Phone_Life_Cycle`}
                      >
                        {stripLinks(cell)}
                      </Link>
                    ) : stripLinks(cell) === "SIM" ? (
                      <Link className="hover:underline" href={`/glossary/sim`}>
                        {stripLinks(cell)}
                      </Link>
                    ) : stripLinks(cell) === "Type" && title !== "Battery"  ? (
                      <Link
                        className="hover:underline"
                        href={`/glossary/display_type`}
                      >
                        {stripLinks(cell)}
                      </Link>
                    ) : stripLinks(cell) === "Resolution" ? (
                      <Link
                        className="hover:underline"
                        href={`/glossary/resolution`}
                      >
                        {stripLinks(cell)}
                      </Link>
                    ) : stripLinks(cell) === "Protection" ? (
                      <Link
                        className="hover:underline"
                        href={`/glossary/Screen_protection`}
                      >
                        {stripLinks(cell)}
                      </Link>
                    ) : stripLinks(cell) === "OS" ? (
                      <Link className="hover:underline" href={`/glossary/OS`}>
                        {stripLinks(cell)}
                      </Link>
                    ) : stripLinks(cell) === "Chipset" ? (
                      <Link
                        className="hover:underline"
                        href={`/glossary/Chipset`}
                      >
                        {stripLinks(cell)}
                      </Link>
                    ) : stripLinks(cell) === "CPU" ? (
                      <Link className="hover:underline" href={`/glossary/CPU`}>
                        {stripLinks(cell)}
                      </Link>
                    ) : stripLinks(cell) === "GPU" ? (
                      <Link className="hover:underline" href={`/glossary/GPU`}>
                        {stripLinks(cell)}
                      </Link>
                    ) : stripLinks(cell) === "Card slot" ? (
                      <Link
                        className="hover:underline"
                        href={`/glossary/Memory_card_slot`}
                      >
                        {stripLinks(cell)}
                      </Link>
                    ) : stripLinks(cell) === "Internal" ? (
                      <Link
                        className="hover:underline"
                        href={`/glossary/Dynamic_Memory`}
                      >
                        {stripLinks(cell)}
                      </Link>
                    ) : title === "Selfie camera" ? (
                      <Link
                        className="hover:underline"
                        href={`/glossary/Secondary_camera`}
                      >
                        {stripLinks(cell)}
                      </Link>
                    ) : title === "Main Camera" ? (
                      <Link
                        className="hover:underline"
                        href={`/glossary/Camera`}
                      >
                        {stripLinks(cell)}
                      </Link>
                    )  : stripLinks(cell) === "Loudspeaker" ? (
                      <Link
                        className="hover:underline"
                        href={`/glossary/Loudspeaker`}
                      >
                        {stripLinks(cell)}
                      </Link>
                    ) : stripLinks(cell) === "3.5mm jack" ? (
                      <Link
                        className="hover:underline"
                        href={`/glossary/Audio_jack`}
                      >
                        {stripLinks(cell)}
                      </Link>
                    ) : stripLinks(cell) === "WLAN" ? (
                      <Link
                        className="hover:underline"
                        href={`/glossary/wi-fi`}
                      >
                        {stripLinks(cell)}
                      </Link>
                    ) : stripLinks(cell) === "Bluetooth" ? (
                      <Link
                        className="hover:underline"
                        href={`/glossary/Bluetooth`}
                      >
                        {stripLinks(cell)}
                      </Link>
                    ) : stripLinks(cell) === "Positioning" ? (
                      <Link className="hover:underline" href={`/glossary/gnss`}>
                        {stripLinks(cell)}
                      </Link>
                    ) : stripLinks(cell) === "NFC" ? (
                      <Link className="hover:underline" href={`/glossary/NFC`}>
                        {stripLinks(cell)}
                      </Link>
                    ) : stripLinks(cell) === "Radio" ? (
                      <Link
                        className="hover:underline"
                        href={`/glossary/FM_Radio`}
                      >
                        {stripLinks(cell)}
                      </Link>
                    ) : stripLinks(cell) === "USB" ? (
                      <Link className="hover:underline" href={`/glossary/usb`}>
                        {stripLinks(cell)}
                      </Link>
                    ) : stripLinks(cell) === "Sensors" ? (
                      <Link
                        className="hover:underline"
                        href={`/glossary/Sensors`}
                      >
                        {stripLinks(cell)}
                      </Link>
                    ) : stripLinks(cell) === "Charging" ? (
                      <Link
                        className="hover:underline"
                        href={`/glossary/Battery_Charging`}
                      >
                        {stripLinks(cell)}
                      </Link>
                    ) : stripLinks(cell) === "Colors" ? (
                      <Link
                        className="hover:underline"
                        href={`/glossary/Construction`}
                      >
                        {stripLinks(cell)}
                      </Link>
                    ) : stripLinks(cell) === "Price" ? (
                      <Link
                        className="hover:underline"
                        href={`/glossary/Price`}
                      >
                        {stripLinks(cell)}
                      </Link>
                    ) : stripLinks(cell) === "Size" ? (
                      <Link
                        className="hover:underline"
                        href={`/glossary/Size`}
                      >
                        {stripLinks(cell)}
                      </Link>
                    ) : stripLinks(cell) === "Dimensions" ? (
                      <Link
                        className="hover:underline"
                        href={`/glossary/Dimensions`}
                      >
                        {stripLinks(cell)}
                      </Link>
                    ) : stripLinks(cell) === "Weight" ? (
                      <Link
                        className="hover:underline"
                        href={`/glossary/Weight`}
                      >
                        {stripLinks(cell)}
                      </Link>
                    ) : stripLinks(cell) === "Models" ? (
                      <Link
                        className="hover:underline"
                        href={`/glossary/Models`}
                      >
                        {stripLinks(cell)}
                      </Link>
                    ) : stripLinks(cell) === "Performance" ? (
                      <Link
                        className="hover:underline"
                        href={`/glossary/benchmarking`}
                      >
                        {stripLinks(cell)}
                      </Link>
                    ) : stripLinks(cell) === "Camera" ? (
                      <Link
                        className="hover:underline"
                        href={`/glossary/Camera`}
                      >
                        {stripLinks(cell)}
                      </Link>
                    ) : stripLinks(cell) === "Build" ? (
                      <Link
                        className="hover:underline"
                        href={`/glossary/Build`}
                      >
                        {stripLinks(cell)}
                      </Link>
                    ) :
                    title === "Battery" ? (
                        stripLinks(cell) === "Type" ? (
                        <Link
                          className="hover:underline"
                          href={`/glossary/Rechargeable_Battery_Types`}
                        >
                          {stripLinks(cell)}
                        </Link>
                      ) : (
                        stripLinks(cell)
                      )
                    ):  (
                      <div dangerouslySetInnerHTML={{__html:stripLinks(cell)}} />
                    )}
                  </td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
