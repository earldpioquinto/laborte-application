import React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import useStore from '../../store/dataStore';

const handleActionClick = (action, id, deleteMember) => {
  switch (action) {
    case 'view':
      window.location.href = `../profile/${id}`;
      break;
    case 'delete':
      if (window.confirm('Are you sure you want to delete this member?')) {
        deleteMember(id);
        console.log(`Delete action on row with id ${id}`);
      }
      break;
    default:
      break;
  }
};

const columns = (deleteMember) => [
  { field: 'id', headerName: 'ID', width: 100 },
  {
    field: 'first_name',
    headerName: 'First Name',
    width: 125,
    editable: false,
  },
  {
    field: 'last_name',
    headerName: 'Last Name',
    width: 150,
    editable: false,
  },
  {
    field: 'membership_date',
    headerName: 'Date',
    width: 120,
    editable: false,
  },
  {
    field: 'membership_fee',
    headerName: 'Fee',
    width: 70,
    editable: false,
  },
  {
    field: 'actions',
    headerName: '',
    flex: 1,
    minWidth: 300,
    editable: false,
    renderCell: (params) => (
      <div>
        <Button
          variant="contained"
          color="error"
          size="small"
          style={{ marginRight: 8 }}
          onClick={() => handleActionClick('delete', params.row.id, deleteMember)}
        >
          Delete
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => handleActionClick('view', params.row.id, deleteMember)}
        >
          View Profile
        </Button>
      </div>
    ),
  },
];

export default function DataGridDemo() {
  const rows = useStore((state) => state.memberData);
  const updateRow = useStore((state) => state.updateInterestRow);
  const deleteMember = useStore((state) => state.deleteMember);

  const handleProcessRowUpdate = (newRow, oldRow) => {
    updateRow(newRow);
    return newRow;
  };

  return (
    <Box sx={{ width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns(deleteMember)}
        processRowUpdate={handleProcessRowUpdate}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[5, 10, 100]}
        disableRowSelectionOnClick
        disableSelectionOnClick
      />
    </Box>
  );
}
