import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { DataGrid } from '@mui/x-data-grid';
import { useParams } from 'react-router-dom';
import useStore from '../../store/dataStore';

import DynamicModal from '../DynamicModal';
import ModalAddLoan from '../modals/ModalAddLoan';
import ModalAddSaving from '../modals/ModalAddSaving';
import ModalAddShare from '../modals/ModalAddShare';

const columns = [
  {
    field: 'type',
    headerName: 'TYPE',
    width: 110,
    editable: true,
  },
  {
    field: 'jan',
    headerName: 'JAN',
    width: 100,
    editable: true,
    headerClassName: 'evenColumn',
    cellClassName: 'evenColumn',
  },
  {
    field: 'feb',
    headerName: 'FEB',
    width: 100,
    editable: true,
  },
  {
    field: 'mar',
    headerName: 'MAR',
    width: 100,
    editable: true,
    headerClassName: 'evenColumn',
    cellClassName: 'evenColumn',
  },
  {
    field: 'apr',
    headerName: 'APR',
    width: 100,
    editable: true,
  },
  {
    field: 'may',
    headerName: 'MAY',
    width: 100,
    editable: true,
    headerClassName: 'evenColumn',
    cellClassName: 'evenColumn',
  },
  {
    field: 'jun',
    headerName: 'JUN',
    width: 100,
    editable: true,
  },
  {
    field: 'jul',
    headerName: 'JUL',
    width: 100,
    editable: true,
    headerClassName: 'evenColumn',
    cellClassName: 'evenColumn',
  },
  {
    field: 'aug',
    headerName: 'AUG',
    width: 100,
    editable: true,
  },
  {
    field: 'sep',
    headerName: 'SEP',
    width: 100,
    editable: true,
    headerClassName: 'evenColumn',
    cellClassName: 'evenColumn',
  },
  {
    field: 'oct',
    headerName: 'OCT',
    width: 100,
    editable: true,
  },
  {
    field: 'nov',
    headerName: 'NOV',
    width: 100,
    editable: true,
    headerClassName: 'evenColumn',
    cellClassName: 'evenColumn',
  },
  {
    field: 'dec',
    headerName: 'DEC',
    width: 100,
    editable: true,
  },
  {
    field: 'total',
    headerName: 'TOTAL',
    width: 120,
    editable: true,
  },
];

const currentYear = new Date().getFullYear();
const years = Array.from({ length: currentYear - 2009 }, (v, k) => currentYear - k + 1);

export default function ComponentDisplayRecords() {
  const { id } = useParams();
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const memberData = useStore((state) => state.memberData);
  const updateRow = useStore((state) => state.updateInterestRow);
  const initializeInterestRows = useStore((state) => state.initializeInterestRows);
  const rows = useStore((state) => state.interestRows);

  const member = memberData.find((member) => member.id === id);

  useEffect(() => {
    if (member) {
      initializeInterestRows(id, selectedYear);
    }
  }, [initializeInterestRows, selectedYear, member, id]);

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
    if (member) {
      initializeInterestRows(id, event.target.value);
    }
  };

  const handleProcessRowUpdate = (newRow, oldRow) => {
    updateRow(newRow);
    return newRow;
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);
  };

  // Transform rows to replace 0 with "-" except for total
  const transformedRows = rows.map((row) => {
    const newRow = { ...row };
    Object.keys(newRow).forEach((key) => {
      if (key !== 'total' && newRow[key] === 0) {
        newRow[key] = '-';
      } else {
        if (key !== 'type') {
          newRow[key] = formatCurrency(newRow[key]);
        }
      }
    });
    return newRow;
  });

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id="year-label">Year</InputLabel>
          <Select
            labelId="year-label"
            value={selectedYear}
            label="Year"
            onChange={handleYearChange}
          >
            {years.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <DynamicModal component={ModalAddLoan} componentProps={{ props: 'loan' }} buttonLabel="Add Loan" />
          <DynamicModal component={ModalAddSaving} componentProps={{ props: 'saving' }} buttonLabel="Add Saving" />
          <DynamicModal component={ModalAddShare} componentProps={{ props: 'share' }} buttonLabel="Add Share" />
        </Box>
      </Box>
      <DataGrid
        autoHeight
        rows={transformedRows}
        columns={columns}
        processRowUpdate={handleProcessRowUpdate}
        disableColumnMenu
        sortingOrder={null}
        disableColumnFilter
        disableColumnSelector
        disableColumnResize
        hideFooter
        disableRowSelectionOnClick
        sx={{
          '& .evenColumn': {
            backgroundColor: '#ff00ff11',
          },
        }}
      />
    </Box>
  );
}
