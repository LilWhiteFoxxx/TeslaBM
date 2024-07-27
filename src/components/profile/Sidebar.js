import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import PersonIcon from '@mui/icons-material/Person';
import MapIcon from '@mui/icons-material/Map';
import BadgeIcon from '@mui/icons-material/Badge';
import HistoryIcon from '@mui/icons-material/History';
import AddCardIcon from '@mui/icons-material/AddCard';
import QuizIcon from '@mui/icons-material/Quiz';
import LogoutIcon from '@mui/icons-material/Logout';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

import ItemMenu from './ItemMenu';

import './sidebar.scss';

function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useSelector((state) => state.auth);
    const [activeItem, setActiveItem] = useState('');

    useEffect(() => {
        // Map paths to sidebar items
        const pathMap = {
            '/groupproject/profile/wallet': 'My Wallet',
            '/groupproject/profile/myorders': 'My Orders',
            '/groupproject/profile': 'Personal Information',
            '/groupproject/profile/addresses': 'Addresses',
            '/groupproject/profile/paymentmethods': 'Payment Methods',
            '/groupproject/profile/help': 'Need Help',
            '/groupproject': 'Sign Out'
        };

        // Set the active item based on the current pathname
        const currentPath = location.pathname;
        setActiveItem(pathMap[currentPath] || 'Personal Information');
    }, [location.pathname]);

    const handleItemClick = (title, path) => {
        setActiveItem(title);
        navigate(path);
    };

    return (
        <div className="sidebar-container">
            <div className="profile flex flex-col justify-center items-center bg-white w-full py-4">
                <img src={user?.avatar} alt="Profile" />
                <h2 className="my-2 font-bold">{user?.username}</h2>
                <p>38.00$</p>
            </div>
            <div className="">
                <nav>
                    <ul>
                        <ItemMenu
                            title={'My Wallet'}
                            icon={<BadgeIcon />}
                            className={
                                activeItem === 'My Wallet'
                                    ? 'item-menu active'
                                    : 'item-menu'
                            }
                            onClick={() => handleItemClick('My Wallet', '/groupproject/profile/wallet')}
                        />
                        <ItemMenu
                            title={'My Rewards'}
                            icon={<EmojiEventsIcon />}
                            className={
                                activeItem === 'My Rewards'
                                    ? 'item-menu active'
                                    : 'item-menu'
                            }
                            onClick={() => handleItemClick('My Rewards', '/groupproject/profile/rewards')}
                        />
                        <ItemMenu
                            title={'My Orders'}
                            icon={<HistoryIcon />}
                            className={
                                activeItem === 'My Orders'
                                    ? 'item-menu active'
                                    : 'item-menu'
                            }
                            onClick={() => handleItemClick('My Orders', '/groupproject/profile/myorders')}
                        />
                        <ItemMenu
                            title={'Personal Information'}
                            icon={<PersonIcon />}
                            className={
                                activeItem === 'Personal Information'
                                    ? 'item-menu active'
                                    : 'item-menu'
                            }
                            onClick={() => handleItemClick('Personal Information', '/groupproject/profile')}
                        />
                        <ItemMenu
                            title={'Addresses'}
                            icon={<MapIcon />}
                            className={
                                activeItem === 'Addresses'
                                    ? 'item-menu active'
                                    : 'item-menu'
                            }
                            onClick={() => handleItemClick('Addresses', '/groupproject/profile/addresses')}
                        />
                        <ItemMenu
                            title={'Payment Methods'}
                            icon={<AddCardIcon />}
                            className={
                                activeItem === 'Payment Methods'
                                    ? 'item-menu active'
                                    : 'item-menu'
                            }
                            onClick={() => handleItemClick('Payment Methods', '/groupproject/profile/paymentmethods')}
                        />
                        <ItemMenu
                            title={'Need Help'}
                            icon={<QuizIcon />}
                            className={
                                activeItem === 'Need Help'
                                    ? 'item-menu active'
                                    : 'item-menu'
                            }
                            onClick={() => handleItemClick('Need Help', '/groupproject/profile/help')}
                        />
                        <ItemMenu
                            title={'Sign Out'}
                            icon={<LogoutIcon />}
                            className={
                                activeItem === 'Sign Out'
                                    ? 'item-menu active'
                                    : 'item-menu'
                            }
                            onClick={() => handleItemClick('Sign Out', '/groupproject')}
                        />
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default Sidebar;
