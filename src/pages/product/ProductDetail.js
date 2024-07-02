import React from 'react';
// import "./ShopPage.scss";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import ButtonAuth from '../../components/auth/ButtonAuth';
import Recommend from '../../components/shopPage/Recommend';
import './productDetail.scss'

const ProductDetail = () => {
    return (
        <>
            <div className="product-detail-component flex bg-black px-5">
                <div className="product-content-carousel w-[80%] mt-[100px] pr-[40px]">
                    <img
                        className="product-img-main"
                        src="https://digitalassets-shop.tesla.com/image/upload/f_auto,q_auto/v1/content/dam/tesla/CAR_ACCESSORIES/MODEL_X/INTERIOR/1562263-00-A_0_2000.jpg"
                        alt=""
                    />
                </div>
                <div className="product-container-side flex flex-col pl-4 mt-[100px]">
                    <h2 className="product-title flex text-[#ffffff] text-[28px]">
                        MODEL X PET LINER
                    </h2>
                    <div className="pr-[90px]">
                        <div className="product-details flex flex-col mt-2">
                            <p className="product-price text-[#fff] text-[18px] flex mb-2">
                                $135
                            </p>
                            <p className="flex text-[#8e8e8e] text-[12px] mb-3">
                                See if this accessory is compatible with a car
                                in your Tesla Account
                            </p>
                            {/* <a href="/groupproject/signin">SIGN IN</a> */}
                            <ButtonAuth
                                title={'ADD TO CART'}
                                className={'btn-sign-up'}
                            />
                            <div className="product-description flex flex-col mt-4">
                                <label className="flex text-[#fff]">
                                    DESCRIPTION
                                </label>
                                <div className="flex mt-2 text-[#8e8e8e]">
                                    Content
                                </div>
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
