import { useEffect, useState } from 'react';
import * as React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// material-ui
import Grid from '@mui/material/Grid';

// project imports
import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

import ComponentDisplayRecords from '../../../../components/profile/ComponentDisplayRecords';
import ComponentLoanData from '../../../../components/profile/ComponentLoanData';
import ComponentMemberDetails from '../../../../components/profile/ComponentMemberDetails';
import ComponentPaymentsList from '../../../../components/profile/ComponentPaymentsList';

const Profile = () => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!id) {
      // Check localStorage for the last viewed member ID
      const lastViewedMemberId = localStorage.getItem('lastViewedMemberId');
      if (lastViewedMemberId) {
        // Redirect to the last viewed member's profile
        navigate(`/members/profile/${lastViewedMemberId}`);
      }
    }
  }, [id, navigate]);

  return (
    <MainCard title="Profile">
      <Grid container spacing={gridSpacing} >
        <Grid item xs={6}>
          <SubCard>
            <ComponentMemberDetails />
          </SubCard>
        </Grid>
        <Grid item xs={6}>
          <SubCard>
            <ComponentPaymentsList />
          </SubCard>
        </Grid>
        <Grid item xs={12}>
          <SubCard>
            <ComponentDisplayRecords />
          </SubCard>
        </Grid>
        <Grid item xs={8}>
          <SubCard>
            <ComponentLoanData />
          </SubCard>
        </Grid>
      </Grid>
    </MainCard>
  );


};

export default Profile;
