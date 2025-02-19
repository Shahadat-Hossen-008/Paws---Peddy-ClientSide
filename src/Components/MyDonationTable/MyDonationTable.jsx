import { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { Box, Button, LinearProgress, Modal } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import DonatorsTable from "../DonatorsTable/DonatorsTable";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  overflowY: "auto",
  maxHeight: "90vh",
};

function MyDonationTable({ donationPets, handlePause }) {
  const [open, setOpen] = useState(false);
  const [selectedPetId, setSelectedPetId] = useState(null); 
  const [selectedPetName, setSelectedPetName] = useState(null); 

  const handleView = (id, petName) => {
    setSelectedPetId(id); 
    setSelectedPetName(petName);
    setOpen(true); 
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedPetId(null); 
  };
  const columns = useMemo(
    () => [
      {
        accessorKey: "serial",
        header: "Serial No",
        cell: (info) => info.row.index + 1,
        enableSorting: false,
      },
      {
        accessorKey: "petImage",
        header: "Image",
        cell: (info) => (
          <img
            src={info.getValue()}
            alt="pet"
            referrerPolicy="no-referrer"
            className="h-12 w-12 rounded-full"
          />
        ),
        enableSorting: false,
      },
      {
        accessorKey: "petName",
        header: "Pet Name",
        enableSorting: true,
      },
      {
        accessorKey: "highestDonationAmount",
        header: "Maximum Donation",
        enableSorting: true,
        cell: (info) => (
          <span className="font-semibold text-green-600">
            ${info.getValue().toLocaleString()}
          </span>
        ),
      },
      {
        accessorKey: "donatedAmount",
        header: "Status",
        cell: ({ row }) => {
          const donatedAmount = row.original.donatedAmount;
          const highestDonationAmount = row.original.highestDonationAmount;
          const donationPercentage =
            (donatedAmount / highestDonationAmount) * 100;

          return (
            <div className="!space-y-1">
              <span className="text-sm font-medium text-gray-700">
                ${donatedAmount.toLocaleString()} / $
                {highestDonationAmount.toLocaleString()}
              </span>
              <LinearProgress
                variant="determinate"
                value={donationPercentage}
                className="h-2 rounded-lg"
                style={{
                  backgroundColor: "#e0e0e0",
                  height: "10px",
                  borderRadius: "8px",
                }}
              />
            </div>
          );
        },
        enableSorting: false,
      },
      {
        accessorKey: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const id = row.original._id;
          const petName = row.original.petName;
          return (
            <div className="flex !space-x-2">
              <Link to={`/dashboard/updateDonationPetInfo/${id}`}>
                <Button variant="contained">Edit Donation</Button>
              </Link>
              <Button
                variant="contained"
                color="secondary"
                disabled={row.original.pause}
                onClick={() => handlePause(row.original)}
              >
                Pause Donation
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleView(id, petName)}
              >
                View Donators
              </Button>
              
            </div>
          );
        },
        enableSorting: false,
      },
    ],
    [handlePause]
  );

  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data: donationPets,
    columns,
    state: {
      sorting,
      pagination,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
  });

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg font-display">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="bg-gray-200">
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  className="p-4 text-left font-semibold cursor-pointer"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  <span>
                    {header.column.getIsSorted()
                      ? header.column.getIsSorted() === "desc"
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="border-b hover:bg-gray-100">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="p-4">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="h-2 mt-2" />
      <div className="flex items-center gap-2">
        <Button
          variant="outlined"
          onClick={() => table.firstPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<<"}
        </Button>
        <Button
          variant="outlined"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </Button>
        <Button
          variant="outlined"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {">"}
        </Button>
        <Button
          variant="outlined"
          onClick={() => table.lastPage()}
          disabled={!table.getCanNextPage()}
        >
          {">>"}
        </Button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount().toLocaleString()}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            min="1"
            max={table.getPageCount()}
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="border p-1 rounded w-16"
          />
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
      <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                {selectedPetId && (
            <DonatorsTable petId={selectedPetId} petName={selectedPetName} />
          )}
                </Box>
              </Modal>
    </div>
  );
}

export default MyDonationTable;
