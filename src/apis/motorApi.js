import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './base';

// Define a service using a base URL and expected endpoints
export const motorApi = createApi({
    reducerPath: 'motorApi',
    baseQuery: axiosBaseQuery(),
    endpoints: (builder) => ({
        getAllMotor: builder.query({
            query: () => ({
                url: `/motors/allmotordetail`,
                method: 'get',
            }),
        }),
        // deleteCategory: builder.mutation({
        //     query: (id) => ({
        //         url: `/categories/${id}`,
        //         method: 'delete',
        //     }),
        // }),
        createMotor: builder.mutation({
            query: (payload) => ({
                url: `/motors`,
                method: 'post',
                data: payload,
            }),
        }),
    }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllMotorQuery, useCreateMotorMutation } = motorApi;
