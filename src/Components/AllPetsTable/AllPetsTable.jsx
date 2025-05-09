import { useMemo, useState } from "react";
import { useReactTable, getCoreRowModel, getSortedRowModel, flexRender, getPaginationRowModel, getFilteredRowModel } from '@tanstack/react-table';
import { Button, Typography } from '@mui/material';

function AllPetsTable({ pets, handleUpdate, handleDelete }) {
  const columns = useMemo(
    () => [
      {
        accessorKey: "serial",
        header: "Serial No",
        cell: (info) => info.row.index + 1,
        enableSorting: false,
      },
      {
        accessorKey: "user_Email",
        header: "Owner Email",
        enableSorting: true,
      },
      {
        accessorKey: "name",
        header: "Pet Name",
        enableSorting: true,
      },
      {
        accessorKey: "category",
        header: "Category",
        enableSorting: true,
      },
      {
        accessorKey: "image",
        header: "Image",
        cell: (info) => (
          <img
            src={info.getValue()}
            alt="user"
            referrerPolicy="no-referrer"
            className="h-12 w-12 rounded-full"
          />
        ),
        enableSorting: false,
      },
      {
        accessorKey: "adopted",
        header: "Status",
        cell: (info) => (
          <Typography
            variant="body2"
            style={{
              color: info.getValue() ? "red" : "green",
              fontWeight: "bold",
            }}
          >
            {info.getValue() ? "Adopted" : "Available"}
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
            <div className="flex gap-2">
              <Button
                variant="contained"
                color={adopted ? "success" : "primary"}
                disabled={adopted}
                className="disabled:cursor-not-allowed"
                onClick={() => handleUpdate(row.original)}
              >
                Make Change
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleDelete(row.original._id)}
              >
                Delete
              </Button>
            </div>
          );
        },
        enableSorting: false,
      },
    ],
    [handleUpdate, handleDelete]
  );

  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data: pets,
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
    <div className="w-full overflow-x-auto mx-auto font-display text-black">
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="bg-gray-200">
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  className="p-4 text-left font-semibold cursor-pointer"
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
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

      {/* Pagination */}
      <div className="h-2 mt-2" />
      <div className="flex flex-wrap gap-2 items-center justify-between">
        <div className="flex gap-2">
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
        </div>

        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount().toLocaleString()}
          </strong>
        </span>

        <div className="flex items-center gap-1">
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
        </div>

        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
          className="border p-1 rounded"
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

export default AllPetsTable;
