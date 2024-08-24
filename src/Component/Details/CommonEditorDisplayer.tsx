import { cleanText } from '@/utils/utils';
import { Box, Link, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react'
function formatText(text: string) {
    return text.replace(/\n/g, "<br />").replace(/ {2}/g, " &nbsp;");
  }
  function modifyLinks(html:string) {
    // Create a temporary DOM element to work with
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
  
    // Find all <a> tags and change their color
    const links = tempDiv.querySelectorAll('a');
    links.forEach(link => {
      link.style.color = 'red';
      link.style.textDecoration = 'underline';
    });
  
    // Return the modified HTML as a string
    return tempDiv.innerHTML;
  }
  
  // Now use modifiedHtml in your React component
  
export default function CommonEditorDisplayer({blocks,tableOfContents}:{blocks:any[],tableOfContents:any[]}) {
    return blocks?.map((block: any) => {
        console.log("block   ", block);
        if (block.type === "paragraph") {
          if (block.data.text === "toc admin") {
            return (
              <Box
                sx={{
                  p: 2,
                  border: "1px solid gray",
                  borderRadius: 1,
                  mt: 2,
                  bgcolor: "#f9f9f9",
                }}
                className="lg:w-2/4"
                key={block.id}
              >
                <Typography
                  sx={{ fontSize: 15, mb: 0.5, fontWeight: 600 }}
                >
                  Table Of Contents
                </Typography>
                {tableOfContents?.map((header:any, index) => {
                  const formateHeader = header
                    .split(" ")
                    .map(
                      (word:any) =>
                        word.charAt(0).toUpperCase() + word.slice(1)
                    )
                    .join("_");

                  return (
                    <Link
                      style={{ textDecoration: "none" }}
                      href={`#${formateHeader}`}
                      key={index}
                    >
                      <Box
                        sx={{
                          color: "#007dd1",
                          display: "flex",
                          gap: 1,
                          textDecoration: "none",
                        }}
                      >
                        <span>{index + 1}. </span>
                        <Typography
                          sx={{
                            display: "inline",
                            fontSize: 14,
                            color: "#007dd1",
                            ":hover": { textDecoration: "underline" },
                          }}
                        >
                          {cleanText(header)}
                        </Typography>
                      </Box>
                    </Link>
                  );
                })}
              </Box>
            );
          } else {
            return (
              <div
                style={{ marginTop: "30px" }}
                key={block.id}
                dangerouslySetInnerHTML={{
                  __html: modifyLinks(block.data.text),
                }}
              />
            );
          }
        } else if (block.type === "header") {
          const TagLevel: any = `h${block.data.level}`;
          console.log("header", block, TagLevel);
          const formateHeader = block.data.text
            .split(" ")
            .map(
              (word: any) =>
                word.charAt(0).toUpperCase() + word.slice(1)
            )
            .join("_");
          return (
            <TagLevel
              id={formateHeader}
              key={block.id}
              style={{ marginTop: "10px" }}
              dangerouslySetInnerHTML={{
                __html: block.data.text,
              }}
            ></TagLevel>
          );
        } else if (block.type === "image") {
          const parsedUrl = new URL(block.data.file.url);

          // Extract the pathname starting from /get
          const extractedPath = parsedUrl.pathname;
          console.log("first pathname", extractedPath);
          return (
            <Image
              key={block.id}
              layout="responsive"
              width={block.data.height}
              height={block.data.height}
              src={`${process.env.NEXT_PUBLIC_IMAGE_SERVER_URL}${extractedPath}`}
              alt={`review-image-${block.id}`}
            ></Image>
          );
        } else if (block.type === "list") {
          console.log("first list   ", block);
          return block.data.style === "unordered" ? (
            <ul
              style={{ listStyleType: "disc", marginLeft: "30px" }}
              key={block.id}
            >
              {block.data.items.map((item: any) => (
                <li
                  style={{ marginTop: "10px" }}
                  key={item}
                  dangerouslySetInnerHTML={{ __html: item }}
                ></li>
              ))}
            </ul>
          ) : (
            <ol
              style={{
                listStyleType: "decimal",
                marginLeft: "30px",
                marginTop: "3px",
              }}
              key={block.id}
            >
              {block.data.items.map((item: any) => (
                <li
                  key={item}
                  style={{ marginTop: "5px" }}
                  dangerouslySetInnerHTML={{ __html: item }}
                ></li>
              ))}
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
                {block.data.content.map((row: any, index: number) => {
                  if (index !== 0) {
                    return (
                      <tr
                        style={{
                          backgroundColor:
                            index % 2 === 0 ? "#e6e6e6" : "#f5f5f5",
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
                })}
              </tbody>
            </table>
          );
        }
      });
}
