import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './base';

// Define a service using a base URL and expected endpoints
export const colorApi = createApi({
    reducerPath: 'colorApi',
    baseQuery: axiosBaseQuery(),
    endpoints: (builder) => ({
        getAllColor: builder.query({
            query: () => ({
                url: `/colors/allcolor`,
                method: 'get',
            }),
        }),
    }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllColorQuery } = colorApi;
