import React from 'react';
// import Cards from "../../components/Cards/Cards";
import Table from '../../components/Table/Table';
// import { useGetMotorCategoryQuery } from '../../apis/categoryApi';

import './accessories.css';

const AccessoriesPage = () => {
    // const { data, isLoading, error } = useGetMotorCategoryQuery({
    //     limit: 50,
    //     offset: 0,
    // });

    // console.log('go', data, isLoading, error);

    return (
        <div className="accessories-page">
            <h1>Acessories</h1>
            {/* <Cards /> */}
            <Table />
        </div>
    );
};

export default AccessoriesPage;
