import React, { useMemo } from 'react';
import { useReactTable, getCoreRowModel, getSortedRowModel, flexRender } from '@tanstack/react-table';
import { Button } from '@mui/material';

const PetTable = ({ pets, handleUpdate, handleDelete, handleAdopt }) => {
  const columns = useMemo(
    () => [
      {
        accessorKey: 'serial',
        header: 'Serial No',
        cell: (info) => info.row.index + 1, 
      },
      {
        accessorKey: 'name',
        header: 'Pet Name',
      },
      {
        accessorKey: 'category',
        header: 'Category',
      },
      {
        accessorKey: 'image',
        header: 'Image',
        cell: (info) => <img src={info.getValue()} alt="Pet" className="h-12 w-12 rounded-full" />,
      },
      {
        accessorKey: 'adopted',
        header: 'Adopted Status',
        cell: (info) => (info.getValue() ? 'Adopted' : 'Available'),
      },
      {
        accessorKey: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
          <div className="flex !space-x-2">
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleUpdate(row.original)}
            >
              Update
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleDelete(row.original)}
            >
              Delete
            </Button>
            <Button
              variant="contained"
              color={row.original.adopted ? 'success' : 'warning'}
              onClick={() => handleAdopt(row.original)}
            >
              {row.original.adopted ? 'Undo Adopt' : 'Adopt'}
            </Button>
          </div>
        ),
      },
    ],
    [handleUpdate, handleDelete, handleAdopt]
  );

  const [sorting, setSorting] = React.useState([]);

  const table = useReactTable({
    data: pets,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
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
  );
};

export default PetTable;
