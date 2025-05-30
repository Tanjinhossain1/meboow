"use client";
import {
  Box,
  Grid,
  Link as MuiLink,
  Paper,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React, { lazy, useEffect, useRef, useState } from "react";
import {
  GlossaryGroup,
  GlossaryType,
} from "@/types/network-bands";
import Link from "next/link";
import {
  cleanText,
  formatForUrlWith_under_score,
} from "@/utils/utils";
import { RecentArticleDataType } from "@/types/RecentArticle";
import CommonAutoAds from "@/Component/GoogleAds/CommonAutoAds";

const PhoneFinder = lazy(() => import("@/Component/Common/PhoneFinder"));
const MobileReviews = lazy(() => import("@/Component/HomePage/Component/MobileReviews"));

function formatText(text: string) {
  return text.replace(/\n/g, "<br />").replace(/ {2}/g, " &nbsp;");
}

export default function MainComponent({
  glossary,
  latestArticles,
  glossaryList,
}: {
  glossary?: GlossaryType | null;
  glossaryList: GlossaryGroup[];
  latestArticles: RecentArticleDataType[];
}) {
  const isTocAdmin = useRef<boolean>(false);

  const [tableOfContents, setTableOfContents] = useState<string[]>([]);

  useEffect(() => {
    if (glossary) {
      glossary.content?.blocks?.forEach((block: any) => {
        if (block.type === "header") {
          const headerText = block?.data?.text;
          setTableOfContents((prev) => {
            // Check if header already exists
            if (!prev.includes(headerText)) {
              return [...prev, headerText];
            }
            return prev;
          });
        }
      });
    }
  }, [glossary]);

  return (
    <Paper className="md:max-w-[1000px] mx-auto">
      <Grid container>
        <Grid
          sx={{
            my: 1,
            ml: 1.5,
            display: {
              xs: "none",
              sm: "block",
            },
          }}
          xs={12}
          sm={3.8}
        >
          <PhoneFinder />
        </Grid>
        <Grid
          sx={{
            my: 1,
            ml: 1,
            position: "relative", // Keep the container relative for text overlay
            width: "100%",
            height: "320px", // Set a fixed height for the container
            display: {
              xs: "none",
              sm: "block",
            },
          }}
          xs={12}
          sm={7.8}
        >
          {/* Using Next.js Image component for optimized image handling */}
          <Image
            src="/network.jpeg"
            alt="Network coverage"
            fill
            sizes="(max-width: 600px) 100vw, (max-width: 960px) 75vw, 50vw"
            quality={50}
            priority
            style={{
              filter: "grayscale(100%)",
              objectFit: "cover",
              objectPosition: "center",
            }} // Apply object-fit and object-position here
          />

          {/* Text content overlay */}
          <h1
            style={{
              position: "absolute",
              bottom: "50px",
              left: "10px",
              color: "white",
              backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
              padding: "5px 10px",
              borderRadius: "4px",
              fontSize: "30px",
            }}
          >
            {glossary
              ? `${glossary?.display_name} - definition`
              : "Mobile terms glossary"}
          </h1>
        </Grid> 
        <Grid
          sx={{
            mt: 1,
            ml: 1,
            display: {
              xs: "block",
              sm: "none",
            },
          }}
          xs={12}
          sm={7.8}
        >
           <Typography sx={{fontSize:25,fontWeight:600 }}>
              {glossary
              ? `${glossary?.display_name} - definition`
              : "Mobile terms glossary"}
              </Typography>
        </Grid> 
              
        <Grid
          sx={{
            my: 1,
            ml: 1.5,
            display: {
              xs: "none",
              sm: "block",
            },
          }}
          xs={12}
          sm={3.8}
        >
           <Typography className="text-end text-gray-400 mt-1 text-xs">
                ADVERTISEMENT
              </Typography>
              <CommonAutoAds adSlot="9928330054" />
          <MobileReviews
            isGap
            isTrending
            isText
            mobilesArticles={latestArticles}
          /> 
             <Box
                sx={{
                  position: "sticky", // Make the left side sticky
                  top: 0, // Stick to the top of the viewport
                  alignSelf: "flex-start", // Ensures alignment inside the parent container
                  overflow: "hidden",
                }}
              >
                <Typography className="text-end text-gray-400 mt-1 text-xs">
                  ADVERTISEMENT
                </Typography>
                <CommonAutoAds adFormat="vertical" adSlot="6771683673" />
              </Box>
        </Grid>
        <Grid
          sx={{
            m: 2,
          }}
          xs={12}
          sm={7.6}
        >
           <Typography className="text-end text-gray-400 mt-1 text-xs">
                  ADVERTISEMENT
                </Typography>
                <CommonAutoAds adFormat="horizontal" adSlot="3293535295" />
          {glossary?.content?.blocks?.map((block: any) => {
            if (block.type === "paragraph") {
              if (block.data.text === "toc admin") {
                isTocAdmin.current = true;
                return (
                  <Box
                    id="versions"
                    sx={{
                      p: 2,
                      border: "1px solid gray",
                      borderRadius: 1,
                      mt: 2,
                      bgcolor: "#f9f9f9",
                      mb: 4,
                    }}
                    key={block.id}
                  >
                    <Typography sx={{ fontSize: 15, mb: 0.5, fontWeight: 600 }}>
                      Jump To
                    </Typography>
                    {tableOfContents?.map((header, index) => {
                      const formateHeader = header
                        .split(" ")
                        .map(
                          (word) => word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join("_");

                      return (
                        <MuiLink
                          className="text-black decoration-black mt-2"
                          href={`#${formateHeader}`}
                          key={index}
                        >
                          <Box
                            sx={{
                              // color: "#007dd1",
                              color: "black",
                              display: "flex",
                              gap: 1,
                            }}
                          >
                            <Typography
                              sx={{
                                display: "inline",
                                fontSize: 14,
                                // color: "#007dd1",
                                color: "black",
                                ":hover": { color: "red" },
                              }}
                            >
                              {cleanText(header)}
                            </Typography>
                          </Box>
                        </MuiLink>
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
                      __html: formatText(block.data.text),
                    }}
                  />
                );
              }
            } else if (block.type === "header") {
              const TagLevel: any = `h${
                block.data.level === 1 ? 2 : block.data.level
              }`;
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
              const formateHeader = block.data.text
                .split(" ")
                .map(
                  (word: any) => word.charAt(0).toUpperCase() + word.slice(1)
                )
                .join("_");
              return (
                <TagLevel
                  id={formateHeader}
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
                <ul
                  className={
                    isTocAdmin.current === true
                      ? "bg-gray-100 border-l-8 border-[#023359] p-1 my-4"
                      : ""
                  }
                  key={block.id}
                >
                  {block.data.items.map((item: any) => {
                    return (
                      <li
                        style={{
                          marginTop:
                            isTocAdmin.current === true ? "1px" : "10px",
                        }}
                        className={`${
                          /<a\s+(.*?)>.*<\/a>/.test(item)
                            ? "hover:underline hover:text-red-500"
                            : ""
                        } 
                          ${
                            isTocAdmin.current === true
                              ? "text-gray-600 pl-2 "
                              : ""
                          }`}
                        key={item}
                        // dangerouslySetInnerHTML={{ __html: item }}
                      >
                        {isTocAdmin.current && (
                          <span className="mr-2 text-gray-600 no-underline">
                            ›
                          </span>
                        )}
                        <span dangerouslySetInnerHTML={{ __html: item }}></span>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <ol key={block.id}>
                  {block.data.items.map((item: any) => {
                    return (
                      <li
                        key={item}
                        className="hover:text-red-600"
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
                    border: "1px solid #dddddd",
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
                              width: index === 0 ? "200px" : "auto",
                              fontWeight: index === 0 ? 400 : 600,
                              // backgroundColor: "#e6e6e6",
                              borderRight:
                                index === 0 ? "1px solid #dddddd" : undefined,
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
                              borderRight:
                                index === 0 ? "1px solid #dddddd" : undefined,
                              // backgroundColor:
                              //   index % 2 === 0
                              //     ? "#e6e6e6"
                              //     : "#f5f5f5",
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
          })}
          <Typography className="text-end text-gray-400 mt-1 text-xs">
                  ADVERTISEMENT
                </Typography>
                <CommonAutoAds adFormat="horizontal" adSlot="4484431685" />
          <div className="space-y-6 mt-6">
            {glossaryList.map((group) => (
              <div key={group.type}>
                <p className="font-bold text-xl mb-4 border-l-8 border-[#17819f] pl-1 border-b border-b-gray-300">
                  {group.type}
                </p>
                 
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {group.data.map((item, index) => {
                    return (
                      <Link
                        key={index}
                        className={`col-span-1  text-sm hover:text-red-600 hover:underline cursor-pointer`}
                        style={{ textAlign: "left" }} // Ensure text starts from the left
                        href={`/glossary/${formatForUrlWith_under_score(
                          item?.route
                        )}`}
                      >
                        {item.display_name}
                      </Link>
                    );
                  })}
                </div>
                <Typography className="text-end text-gray-400 mt-1 text-xs">
                  ADVERTISEMENT
                </Typography>
                <CommonAutoAds adFormat="horizontal" adSlot="6818950988" />
              </div>
            ))}
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
}
