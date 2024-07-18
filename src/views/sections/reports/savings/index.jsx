import { useEffect, useState } from 'react';

// material-ui
import Grid from '@mui/material/Grid';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

import ComponentReportSavings from '../../../../components/reports/ComponentReportSavings';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Savings = () => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <MainCard title="Savings">
      <Grid container spacing={gridSpacing} >
        <Grid item xs={12}>
          <ComponentReportSavings />
        </Grid>
      </Grid>
    </MainCard>
  );


};

export default Savings;
