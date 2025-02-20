import { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import {  Button } from "@mui/material";


function MyDonationTable ({donators, handleRefund}) {
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
        accessorKey: "donationAmount",
        header: "Donation Amount",
        enableSorting: true,
        cell: (info) => (
          <span className="font-semibold text-green-600">
            ${info.getValue().toLocaleString()}
          </span>
        ),
      },
      {
        accessorKey: "transactionId",
        header: "Transaction ID",
        enableSorting: true,
      },
      {
        accessorKey: "donationDate",
        header: "Donation Date",
        enableSorting: true,
        },
      {
        accessorKey: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const id = row.original._id;
          const petName = row.original.petName;
          return (
            <div className="flex !space-x-2">
              <Button
                variant="contained"
                color="secondary"
                disabled={row.original.donationAmount == 0}
                onClick={() => handleRefund(row.original)}
              >
                Refund
              </Button>
              
            </div>
          );
        },
        enableSorting: false,
      },
    ],
    [handleRefund]
  );
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data: donators,
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
     
    </div>
  )
}

export default MyDonationTable