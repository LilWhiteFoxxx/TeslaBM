import React, { useState } from 'react';
import OrderTable from '../../components/Order/OrderTable';
import { useGetAllOrderQuery } from '../../apis/orderApi';

import './order.css';

const OrderPage = () => {
    const { data, isLoading, error, refetch } = useGetAllOrderQuery();
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    // Filter and sort orders
    const filteredOrders = data?.metadata
        ?.filter((order) => {
            const orderDate = new Date(order.createdAt).setHours(0, 0, 0, 0); // Normalize to start of day
            const start = startDate
                ? new Date(startDate).setHours(0, 0, 0, 0)
                : new Date(0); // Start of day for startDate
            const end = endDate
                ? new Date(endDate).setHours(23, 59, 59, 999)
                : new Date(); // End of day for endDate
            return orderDate >= start && orderDate <= end;
        })
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return (
        <div className="order-page">
            <h1>Order</h1>
            <div className="flex gap-2 mb-1 date-filter">
                <label>
                    Start Date:
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="ml-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 h-[30px]"
                    />
                </label>
                <label>
                    End Date:
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="ml-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 h-[30px]"
                    />
                </label>
            </div>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error loading orders: {error.message}</p>}
            <OrderTable orders={filteredOrders} refetch={refetch} />
        </div>
    );
};

export default OrderPage;
