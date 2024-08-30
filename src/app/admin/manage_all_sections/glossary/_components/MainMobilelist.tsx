"use client";
import React, { useContext, useState } from "react";
import { Button, Typography } from "@mui/material";
import { formatDate, formatForUrlWith_under_score } from "@/utils/utils";
import Link from "next/link";
import axios from "axios";
import CommonTableComponent from "../../_components/CommonTable";
import SnackbarProviderContext from "@/Component/SnackbarProvider";
import BackdropProviderContext from "@/Component/BackdropProvider";
import { GlossaryType } from "@/types/network-bands";

export default function MainNetworkList({
  glossary,
  user,
}: {
  glossary: GlossaryType[];
  user: any;
}) {
  
  const { handleOpen: SnackbarOpen, handleClose: SnackbarClose } = useContext(
    SnackbarProviderContext
  );
  const [copied, setCopied] = useState(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const handleCopy = async (params: GlossaryType) => {
    try {
      const textToCopy = `${process.env.NEXT_PUBLIC_DOMAIN_URL}/glossary/${formatForUrlWith_under_score(params?.route)}`;

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
    { field: "display_name", headerName: "Display Name", width: 400 },
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
      <Link href={`/admin/glossary/edit/${params?.row?.id}`}>
        <Button
           
          variant="contained"
          color="success"
        >
          Edit
        </Button></Link>
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
          onClick={() => {
            if (window.confirm("Are you sure you want to Delete glossary?")) {
              console.log("delete");
              handleOpen();
              axios
                .delete(`/api/glossary/delete/${params?.row?.id}`)
                .then((response) => {
                  if (response?.data?.success) {
                    handleClose();
                    SnackbarOpen("Success Fully Delete glossary", "success");
                    window.location.reload();
                  }
                })
                .catch((err) => {
                  handleClose();
                  console.error("Error creating glossary:", err);
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
    <>
      <CommonTableComponent columnData={glossary} columns={columns} />;
      
    </>
  );
}
