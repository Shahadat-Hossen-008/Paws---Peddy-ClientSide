import { useMemo, useState } from "react";
import { useReactTable, getCoreRowModel, getSortedRowModel, flexRender, getPaginationRowModel, getFilteredRowModel } from '@tanstack/react-table';
import { Button } from '@mui/material';


function AllPetsTable ({pets, handleUpdate, handleDelete}) {
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
            header: "status",
            cell: (info) => (info.getValue()? "Adopted": "Not Adopt"),
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
                    color="primary"
                    disabled={adopted} 
                    onClick={() => handleUpdate(row.original)}
                  >
                    Make Change
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDelete(row.original)}
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
        //no need to pass pageCount or rowCount with client-side pagination as it is calculated automatically
        
      });
  return (
    <div className="w-11/12 mx-auto !font-display">
  <table className="min-w-full bg-white shadow-md rounded-lg">
  <thead>
    {table.getHeaderGroups().map(headerGroup => (
      <tr key={headerGroup.id} className="bg-gray-200">
        {headerGroup.headers.map(header => (
          <th
            key={header.id}
            onClick={header.column.getToggleSortingHandler()}
            className="p-4 text-left font-semibold cursor-pointer"
          >
            {flexRender(header.column.columnDef.header, header.getContext())}
            <span>
              {header.column.getIsSorted()
                ? header.column.getIsSorted() === 'desc'
                  ? ' 🔽'
                  : ' 🔼'
                : ''}
            </span>
           
          </th>
        ))}
      </tr>
    ))}
  </thead>
  <tbody>
    {table.getRowModel().rows.map(row => (
      <tr key={row.id} className="border-b hover:bg-gray-100">
        {row.getVisibleCells().map(cell => (
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
    variant='outlined'
      className="border rounded p-1"
      onClick={() => table.firstPage()}
      disabled={!table.getCanPreviousPage()}
    >
      {'<<'}
    </Button>
    <Button
    variant='outlined'
      className="border rounded p-1"
      onClick={() => table.previousPage()}
      disabled={!table.getCanPreviousPage()}
    >
      {'<'}
    </Button>
    <Button
      variant='outlined'
      onClick={() => table.nextPage()}
      disabled={!table.getCanNextPage()}
    >
      {'>'}
    </Button>
    <Button
    variant='outlined'
      className="border rounded p-1"
      onClick={() => table.lastPage()}
      disabled={!table.getCanNextPage()}
    >
      {'>>'}
    </Button>
    <span className="flex items-center gap-1">
      <div>Page</div>
      <strong>
        {table.getState().pagination.pageIndex + 1} of{' '}
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
        onChange={e => {
          const page = e.target.value ? Number(e.target.value) - 1 : 0
          table.setPageIndex(page)
        }}
        className="border p-1 rounded w-16"
      />
    </span>
    <select
      value={table.getState().pagination.pageSize}
      onChange={e => {
        table.setPageSize(Number(e.target.value))
      }}
    >
      {[10, 20, 30, 40, 50].map(pageSize => (
        <option key={pageSize} value={pageSize}>
          Show {pageSize}
        </option>
      ))}
    </select>
  </div>
</div>
  )
}

export default AllPetsTable