import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getAllMotor } from '../../apis/motor';
import CardsGrid from '../../components/CardsGrid';

import './ProductPage.scss';
import { getAllAccessories } from '../../apis/accessories';

const ProductPage = () => {
    const params = useParams();
    const [products, setProducts] = useState([]);
    // const [products2, setProducts2] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const [motorsRes, accessoriesRes] = await Promise.all([
                    getAllMotor(),
                    getAllAccessories(),
                ]);

                const allProducts = [
                    ...motorsRes.metadata,
                    ...accessoriesRes.metadata,
                ];
                setProducts(allProducts);
            } catch (error) {
                console.error('Failed to fetch data', error);
            }
        };

        fetchProducts();
    }, []);

    const transformData = (products) => {
        const categories = {};

        products.forEach((product) => {
            const { category, subCategory } = product;

            if (!categories[category]) {
                categories[category] = {};
            }

            if (!categories[category][subCategory]) {
                categories[category][subCategory] = [];
            }

            categories[category][subCategory].push(product);
        });

        return Object.keys(categories).map((category) => ({
            category,
            subCategories: Object.keys(categories[category]).map(
                (subCategory) => ({
                    subCategory,
                    products: categories[category][subCategory],
                })
            ),
        }));
    };

    const items = transformData(products);

    let filteredItems;
    if (params.subCategory) {
        const formattedSubCategory = params.subCategory.replace(/-/g, ' ');
        filteredItems = items.flatMap((category) =>
            category.subCategories.filter(
                (sub) =>
                    sub.subCategory.toLowerCase() ===
                    formattedSubCategory.toLowerCase()
            )
        );
    } else if (params.productCategory) {
        const formattedProductCategory = params.productCategory.replace(
            /-/g,
            ' '
        );
        filteredItems = items.filter(
            (category) =>
                category.category.toLowerCase() ===
                formattedProductCategory.toLowerCase()
        );
    } else {
        filteredItems = items;
    }

    return (
        <div style={{ paddingTop: '100px' }} className="productsPage">
            {filteredItems.length > 0 ? (
                params.subCategory ? (
                    filteredItems.map((sub, index) => (
                        <div key={index} className="chargingWrapper">
                            <h3>{sub.subCategory.replace(/-/g, ' ')}</h3>
                            <CardsGrid products={sub.products} />
                        </div>
                    ))
                ) : (
                    filteredItems.map((category, i) => (
                        <div key={i} className="chargingWrapper">
                            <h2>{category.category}</h2>
                            {category.subCategories.map((sub, index) => (
                                <div key={index} className="atHome">
                                    <h3>
                                        {sub.subCategory.replace(/-/g, ' ')}
                                    </h3>
                                    <CardsGrid products={sub.products} />
                                </div>
                            ))}
                        </div>
                    ))
                )
            ) : (
                <p>No products found.</p>
            )}
        </div>
    );
};

export default ProductPage;
