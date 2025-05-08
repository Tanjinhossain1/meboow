"use client";
import React, { useCallback, useEffect, useState } from "react";
import debounce from "lodash/debounce";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { RecentArticleDataType, VideoListUrlDataType, WithdrawRequestDataType } from "@/types/RecentArticle";
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
    | GlossaryType[]
    | VideoListUrlDataType[]
    | WithdrawRequestDataType[];
  columns: any;
  endpoint?: string;
}) {
  const [searchText, setSearchText] = useState("");
  const [isTodayPost, setIsTodayPost] = useState<boolean>(false);
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
        | VideoListUrlDataType
        | WithdrawRequestDataType
      )[]
    >(columnData);
  // paginate for mobile
  const [rows, setRows] = useState<RecentArticleDataType[]>([]);
  const [rowCount, setRowCount] = useState(0); // total row count
  const [loading, setLoading] = useState<boolean>(false);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 20,
  });

  // Fetch data when pagination model changes
  const fetchData = async (page: number, pageSize: number) => {
    try {
      setLoading(true);
      if (endpoint) {
        const response = await axios.get(endpoint, {
          params:
            isTodayPost === true
              ? searchText !== ""
                ? {
                    page: page + 1, // Page index starts from 1 in most APIs
                    limit: pageSize,
                    searchTerm: searchText,
                    isTodayPost: true,
                  }
                : {
                    page: page + 1, // Page index starts from 1 in most APIs
                    limit: pageSize,
                    isTodayPost: true,
                  }
              : searchText !== ""
              ? {
                  page: page + 1, // Page index starts from 1 in most APIs
                  limit: pageSize,
                  searchTerm: searchText,
                }
              : {
                  page: page + 1, // Page index starts from 1 in most APIs
                  limit: pageSize,
                },
        });
        console.log("first page: admin mobile manage ", response);

        setRows(response?.data?.data); // set the fetched rows
        setRowCount(response?.data?.meta?.total); // set the total number of rows
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (endpoint) {
      fetchData(paginationModel.page, paginationModel.pageSize);
    }
  }, [endpoint, isTodayPost]);

  // Handle search
  const handleSearch = useCallback(
    debounce(async (value: any, isTodayPostParam: boolean) => {
      setLoading(true);
      // const value = event.target.value.toLowerCase();
      setSearchText(value);
      if (endpoint) {
        const response = await axios.get(endpoint, {
          params:
            isTodayPostParam === true
              ? {
                  page: paginationModel.page + 1, // Page index starts from 1 in most APIs
                  limit: paginationModel.pageSize,
                  searchTerm: value,
                  isTodayPost: true,
                }
              : {
                  page: paginationModel.page + 1, // Page index starts from 1 in most APIs
                  limit: paginationModel.pageSize,
                  searchTerm: value,
                  // isTodayPost: true,
                },
        });
        console.log("first page: admin mobile manage ", response);
        setRows(response?.data?.data); // set the fetched rows
        setRowCount(response?.data?.meta?.total); // set the total number of rows
        setLoading(false);
      } else {
        if ((columnData[0] as UsersTypes)?.email) {
          const filteredData = (columnData as UsersTypes[]).filter(
            (row) =>
              row.fullName.toLowerCase().includes(value) ||
              row.email.toString().includes(value) ||
              row.role.toString().includes(value)
          );
          setFilteredRows(filteredData);
          setLoading(false);
        } else if ((columnData[0] as GlossaryType)?.display_name) {
          const filteredData = (columnData as GlossaryType[]).filter(
            (row) => row?.display_name.toLowerCase().includes(value)
            //   ||
            // row.age.toString().includes(value)
          );
          setFilteredRows(filteredData);
          setLoading(false);
        } else if ((columnData[0] as NetworkBandsType)?.country) {
          const filteredData = (columnData as NetworkBandsType[]).filter(
            (row) => row?.country.toLowerCase().includes(value)
            //   ||
            // row.age.toString().includes(value)
          );
          setFilteredRows(filteredData);
          setLoading(false);
        } 
        else if ((columnData[0] as RecentArticleDataType)?.category) {
          const filteredData = (columnData as RecentArticleDataType[]).filter(
            (row) =>
              row?.title.toLowerCase().includes(value) ||
              row.category.toString().includes(value)
          );
          setFilteredRows(filteredData);
          setLoading(false);
        }
        else if ((columnData[0] as VideoListUrlDataType)) {
          const filteredData = (columnData as VideoListUrlDataType[]).filter(
            (row) =>
              row?.video.toLowerCase().includes(value) ||
              row.income.toString().includes(value)
          );
          setFilteredRows(filteredData);
          setLoading(false);
        }
        else if ((columnData[0] as WithdrawRequestDataType)) {
          const filteredData = (columnData as WithdrawRequestDataType[]).filter(
            (row) =>
              row?.email.toLowerCase().includes(value)
          );
          setFilteredRows(filteredData);
          setLoading(false);
        }
         else {
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
          setLoading(false);
        }
      }
    }, 300),
    []
  );
  const onSearchInputChange = (event: any) => {
    const value = event.target.value.toLowerCase();
    setSearchText(value);
    handleSearch(value, isTodayPost); // Trigger the debounced search
  };
  return (
    <div className="max-w-[1400px] mx-auto mt-3" style={{ width: "100%" }}>
      <Link href={"/admin"}>
        <Button variant="contained" color="info">
          Back To Dashboard
        </Button>
      </Link>

      <div className="flex justify-between gap-5">
        <div className="flex mt-1 mb-2 items-center bg-background border border-input rounded-lg shadow-sm w-full max-w-md">
          {" "}
          <div className="px-4">
            <SearchIcon className="w-5 h-5 text-muted-foreground" />
          </div>
          <Input
            type="search"
            value={searchText}
            onChange={onSearchInputChange}
            placeholder="Search..."
            className="flex-1 w-full py-2 pr-4 text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          <CompoButton
            type="submit"
            variant="ghost"
            className="px-4 py-2 rounded-r-lg"
          >
            Search
          </CompoButton>
        </div>
        {endpoint && isTodayPost === false ? (
          <Button
            onClick={() => setIsTodayPost(true)}
            sx={{ mb: 2 }}
            variant="contained"
            color="secondary"
            size="small"
          >
            Today Post Only
          </Button>
        ) : endpoint ? (
          <Button
            onClick={() => setIsTodayPost(false)}
            sx={{ mb: 2 }}
            variant="contained"
            color="info"
            size="small"
          >
            Total List
          </Button>
        ) : null}
      </div>
      {/* DataGrid */}
      {endpoint ? (
        <DataGrid
          rows={rows}
          columns={columns}
          paginationModel={paginationModel}
          onPaginationModelChange={(newModel) => {
            fetchData(newModel.page, newModel.pageSize);
            setPaginationModel(newModel);
          }}
          rowCount={rowCount} // set total rows count
          paginationMode="server" // enable server-side pagination
          pageSizeOptions={[20, 30, 40, 50]} // options for page sizes
          loading={loading} // show a loading spinner when fetching data
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
