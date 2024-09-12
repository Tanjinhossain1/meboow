"use client";
import React, { useContext, useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import { RecentArticleDataType } from "@/types/RecentArticle";
import { formatDate, formatForUrl } from "@/utils/utils";
import Link from "next/link";
import axios from "axios";
import CommonTableComponent from "../../_components/CommonTable";
import SnackbarProviderContext from "@/Component/SnackbarProvider";
import BackdropProviderContext from "@/Component/BackdropProvider";
import { MobileArticleType } from "@/types/mobiles";
import { commonShareFunc } from "../../_components/CommonShare";
import { Button as SButton } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function MainMobilesDetailList({
  mobile,
  user,
}: {
  mobile: MobileArticleType[];
  user: any;
}) {
  const { handleOpen: SnackbarOpen, handleClose: SnackbarClose } = useContext(
    SnackbarProviderContext
  );
  const [copied, setCopied] = useState(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const [isPosting, setIsPosting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  console.log("is posting", isPosting, error);
  const handleCopy = async (params: MobileArticleType) => {
    try {
      const textToCopy = `${
        process.env.NEXT_PUBLIC_DOMAIN_URL
      }/mobile/${formatForUrl(params?.title)}`;

      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setCopiedId(params?.id);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    } catch (error) {
      console.error("Failed to copy: ", error);
    }
  };
  const { handleOpen, handleClose } = useContext(BackdropProviderContext);

  const handlePostToFacebook = async (
    params: MobileArticleType,
    urlPrefix:
      | "Facebook"
      | "Twitter"
      | "Whatsapp"
      | "Linkedin"
      | "Pinterest"
      | "Tumblr"
  ) => {
    // const url = `https://safarilist.com/mobile/Apple-IPhone-13`;
    const url = `https://safarilist.com/mobile/${formatForUrl(params?.title)}`;
    commonShareFunc(url, params, urlPrefix);
    // window.open(
    //   `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    //   "_blank",
    //   "noopener,noreferrer"
    // );
  };

  console.log("mobile mobile mobile   ", mobile);
  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "title", headerName: "Title", width: 400 },
    {
      field: "createdAt",
      headerName: "Create Date",
      renderCell: (params: any) => (
        <Typography alignItems={"center"} sx={{ mt: 2 }}>
          {formatDate(params?.row?.createdAt)}
        </Typography>
      ),
      width: 200,
    },
    user?.role === "admin" && {
      field: "admin_detail",
      headerName: "Created By",
      renderCell: (params: any) => (
        <Typography alignItems={"center"} sx={{ mt: 2 }}>
          {params?.row?.admin_detail?.name}
        </Typography>
      ),
      width: 150,
    },
    user?.role === "admin" && {
      field: "admin_detail.role",
      headerName: "Role",
      renderCell: (params: any) => (
        <Typography alignItems={"center"} sx={{ mt: 2 }}>
          {params?.row?.admin_detail?.role}
        </Typography>
      ),
      width: 150,
    },
    {
      field: "post",
      headerName: "Post",
      renderCell: (params: any) => (
        <Dialog>
          <DialogTrigger asChild>
            <SButton color="red"  className="bg-cyan-500">Post</SButton>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Share</DialogTitle>
              <DialogDescription className="text-2xl">
                Share witch platform you want
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {[
                "Facebook",
                "Twitter",
                "Whatsapp",
                "Linkedin",
                "Pinterest",
                "Tumblr",
              ].map((name, index) => {
                return (
                  <Button
                    key={index}
                    onClick={() =>
                      handlePostToFacebook(params.row, name as any)
                    }
                  >
                    {name}
                  </Button>
                );
              })}
            </div> 
          </DialogContent>
        </Dialog>
        // <Button
        //   size="small"
        //   variant="contained"
        //   color="primary"
        //   onClick={() => {
        //     // if (window.confirm("Are you sure you want to POST?")) {
        //     //   handlePostToFacebook(params.row);
        //     // }
        //   }}
        // >
        //   Post
        // </Button>
      ),
      width: 100,
    },
    {
      field: "actions",
      headerName: "Edit",
      renderCell: (params: any) => (
        <Link href={`/admin/mobile/edit/${params?.row?.id}`}>
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
                .delete(`/api/article/mobile/delete/${params?.row?.id}`)
                .then((response) => {
                  if (response?.data?.success) {
                    handleClose();
                    SnackbarOpen("Success Fully Delete Mobile", "success");
                    window.location.reload();
                  }
                })
                .catch((err) => {
                  handleClose();
                  console.error("Error creating Mobile:", err);
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
  return <CommonTableComponent columnData={mobile} columns={columns} />;
}
