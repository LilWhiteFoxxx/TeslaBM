import React from 'react';

import Cards from '../../components/Cards/Cards';
import RecentOrderTable from '../../components/Table/Table';
import RightSide from '../../components/RigtSide/RightSide';
import { useGetAllOrderQuery } from '../../apis/orderApi';

import './MainDash.css';

const MainDash = () => {
    const { data, refetch } = useGetAllOrderQuery();

    // Get today's date
    const todayStart = new Date().setHours(0, 0, 0, 0);
    const todayEnd = new Date().setHours(23, 59, 59, 999);

    // Filter and sort orders
    const filteredOrders = data?.metadata
        ?.filter((order) => {
            const orderDate = new Date(order.createdAt).setHours(0, 0, 0, 0); // Normalize to start of day
            return orderDate >= todayStart && orderDate <= todayEnd;
        })
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return (
        <>
            <div className="MainDash">
                <h1>Dashboard</h1>
                <Cards />
                <RecentOrderTable orders={filteredOrders} refetch={refetch} />
            </div>
            <RightSide />
        </>
    );
};

export default MainDash;
