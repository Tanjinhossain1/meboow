"use client";
import React, { useContext, useState } from "react";
import { Button, Typography } from "@mui/material";
import { RecentArticleDataType } from "@/types/RecentArticle";
import { formatDate, formatForUrl } from "@/utils/utils";
import Link from "next/link";
import axios from "axios";
import CommonTableComponent from "../../_components/CommonTable";
import SnackbarProviderContext from "@/Component/SnackbarProvider";
import BackdropProviderContext from "@/Component/BackdropProvider";

export default function MainArticlesDetailList({
  articles,
  user,
}: {
  articles: RecentArticleDataType[];
  user: any;
}) {
  const [copied, setCopied] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null); // State to track copied row ID
  const { handleOpen, handleClose } = useContext(BackdropProviderContext);
  const { handleOpen: SnackbarOpen, handleClose: SnackbarClose } = useContext(
    SnackbarProviderContext
  );

  const handleCopy = async (params: RecentArticleDataType) => {
    try {
      const textToCopy =
        params.category === "Mobiles"
          ? `${process.env.NEXT_PUBLIC_DOMAIN_URL}/review/${formatForUrl(
              params.title
            )}`
          : `${process.env.NEXT_PUBLIC_DOMAIN_URL}/article/${formatForUrl(
              params.title
            )}`;

      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setCopiedId(params?.id);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    } catch (error) {
      console.error("Failed to copy: ", error);
    }
  };
  const handlePostToFacebook = async (params: RecentArticleDataType) => {
    try {
      const postUrl =
        params.category === "Mobiles"
          ? `${process.env.NEXT_PUBLIC_DOMAIN_URL}/review/${formatForUrl(
              params.title
            )}`
          : `${process.env.NEXT_PUBLIC_DOMAIN_URL}/article/${formatForUrl(
              params.title
            )}`;

      // Ensure you replace {PAGE_ACCESS_TOKEN} with your actual Page Access Token
      const response = await axios.post(
        `https://graph.facebook.com/${process.env.NEXT_PUBLIC_FACEBOOK_PAGE_ID}/feed`,
        {
          message: `${params?.title}`,
          link:postUrl,
          access_token: process.env.NEXT_PUBLIC_FACEBOOK_ACCESS_TOKEN,
        }
      );
      console.log("Post successful:", response.data);
      SnackbarOpen("Article posted to Facebook successfully!", "success");
    } catch (error) {
      console.error("Error posting to Facebook:", error);
      SnackbarOpen("Error posting to Facebook", "error");
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "title", headerName: "Title", width: 480 },
    {
      field: "createdAt",
      headerName: "Create Date",
      renderCell: (params: any) => (
        <Typography alignItems={"center"} sx={{ mt: 2 }}>
          {formatDate(params?.row?.createdAt)}
        </Typography>
      ),
      width: 150,
    },
    user?.role === "admin" &&{
      field: "admin_detail",
      headerName: "Created By",
      renderCell: (params: any) => (
        <Typography alignItems={"center"} sx={{ mt: 2 }}>{params?.row?.admin_detail?.name}</Typography>
      ),
      width: 150,
    },
    user?.role === "admin" && {
      field: "admin_detail.role",
      headerName: "Role",
      renderCell: (params: any) => (
        <Typography alignItems={"center"} sx={{ mt: 2 }}>{params?.row?.admin_detail?.role}</Typography>
      ),
      width: 150,
    },
    {
      field: "post",
      headerName: "Post",
      renderCell: (params: any) => (
        <Button
          size="small"
          variant="contained"
          color="primary"
          onClick={() => {
            if (window.confirm("Are you sure you want to POST?")) {
              handlePostToFacebook(params.row)}
            }
          } 
        >
          Post
        </Button>
      ),
      width: 100,
    },
    {
      field: "actions",
      headerName: "Edit",
      renderCell: (params: any) => (
        <Link href={`/admin/article/edit/${params?.row?.id}`}>
          {" "}
          <Button size="small" variant="contained" color="success">
            Edit
          </Button>
        </Link>
      ),
      width: 100,
    },
    {
      field: "copy",
      headerName: "Copy",
      renderCell: (params: any) => (
        <div>
          <Button
            color={copiedId === params.row.id ? "success" : "info"}
            size="small"
            variant="contained"
            onClick={() => handleCopy(params?.row)}
            className="copy-button"
          >
            {copiedId === params.row.id ? "Copied!" : "Copy URL"}
          </Button>
        </div>
      ),
      width: 100,
    },
    user?.role === "admin" && {
      field: "delete",
      headerName: "Delete",
      renderCell: (params: any) => (
        <Button
          size="small"
          onClick={() => {
            if (window.confirm("Are you sure you want to Delete Article?")) {
              console.log("delete");
              handleOpen();
              axios
                .delete(`/api/article/delete/${params?.row?.id}`)
                .then((response) => {
                  if (response?.data?.success) {
                    handleClose();
                    SnackbarOpen("Success Fully Delete Article", "success");
                    window.location.reload();
                  }
                })
                .catch((err) => {
                  handleClose();
                  console.error("Error creating article:", err);
                });
            }
          }}
          variant="contained"
          color="error"
        >
          Delete
        </Button>
      ),
      width: 100,
    },
  ];
  return <CommonTableComponent columnData={articles} columns={columns} />;
}
