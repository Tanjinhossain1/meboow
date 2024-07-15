"use client";
import Footer from "@/Component/HomePage/Footer";
import { RecentArticleDataType } from "@/types/RecentArticle";
import { CategoryTypes } from "@/types/category";
import {
  Breadcrumbs,
  Button,
  Grid,
  Link,
  Paper,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { Fragment } from "react";
import CategoryListComponent from "../Category/CategoryListComponent";

function formatText(text: string) {
  return text.replace(/\n/g, "<br />").replace(/ {2}/g, " &nbsp;");
}
export default function DetailsComponent({
  articleDetail,
  category,
  articles,
}: {
  articleDetail: RecentArticleDataType;
  category: CategoryTypes[];
  articles: RecentArticleDataType[];
}) {
  const params = useParams();
  const history = useRouter();
  
  const searchParams = useSearchParams();
  const page = searchParams.get("page") ?? "1";
  const limit = searchParams.get("limit") ?? "3";

  console.log("articleDetail  ", articleDetail.content);
  const rawTitle = params?.title as string;
  const decodedTitle = decodeURIComponent(rawTitle);

  const formattedTitle = decodedTitle
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <>
      <>
        <Grid container>
          <Grid xs={0} md={1} lg={1.1} xl={2}></Grid>
          <Grid xs={12} md={10} lg={9.8} xl={8}>
            <Paper sx={{ p: 2, mb: 2 }} elevation={2}>
              <Breadcrumbs sx={{ fontSize: 12 }} aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="/">
                  Home
                </Link>
                <Link
                  underline="hover"
                  color="inherit"
                  href={`/category/${params?.category}`}
                >
                  {params?.category}
                </Link>
                <Typography sx={{ fontSize: 12 }}>{formattedTitle}</Typography>
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
                  history.push(`/category/${params?.category}`);
                }}
              >
                {params?.category}
              </Button>
              <Grid container>
                <Grid xs={12} lg={7.5}>
                  <Typography
                    sx={{
                      mt: 1,
                      fontSize: 35,
                      fontWeight: 550,
                      color: "#333333",
                    }}
                  >
                    {" "}
                    {formattedTitle}
                  </Typography>

                  <Image
                    style={{ marginTop: "20px" }}
                    src={articleDetail.image}
                    alt={articleDetail.title}
                    layout="responsive"
                    width={0}
                    height={0}
                  />
                  {articleDetail.content?.blocks?.map((block:any) => {
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
                      console.log('header', block,TagLevel);
                      return (
                        <TagLevel
                          key={block.id}
                          dangerouslySetInnerHTML={{
                            __html: block.data.text,
                          }}
                        ></TagLevel>
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
                            <li
                              key={item}
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
                  })}
                </Grid>
                <Grid xs={12} lg={0.5}></Grid>
                <Grid xs={12} sx={{ mt: 17 }} lg={4}>
                  <CategoryListComponent category={category} />
                </Grid>
              </Grid>
              <Grid sx={{ mt: 3 }} container>
                <Grid xs={12} lg={7.5}>
                  <Typography
                    sx={{
                      mt: 1,
                      // fontSize: 35,
                      fontWeight: 550,
                      color: "white",
                      p: 1,
                      bgcolor: "#c40069",
                    }}
                  >
                    {" "}
                    Related Posts
                  </Typography>
                  <Grid container>
                    {articles.map((article: RecentArticleDataType) => {
                      const joinTitle = article.title
                        .split(" ")
                        .map(
                          (word: any) =>
                            word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join("-");
                      return (
                        <Fragment key={article.id}>
                          <Grid
                            onClick={() =>
                              history.push(
                                `/details/${article.id}/${article.category}/${joinTitle}?${new URLSearchParams({
                                  page: `${Number(page) + 1}`,
                                  limit: limit,
                                })}`,
                                {
                                  scroll: false,
                                }
                              )
                              // history.push(
                              //   `/details/${article.id}/${article.category}/${joinTitle}`
                              // )
                            }

                            sx={{ m: 1, cursor: "pointer" }}
                            xs={3.5}
                          >
                            <Image
                              style={{ marginTop: "20px" }}
                              src={article.image}
                              alt={article.title}
                              layout="responsive"
                              width={0}
                              height={0}
                            />
                            <Typography
                              sx={{ mt: 1, fontSize: 14, fontWeight: 600 }}
                            >
                              {article.title}
                            </Typography>
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
          <Grid xs={0} md={1} lg={1.1} xl={2}></Grid>
        </Grid>
        <Footer />
      </>
    </>
  );
}
