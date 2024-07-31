import React from 'react';
import Cards from '../../components/Cards/Cards';
import RecentOrderTable from '../../components/Table/Table';
import RightSide from '../../components/RigtSide/RightSide';
import {
    useGetAllOrderQuery,
    useGetSalebyStatusIdQuery,
} from '../../apis/orderApi';

import './MainDash.css';

// Helper function to format dates to YYYY-MM-DD
const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const MainDash = () => {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const tomorrowEndDate = new Date(todayStart);
    tomorrowEndDate.setDate(tomorrowEndDate.getDate() + 1);

    const tomorrowEnd = new Date(todayStart);
    tomorrowEnd.setDate(tomorrowEnd.getDate() + 1);
    tomorrowEnd.setMilliseconds(-1);

    const { data, refetch } = useGetAllOrderQuery();

    const { data: totalSale, refetch: refetchSales } =
        useGetSalebyStatusIdQuery({
            startDate: formatDate(todayStart),
            endDate: formatDate(tomorrowEndDate),
        });

    const filteredOrders = data?.metadata
        ?.filter((order) => {
            const orderDate = new Date(order.createdAt).setHours(0, 0, 0, 0);
            return (
                orderDate >= todayStart.getTime() &&
                orderDate <= tomorrowEnd.getTime()
            );
        })
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return (
        <>
            <div className="MainDash">
                <h1>Dashboard</h1>
                <Cards
                    totalSale={totalSale?.metadata?.totalSales[0]?._sum?.total}
                    orderAmount={totalSale?.metadata?.orderCount}
                />
                <RecentOrderTable
                    orders={filteredOrders}
                    refetch={refetch}
                    refetchSales={refetchSales}
                />
            </div>
            <RightSide />
        </>
    );
};

export default MainDash;
