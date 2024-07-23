import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './base';

// Define a service using a base URL and expected endpoints
export const categoryApi = createApi({
    reducerPath: 'categoryApi',
    baseQuery: axiosBaseQuery(),
    endpoints: (builder) => ({
        getMotorCategory: builder.query({
            query: (payload) => ({
                url: `/categories?limit=${payload.limit}&offset=${payload.offset}`,
                method: 'get',
            }),
        }),
        getAccessoriesCategory: builder.query({
            query: (payload) => ({
                url: `/categories/accessories?limit=${payload.limit}&offset=${payload.offset}`,
                method: 'get',
            }),
        }),
        deleteCategory: builder.mutation({
            query: (id) => ({
                url: `/categories/${id}`,
                method: 'delete',
            }),
        }),
        createCategory: builder.mutation({
            query: (payload) => ({
                url: `/categories`,
                method: 'post',
                data: {
                    name: payload.name,
                },
            }),
        }),
        updateCategory: builder.mutation({
            query: (payload) => ({
                url: `/categories/${payload.id}`,
                method: 'put',
                data: {
                    name: payload.name,
                },
            }),
        }),
    }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetMotorCategoryQuery, useGetAccessoriesCategoryQuery, useDeleteCategoryMutation, useCreateCategoryMutation, useUpdateCategoryMutation } = categoryApi;
