export const ROUTES = [
    { path: '/dashboard', title: 'Dashboard', icon: 'dashboard', children: null, id: "dashboard" },
    { path: 'profile', title: 'User Profile', icon: 'person', children: null, id: "profile" },
    { path: 'table', title: 'Table List', icon: 'content_paste', children: null, id: "table" },
    {
        path: '#component', id: 'component', title: 'Component', icon: 'apps', children: [
            { path: 'components/price-table', title: 'Price Table', icon: 'PT' },
            { path: 'components/panels', title: 'Panels', icon: 'P' },
            { path: 'components/wizard', title: 'Wizard', icon: 'W' },
        ]
    },
    { path: 'notification', title: 'Notification', icon: 'notifications', children: null, id: "notification" },
    { path: 'alert', title: 'Sweet Alert', icon: 'warning', children: null, id: "alert" },
    { path: 'settings', title: 'Settings', icon: 'settings', children: null, id: "settings" },
    { path: 'rental',  title: 'Rental', icon: 'card_travel', children: null, id: "rental" },
];

export const ROUTES_CHILD_NO_SIDEBAR = [
    'rental/detail/:id',
]
