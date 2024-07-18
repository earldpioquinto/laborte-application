import React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Typography, Button } from '@mui/material';

// material-ui
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import MuiTypography from '@mui/material/Typography';

// project imports
import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

const columns = [
  { field: 'period', headerName: 'Period', width: 100 },
  { field: 'type', headerName: 'Type', width: 150 },
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
    editable: false,
  },
];

const rows = [
  { id: 1, type: 'Savings', period: 2021 },
  { id: 2, type: 'Shares', period: 2021 },
  { id: 3, type: 'Savings', period: 2022 },
  { id: 4, type: 'Shares', period: 2022 },
  { id: 5, type: 'Savings', period: 2023 },
  { id: 6, type: 'Shares', period: 2023 },
  { id: 7, type: 'Savings', period: 2024 },
  { id: 8, type: 'Shares', period: 2024 }
];

const ModalEditSavingsShares = ({ props, handleClose }) => (

  <MainCard title="Edit Savings / Shares">
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          sorting: {
            sortModel: [{ field: 'period', sort: 'desc' }],
          }
        }}
        disableRowSelectionOnClick
      />
    </Box>
    
    <Button onClick={handleClose} sx={{ mt: 2 }}>
      CANCEL
    </Button>
    <Button onClick={handleClose} sx={{ mt: 2 }}>
      SAVE
    </Button>
  </MainCard>

);

export default ModalEditSavingsShares;
