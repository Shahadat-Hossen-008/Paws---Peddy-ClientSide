import React from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
function DonatorsTable({ petId , petName}) {
  const axiosSecure = useAxiosSecure();
  const { data: donators = []} = useQuery({
    queryKey: ["pet"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payment/petId/${petId}`);
      return res.data;
    },
  });
  
  return (
    <TableContainer component={Paper}>
     <h2 className="font-display font-semibold text-2xl my-4 mx-5">List of Donors for {petName}</h2>
      <Table sx={{ maxWidth: 1250 }} aria-label="simple table" className="!font-display">
        <TableHead>
          <TableRow>
            <TableCell align="middle">Serial No.</TableCell>
            <TableCell align="middle">Donator Name</TableCell>
            <TableCell align="middle">Donation Amount</TableCell>
            <TableCell align="middle">Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {donators.map((row, index) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="middle">{index + 1}</TableCell>
              <TableCell align="middle">{row.donatorName}</TableCell>
              <TableCell align="middle">${row.donationAmount}</TableCell>
              <TableCell align="middle">{row.donationDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DonatorsTable;
