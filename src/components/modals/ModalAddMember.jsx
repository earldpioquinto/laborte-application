import React, { useState, useEffect } from 'react';
import { Typography, Button, TextField, Modal, Box } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import useStore from '../../store/dataStore';

// material-ui
import Grid from '@mui/material/Grid';

// project imports
import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

const ModalAddMember = ({ props, handleClose }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [membershipDate, setMembershipDate] = useState('');
  const [membershipFee, setMembershipFee] = useState(10.00);
  const [modalMessage, setModalMessage] = useState('');

  const addOrUpdateMember = useStore((state) => state.addOrUpdateMember);
  const duplicateFound = useStore((state) => state.duplicateFound);
  const clearDuplicateFlag = useStore((state) => state.clearDuplicateFlag);

  useEffect(() => {
    setMembershipDate(new Date().toISOString().substring(0, 10));
  }, []);

  useEffect(() => {
    if (duplicateFound) {
      setModalMessage('Duplicate entry found');
      setTimeout(() => {
        clearDuplicateFlag();
        setModalMessage('');
      }, 1000);
    }
  }, [duplicateFound, clearDuplicateFlag]);

  const handleSave = () => {
    const newMember = {
      id: uuidv4(),
      first_name: firstName,
      last_name: lastName,
      membership_date: membershipDate,
      membership_fee: membershipFee.toFixed(2),
      records: {}
    };
    addOrUpdateMember(newMember);
    setModalMessage('Saved successfully');
  };

  useEffect(() => {
    if (!duplicateFound && modalMessage === 'Saved successfully') {
      setTimeout(() => {
        setModalMessage('');
        handleClose();
      }, 2000);
    }
  }, [duplicateFound, modalMessage, handleClose]);

  return (
    <>
      <MainCard title="Add Member">
        <Grid container spacing={gridSpacing} sx={{ maxHeight: "800px", overflow: "auto" }}>
          <Grid item xs={12}>
            <SubCard>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Membership Date"
                    type="date"
                    value={membershipDate}
                    onChange={(e) => setMembershipDate(e.target.value)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Membership Fee"
                    type="number"
                    value={membershipFee}
                    onChange={(e) => setMembershipFee(parseFloat(e.target.value))}
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
      </MainCard>
      <Modal
        open={!!modalMessage}
        onClose={() => setModalMessage('')}
      >
        <Box sx={{
          width: 300,
          padding: 3,
          margin: 'auto',
          marginTop: '20%',
          backgroundColor: 'background.paper',
          boxShadow: 24,
          borderRadius: 2,
          textAlign: 'center'
        }}>
          <Typography variant="h6">{modalMessage}</Typography>
        </Box>
      </Modal>
    </>
  );
};

export default ModalAddMember;
