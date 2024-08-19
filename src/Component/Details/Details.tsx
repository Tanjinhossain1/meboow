"use client";
import { RecentArticleDataType } from "@/types/RecentArticle";
import { BrandTypes, CategoryTypes } from "@/types/category";
import {
  Box,
  Breadcrumbs,
  Button,
  Grid,
  MenuItem,
  Link as MuiLink,
  Paper,
  Popover,
  Tooltip,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { Fragment, useEffect, useState } from "react";
import CategoryListComponent from "../Category/CategoryListComponent";
import BrandListComponent from "./BrandListComponent";
import { MobileArticleType, MobileOpinionType } from "@/types/mobiles";
import MobileListComponent from "./MobileListComponent";
import { cleanText, formatDate, formatForUrl } from "@/utils/utils";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Link from "next/link";
import FacebookIcon from "@mui/icons-material/Facebook";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PinterestIcon from "@mui/icons-material/Pinterest";
import XIcon from "@mui/icons-material/X";
import AlignVerticalTopIcon from "@mui/icons-material/AlignVerticalTop";
import Opinion from "@/app/mobile/[title]/_components/Opinion";
import { ArrowDownIcon } from "lucide-react";
import CommonEditorDisplayer from "./CommonEditorDisplayer";
import Tags from "@/app/mobile/[title]/_components/Tags";

function formatText(text: string) {
  return text.replace(/\n/g, "<br />").replace(/ {2}/g, " &nbsp;");
}
export default function DetailsComponent({
  articleDetail,
  category,
  articles,
  brands,
  mobileArticles,
  user,
  articlesOpinion,
  articlePage,
}: {
  articleDetail: RecentArticleDataType;
  category: CategoryTypes[];
  articles: RecentArticleDataType[];
  brands: BrandTypes[];
  mobileArticles: MobileArticleType[];
  user: any;
  articlesOpinion: MobileOpinionType[];
  articlePage?: number;
}) {
  const params = useParams();
  const history = useRouter();
  console.log(" details  ", articleDetail);
  const searchParams = useSearchParams();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);

  const handleHoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleHoverClose = () => {
    setAnchorEl(null);
  };
  const [tableOfContents, setTableOfContents] = useState<string[]>([]);

  useEffect(() => {
    if (articleDetail?.pages && articleDetail?.pages[0]) {
      if (articlePage) {
        articleDetail?.pages?.map((rowPage) => {
          if (rowPage.page === articlePage) {
            rowPage.content?.blocks?.forEach((block: any) => {
              if (block.type === "header") {
                console.log("header of content ", block);
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
        });
      } else {
        articleDetail?.pages[0].content?.blocks?.forEach((block: any) => {
          if (block.type === "header") {
            console.log("header of content ", block);
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
    } else {
      articleDetail.content?.blocks?.forEach((block: any) => {
        if (block.type === "header") {
          console.log("header of content ", block);
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
  }, [articleDetail, articlePage]);
  // const formattedTitle = decodedTitle
  //   .split("-")
  //   .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  //   .join(" ");
  const handleShare = (platform: string) => {
    let shareUrl = "";
    const url = `https://safarilist.com/${
      articleDetail?.category === "Mobiles" ? "review" : "article"
    }/${formatForUrl(articleDetail.title)}`;

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          url
        )}`;
        break;
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${encodeURIComponent(url)}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          url
        )}`;
        break;
      case "pinterest":
        shareUrl = `https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(
          url
        )}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          url
        )}&text=${encodeURIComponent(articleDetail?.title)}`;
        break;
      case "tumblr":
        shareUrl = `https://www.tumblr.com/share/link?url=${encodeURIComponent(
          url
        )}&name=${encodeURIComponent(
          articleDetail?.title
        )}&description=${encodeURIComponent(articleDetail?.description)}`;
        break;

      // Add cases for other platforms (e.g., Twitter, LinkedIn) here
      default:
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <Grid container>
      <Paper
        className="md:max-w-[1000px] mx-auto"
        sx={{ p: 2, mb: 2 }}
        elevation={2}
      >
        <Breadcrumbs sx={{ fontSize: 12 }} aria-label="breadcrumb">
          <MuiLink underline="hover" color="inherit" href="/">
            Home
          </MuiLink>
          <MuiLink
            underline="hover"
            color="inherit"
            href={`/category/${articleDetail?.category}`}
          >
            {articleDetail?.category}
          </MuiLink>
          <Typography sx={{ fontSize: 12 }}>{articleDetail?.title}</Typography>
        </Breadcrumbs>
        <Button
          sx={{
            mt: 2,
            bgcolor: "#d9048b",
            padding: "2px 8px",
            fontSize: "12px",
            minWidth: "50px",
            boxShadow: "none",
            "&:hover": {
              boxShadow: "none",
              bgcolor: "#c2047c", // Maintain the same background color on hover
            },
          }}
          size="small"
          variant="contained"
          onClick={() => {
            history.push(`/category/${articleDetail?.category}`);
          }}
        >
          {articleDetail?.category}
        </Button>
        <Grid container>
          <Grid xs={12} lg={7.5}>
            <h1 className="mt-1 font-2xl text-[#333333] font-semibold">
              {articleDetail?.title}
            </h1>
            {/* <Typography
              sx={{
                mt: 1,
                fontSize: 35,
                fontWeight: 550,
                color: "#333333",
              }}
              variant="h1"
            >
              {" "}
            </Typography> */}

            <Grid container>
              <Grid
                sx={{
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                  gap: 0.3,
                }}
                xs={12}
              >
                <Image
                  alt="Safari List Logo"
                  src={"/logo-of-safari.ico"}
                  width={30}
                  height={30}
                />
                <Link href={`${process.env.NEXT_APP_CANONICAL_URL}/mobile`}>
                  <Typography
                    sx={{
                      fontSize: 16,
                      fontWeight: 400,
                      textAlign: "center",
                      // mb: 0.5,
                      mr: 0.8,
                      mt: 0.5,
                    }}
                    className="text-red-500  underline"
                    variant="body1"
                  >
                    safarilist
                  </Typography>
                </Link>
                <AccessTimeIcon sx={{ mt: 0.5, fontSize: 20 }} />
                <Typography
                  sx={{
                    fontSize: 16,
                    fontWeight: 400,
                    mt: 0.5,
                    display: {
                      xs: "none",
                      md: "block",
                    },
                    textAlign: "center",
                    // mb: 0.5,
                  }}
                  variant="body1"
                >
                  Published: {formatDate(articleDetail?.createdAt)}
                </Typography>
                <Tooltip title={"Facebook"} arrow>
                  <FacebookIcon
                    onClick={() => handleShare("facebook")}
                    fontSize="small"
                    sx={{ color: "#3b5998", ml: 1, mt: 0.5 }}
                  />
                </Tooltip>
                <Tooltip title={"Whats App"} arrow>
                  <WhatsAppIcon
                    onClick={() => handleShare("whatsapp")}
                    fontSize="small"
                    sx={{ color: "#3ebe2b", ml: 0.3, mt: 0.5 }}
                  />
                </Tooltip>
                <Tooltip title={"Linkedin"} arrow>
                  <LinkedInIcon
                    onClick={() => handleShare("linkedin")}
                    fontSize="small"
                    sx={{ color: "#007bb5", ml: 0.3, mt: 0.5 }}
                  />
                </Tooltip>
                <Tooltip title={"Pinterest"} arrow>
                  <PinterestIcon
                    onClick={() => handleShare("pinterest")}
                    fontSize="small"
                    sx={{ color: "#cd3c43", ml: 0.3, mt: 0.5 }}
                  />
                </Tooltip>
                <Tooltip title={"Twitter"} arrow>
                  <XIcon
                    onClick={() => handleShare("twitter")}
                    fontSize="small"
                    sx={{ color: "#000000", ml: 0.3, mt: 0.5 }}
                  />
                </Tooltip>
                <Tooltip title={"Tumblr"} arrow>
                  <AlignVerticalTopIcon
                    onClick={() => handleShare("tumblr")}
                    fontSize="small"
                    sx={{ color: "#2c4762", ml: 0.3, mt: 0.5 }}
                  />
                </Tooltip>
              </Grid>
              <Grid
                sx={{
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                  gap: 0.3,
                }}
                xs={12}
              >
                <Typography
                  sx={{
                    fontSize: 16,
                    fontWeight: 400,
                    mt: 0.5,
                    textAlign: "center",
                    // mb: 0.5,
                    display: {
                      xs: "block",
                      md: "none",
                    },
                  }}
                  variant="body1"
                >
                  Published: {formatDate(articleDetail?.createdAt)}
                </Typography>
              </Grid>
            </Grid>
            {articleDetail?.pages && articleDetail?.pages[0]?.title ? (
              <Box
                sx={{
                  position: "relative",
                  // display: "inline-block",
                  width: "100%",
                }}
              >
                {/* Dropdown trigger */}
                <Button
                  aria-controls={isOpen ? "dropdown-popover" : undefined}
                  aria-haspopup="true"
                  aria-expanded={isOpen ? "true" : undefined}
                  onMouseEnter={handleHoverOpen}
                  sx={{
                    mt: 4,
                    fontWeight: "bold",
                    textAlign: "start",
                    border: "1px solid gray",
                    width: "100%",
                    color: "black", // Default button color
                    fontSize: 14,
                    ":hover": {
                      color: "red", // Change to red on hover
                    },
                  }}
                >
                  {articlePage ? (
                    articleDetail?.pages.map((mapPage, index) => {
                      return (
                        <Typography
                          key={mapPage?.page}
                          sx={{
                            ":hover": { color: "red" },
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            fontSize: 14,
                            fontWeight: 600,
                          }}
                        >
                          {" "}
                          {mapPage?.page === articlePage ? (
                            <Typography
                              sx={{ fontSize: 16, fontWeight: 600 }}
                              dangerouslySetInnerHTML={{
                                __html: `${mapPage?.page} <b>.</b>`,
                              }}
                            />
                          ) : null}{" "}
                          {mapPage?.page === articlePage
                            ? mapPage?.title
                            : null}
                        </Typography>
                      );
                    })
                  ) : (
                    <Typography
                      sx={{
                        ":hover": { color: "red" },
                        fontWeight: 600,
                        fontSize: 14,
                      }}
                    >
                      1<b>.</b>{" "}
                      {articleDetail?.pages && articleDetail?.pages[0]?.title}
                    </Typography>
                  )}
                  {/* <Typography>
                  <ArrowDownIcon />
                </Typography> */}
                </Button>

                {/* Dropdown content (Popover) */}
                <Popover
                  id="dropdown-popover"
                  open={isOpen}
                  anchorEl={anchorEl}
                  onClose={handleHoverClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  PaperProps={{
                    //   onMouseEnter: handleHoverOpen,
                    onMouseLeave: handleHoverClose,
                    sx: {
                      boxShadow: "none",
                      border: "1px solid #ddd",
                      // width: "40%",
                      minWidth: {
                        xs: "100%",
                        sm: "90%",
                        md: "85%",
                        lg: "600px",
                      },
                      maxWidth: "500px",
                    },
                  }}
                >
                  {/* Dropdown Items */}
                  {articleDetail?.pages?.map((rowPage) => {
                    return (
                      <Link
                        key={rowPage?.page}
                        href={
                          rowPage?.page === 1
                            ? `/article/${formatForUrl(articleDetail?.title)}`
                            : `/article/${formatForUrl(articleDetail?.title)}/${
                                rowPage?.page
                              }`
                        }
                      >
                        <MenuItem
                          sx={{
                            "&:hover": {
                              color: "red",
                              textDecoration: "underline",
                            },
                            fontWeight:
                              articlePage === rowPage?.page
                                ? 600
                                : articlePage
                                ? 500
                                : rowPage?.page === 1
                                ? 600
                                : 500,
                          }}
                        >
                          <span style={{ paddingRight: "4px" }}>
                            {rowPage?.page}
                            <b>.</b>{" "}
                          </span>
                          {rowPage?.title}
                        </MenuItem>
                      </Link>
                    );
                  })}
                </Popover>
              </Box>
            ) : null}
            <Image
              style={{ marginTop: "20px" }}
              src={`${process.env.NEXT_PUBLIC_IMAGE_SERVER_URL}/get/${articleDetail.image}`}
              alt={articleDetail.title}
              layout="responsive"
              width={0}
              height={0}
            />
            {articlePage ? (
              articleDetail?.pages?.map((rowPage) => {
                return rowPage?.page === articlePage ? (
                  <CommonEditorDisplayer
                    key={rowPage?.page}
                    tableOfContents={tableOfContents}
                    blocks={rowPage?.content?.blocks}
                  />
                ) : null;
              })
            ) : articleDetail?.pages && articleDetail?.pages[0] ? (
              <CommonEditorDisplayer
                key={articleDetail?.pages[0]?.page}
                tableOfContents={tableOfContents}
                blocks={articleDetail?.pages[0].content?.blocks}
              />
            ) : null}
            {articleDetail?.pages && articleDetail?.pages[0]?.content
              ? null
              : articleDetail.content?.blocks?.map((block: any) => {
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
                          {tableOfContents?.map((header, index) => {
                            const formateHeader = header
                              .split(" ")
                              .map(
                                (word) =>
                                  word.charAt(0).toUpperCase() + word.slice(1)
                              )
                              .join("_");

                            return (
                              <MuiLink
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
                        ></div>
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
                        alt={articleDetail?.title}
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
                })}
          </Grid>
          <Grid xs={12} lg={0.5}></Grid>
          <Grid xs={12} sx={{ mt: 10 }} lg={4}>
            <MobileListComponent mobileArticles={mobileArticles} />
            <BrandListComponent brands={brands} />
            <CategoryListComponent category={category} />
          </Grid>
        </Grid>

        <Grid xs={12} md={7.5} container>
          {articleDetail?.tags && articleDetail?.tags[0]?.name !== "" ? (
            <Tags pageTag={articleDetail?.tags} />
          ) : null}
        </Grid>

        <Grid xs={12} md={7.5} container>
          <Opinion
            user={user}
            isArticle
            articleDetail={articleDetail}
            allMobilesOpinion={articlesOpinion}
          />
        </Grid>
        <Grid sx={{ mt: 3 }} container>
          <Grid xs={12} lg={7.5}>
            <h2 className="text-xl text-white p-1 mt-1 bg-[#c40069]">
              Related Posts
            </h2>
            {/* <Typography
              sx={{
                mt: 1,
                fontSize: 22,
                fontWeight: 550,
                color: "white",
                p: 1,
                bgcolor: "#c40069",
              }}
              variant="h2"
            >
              {" "}
              Related Posts
            </Typography> */}
            <Grid container>
              {articles?.map((article: RecentArticleDataType) => {
                return (
                  <Fragment key={article.id}>
                    <Grid sx={{ m: 1, cursor: "pointer" }} xs={3.5}>
                      <Link
                        href={
                          article?.category === "Mobiles"
                            ? `/article/${formatForUrl(article?.title)}`
                            : `/article/${formatForUrl(article?.title)}`
                        }
                      >
                        <Image
                          style={{ marginTop: "20px" }}
                          src={`${process.env.NEXT_PUBLIC_IMAGE_SERVER_URL}/get/${article.image}`}
                          alt={article.title}
                          layout="responsive"
                          width={0}
                          height={0}
                        />
                      </Link>
                      <Link
                        href={
                          article?.category === "Mobiles"
                            ? `/article/${formatForUrl(article?.title)}`
                            : `/article/${formatForUrl(article?.title)}`
                        }
                      >
                        <Typography
                          sx={{ mt: 1, fontSize: 14, fontWeight: 600 }}
                        >
                          {article.title}
                        </Typography>
                      </Link>
                    </Grid>
                  </Fragment>
                );
              })}
            </Grid>
          </Grid>
          <Grid xs={12} lg={0.5}></Grid>
          <Grid xs={12} sx={{ mt: 17 }} lg={4}></Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}
