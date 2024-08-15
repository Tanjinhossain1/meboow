"use client";
import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, TextField, Typography } from "@mui/material";
import { RecentArticleDataType } from "@/types/RecentArticle";
import { formatDate } from "@/utils/utils";
import Link from "next/link";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button as CompoButton } from "@/components/ui/button";
import { MobileArticleType } from "@/types/mobiles";
import { BrandTypes, CategoryTypes } from "@/types/category";

export default function CommonTableComponent({
  columnData,
  columns,
}: {
  columnData: RecentArticleDataType[] | MobileArticleType[] | BrandTypes[] | CategoryTypes[];
  columns: any;
}) {
  const [searchText, setSearchText] = useState("");
  const [filteredRows, setFilteredRows] =
    useState<(RecentArticleDataType | MobileArticleType | BrandTypes| CategoryTypes)[]>(
      columnData
    );
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 20,
  });

  // Handle search
  const handleSearch = (event: any) => {
    const value = event.target.value.toLowerCase();
    setSearchText(value);
    const filteredData = columnData.filter(
      (row) => row.title.toLowerCase().includes(value)
      //   ||
      // row.age.toString().includes(value)
    );
    setFilteredRows(filteredData);
  };

  return (
    <div className="max-w-[1000px] mx-auto mt-3" style={{ width: "100%" }}>
      {/* Search input */}
      {/* <TextField
        label="Search"
        variant="outlined"
        value={searchText}
        onChange={handleSearch}
        style={{ marginBottom: 16 }}
      /> */}
      <Link href={"/admin"}>
        <Button variant="contained" color="info">
          Back To Dashboard
        </Button>
      </Link>
      <div className="flex mt-1 mb-2 items-center bg-background border border-input rounded-lg shadow-sm w-full max-w-md">
        <div className="px-4">
          <SearchIcon className="w-5 h-5 text-muted-foreground" />
        </div>
        <Input
          type="search"
          value={searchText}
          onChange={handleSearch}
          placeholder="Search..."
          className="flex-1 py-2 pr-4 text-foreground placeholder:text-muted-foreground focus:outline-none"
        />
        <CompoButton
          type="submit"
          variant="ghost"
          className="px-4 py-2 rounded-r-lg"
        >
          Search
        </CompoButton>
      </div>
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

function SearchIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
