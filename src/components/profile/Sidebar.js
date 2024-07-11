import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    const { user } = useSelector((state) => state.auth);
    const [activeItem, setActiveItem] = useState('Personal Information');

    const handleItemClick = (title) => {
        setActiveItem(title);
    };

    return (
        <div className="sidebar-container">
            <div className="profile flex flex-col justify-center items-center bg-white w-full py-4">
                <img
                    src="https://digitalassets-shop.tesla.com/image/upload/f_auto,q_auto/v1/content/dam/tesla/CAR_ACCESSORIES/MODEL_X/INTERIOR/1562263-00-A_0_2000.jpg"
                    alt="Profile"
                />
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
                            onClick={() => {
                                handleItemClick('My Wallet');
                                navigate('/groupproject/profile/wallet');
                            }}
                        />
                        <ItemMenu
                            title={'My Rewards'}
                            icon={<EmojiEventsIcon />}
                            className={
                                activeItem === 'Rewards'
                                    ? 'item-menu active'
                                    : 'item-menu'
                            }
                            onClick={() => handleItemClick('Rewards')}
                        />
                        <ItemMenu
                            title={'My Orders'}
                            icon={<HistoryIcon />}
                            className={
                                activeItem === 'My Orders'
                                    ? 'item-menu active'
                                    : 'item-menu'
                            }
                            onClick={() => handleItemClick('My Orders')}
                        />
                        <ItemMenu
                            title={'Personal Information'}
                            icon={<PersonIcon />}
                            className={
                                activeItem === 'Personal Information'
                                    ? 'item-menu active'
                                    : 'item-menu'
                            }
                            onClick={() => {
                                handleItemClick('Personal Information');
                                navigate('/groupproject/profile');
                            }}
                        />
                        <ItemMenu
                            title={'Addresses'}
                            icon={<MapIcon />}
                            className={
                                activeItem === 'Addresses'
                                    ? 'item-menu active'
                                    : 'item-menu'
                            }
                            onClick={() => handleItemClick('Addresses')}
                        />
                        <ItemMenu
                            title={'Payment Methods'}
                            icon={<AddCardIcon />}
                            className={
                                activeItem === 'Payment Methods'
                                    ? 'item-menu active'
                                    : 'item-menu'
                            }
                            onClick={() => handleItemClick('Payment Methods')}
                        />
                        <ItemMenu
                            title={'Need Help'}
                            icon={<QuizIcon />}
                            className={
                                activeItem === 'Need Help'
                                    ? 'item-menu active'
                                    : 'item-menu'
                            }
                            onClick={() => handleItemClick('Need Help')}
                        />
                        <ItemMenu
                            title={'Sign Out'}
                            icon={<LogoutIcon />}
                            className={
                                activeItem === 'Sign Out'
                                    ? 'item-menu active'
                                    : 'item-menu'
                            }
                            onClick={() => {
                                handleItemClick('Sign Out');
                                navigate('/groupproject')
                            }}
                        />
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default Sidebar;
