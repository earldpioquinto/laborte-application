// assets
import { IconChartLine } from '@tabler/icons-react';

// constant
const icons = { IconChartLine };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: 'dashboard',
  title: 'Dashboard',
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard/default',
      icon: icons.IconChartLine,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
