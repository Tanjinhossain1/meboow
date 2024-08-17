"use client";
import React, { useContext, useState } from "react";
import { Button, Typography } from "@mui/material";
import { RecentArticleDataType } from "@/types/RecentArticle";
import { formatDate } from "@/utils/utils";
import Link from "next/link";
import axios from "axios";
import CommonTableComponent from "../../_components/CommonTable";
import SnackbarProviderContext from "@/Component/SnackbarProvider";
import BackdropProviderContext from "@/Component/BackdropProvider";
import { MobileArticleType } from "@/types/mobiles";
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

  const handleCopy = async (params: MobileArticleType) => {
    try {
      const textToCopy = `${process.env.NEXT_PUBLIC_DOMAIN_URL}/mobile/detail/${params?.id}`;

      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setCopiedId(params?.id);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    } catch (error) {
      console.error("Failed to copy: ", error);
    }
  };
  const { handleOpen, handleClose } = useContext(BackdropProviderContext);

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
