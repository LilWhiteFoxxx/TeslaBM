import React, { useState } from 'react';

import {
    useGetAllAccessoriesQuery,
    useCreateAccessoriesMutation,
} from '../../apis/accessoriesApi';
import { useGetAccessoriesCategoryQuery } from '../../apis/categoryApi';
import ProductTable from '../../components/product/ProductTable';
import AddAccessoriesModal from '../../components/product/AddAccessoriesModal';

import './accessories.css';

const AccessoriesPage = () => {
    const { data, error, isLoading, refetch } = useGetAllAccessoriesQuery();
    const { data: categoriesData, error: categoryError } =
        useGetAccessoriesCategoryQuery({
            limit: 50,
            offset: 0,
        });
    const [createAccessories] = useCreateAccessoriesMutation();
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');

    const handleAddProduct = async (product) => {
        try {
            console.log(product);
            await createAccessories(product).unwrap();
            refetch(); // Refresh data after adding a product
            setModalOpen(false); // Close the modal after submission
        } catch (err) {
            console.error('Failed to add product:', err);
            // Handle error (e.g., show an error message to the user)
        }
    };

    const filteredData =
        data?.metadata.filter((product) =>
            selectedCategory ? product.categoryName === selectedCategory : true
        ) || [];

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading accessories.</p>;
    if (categoryError) return <p>Error loading categories.</p>;

    return (
        <div className="accessories-page">
            <h1>Acessories</h1>
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
                <ProductTable
                    products={filteredData}
                    categories={categoriesData?.metadata || []}
                    refetch={refetch}
                    type="accessories"
                />
            </div>
            {isModalOpen && (
                <div className="modal-add">
                    <AddAccessoriesModal
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

export default AccessoriesPage;
