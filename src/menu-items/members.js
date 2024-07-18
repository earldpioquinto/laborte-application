// assets
import { IconUserScan, IconReport } from '@tabler/icons-react';

// constant
const icons = { IconUserScan, IconReport };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const members = {
    id: 'members',
    title: 'Members',
    type: 'group',
    children: [
        {
            id: 'overview',
            title: 'Overview',
            type: 'item',
            url: '/members/overview',
            icon: icons.IconReport,
            breadcrumbs: false
        },
        {
            id: 'profile',
            title: 'Profile',
            type: 'item',
            url: '/members/profile',
            icon: icons.IconUserScan,
            breadcrumbs: false
        }
    ]
};

export default members;
