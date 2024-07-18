import { useEffect, useState } from 'react';

// material-ui
import Grid from '@mui/material/Grid';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

import ComponentReportDividends from '../../../../components/reports/ComponentReportDividends';
import DynamicModal from '../../../../components/DynamicModal';
import ModalAddMember from '../../../../components/modals/ModalAddMember';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dividends = () => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <MainCard title="Dividends">
      <Grid container spacing={gridSpacing} >
        <Grid item xs={12}>
          <ComponentReportDividends />
        </Grid>
      </Grid>
    </MainCard>
  );


};

export default Dividends;
