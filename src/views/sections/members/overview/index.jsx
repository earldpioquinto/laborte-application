import { useEffect, useState } from 'react';

// material-ui
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import MuiTypography from '@mui/material/Typography';

// project imports
import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { gridSpacing } from 'store/constant';

import ComponentMemberList from '../../../../components/overview/ComponentMemberList';
import DynamicModal from '../../../../components/DynamicModal';
import ModalAddMember from '../../../../components/modals/ModalAddMember';
import { Button } from '@mui/material';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Overview = () => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <MainCard title="Member List">
      <Grid container spacing={gridSpacing} >
        <Grid item xs={12} sx={{textAlign: "end"}}>
          <DynamicModal component={ModalAddMember} componentProps={{ props: 'first' }} buttonLabel="Add Member +"/>
        </Grid>
        <Grid item xs={12}>
          <ComponentMemberList />
        </Grid>
      </Grid>
    </MainCard>
  );


};

export default Overview;
