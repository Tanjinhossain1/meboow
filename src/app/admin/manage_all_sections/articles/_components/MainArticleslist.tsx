"use client";
import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { TextField } from "@mui/material";

const columns = [
    {
        field: 'serialNo',
        headerName: 'S. No.',
        width: 80,
        renderCell: (params:any) => {
          // Calculate serial number based on the row index
          const serialNumber = params.api.getRowIndex(params.id) + 1;
          return serialNumber;
        },
      },
  { field: "id", headerName: "ID", width: 90 },
  { field: "name", headerName: "Name", width: 150 },
  { field: "age", headerName: "Age", width: 110 },
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

const rows = [
  { id: 1, name: "John Doe", age: 35 },
  { id: 2, name: "Jane Doe", age: 42 },
  { id: 3, name: "Alice Smith", age: 29 },
  { id: 4, name: "Bob Johnson", age: 31 },
  { id: 5, name: "Bob Johnson", age: 31 },
  { id: 6, name: "Bob Johnson", age: 31 },
  { id: 7, name: "Bob Johnson", age: 31 },
  { id: 8, name: "Bob Johnson", age: 31 },
  { id: 9, name: "Bob Johnson", age: 31 },
  { id: 10, name: "Bob Johnson", age: 31 },
  { id: 11, name: "Bob Johnson", age: 31 },
  { id: 12, name: "Bob Johnson", age: 31 },
  { id: 13, name: "Bob Johnson", age: 31 },
  { id: 14, name: "Bob Johnson", age: 31 },
];

export default function MainArticlesDetailList() {
  const [searchText, setSearchText] = useState("");
  const [filteredRows, setFilteredRows] = useState(rows);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });

  // Handle search
  const handleSearch = (event: any) => {
    const value = event.target.value.toLowerCase();
    setSearchText(value);
    const filteredData = rows.filter(
      (row) =>
        row.name.toLowerCase().includes(value) ||
        row.age.toString().includes(value)
    );
    setFilteredRows(filteredData);
  };

  return (
    <div style={{ height: 500, width: "100%" }}>
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
        pageSizeOptions={[5, 10, 20, 30, 40, 50]} // options for page sizes
      />
    </div>
  );
}
