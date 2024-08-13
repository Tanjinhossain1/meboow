"use client";
import Image from "next/image";
import React from "react";


function formatText(text: string) {
  return text.replace(/\n/g, "<br />").replace(/ {2}/g, " &nbsp;");
}
export default function CommonFieldDisplay({
  details,
}: {
  details: { blocks: any[] };
}) {
  return details?.blocks?.map((block: any) => { 
    if (block.type === "paragraph") {
      return (
        <div
          style={{ marginTop: "30px" }}
          key={block.id}
          dangerouslySetInnerHTML={{
            __html: formatText(block.data.text),
          }}
        />
      );
    } else if (block.type === "header") {
      const TagLevel: any = `h${block.data.level === 1 ? 2 : block.data.level}`;
      console.log(
        "hea der de   ",
        block,
        TagLevel,
        block.data.level,
        `text-${
          block.data.level === 1
            ? "4xl"
            : block.data.level === 2
            ? "3xl"
            : "2xl"
        }`
      );

      return (
        <TagLevel
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
      return (
        <Image
          loading="lazy"
          key={block.id}
          layout="responsive"
          width={block.data.height}
          height={block.data.height}
          src={block.data.file.url}
          alt={block.data.file.url}
        ></Image>
      );
    } else if (block.type === "list") {
      return block.data.style === "unordered" ? (
        <ul key={block.id}>
          {block.data.items.map((item: any) => {
            
            return (
              <li
                style={{
                  marginTop: "10px",
                   
                }}
                key={item}
                dangerouslySetInnerHTML={{ __html: item }}
              ></li>
            );
          })}
        </ul>
      ) : (
        <ol key={block.id}>
          {block.data.items.map((item: any) => { 
            return (
              <li
                 
                key={item}
                dangerouslySetInnerHTML={{ __html: item }}
              ></li>
            );
          })}
        </ol>
      );
    } else if (block.type === "table") {
      return (
        <table
          key={block.id}
          style={{
            width: "100%",
            borderCollapse: "collapse",
            borderRadius: "10px",
            marginTop: "30px",
          }}
        >
          <thead>
            {/* {block.data.withHeadings && ( */}
            <tr>
              {block.data.content[0].map(
                (heading: any, index: number) => (
                  <th
                    key={index}
                    style={{
                      padding: "8px",
                      textAlign: "left",
                      backgroundColor: "#e6e6e6",
                      // border: "1px solid #dddddd",
                    }}
                    dangerouslySetInnerHTML={{
                      __html: heading,
                    }}
                  ></th>
                )
              )}
            </tr>
            {/* )} */}
          </thead>
          <tbody>
            {block.data.content.map(
              (row: any, index: number) => {
                if (index !== 0) {
                  return (
                    <tr
                      style={{
                        backgroundColor:
                          index % 2 === 0
                            ? "#e6e6e6"
                            : "#f5f5f5",
                      }}
                      key={index}
                    >
                      {row.map((cell: any, cellIndex: any) => (
                        <td
                          key={cellIndex}
                          style={{
                            padding: "8px",
                            textAlign: "left",
                            // border: "1px solid #dddddd",
                          }}
                          dangerouslySetInnerHTML={{
                            __html: cell,
                          }}
                        ></td>
                      ))}
                    </tr>
                  );
                }
              }
            )}
          </tbody>
        </table>
      );
    }
  });
}
