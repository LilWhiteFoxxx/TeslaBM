import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getPriceRange } from '../utils';
// import { addItem } from '../app/features/cartSlice';
import './Card.scss';

const Card = (props) => {
    const itemImg = props.itemImg;
    const itemImgHover = props.itemImgHover;
    const itemName = props.itemName;
    const stockStatus = props.stockStatus;
    const product = props.product;
    // const itemPrice = props.itemPrice;
    const itemPrice = getPriceRange(product?.productDetails);
    const [size, setSize] = useState(false);
    const [selectedColor, setSelectedColor] = useState({});

    // const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleProductClick = () => {
        navigate(`/groupproject/product/${product.slug}`, {
            state: { product },
        });
    };

    return (
        <div className="cardWrapper">
            <div className="stockStatus">
                {!stockStatus && <p>Out Of Stock</p>}
            </div>

            <div className="itemImgWrapper">
                <div className="itemImg w-[90%] h-[90%] object-cover">
                    {itemName === 'Tesla Shop Gift card' ? (
                        <video
                            className="img-wrapper"
                            height="100%"
                            width="100%"
                            autoPlay="autoplay"
                            muted
                            loop
                        >
                            <source src={itemImg} type="video/webm" />{' '}
                        </video>
                    ) : (
                        <img
                            src={
                                Object.values(selectedColor).length > 0
                                    ? selectedColor.itemImg
                                    : itemImg
                            }
                            alt=""
                        />
                    )}
                </div>
                <div className="itemImgOnHover w-[90%] h-[90%] object-cover">
                    {itemName === 'Tesla Shop Gift card' ? (
                        <video
                            className="img-wrapper"
                            height="100%"
                            width="100%"
                            autoPlay="autoplay"
                            muted
                            loop
                        >
                            <source src={itemImg} type="video/webm" />{' '}
                        </video>
                    ) : (
                        <img
                            src={
                                Object.values(selectedColor).length > 0
                                    ? selectedColor.itemImgHover
                                    : itemImgHover
                            }
                            alt=""
                        />
                    )}
                    <div
                        className="quickAdd"
                        onClick={handleProductClick}
                        onMouseEnter={() => setSize(true)}
                        onMouseLeave={() => setSize(false)}
                    >
                        {product.options.includes('quick-add+') ? (
                            <p>Quick Add +</p>
                        ) : (
                            <p>View Details</p>
                        )}
                        {size && product.options.includes('select-size') && (
                            <div className="sizeSelector">
                                <h4>Select Your Size</h4>
                                <ul>
                                    <li>S</li>
                                    <li>M</li>
                                    <li>L</li>
                                    <li>XL</li>
                                    <li>XXL</li>
                                    <li>3XL</li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="item">
                <div>
                    <p className="text-[12px]">{product.mfg}</p>
                    <p className="itemName" onClick={handleProductClick}>
                        {itemName}
                    </p>
                    <p className="itemPrice">
                        $
                        {typeof itemPrice === 'object'
                            ? `${itemPrice.minPrice.toLocaleString(
                                  'en-US'
                              )} - $${itemPrice.maxPrice.toLocaleString('en-US')}`
                            : itemPrice.toLocaleString('en-US')}
                    </p>
                </div>
                {product.options.includes('select-color') && product.color2 ? (
                    <div className="productTile">
                        {product.color2.map((color, index) => (
                            <button
                                key={index}
                                style={{ backgroundColor: color.color }}
                                onClick={() => {
                                    setSelectedColor(color);
                                }}
                            >
                                {' '}
                            </button>
                        ))}
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
};

export default Card;
