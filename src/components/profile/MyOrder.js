import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getOrdersByUserId } from '../../apis/order';
import { formatDate } from '../../utils';

function MyOrder() {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getOrdersByUserId();
                setOrders(res.metadata);
                setFilteredOrders(res.metadata); // Set initial filtered orders
            } catch (error) {
                console.error('Failed to fetch data', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const filterOrdersByDate = () => {
            if (!startDate && !endDate) {
                setFilteredOrders(orders);
                return;
            }

            const filtered = orders.filter((order) => {
                const orderDate = new Date(order.createdAt);
                const isAfterStartDate =
                    !startDate || orderDate >= new Date(startDate);
                const isBeforeEndDate =
                    !endDate || orderDate <= new Date(endDate);

                return isAfterStartDate && isBeforeEndDate;
            });

            setFilteredOrders(filtered);
        };

        filterOrdersByDate();
    }, [startDate, endDate, orders]);

    return (
        <div className="my-order">
            <h1 className="text-2xl font-bold mb-2">My Orders</h1>
            <div className="flex mb-2 justify-end">
                <div className="flex space-x-4">
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="border rounded p-2"
                    />
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="border rounded p-2"
                    />
                </div>
            </div>
            <div className="my-order-content">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="sticky top-0 bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                STT
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Order ID
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Total
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Created At
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Details
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredOrders.map((order, index) => (
                            <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {index + 1}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {order.id}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    ${order.total.toLocaleString('en-US')}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {order.orderStatus.status}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {formatDate(order.createdAt)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                                    <Link
                                        to={`/groupproject/invoicer/${order.id}`}
                                        className="hover:underline"
                                    >
                                        View Details
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default MyOrder;
