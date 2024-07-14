"use client";
import { MobileArticleType } from "@/types/mobiles";
import Image from "next/image";
import React, { Fragment } from "react";

function formatText(text: string) {
  return text.replace(/\n/g, "<br />").replace(/ {2}/g, " &nbsp;");
}
export default function CommonFieldDisplay({ details }: { details: any[] }) {
  return details.map((block) => {
    if (block.type === "paragraph") {
      return (
        <div
          style={{ marginTop: "30px" }}
          key={block.id}
          dangerouslySetInnerHTML={{
            __html: formatText(block.data.text),
          }}
        ></div>
      );
    } else if (block.type === "header") {
      const TagLevel: any = `h${block.data.level}`;
      console.log(
        "hea der de   ",
        block,
        TagLevel,
        `text-${
          block.data.level === 1
            ? "4xl"
            : block.data.level === 2
            ? "3xl"
            : "2xl"
        }`
      );
      return (
        <h1
        className={`text-${
          block.data.level === 1
            ? "4xl"
            : block.data.level === 2
            ? "3xl"
            : "2xl"
        } font-bold`} // Tailwind classes
        key={block.id}
        dangerouslySetInnerHTML={{
          __html: block.data.text,
        }}
      />
        // <TagLevel
        //   className={`text-${
        //     block.data.level === 1
        //       ? "4xl"
        //       : block.data.level === 2
        //       ? "3xl"
        //       : "2xl"
        //   }`} // Adjust Tailwind classes as needed
        //   key={block.id}
        //   dangerouslySetInnerHTML={{
        //     __html: block.data.text,
        //   }}
        // ></TagLevel>
      );
    } else if (block.type === "image") {
      const TagLevel: any = `h${block.data.level}`;
      return (
        <Image
          key={block.id}
          layout="responsive"
          width={block.data.height}
          height={block.data.height}
          src={block.data.file.url}
          alt=""
        ></Image>
      );
    } else if (block.type === "list") {
      return block.data.style === "unordered" ? (
        <ul key={block.id}>
          {block.data.items.map((item: any) => (
            <li
              style={{ marginTop: "10px" }}
              key={item}
              dangerouslySetInnerHTML={{ __html: item }}
            ></li>
          ))}
        </ul>
      ) : (
        <ol key={block.id}>
          {block.data.items.map((item: any) => (
            <li key={item} dangerouslySetInnerHTML={{ __html: item }}></li>
          ))}
        </ol>
      );
    } else if (block.type === "table") {
      return (
        <table key={block.id} className="w-full text-left mt-2">
          <tbody>
            {block.data.content.map((row: any, index: number) => {
              return (
                <tr
                  style={{
                    borderBottom: "1px solid lightgray",
                  }}
                  key={index}
                >
                  {row.map((cell: any, cellIndex: any) => {
                    return (
                      <td
                        key={cellIndex}
                        style={{
                          padding: "8px", // Adjust padding uniformly
                          textAlign: "left",
                          paddingTop: "10px",
                          paddingBottom: "10px",
                          width: cellIndex === 1 ? "50%" : "10%", // Adjust width conditionally
                        }}
                        dangerouslySetInnerHTML={{
                          __html: cell,
                        }}
                      ></td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    }
  });
}
