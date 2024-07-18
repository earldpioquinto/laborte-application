import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Button, TextField, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import useStore from '../../store/dataStore';

// project imports
import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

const monthsArray = [
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

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);
};

const defaultInterestRate = 2.0; // Default interest rate set to 3%

const ModalAddLoan = ({ handleClose }) => {
  const { id } = useParams();
  const updateMemberRecord = useStore((state) => state.updateMemberRecord);
  const memberData = useStore((state) => state.memberData);
  const member = memberData.find(m => m.id === id);

  const [amount, setAmount] = useState('');
  const [term, setTerm] = useState('');
  const [loanDate, setLoanDate] = useState(new Date().toISOString().substring(0, 10));
  const [interestRate, setInterestRate] = useState(defaultInterestRate);
  const [totalPayment, setTotalPayment] = useState(0);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [paymentSchedule, setPaymentSchedule] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    // Set initial loan date to today's date
    setLoanDate(new Date().toISOString().substring(0, 10));
  }, []);

  const calculateTotalPayment = () => {
    const principal = parseFloat(amount);
    const months = parseInt(term, 10);
    const monthlyRate = parseFloat(interestRate) / 100;

    if (!isNaN(principal) && !isNaN(months) && !isNaN(monthlyRate)) {
      const fixedPrincipalPayment = principal / months;
      const totalInterest = Array.from({ length: months }).reduce((acc, _, i) => {
        const remainingPrincipal = principal - (fixedPrincipalPayment * i);
        return acc + (remainingPrincipal * monthlyRate);
      }, 0);
      const total = principal + totalInterest;
      const schedule = [];
      let remainingPrincipal = principal;
      let [year, month, day] = loanDate.split('-').map(Number);

      // Move the first payment to one month after the loan date
      month++;
      if (month > 12) {
        month = 1;
        year++;
      }

      for (let i = 0; i < months; i++) {
        if (month > 12) {
          month = 1;
          year++;
        }
        const interestPayment = remainingPrincipal * monthlyRate;
        const payment = fixedPrincipalPayment + interestPayment;
        remainingPrincipal -= fixedPrincipalPayment;
        schedule.push({
          monthLabel: monthsArray[(month - 1) % 12].label, // Display full month label
          monthValue: month, // Save numerical month value
          year: year,
          day: day,
          payment: payment.toFixed(2),
          interestPayment: interestPayment.toFixed(2),
          principalPayment: fixedPrincipalPayment.toFixed(2),
          remainingPrincipal: remainingPrincipal.toFixed(2),
        });
        month++;
      }
      setMonthlyPayment((total / months).toFixed(2));
      setTotalPayment(total.toFixed(2));
      setPaymentSchedule(schedule);
    }
  };

  const handleSave = () => {
    const loanDetails = {
      month: parseInt(loanDate.split('-')[1]), // Save numerical month value
      year: parseInt(loanDate.split('-')[0]),
      day: parseInt(loanDate.split('-')[2]),
      value: amount,
      interest_rate: interestRate,
      terms: term,
      totalPayment,
      monthlyPayment,
      paymentSchedule,
    };

    const existingRecord = member.records.loans?.find(
      record => record.month === loanDetails.month && record.year === loanDetails.year && record.day === loanDetails.day
    );

    if (existingRecord) {
      setOpenDialog(true);
    } else {
      updateMemberRecord(id, loanDetails, 'loans');
      handleClose();
    }
  };

  const handleOverwrite = () => {
    const loanDetails = {
      month: parseInt(loanDate.split('-')[1]), // Save numerical month value
      year: parseInt(loanDate.split('-')[0]),
      day: parseInt(loanDate.split('-')[2]),
      value: amount,
      interest_rate: interestRate,
      terms: term,
      totalPayment,
      monthlyPayment,
      paymentSchedule,
    };
    updateMemberRecord(id, loanDetails, 'loans');
    setOpenDialog(false);
    handleClose();
  };

  return (
    <MainCard title="Add Loan" sx={{ width:"1000px", margin: "auto" }}>
      <Grid container spacing={gridSpacing} sx={{ maxHeight: "800px", overflow: "auto" }}>
        <Grid item xs={12} md={6}>
          <SubCard>
            <Grid container spacing={2}>
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
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Term (Months)"
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                  type="number"
                  InputProps={{ inputProps: { min: 1, max: 24 } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Loan Date"
                  type="date"
                  value={loanDate}
                  onChange={(e) => setLoanDate(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Interest Rate (%)"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  type="number"
                  InputProps={{ inputProps: { step: 0.01, min: 0, max: 99 } }}
                />
              </Grid>
              <Grid item xs={12} container justifyContent="space-between">
                <Button variant="contained" color="primary" onClick={calculateTotalPayment}>
                  Calculate
                </Button>
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
        <Grid item xs={12} md={6}>
          <TableContainer component={Paper} sx={{ maxHeight: "500px" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ width: 200 }}>Month</TableCell>
                  <TableCell sx={{ width: 200 }}>Year</TableCell>
                  <TableCell sx={{ width: 200 }}>Payment</TableCell>
                  <TableCell sx={{ width: 200 }}>Interest</TableCell>
                  <TableCell sx={{ width: 200 }}>Principal</TableCell>
                  <TableCell sx={{ width: 200 }}>Remaining Balance</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paymentSchedule.map((payment, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ width: 200 }}>{payment.monthLabel}</TableCell>
                    <TableCell sx={{ width: 200 }}>{payment.year}</TableCell>
                    <TableCell sx={{ width: 200 }}>{formatCurrency(payment.payment)}</TableCell>
                    <TableCell sx={{ width: 200 }}>{formatCurrency(payment.interestPayment)}</TableCell>
                    <TableCell sx={{ width: 200 }}>{formatCurrency(payment.principalPayment)}</TableCell>
                    <TableCell sx={{ width: 200 }}>{formatCurrency(payment.remainingPrincipal)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      >
        <DialogTitle>{"Record Exists"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            A record for this loan date already exists. Do you want to overwrite it?
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

export default ModalAddLoan;
