import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

interface IAppProps {
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
   width:"40%",
   margin:"auto"
 }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    // '&:last-child td, &:last-child th': {
    //   borderRight: "2px solid #888",
    // },
  }));  

  function createData(
    name: string,
    calories: string,
   
    
  ) {
    return { name, calories};
  }
  
  const rows = [
    createData("15 Days before the Event – 60% Amount will be refunded.", "55 Days before the Tour – 60% Amount will be refunded."),
    createData('5 to 10 Days before the Event – 40% Amount will be refunded.', "54 to 40 Days before the Tour – 40% Amount will be refunded"),
    createData('2 to 5 Days before the Event – 20% Amount will be refunded.', "39 to 30 Days before the Tour – 30% Amount will be refunded."),
    createData('1 Days before the Event – NO Amount will be refunded.', "29 to 15 Days before the Tour – 10% Amount will be refunded."),
    createData('—–', "14 to 0 Days before the Tour – NO Amount will be refunded.No Show No Refund"),
  ];
  

const TableCancellationPolicy: React.FunctionComponent = (props) => {
  return <>
 
      <TableContainer>
      <Table  component={Paper} sx={{width:"85%", mx:"auto" , margin:"2% 8% 4%  7%"}} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Treks</StyledTableCell>
            <StyledTableCell align="left">Tours</StyledTableCell>
           
            
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow   key={row.name}>
              <StyledTableCell sx={{xs:6, borderRight:"2px solid #e0e0e0"}} align="left" component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="left" sx={{xs:6}}>{row.calories}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

  </> ;
};

export default TableCancellationPolicy;
