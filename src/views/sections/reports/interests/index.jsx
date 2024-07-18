import { useEffect, useState } from 'react';

// material-ui
import Grid from '@mui/material/Grid';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

import ComponentReportInterests from '../../../../components/reports/ComponentReportInterests';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Interests = () => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <MainCard title="Interests">
      <Grid container spacing={gridSpacing} >
        <Grid item xs={12}>
          <ComponentReportInterests />
        </Grid>
      </Grid>
    </MainCard>
  );


};

export default Interests;
