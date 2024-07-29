import React, { useState } from 'react';
import OrderTable from '../../components/Order/OrderTable';
import { useGetAllOrderQuery } from '../../apis/orderApi';

import './order.css';

const OrderPage = () => {
    const { data, isLoading, error, refetch } = useGetAllOrderQuery();
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [status, setStatus] = useState(''); // New state for order status

    // Define status options
    const statusOptions = ['Pending', 'Approved', 'Delivered', 'Cancelled'];

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
            const dateInRange = orderDate >= start && orderDate <= end;
            const statusMatches = status ? order.orderStatus === status : true; // Filter by status
            return dateInRange && statusMatches;
        })
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return (
        <div className="order-page">
            <h1>Order</h1>
            <div className="flex gap-2 mb-1 date-filter">
                <label className='font-semibold'>
                    Start Date:
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="ml-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 h-[30px]"
                    />
                </label>
                <label className='font-semibold'>
                    End Date:
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="ml-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 h-[30px]"
                    />
                </label>
                <div className='ml-auto'>
                    <label className='font-semibold'>
                        Status:
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="ml-2 px-1 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 h-[30px]"
                        >
                            <option value="">All</option>
                            {statusOptions.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
            </div>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error loading orders: {error.message}</p>}
            <OrderTable orders={filteredOrders} refetch={refetch} />
        </div>
    );
};

export default OrderPage;
