import React from 'react';
import MotorEditModal from './MotorEditModal';
import { capitalizeFirstLetter, formatDate } from '../../utils';
import AccessoriesEditModal from './AccessoriesEditModal';

const ProductTable = ({ products, categories, refetch, type = 'motor' }) => {
    const [selectedProduct, setSelectedProduct] = React.useState(null);
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const openModal = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedProduct(null);
        setIsModalOpen(false);
    };

    if (!products || products.length === 0) return <p>No data available</p>;

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr>
                        <th className="sticky top-0 py-2 px-4 border-b">STT</th>
                        <th className="py-2 px-4 border-b">Product</th>
                        <th className="py-2 px-4 border-b">Color</th>
                        <th className="py-2 px-4 border-b">
                            Manufacturing Year
                        </th>
                        <th className="py-2 px-4 border-b">Original Price</th>
                        <th className="py-2 px-4 border-b">Category</th>
                        <th className="py-2 px-4 border-b">Stock</th>
                        <th className="py-2 px-4 border-b">CreatedAt</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr
                            key={product.id}
                            onClick={() => openModal(product)}
                            className="cursor-pointer hover:bg-gray-100"
                        >
                            <td className="py-2 px-4 border-b">{index + 1}</td>
                            <td className="py-2 px-4 border-b flex items-center">
                                <img
                                    src={product.img}
                                    alt={product.name}
                                    className="w-16 h-16 object-contain rounded mr-4"
                                />
                                {product.name}
                            </td>
                            <td className="py-2 px-4 border-b">
                                <div className="flex items-center">
                                    {product.colorId ? (
                                        <>
                                            <img
                                                src={product.colorImage}
                                                alt="Color"
                                                className="w-8 h-8 rounded-full object-cover border-2 border-solid border-black"
                                            />
                                            <span className="ml-1">
                                                {capitalizeFirstLetter(
                                                    product.color
                                                )}
                                            </span>
                                        </>
                                    ) : (
                                        <span>No</span>
                                    )}
                                </div>
                            </td>
                            <td className="py-2 px-4 border-b">
                                <p className="flex justify-center items-center">
                                    {product.mfg}
                                </p>
                            </td>
                            <td className="py-2 px-4 border-b">
                                <p className="flex justify-center items-center">
                                    ${product.originalPrice}
                                </p>
                            </td>
                            <td className="py-2 px-4 border-b">
                                <p className="flex justify-center items-center">
                                    {product.categoryName}
                                </p>
                            </td>
                            <td className="py-2 px-4 border-b">
                                <p className="flex justify-center items-center">
                                    {product.quantity}
                                </p>
                            </td>
                            <td className="py-2 px-4 border-b">
                                <p className="flex justify-center items-center">
                                    {formatDate(product.createdAt)}
                                </p>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isModalOpen &&
                selectedProduct &&
                (type === 'motor' ? (
                    <MotorEditModal
                        product={selectedProduct}
                        categories={categories}
                        onClose={closeModal}
                        onRefetch={refetch}
                    />
                ) : (
                    <AccessoriesEditModal
                        product={selectedProduct}
                        categories={categories}
                        onClose={closeModal}
                        onRefetch={refetch}
                    />
                ))}
        </div>
    );
};

export default ProductTable;
