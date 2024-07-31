import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './base';

// Define a service using a base URL and expected endpoints
export const orderApi = createApi({
    reducerPath: 'orderApi',
    baseQuery: axiosBaseQuery(),
    endpoints: (builder) => ({
        getAllOrder: builder.query({
            query: () => ({
                url: '/order/allorder',
                method: 'get',
                headers: {
                    authorization: process.env.REACT_APP_AT_KEY,
                },
            }),
        }),
        updateOrderStatus: builder.mutation({
            query: (payload) => ({
                url: `/order/updateorderstatus/${payload.orderId}`,
                method: 'put',
                data: {
                    orderStatusId: payload.orderStatusId,
                },
                headers: {
                    authorization: process.env.REACT_APP_AT_KEY,
                },
            }),
        }),
        getSalebyStatusId: builder.query({
            query: (payload) => ({
                url: `/order/ordertotalsalebystatus?startdate=${payload.startDate}&enddate=${payload.endDate}`,
                method: 'get',
                headers: {
                    authorization: process.env.REACT_APP_AT_KEY,
                },
            }),
        }),
    }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllOrderQuery, useUpdateOrderStatusMutation, useGetSalebyStatusIdQuery } = orderApi;
