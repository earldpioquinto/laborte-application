import { useEffect, useState } from 'react';

// material-ui
import Grid from '@mui/material/Grid';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

import ComponentReportLoans from '../../../../components/reports/ComponentReportLoans';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Loans = () => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <MainCard title="Loans">
      <Grid container spacing={gridSpacing} >
        <Grid item xs={12}>
          <ComponentReportLoans />
        </Grid>
      </Grid>
    </MainCard>
  );


};

export default Loans;
