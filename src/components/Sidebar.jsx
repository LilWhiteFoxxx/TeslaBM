import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { UilSignOutAlt } from '@iconscout/react-unicons';
import { UilBars } from '@iconscout/react-unicons';

import { SidebarData } from '../Data/Data';
import Logo from '../imgs/logo.png';

import './Sidebar.css';

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [selected, setSelected] = useState(0);
    const [expanded, setExpanded] = useState(true);

    const sidebarVariants = {
        true: {
            left: '0',
        },
        false: {
            left: '-60%',
        },
    };

    useEffect(() => {
        const currentPath = location.pathname;
        const activeItem = SidebarData.findIndex(item => item.path === currentPath);
        if (activeItem !== -1) {
            setSelected(activeItem);
        }
    }, [location.pathname]);

    const handleClick = (index, path) => {
        setSelected(index);
        navigate(path);
    };

    return (
        <>
            <div
                className="bars"
                style={expanded ? { left: '60%' } : { left: '5%' }}
                onClick={() => setExpanded(!expanded)}
            >
                <UilBars />
            </div>
            <motion.div
                className="sidebar"
                variants={sidebarVariants}
                animate={window.innerWidth <= 768 ? `${expanded}` : ''}
            >
                {/* logo */}
                <div className="logo">
                    <img src={Logo} alt="logo" />
                    <span>
                        Sh<span>o</span>ps
                    </span>
                </div>

                <div className="menu">
                    {SidebarData.map((item, index) => {
                        return (
                            <div
                                className={
                                    selected === index
                                        ? 'menuItem active'
                                        : 'menuItem'
                                }
                                key={index}
                                onClick={() => handleClick(index, item.path)}
                            >
                                <item.icon />
                                <span>{item.heading}</span>
                            </div>
                        );
                    })}
                    {/* signoutIcon */}
                    <div className="menuItem">
                        <UilSignOutAlt />
                    </div>
                </div>
            </motion.div>
        </>
    );
};

export default Sidebar;
