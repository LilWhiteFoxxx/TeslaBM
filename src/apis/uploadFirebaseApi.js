// uploadFirebaseApi.js
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './base';

export const uploadFirebaseApi = createApi({
    reducerPath: 'uploadFirebaseApi',
    baseQuery: axiosBaseQuery(),
    endpoints: (builder) => ({
        uploadFirebase: builder.mutation({
            query: (payload) => {
                const formData = new FormData();
                payload.files.forEach(file => {
                    formData.append('files', file);
                });

                return {
                    url: '/uploadfirebase',
                    method: 'POST',
                    data: formData,
                };
            },
        }),
    }),
});

export const { useUploadFirebaseMutation } = uploadFirebaseApi;
