import React from 'react';
// import Cards from "../../components/Cards/Cards";
import Table from '../../components/Table/Table';
// import { useGetMotorCategoryQuery } from '../../apis/categoryApi';

import './motor.css';

const MotorPage = () => {
    // const { data, isLoading, error } = useGetMotorCategoryQuery({
    //     limit: 50,
    //     offset: 0,
    // });

    // console.log('go', data, isLoading, error);

    return (
        <div className="motor-page">
            <h1>Motors</h1>
            {/* <Cards /> */}
            <Table />
        </div>
    );
};

export default MotorPage;
