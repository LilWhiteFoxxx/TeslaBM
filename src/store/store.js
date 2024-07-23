import { configureStore } from '@reduxjs/toolkit';
import { orderApi } from '../apis/orderApi';
import { categoryApi } from '../apis/categoryApi';
import { motorApi } from '../apis/motorApi';
import { accessoriesApi } from '../apis/accessoriesApi';

export const store = configureStore({
    reducer: {
        [orderApi.reducerPath]: orderApi.reducer,
        [categoryApi.reducerPath]: categoryApi.reducer,
        [motorApi.reducerPath]: motorApi.reducer,
        [accessoriesApi.reducerPath]: accessoriesApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(
            orderApi.middleware,
            categoryApi.middleware,
            motorApi.middleware,
            accessoriesApi.middleware,
        );
    },
});
