import * as React from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import useStore from '../../store/dataStore';

const columns = [
  {
    field: 'fullName',
    headerName: 'Name',
    minWidth: 200,
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
    width: 100,
    editable: true,
  },
];

const currentYear = new Date().getFullYear();
const years = Array.from({ length: currentYear - 2009 }, (v, k) => currentYear - k + 1);

export default function ComponentDisplayRecords() {
  const [selectedYear, setSelectedYear] = React.useState(currentYear);

  const memberData = useStore((state) => state.memberData);
  const updateRow = useStore((state) => state.updateInterestRow);

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleProcessRowUpdate = (newRow, oldRow) => {
    updateRow(newRow);
    return newRow;
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);
  };

  // Aggregate shares data from all members for the selected year
  const aggregatedShares = memberData.map(member => {
    const shares = member.records?.shares || [];
    const sharesForYear = shares.filter(record => record.year === selectedYear);
    const row = { id: member.id, fullName: `${member.first_name} ${member.last_name}` };
    const monthlyTotals = { jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0, oct: 0, nov: 0, dec: 0, total: 0 };

    sharesForYear.forEach(record => {
      const month = new Date(record.year, record.month - 1).toLocaleString('default', { month: 'short' }).toLowerCase();
      monthlyTotals[month] += parseFloat(record.value);
      monthlyTotals.total += parseFloat(record.value);
    });

    Object.keys(monthlyTotals).forEach(key => {
      row[key] = monthlyTotals[key] === 0 ? '-' : formatCurrency(monthlyTotals[key]);
    });

    return row;
  });

  // Debugging: Log the aggregated shares
  console.log('Aggregated Shares:', aggregatedShares);

  // Calculate monthly totals
  const monthlyTotals = columns.reduce((acc, column) => {
    if (column.field !== 'fullName' && column.field !== 'total') {
      const total = aggregatedShares.reduce((sum, row) => {
        const value = parseFloat(row[column.field] !== '-' ? row[column.field].replace(/,/g, '') : 0);
        return sum + value;
      }, 0);
      acc[column.field] = total === 0 ? '-' : formatCurrency(total);
    }
    return acc;
  }, {});

  // Debugging: Log the monthly totals
  console.log('Monthly Totals:', monthlyTotals);

  // Calculate the total of all monthly totals
  const finalTotal = Object.values(monthlyTotals).reduce((sum, value) => sum + (value !== '-' ? parseFloat(value.replace(/,/g, '')) : 0), 0);
  monthlyTotals.total = finalTotal === 0 ? '-' : formatCurrency(finalTotal);

  const totalRow = { id: 'total', fullName: 'Monthly Totals', ...monthlyTotals };

  // Clone and modify columns for the totals table to hide the header of the 'fullName' column
  const totalsColumns = columns.map((column) => ({
    ...column,
    headerName: column.field === 'fullName' ? '' : column.headerName,
  }));

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
      </Box>
      <DataGrid
        rows={aggregatedShares}
        columns={columns}
        components={{
          Toolbar: GridToolbar,
        }}
        pagination
        pageSizeOptions={[5, 20, 100]}
        pageSize={5}
        autoHeight
        processRowUpdate={handleProcessRowUpdate}
        sx={{
          '& .evenColumn': {
            backgroundColor: '#ff00ff11',
          },
        }}
      />
      <Box sx={{ height: 200, width: '100%', marginTop: 2 }}>
        <DataGrid
          rows={[totalRow]}
          columns={totalsColumns}
          hideFooter
          autoHeight
          sx={{
            '& .evenColumn': {
              backgroundColor: '#ff00ff11',
            },
          }}
        />
      </Box>
    </Box>
  );
}
