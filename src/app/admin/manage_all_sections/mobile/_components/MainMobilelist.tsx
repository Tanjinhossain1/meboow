"use client";
import React, { useContext } from "react";
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
}: {
  mobile: MobileArticleType[];
}) {
  const { handleOpen: SnackbarOpen, handleClose: SnackbarClose } = useContext(
    SnackbarProviderContext
  );
  const { handleOpen, handleClose } = useContext(BackdropProviderContext);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
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
          <Button variant="contained" color="success">
            Edit
          </Button>
        </Link>
      ),
      width: 100,
    },
    {
      field: "delete",
      headerName: "Delete",
      renderCell: (params: any) => (
        <Button
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
