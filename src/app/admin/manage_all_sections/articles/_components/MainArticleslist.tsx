"use client";
import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { TextField } from "@mui/material";
import { RecentArticleDataType } from "@/types/RecentArticle";

const columns = [
     
  { field: "id", headerName: "ID", width: 90 },
  { field: "title", headerName: "Title", width: 500 },
  { field: "createdAt", headerName: "Create Date", width: 180 },
  {
    field: "actions",
    headerName: "Actions",
    renderCell: (params: any) => (
      <button onClick={() => alert(`Action on ${params.row.id}`)}>
        Action
      </button>
    ),
    width: 150,
  },
];
export default function MainArticlesDetailList({articles}:{articles:RecentArticleDataType[]}) {
  const [searchText, setSearchText] = useState("");
  const [filteredRows, setFilteredRows] = useState<RecentArticleDataType[]>(articles);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 20,
  });

  // Handle search
  const handleSearch = (event: any) => {
    const value = event.target.value.toLowerCase();
    setSearchText(value);
    const filteredData = articles.filter(
      (row) =>
        row.title.toLowerCase().includes(value) 
    //   ||
        // row.age.toString().includes(value)
    );
    setFilteredRows(filteredData);
  };

  return (
    <div className="max-w-[1000px] mx-auto" style={{   width: "100%" }}>
      {/* Search input */}
      <TextField
        label="Search"
        variant="outlined"
        value={searchText}
        onChange={handleSearch}
        style={{ marginBottom: 16 }}
      />
      {/* DataGrid */}
      <DataGrid
        rows={filteredRows}
        columns={columns}
        paginationModel={paginationModel}
        onPaginationModelChange={(newModel) => setPaginationModel(newModel)}
        pageSizeOptions={[20, 30, 40, 50]} // options for page sizes
      />
    </div>
  );
}
