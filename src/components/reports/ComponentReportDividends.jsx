import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import useStore from '../../store/dataStore';

const months = [
  'jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'
];

const currentYear = new Date().getFullYear();
const years = Array.from({ length: currentYear - 2009 }, (v, k) => currentYear - k + 1);

const DividendTable = () => {
  const [selectedYear, setSelectedYear] = React.useState(currentYear);
  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const memberData = useStore((state) => state.memberData);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);
  };

  const columns = [
    { field: 'fullName', headerName: 'Name', flex: 1, minWidth: 200 },
    { field: 'previousYearTotal', headerName: 'Last Period', flex: 1, minWidth: 100 },
    ...months.map((month, index) => [
      {
        field: `${month}_value`,
        headerName: `${month.toUpperCase()}`,
        minWidth: 125,
        flex: 1,
        headerClassName: index % 2 === 0 ? 'evenColumn' : 'oddColumn',
        cellClassName: index % 2 === 0 ? 'evenColumn' : 'oddColumn',
        textAlign: "right",
        valueGetter: (params) => {
          const value = params;
          return (value !== undefined && value > 0) ? formatCurrency(value) : '-';
        },
      },
      {
        field: `${month}_percentage`,
        headerName: `%`,
        minWidth: 100,
        flex: 1,
        headerClassName: index % 2 === 0 ? 'evenColumn' : 'oddColumn',
        cellClassName: index % 2 === 0 ? 'evenColumn' : 'oddColumn',
        valueGetter: (params) => {
          const percentage = params;
          return percentage > 0 ? `${percentage}%` : '-';
        },
      }
    ]).flat(),
    {
      field: 'averagePercent', headerName: 'AVE %', flex: 1, minWidth: 100,
      headerClassName: 'evenColumn',
      cellClassName: 'evenColumn',
      valueGetter: (params) => {
        const averagePercent = params;
        return averagePercent !== undefined ? `${averagePercent}%` : '0%';
      },
    },
  ];

  const aggregateDividends = () => {
    const totals = {};
    memberData.forEach(member => {
      months.forEach(month => {
        const savings = member.records?.savings?.filter(record => record.year === selectedYear && new Date(record.year, record.month - 1).toLocaleString('default', { month: 'short' }).toLowerCase() === month) || [];
        const shares = member.records?.shares?.filter(record => record.year === selectedYear && new Date(record.year, record.month - 1).toLocaleString('default', { month: 'short' }).toLowerCase() === month) || [];
        const total = savings.reduce((sum, record) => sum + parseFloat(record.value), 0) + shares.reduce((sum, record) => sum + parseFloat(record.value), 0);
        if (!totals[month]) totals[month] = 0;
        totals[month] += total;
      });
    });
    return totals;
  };

  const totalDividends = React.useMemo(() => aggregateDividends(), [selectedYear, memberData]);

  const rows = memberData.map(member => {
    const row = { id: member.id, fullName: `${member.first_name} ${member.last_name}` };
    const previousYearTotal = (member.records?.savings?.filter(record => record.year === selectedYear - 1 && record.month === 12).reduce((sum, record) => sum + parseFloat(record.value), 0) || 0) + 
                              (member.records?.shares?.filter(record => record.year === selectedYear - 1 && record.month === 12).reduce((sum, record) => sum + parseFloat(record.value), 0) || 0);
    row.previousYearTotal = previousYearTotal > 0 ? formatCurrency(previousYearTotal) : "-";

    let totalPercentage = 0;
    months.forEach(month => {
      const savings = member.records?.savings?.filter(record => record.year === selectedYear && new Date(record.year, record.month - 1).toLocaleString('default', { month: 'short' }).toLowerCase() === month) || [];
      const shares = member.records?.shares?.filter(record => record.year === selectedYear && new Date(record.year, record.month - 1).toLocaleString('default', { month: 'short' }).toLowerCase() === month) || [];
      const total = savings.reduce((sum, record) => sum + parseFloat(record.value), 0) + shares.reduce((sum, record) => sum + parseFloat(record.value), 0);
      row[`${month}_value`] = total !== 0 ? total : '-';
      const percentage = totalDividends[month] !== 0 ? ((total / totalDividends[month]) * 100).toFixed(2) : 0;
      row[`${month}_percentage`] = percentage !== 0 ? percentage : '-';
      totalPercentage += parseFloat(percentage);
    });
    row.averagePercent = (totalPercentage / 12).toFixed(2);
    return row;
  });

  const totalColumns = [
    { field: 'fullName', headerName: '', flex: 1, minWidth: 200 },
    ...months.map((month, index) => ({
      field: `${month}_total`,
      headerName: `${month.toUpperCase()}`,
      minWidth: 100,
      flex: 1,
      headerClassName: index % 2 === 0 ? 'evenColumn' : 'oddColumn',
      cellClassName: index % 2 === 0 ? 'evenColumn' : 'oddColumn',
      valueGetter: (params) => {
        const value = params;
        return (value !== undefined && value > 0) ? formatCurrency(value) : '-';
      },
    })),
    {
      field: 'total', headerName: 'TOTAL', flex: 1, minWidth: 100,
      headerClassName: 'evenColumn',
      cellClassName: 'evenColumn',
      valueGetter: (params) => {
        const total = params;
        return total !== undefined ? formatCurrency(total) : '0';
      },
    },
  ];

  const totalRow = {
    id: 'total',
    fullName: 'Monthly Totals',
    ...months.reduce((acc, month) => {
      const total = totalDividends[month] !== undefined ? totalDividends[month] : 0;
      return {
        ...acc,
        [`${month}_total`]: total,
      };
    }, {}),
    total: Object.values(totalDividends).reduce((sum, value) => sum + value, 0),
  };

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
        rows={rows}
        columns={columns}
        components={{
          Toolbar: GridToolbar,
        }}
        pagination
        pageSizeOptions={[5, 20, 100]}
        pageSize={5}
        autoHeight
        sx={{
          '& .evenColumn': {
            backgroundColor: '#ff00ff11',
          },
          '& .MuiDataGrid-virtualScroller': {
            overflow: 'auto',
          },
        }}
      />
      
      <Box sx={{ height: 200, width: '100%', marginTop: 2 }}>
        <DataGrid
          rows={[totalRow]}
          columns={totalColumns}
          hideFooter
          autoHeight
          sx={{
            '& .evenColumn': {
              backgroundColor: '#ff00ff11',
            },
            '& .MuiDataGrid-virtualScroller': {
              overflow: 'auto',
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default DividendTable;
