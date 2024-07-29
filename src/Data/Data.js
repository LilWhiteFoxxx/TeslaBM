// Sidebar imports
import {
    UilEstate,
    UilClipboardAlt,
    UilUsersAlt,
    // UilPackage,
    UilChart,
    // UilSignOutAlt,
} from '@iconscout/react-unicons';

import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import TwoWheelerOutlinedIcon from '@mui/icons-material/TwoWheelerOutlined';
import HandymanOutlinedIcon from '@mui/icons-material/HandymanOutlined';

// Analytics Cards imports
import { UilUsdSquare, UilMoneyWithdrawal } from '@iconscout/react-unicons';
// import { keyboard } from '@testing-library/user-event/dist/keyboard';


// Sidebar Data
export const SidebarData = [
    {
        icon: UilEstate,
        heading: 'Dashboard',
        path: '/',
    },
    {
        icon: UilUsersAlt,
        heading: 'Customers',
        path: '/customers',
    },
    {
        icon: CategoryOutlinedIcon,
        heading: 'Category',
        path: '/category',
    },
    {
        icon: TwoWheelerOutlinedIcon,
        heading: 'Motors',
        path: '/motors',
    },
    {
        icon: HandymanOutlinedIcon,
        heading: 'Accessories',
        path: '/accessories',
    },
    {
        icon: UilClipboardAlt,
        heading: 'Orders',
        path: '/order',
    },
    {
        icon: UilChart,
        heading: 'Analytics',
        path: '/analytics',
    },
];

// Analytics Cards Data
export const cardsData = [
    {
        title: 'Sales',
        color: {
            backGround: 'linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)',
            boxShadow: '0px 10px 20px 0px #e0c6f5',
        },
        barValue: 70,
        value: '25,970',
        png: UilUsdSquare,
        series: [
            {
                name: 'Sales',
                data: [31, 40, 28, 51, 42, 109, 100],
            },
        ],
    },
    {
        title: 'Revenue',
        color: {
            backGround: 'linear-gradient(180deg, #FF919D 0%, #FC929D 100%)',
            boxShadow: '0px 10px 20px 0px #FDC0C7',
        },
        barValue: 80,
        value: '14,270',
        png: UilMoneyWithdrawal,
        series: [
            {
                name: 'Revenue',
                data: [10, 100, 50, 70, 80, 30, 40],
            },
        ],
    },
    {
        title: 'Expenses',
        color: {
            backGround:
                'linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)',
            boxShadow: '0px 10px 20px 0px #F9D59B',
        },
        barValue: 60,
        value: '4,270',
        png: UilClipboardAlt,
        series: [
            {
                name: 'Expenses',
                data: [10, 25, 15, 30, 12, 15, 20],
            },
        ],
    },
];

// Recent Update Card Data
export const UpdatesData = [
    {
        img: 'https://scontent.fsgn8-4.fna.fbcdn.net/v/t39.30808-1/308706696_3508641156039697_6126392322326609734_n.jpg?stp=dst-jpg_p200x200&_nc_cat=102&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeGfcZzpXgPIrXbvcQ-1JXchSx3uqacPP-xLHe6ppw8_7DnUXD3yJ5Lpy1e5HTMrgm82eQVKRS16Z7BfjWxBfAJt&_nc_ohc=JOq_ap4MgvYQ7kNvgGnElCd&_nc_ht=scontent.fsgn8-4.fna&oh=00_AYAHD24hL25TrCriNUk_4lS2iZyUV_L65Y-mbKI7BizWkw&oe=66A51965',
        name: 'Elon Dao',
        noti: 'has ordered M 1000 RR.',
        time: '25 seconds ago',
    },
    {
        img: 'https://scontent.fsgn8-3.fna.fbcdn.net/v/t1.6435-1/168120358_243280274167565_3614056355110904990_n.jpg?stp=dst-jpg_p200x200&_nc_cat=109&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeFq704cUcb__M3K199aDSNOJEGvbJWe4DIkQa9slZ7gMpZmxxWLZEc45wGx1dJXvW07hmHcrAWcdjkT7dSJfV6x&_nc_ohc=kyRy7uoOl8UQ7kNvgGZjtHm&_nc_ht=scontent.fsgn8-3.fna&oh=00_AYD4BUGVpMlWjJgQHvyEiHt1nWSyBDDgKntk466bkZfLBg&oe=66C6DCA5',
        name: 'Kingu',
        noti: 'has received S 1000 RR.',
        time: '30 minutes ago',
    },
    {
        img: 'https://i0.wp.com/hyperallergic-newspack.s3.amazonaws.com/uploads/2024/01/Melon1-1-1200x1200.jpg?resize=780%2C780&quality=95&ssl=1',
        name: 'Watermelon Mai',
        noti: 'has ordered GS 1250 AT',
        time: '2 hours ago',
    },
];
