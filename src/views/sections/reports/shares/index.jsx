import { useEffect, useState } from 'react';

// material-ui
import Grid from '@mui/material/Grid';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

import ComponentReportShares from '../../../../components/reports/ComponentReportShares';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Shares = () => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <MainCard title="ComponentReportShares">
      <Grid container spacing={gridSpacing} >
        <Grid item xs={12}>
          <ComponentReportShares />
        </Grid>
      </Grid>
    </MainCard>
  );


};

export default Shares;
