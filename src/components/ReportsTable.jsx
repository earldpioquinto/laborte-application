import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import useStore from '../store/dataStore';

const columns = [
  { field: 'id', headerName: 'ID', width: 30 },
  {
    field: 'first_name',
    headerName: 'First Name',
    width: 100,
    editable: true,
  },
  {
    field: 'last_name',
    headerName: 'Last Name',
    width: 100,
    editable: true,
  },
  {
    field: 'jan',
    headerName: 'JAN',
    width: 75,
    editable: true,
  },
  {
    field: 'feb',
    headerName: 'FEB',
    width: 75,
    editable: true,
  },
  {
    field: 'mar',
    headerName: 'MAR',
    width: 75,
    editable: true,
  },
  {
    field: 'apr',
    headerName: 'APR',
    width: 75,
    editable: true,
  },
  {
    field: 'may',
    headerName: 'MAY',
    width: 75,
    editable: true,
  },
  {
    field: 'jun',
    headerName: 'JUN',
    width: 75,
    editable: true,
  },
  {
    field: 'jul',
    headerName: 'JUL',
    width: 75,
    editable: true,
  },
  {
    field: 'aug',
    headerName: 'AUG',
    width: 75,
    editable: true,
  },
  {
    field: 'sep',
    headerName: 'SEP',
    width: 75,
    editable: true,
  },
  {
    field: 'oct',
    headerName: 'OCT',
    width: 75,
    editable: true,
  },
  {
    field: 'nov',
    headerName: 'NOV',
    width: 75,
    editable: true,
  },
  {
    field: 'dec',
    headerName: 'DEC',
    width: 75,
    editable: true,
  },
  {
    field: 'total',
    headerName: 'TOTAL',
    width: 100,
    editable: true,
  },
];

export default function DataGridDemo() {
  const rows = useStore((state) => state.interestRows);
  const updateRow = useStore((state) => state.updateInterestRow);

  const handleProcessRowUpdate = (newRow, oldRow) => {
    updateRow(newRow);
    return newRow;
  };

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        processRowUpdate={handleProcessRowUpdate}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
    </Box>
  );
}
