import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
//const DashboardDefault = Loadable(lazy(() => import('views/dashboard')));

// members routing 
const Overview = Loadable(lazy(() => import('views/sections/members/overview')));
const Profile = Loadable(lazy(() => import('views/sections/members/profile')));

// reports routing
const Dividends = Loadable(lazy(() => import('views/sections/reports/dividends')));
const Interests = Loadable(lazy(() => import('views/sections/reports/interests')));
const Payments = Loadable(lazy(() => import('views/sections/reports/payments')));
const Loans = Loadable(lazy(() => import('views/sections/reports/loans')));
const Savings = Loadable(lazy(() => import('views/sections/reports/savings')));
const Shares = Loadable(lazy(() => import('views/sections/reports/shares')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <Overview />
    },
    {
      path: 'members',
      children: [
        {
          path: 'overview',
          element: <Overview />
        },
        {
          path: 'profile',
          element: <Profile />
        },
        {
          path: 'profile/:id',
          element: <Profile />
        }
      ]
    },
    {
      path: 'reports',
      children: [
        {
          path: 'dividends',
          element: <Dividends />
        },
        {
          path: 'interests',
          element: <Interests />
        },
        {
          path: 'loans',
          element: <Loans />
        },
        {
          path: 'payments',
          element: <Payments />
        },
        {
          path: 'savings',
          element: <Savings />
        },
        {
          path: 'shares',
          element: <Shares />
        }
      ]
    }
  ]
};

export default MainRoutes;
