import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { getAllProduct } from '../../apis/product';
import CardsGrid from '../../components/CardsGrid';

import './ProductPage.scss';

const ProductPage = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const res = await getAllProduct();
            setProducts(res.metadata);
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
        filteredItems = items.flatMap((category) =>
            category.subCategories.filter(
                (sub) => sub.subCategory.toLowerCase() === params.subCategory
            )
        );
    } else if (params.productCategory) {
        filteredItems = items.filter(
            (category) =>
                category.category.toLowerCase() === params.productCategory
        );
    } else {
        filteredItems = items;
    }

    return (
        <div style={{ paddingTop: '100px' }} className="productsPage">
            <button onClick={() => navigate('/groupproject/productdetail')}>
                Click me
            </button>
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
