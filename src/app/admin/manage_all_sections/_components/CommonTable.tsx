"use client";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { RecentArticleDataType } from "@/types/RecentArticle";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button as CompoButton } from "@/components/ui/button";
import { MobileArticleType } from "@/types/mobiles";
import { BrandTypes, CategoryTypes } from "@/types/category";
import { UsersTypes } from "@/types/users";
import { GlossaryType, NetworkBandsType } from "@/types/network-bands";
import axios from "axios";

export default function CommonTableComponent({
  columnData,
  columns,
  endpoint,
}: {
  columnData:
    | RecentArticleDataType[]
    | MobileArticleType[]
    | BrandTypes[]
    | CategoryTypes[]
    | UsersTypes[]
    | NetworkBandsType[]
    | GlossaryType[];
  columns: any;
  endpoint?: string;
}) {
  const [searchText, setSearchText] = useState("");
  const [filteredRows, setFilteredRows] =
    useState<
      (
        | RecentArticleDataType
        | MobileArticleType
        | BrandTypes
        | CategoryTypes
        | UsersTypes
        | NetworkBandsType
        | GlossaryType
      )[]
    >(columnData);
  // paginate for mobile
  const [rows, setRows] = useState<RecentArticleDataType[]>([]);
  const [rowCount, setRowCount] = useState(0); // total row count

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 20,
  });

  // Fetch data when pagination model changes
  useEffect(() => {
    const fetchData = async (page: number, pageSize: number) => {
      try {
        if (endpoint) {
          const response = await axios.get(endpoint, {
            params: {
              page: page + 1, // Page index starts from 1 in most APIs
              limit: pageSize,
            },
          });
          console.log("first page: admin mobile manage ", response);
          setRows(response?.data?.data); // set the fetched rows
          setRowCount(response?.data?.meta?.total); // set the total number of rows
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (endpoint) {
      fetchData(paginationModel.page, paginationModel.pageSize);
    }
  }, [endpoint, paginationModel]);

  // Handle search
  const handleSearch = async (event: any) => {
    const value = event.target.value.toLowerCase();
    setSearchText(value);
    if (endpoint) {
      const response = await axios.get(endpoint, {
        params: {
          page: paginationModel.page + 1, // Page index starts from 1 in most APIs
          limit: paginationModel.pageSize,
          searchTerm: value
        },
      });
      console.log("first page: admin mobile manage ", response);
      setRows(response?.data?.data); // set the fetched rows
      setRowCount(response?.data?.meta?.total); // set the total number of rows
    } else {
      if ((columnData[0] as UsersTypes)?.email) {
        const filteredData = (columnData as UsersTypes[]).filter(
          (row) =>
            row.fullName.toLowerCase().includes(value) ||
            row.email.toString().includes(value) ||
            row.role.toString().includes(value)
        );
        setFilteredRows(filteredData);
      } else if ((columnData[0] as GlossaryType)?.display_name) {
        const filteredData = (columnData as GlossaryType[]).filter(
          (row) => row?.display_name.toLowerCase().includes(value)
          //   ||
          // row.age.toString().includes(value)
        );
        setFilteredRows(filteredData);
      } else if ((columnData[0] as NetworkBandsType)?.country) {
        const filteredData = (columnData as NetworkBandsType[]).filter(
          (row) => row?.country.toLowerCase().includes(value)
          //   ||
          // row.age.toString().includes(value)
        );
        setFilteredRows(filteredData);
      } else {
        const filteredData = (
          columnData as (
            | RecentArticleDataType
            | MobileArticleType
            | BrandTypes
            | CategoryTypes
          )[]
        ).filter(
          (row) => row?.title.toLowerCase().includes(value)
          //   ||
          // row.age.toString().includes(value)
        );
        setFilteredRows(filteredData);
      }
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto mt-3" style={{ width: "100%" }}>
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
      {endpoint ? (
        <DataGrid
          rows={rows}
          columns={columns}
          paginationModel={paginationModel}
          onPaginationModelChange={(newModel) => setPaginationModel(newModel)}
          rowCount={rowCount} // set total rows count
          paginationMode="server" // enable server-side pagination
          pageSizeOptions={[20, 30, 40, 50]} // options for page sizes
          loading={!rows?.length} // show a loading spinner when fetching data
        />
      ) : (
        <DataGrid
          rows={filteredRows}
          columns={columns}
          paginationModel={paginationModel}
          onPaginationModelChange={(newModel) => setPaginationModel(newModel)}
          pageSizeOptions={[20, 30, 40, 50]} // options for page sizes
        />
      )}
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
