import { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { Button, Typography } from "@mui/material";

function AdoptionRequestTable({
  adoptionRequestPets,
  handleAccept,
  handleReject,
}) {
  const columns = useMemo(
    () => [
      {
        accessorKey: "serial",
        header: "Serial No",
        cell: (info) => info.row.index + 1,
        enableSorting: false,
      },
      {
        accessorKey: "image",
        header: "Image",
        cell: (info) => (
          <img
            src={info.getValue()}
            alt="Pet"
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
        accessorKey: "userName",
        header: "Requester Name",
        enableSorting: true,
      },
      {
        accessorKey: "userEmail",
        header: "Requester Email",
        enableSorting: true,
      },

      {
        accessorKey: "phoneNumber",
        header: "Phone Number",
        enableSorting: true,
      },
      {
        accessorKey: "location",
        header: "Location",
        enableSorting: true,
      },
      {
        accessorKey: "adopted",
        header: "Adopted Status",
        cell: (info) => (
          <Typography
            variant="body2"
            style={{
              color: info.getValue()=== "Adopted" ?  "green" : "red" ,
              fontWeight: "bold",
            }}
          >
            {info.getValue() === "Adopted" ? "Adopted" : 'Not Adopted'}
          </Typography>
        ),
        enableSorting: true,
      },
      {
        accessorKey: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const adopted = row.original.adopted;
          return (
            <div className="flex !space-x-2">
              <Button
                variant="contained"
                color={adopted ? "success" : "primary"}
                disabled={adopted === 'Adopted' || adopted ==='Not Adopted'}
                className="disabled:cursor-not-allowed"
                onClick={() => handleAccept(row.original.petId, true, row.original.petName)}
              >
                Accept
              </Button>
              <Button
                variant="contained"
                disabled={adopted === 'Not Adopted' ||adopted === 'Adopted'}
                className="disabled:cursor-not-allowed"
                color="secondary"
                onClick={() => handleReject(row.original.petId, false, row.original.petName)}
              >
                Reject
              </Button>
            </div>
          );
        },
        enableSorting: false,
      },
    ],
    [handleAccept, handleReject]
  );
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const table = useReactTable({
    data: adoptionRequestPets,
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
    //no need to pass pageCount or rowCount with client-side pagination as it is calculated automatically
  });

  return (
    <div>
      <table className="min-w-full bg-white shadow-md rounded-lg !font-display overflow-x-auto text-black">
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
      <div className="flex flex-wrap gap-2 items-center justify-between">
        <Button
          variant="outlined"
          className="border rounded p-1"
          onClick={() => table.firstPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<<"}
        </Button>
        <Button
          variant="outlined"
          className="border rounded p-1"
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
          className="border rounded p-1"
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
  );
}

export default AdoptionRequestTable;
