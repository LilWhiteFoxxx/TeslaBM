import { createApi} from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from './base';

// Define a service using a base URL and expected endpoints
export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getOrdersByUserId: builder.query({
      query: () => ({ url: '/order', method: 'get'}),
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetOrdersByUserIdQuery } = orderApi