import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useStore from '../../store/dataStore';
import { Typography, Button, TextField, MenuItem, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

// material-ui
import Grid from '@mui/material/Grid';

// project imports
import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

const months = [
  { value: 1, label: 'January' },
  { value: 2, label: 'February' },
  { value: 3, label: 'March' },
  { value: 4, label: 'April' },
  { value: 5, label: 'May' },
  { value: 6, label: 'June' },
  { value: 7, label: 'July' },
  { value: 8, label: 'August' },
  { value: 9, label: 'September' },
  { value: 10, label: 'October' },
  { value: 11, label: 'November' },
  { value: 12, label: 'December' },
];

const getCurrentYear = () => new Date().getFullYear();
const getCurrentMonth = () => {
  const monthIndex = new Date().getMonth();
  return months[monthIndex].value;
};

const years = Array.from({ length: getCurrentYear() - 2009 + 2 }, (_, i) => 2010 + i).sort((a, b) => b - a);

const ModalAddPayment = ({ handleClose }) => {
  const { id } = useParams();
  const updateMemberRecord = useStore((state) => state.updateMemberRecord);
  const memberData = useStore((state) => state.memberData);
  const member = memberData.find(m => m.id === id);

  const [year, setYear] = useState(getCurrentYear());
  const [month, setMonth] = useState(getCurrentMonth());
  const [amount, setAmount] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

  const handleSave = () => {
    const newRecord = { month, year, value: amount };
    const recordType = 'payments';

    if (!member.records) {
      member.records = {};
    }
    if (!member.records[recordType]) {
      member.records[recordType] = [];
    }

    const existingRecord = member.records[recordType].find(
      record => record.month === month && record.year === year
    );

    if (existingRecord) {
      setOpenDialog(true);
    } else {
      updateMemberRecord(id, newRecord, recordType);
      handleClose();
    }
  };

  const handleOverwrite = () => {
    const newRecord = { month, year, value: amount };
    const recordType = 'payments';
    updateMemberRecord(id, newRecord, recordType);
    setOpenDialog(false);
    handleClose();
  };

  return (
    <MainCard title="Add Payment" sx={{ maxWidth:"500px", margin: "auto" }}>
      <Grid container spacing={gridSpacing} sx={{ maxHeight: "800px", overflow: "auto" }}>
        <Grid item xs={12}>
          <SubCard>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  select
                  label="Year"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                >
                  {years.map((year) => (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  select
                  label="Month"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                >
                  {months.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  type="number"
                  InputProps={{ inputProps: { step: 0.01, min: 0 } }}
                />
              </Grid>
              <Grid item xs={12} container justifyContent="space-between">
                <Button variant="contained" color="primary" onClick={handleSave}>
                  Save
                </Button>
                <Button variant="outlined" color="secondary" onClick={handleClose}>
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </SubCard>
        </Grid>
      </Grid>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      >
        <DialogTitle>{"Record Exists"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            A record for this month and year already exists. Do you want to overwrite it?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleOverwrite} color="primary">
            Overwrite
          </Button>
        </DialogActions>
      </Dialog>
    </MainCard>
  );
};

export default ModalAddPayment;