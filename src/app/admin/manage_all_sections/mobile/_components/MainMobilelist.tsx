"use client";
import React, { useContext, useState } from "react";
import { Button, Stack, Typography } from "@mui/material";
import { formatDateWithTime, formatForUrl } from "@/utils/utils";
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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CopyIcon, DownloadIcon } from "lucide-react";

export default function MainMobilesDetailList({ user }: { user: any }) {
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

  const handleDownload = async (mobileArticle: MobileArticleType) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_IMAGE_SERVER_URL}/get/${mobileArticle?.display_image}`
      );
      const blob = await response.blob();
      function getFileType(filename: string) {
        // Match the extension after the last dot
        const match = filename.match(/\.([a-zA-Z0-9]+)$/);
        return match ? match[1].toLowerCase() : null; // Returns the extension in lowercase or null if not found
      }
      // Create a temporary link to download the blob
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${mobileArticle?.title}.${getFileType(
        mobileArticle?.display_image
      )}`; // Set the downloaded file name

      // Trigger the download
      document.body.appendChild(link);
      link.click();

      // Clean up by removing the link and revoking the object URL
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error("Failed to download image:", error);
    }
  };

  const handlePostToFacebook = async (
    params: MobileArticleType,
    urlPrefix:
      | "Facebook"
      | "Twitter"
      | "Whatsapp"
      | "Linkedin"
      | "Pinterest"
      | "Tumblr"
      | "Quora"
  ) => {
    // const url = `https://www.safarilist.com/mobile/Apple-IPhone-13`;
    const url = `https://www.safarilist.com/mobile/${formatForUrl(
      params?.title
    )}`;
    commonShareFunc(url, params, urlPrefix);
    // window.open(
    //   `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    //   "_blank",
    //   "noopener,noreferrer"
    // );
  };
  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "title", headerName: "Title", width: 300 },
    { field: "brands", headerName: "Brand", width: 100 },
    {
      field: "createdAt",
      headerName: "Create Date",
      renderCell: (params: any) => (
        <Typography alignItems={"center"} sx={{ mt: 2, fontSize: 15 }}>
          {formatDateWithTime(params?.row?.createdAt)}
        </Typography>
      ),
      width: 230,
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
            <SButton color="red" className="bg-cyan-500">
              Post
            </SButton>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Share</DialogTitle>
              <DialogDescription className="text-2xl flex">
                {params?.row?.title} <CopyIcon className="cursor-pointer ml-2" onClick={async() => await navigator.clipboard.writeText(params.row?.title)} />
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {[
                "Twitter",
                "Pinterest",
                "Tumblr",
                "Facebook",
                "Quora",
                "Linkedin",
                // "Whatsapp",
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
            <Stack direction={"row"} gap={2}>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleCopy(params.row)}
              >
                Copy Link
              </Button>
              <Button
                variant="contained"
                color="primary"
                startIcon={<DownloadIcon />}
                onClick={() => handleDownload(params.row)}
              >
                Download Image
              </Button>
            </Stack>
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
  return (
    <CommonTableComponent
      columnData={[]}
      endpoint={`/api/article/mobile`}
      columns={columns}
    />
  );
}
