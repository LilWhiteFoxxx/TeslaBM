import React from 'react';
import { Outlet } from 'react-router-dom';

import Sidebar from '../../components/profile/Sidebar';
import './profile.scss';

const ProfilePage = () => {
    return (
        <div className="profile-page-container">
            <Sidebar />
            <Outlet/>
        </div>
    );
};

export default ProfilePage;
