import { configureStore } from '@reduxjs/toolkit';
import { orderApi } from '../apis/orderApi';
import { categoryApi } from '../apis/categoryApi';
import { motorApi } from '../apis/motorApi';
import { accessoriesApi } from '../apis/accessoriesApi';
import { colorApi } from '../apis/colorApi';
import { uploadFirebaseApi } from '../apis/uploadFirebaseApi';

export const store = configureStore({
    reducer: {
        [orderApi.reducerPath]: orderApi.reducer,
        [categoryApi.reducerPath]: categoryApi.reducer,
        [motorApi.reducerPath]: motorApi.reducer,
        [accessoriesApi.reducerPath]: accessoriesApi.reducer,
        [colorApi.reducerPath]: colorApi.reducer,
        [uploadFirebaseApi.reducerPath]: uploadFirebaseApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(
            orderApi.middleware,
            categoryApi.middleware,
            motorApi.middleware,
            accessoriesApi.middleware,
            colorApi.middleware,
            uploadFirebaseApi.middleware
        );
    },
});
