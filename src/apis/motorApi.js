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
        createMotor: builder.mutation({
            query: (payload) => ({
                url: `/motors`,
                method: 'post',
                data: payload,
            }),
        }),
        updateMotor: builder.mutation({
            query: (payload) => ({
                url: `/motors/${payload.id}`,
                method: 'put',
                data: payload,
            }),
        }),
        deleteMotor: builder.mutation({
            query: (id) => ({
                url: `/motors/${id}`,
                method: 'delete',
            }),
        }),
    }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
    useGetAllMotorQuery,
    useCreateMotorMutation,
    useUpdateMotorMutation,
    useDeleteMotorMutation,
} = motorApi;
 