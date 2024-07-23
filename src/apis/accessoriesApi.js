import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './base';

// Define a service using a base URL and expected endpoints
export const accessoriesApi = createApi({
    reducerPath: 'accessoriesApi',
    baseQuery: axiosBaseQuery(),
    endpoints: (builder) => ({
        getAllAccessories: builder.query({
            query: () => ({
                url: `/accessories/allaccessoriesdetail`,
                method: 'get',
            }),
        }),
        // deleteCategory: builder.mutation({
        //     query: (id) => ({
        //         url: `/categories/${id}`,
        //         method: 'delete',
        //     }),
        // }),
        createAccessories: builder.mutation({
            query: (payload) => ({
                url: `/accessories`,
                method: 'post',
                data: payload,
            }),
        }),
    }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllAccessoriesQuery, useCreateAccessoriesMutation } = accessoriesApi;
