import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import ButtonAuth from '../../components/auth/ButtonAuth';
import Recommend from '../../components/shopPage/Recommend';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './productDetail.scss';
import 'swiper/swiper-bundle.css';

const ProductDetail = () => {
    const { user } = useSelector((state) => state.auth);
    const images = [
        'https://digitalassets-shop.tesla.com/image/upload/f_auto,q_auto/v1/content/dam/tesla/CAR_ACCESSORIES/MODEL_X/INTERIOR/1562263-00-A_0_2000.jpg',
        'https://digitalassets-shop.tesla.com/image/upload/f_auto,q_auto/v1/content/dam/tesla/studio/CAR_ACCESSORIES/MODEL_X/INTERIOR/1763873-00-A_0_2000.jpg',
        'https://digitalassets-shop.tesla.com/image/upload/f_auto,q_auto/v1/content/dam/tesla/CAR_ACCESSORIES/MODEL_X/INTERIOR/1846376-00-A_0_2000.jpg',
        'https://digitalassets-shop.tesla.com/image/upload/f_auto,q_auto/v1/content/dam/tesla/studio/CAR_ACCESSORIES/MODEL_X/INTERIOR/1490876-00-A_4_2000.jpg',
    ];

    const [activeIndex, setActiveIndex] = useState(0);
    const [isFocused, setIsFocused] = useState(false);

    const handlePrev = () => {
        setActiveIndex((prevIndex) =>
            prevIndex > 0 ? prevIndex - 1 : images.length - 1
        );
    };

    const handleNext = () => {
        setActiveIndex((prevIndex) =>
            prevIndex < images.length - 1 ? prevIndex + 1 : 0
        );
    };
    return (
        <>
            <div className="product-detail-component flex bg-[#111] px-5">
                <div className="product-content-carousel flex flex-col mt-[100px] max-w-[70%] pr-8">
                    <div
                        className="swiper-container relative"
                        onMouseEnter={() => setIsFocused(true)}
                        onMouseLeave={() => setIsFocused(false)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        tabIndex="0"
                    >
                        <img
                            className="product-img-main"
                            src={images[activeIndex]}
                            alt="Product main"
                        />
                        <button
                            onClick={handlePrev}
                            className={`absolute w-9 h-9 left-2 top-1/2 transform -translate-y-1/2 bg-[#8e8e8e] text-white p-2 transition-opacity duration-300 ${
                                isFocused ? 'opacity-100' : 'opacity-0'
                            }`}
                        >
                            {'<'}
                        </button>
                        <button
                            onClick={handleNext}
                            className={`absolute w-9 h-9 right-2 top-1/2 transform -translate-y-1/2 bg-[#8e8e8e] text-white p-2 transition-opacity duration-300 ${
                                isFocused ? 'opacity-100' : 'opacity-0'
                            }`}
                        >
                            {'>'}
                        </button>
                    </div>

                    <div className="swiper-thumb flex space-x-4 w-[200px] h-[200px] mt-4 mb-4">
                        {images.map((image, index) => (
                            <img
                                key={index}
                                className="swiper-img"
                                src={image}
                                alt={`Thumbnail image ${index + 1}`}
                                onClick={() => setActiveIndex(index)}
                            />
                        ))}
                    </div>
                </div>
                <div className="product-container-side flex flex-col pl-4 mt-[100px] max-w-[30%] text-left mr-5">
                    <h2 className="product-title flex text-[#ffffff] text-[28px]">
                        MODEL X PET LINER
                    </h2>
                    <div className="">
                        <div className="product-details flex flex-col mt-2 pr-[90px] max-w-[430px]">
                            <p className="product-price text-[#fff] text-[18px] mb-2">
                                $135
                            </p>

                            {user && (
                                <p className="text-[#8e8e8e] text-[12px] mb-3">
                                    See if this accessory is compatible with a
                                    car in your Tesla Account
                                    <a
                                        href="/groupproject/signin"
                                        className="text-[#fff] text-[12px] mb-3 underline"
                                    >
                                        {' '}
                                        SIGN IN
                                    </a>
                                </p>
                            )}
                            {/* <a href="/groupproject/signin">SIGN IN</a> */}
                            <ButtonAuth
                                title={'ADD TO CART'}
                                className={'btn-sign-up'}
                            />
                        </div>
                        <div className="product-description flex flex-col mt-4">
                            <label className="flex text-[#fff]">
                                DESCRIPTION
                            </label>
                            <div className="mt-2 text-[#8e8e8e] text-[13px]">
                                <p>
                                    MODEL X PET LINER IS MADE FROM A BREATHABLE
                                    QUILTED FLEECE MATERIAL, CREATING MAXIMUM
                                    COMFORT FOR YOUR PET DURING CAR RIDES OR
                                    WHILE RELAXING IN DOG MODE. DESIGNED
                                    EXCLUSIVELY FOR THE SECOND ROW OF MODEL X,
                                    THE ONE-PIECE SET FEATURES A DURABLE
                                    WATER-RESISTANT HAMMOCK-STYLE PET LINER TO
                                    PROTECT AGAINST PAWS, DIRT, PET HAIR AND ANY
                                    ACCIDENTAL SLOBBER.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Recommend />
        </>
    );
};

export default ProductDetail;
