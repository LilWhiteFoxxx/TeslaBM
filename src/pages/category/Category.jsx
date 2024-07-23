import React from 'react';
import CategoryTable from '../../components/Category/CategoryTable';

import './category.css';

const CategoryPage = () => {
    return (
        <div className="category-page">
            <h1>Category</h1>
            <CategoryTable />
        </div>
    );
};

export default CategoryPage;
