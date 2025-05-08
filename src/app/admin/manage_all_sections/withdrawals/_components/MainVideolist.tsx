"use client";
import React, { useContext } from "react";
import { Button, Typography } from "@mui/material";
import { formatDate } from "@/utils/utils";
import axios from "axios";
import CommonTableComponent from "../../_components/CommonTable";
import SnackbarProviderContext from "@/Component/SnackbarProvider";
import BackdropProviderContext from "@/Component/BackdropProvider";
import { WithdrawRequestDataType } from "@/types/RecentArticle";

export default function MainVideoDetailList({
  articles,
  user,
}: {
  articles: WithdrawRequestDataType[];
  user: any;
}) {
  const { handleOpen, handleClose } = useContext(BackdropProviderContext);
  const { handleOpen: SnackbarOpen, handleClose: SnackbarClose } = useContext(
    SnackbarProviderContext
  );



  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "method", headerName: "Method", width: 200 },
    { field: "phoneNumber", headerName: "Phone Number", width: 200 },
    { field: "email", headerName: "Email", width: 300 },
    { field: "amount", headerName: "Amount", width: 300 },
    // { field: "status", headerName: "Status", width: 300 },
    {
      field: "createdAt",
      headerName: "Create Date",
      renderCell: (params: any) => (
        <Typography alignItems={"center"} sx={{ mt: 2 }}>
          {formatDate(params?.row?.createdAt)}
        </Typography>
      ),
      width: 200,
    }
  ];
  return <CommonTableComponent columnData={articles} columns={columns} />;
}
