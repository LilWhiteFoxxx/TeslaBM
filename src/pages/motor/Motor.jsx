import React, { useState } from 'react';
import {
    useCreateMotorMutation,
    useGetAllMotorQuery,
} from '../../apis/motorApi';
import { useGetMotorCategoryQuery } from '../../apis/categoryApi';
import ProductTable from '../../components/product/ProductTable';
import ProductModal from '../../components/product/ProductModal';

import './motor.css';

const MotorPage = () => {
    const { data, error, isLoading, refetch } = useGetAllMotorQuery();
    const { data: categoriesData, error: categoryError } =
        useGetMotorCategoryQuery({
            limit: 50,
            offset: 0,
        });
    const [createMotor] = useCreateMotorMutation();
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(''); // State for selected category

    const handleAddProduct = async (product) => {
        try {
            console.log(product);
            await createMotor(product).unwrap();
            refetch(); // Refresh data after adding a product
            setModalOpen(false); // Close the modal after submission
        } catch (err) {
            console.error('Failed to add product:', err);
            // Handle error (e.g., show an error message to the user)
        }
    };

    // Filter data based on the selected category
    const filteredData =
        data?.metadata.filter((product) =>
            selectedCategory ? product.categoryName === selectedCategory : true
        ) || [];

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading motors.</p>;
    if (categoryError) return <p>Error loading categories.</p>;

    return (
        <div className="motor-page">
            <h1>Motors</h1>
            <div className="flex place-content-between w-full mb-2">
                <div className="filter-container mb-4">
                    <select
                        className="filter-select text-black font-bold px-4 py-2 rounded"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="">All Categories</option>
                        {categoriesData?.metadata.map((category) => (
                            <option key={category.id} value={category.name}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button
                    className="btn-add text-black font-bold px-4 py-2 rounded max-w-[200px] h-[40px] min-h-[40px]"
                    onClick={() => setModalOpen(true)}
                    aria-label="Add New Product"
                >
                    Add Product
                </button>
            </div>

            <div className="table-container">
                <ProductTable products={filteredData} />
            </div>
            {isModalOpen && (
                <div className="modal-add">
                    <ProductModal
                        isOpen={isModalOpen}
                        onClose={() => setModalOpen(false)}
                        onSubmit={handleAddProduct}
                        categories={categoriesData?.metadata || []}
                    />
                </div>
            )}
        </div>
    );
};

export default MotorPage;
