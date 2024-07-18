// assets
import { IconCoins, IconTrendingUp, IconMoneybag, IconWallet, IconPigMoney, IconChartPie } from '@tabler/icons-react';

// constant
const icons = { IconCoins, IconTrendingUp, IconMoneybag, IconWallet, IconPigMoney, IconChartPie };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const reports = {
    id: 'reports',
    title: 'Reports',
    type: 'group',
    children: [
        {
            id: 'dividends',
            title: 'Dividends',
            type: 'item',
            url: '/reports/dividends',
            icon: icons.IconCoins,
            breadcrumbs: false
        },
        {
            id: 'interests',
            title: 'Interests',
            type: 'item',
            url: '/reports/interests',
            icon: icons.IconTrendingUp,
            breadcrumbs: false
        },
        {
            id: 'loans',
            title: 'Loans',
            type: 'item',
            url: '/reports/loans',
            icon: icons.IconMoneybag,
            breadcrumbs: false
        },
        {
            id: 'payments',
            title: 'Payments',
            type: 'item',
            url: '/reports/payments',
            icon: icons.IconWallet,
            breadcrumbs: false
        },
        {
            id: 'savings',
            title: 'Savings',
            type: 'item',
            url: '/reports/savings',
            icon: icons.IconPigMoney,
            breadcrumbs: false
        },
        {
            id: 'shares',
            title: 'Shares',
            type: 'item',
            url: '/reports/shares',
            icon: icons.IconChartPie,
            breadcrumbs: false
        }
    ]
};

export default reports;
