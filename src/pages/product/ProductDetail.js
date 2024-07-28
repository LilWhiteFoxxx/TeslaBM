import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import ButtonAuth from '../../components/auth/ButtonAuth';
import InputAuth from '../../components/auth/InputAuth';
import { addToCart } from '../../apis/cart';
import { addItem } from '../../app/features/cartSlice';
import Tesfayedev from '../../components/shopPage/Tesfayedev';
import PulsingCircles from '../../components/productPage/PulsingCircles';

import { ReactComponent as SectionHeadlinesNeutral } from '../../Assets/icon/section_headlines_neutral.svg';
import { ReactComponent as SectionHeadlines } from '../../Assets/icon/section_headlines_sport.svg';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './productDetail.scss';
import 'swiper/swiper-bundle.css';

const ProductDetail = () => {
    const dispatch = useDispatch();
    const location = useLocation();

    const { user } = useSelector((state) => state.auth);
    const { product } = location.state || {};

    const images = [product?.itemImg, product?.itemImgHover];
    const dataAndEquipment = product?.dataAndEquipment;
    const [activeIndex, setActiveIndex] = useState(0);
    const [isFocused, setIsFocused] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [checkClick, setCheckClick] = useState(false);
    const [startEngine, setStartEngine] = useState(false);
    const [selectedColor, setSelectedColor] = useState(
        product?.productDetails[0]?.colorId || null
    );

    // Ref
    const audioRef = useRef(null);

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

    const handleQuantityChange = (amount) => {
        setQuantity((prevQuantity) => Math.max(1, prevQuantity + amount));
    };

    const handleColorChange = (colorId) => {
        setSelectedColor(colorId);
    };

    // Find the details for the selected color
    const selectedColorDetail =
        product?.productDetails.find(
            (detail) => detail.colorId === selectedColor
        ) || {};

    const handleAddToCart = async () => {
        const payload = {
            type: product.category === 'motors' ? 'motor' : 'accessories',
            productId: selectedColorDetail.id,
            quantity: quantity,
        };

        try {
            // console.log(payload);
            const response = await addToCart(payload);
            if (response.metadata) {
                dispatch(
                    addItem({
                        type:
                            product.category === 'motors'
                                ? 'motor'
                                : 'accessories',

                        id: response.metadata.id,
                        productName: product.itemName,
                        quantity: quantity,
                        price:
                            selectedColorDetail.salePrice <
                            selectedColorDetail.originalPrice
                                ? selectedColorDetail.salePrice
                                : selectedColorDetail.originalPrice,
                    })
                );
                console.log('Item added to cart!', response.metadata);
            }
        } catch (error) {
            console.error('Failed to add item to cart', error);
        }
    };

    const handleToggleEngine = () => {
        if (audioRef.current) {
            if (startEngine) {
                // Stop and reset the audio
                console.log('go', dataAndEquipment.sound);
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            } else {
                // Play the audio from the start
                audioRef.current.play().catch((error) => {
                    console.error('Error playing audio:', error);
                });
            }
            setStartEngine(!startEngine);
        }
    };

    useEffect(() => {
        const audioElement = audioRef.current;

        const handleAudioEnd = () => {
            setStartEngine(false); // Reset startEngine when audio ends
        };

        if (audioElement) {
            audioElement.addEventListener('ended', handleAudioEnd);
        }

        return () => {
            if (audioElement) {
                audioElement.removeEventListener('ended', handleAudioEnd);
            }
        };
    }, []);

    return (
        <>
            <div className="product-detail-component flex bg-[#111] px-5">
                <div className="product-content-carousel flex flex-col mt-[100px] pr-8">
                    <div
                        className="swiper-container relative w-full h-full min-h-[65vw] max-h-[65vw] max-w-[65vw] min-w-[65vw]"
                        onMouseEnter={() => setIsFocused(true)}
                        onMouseLeave={() => setIsFocused(false)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        tabIndex="0"
                    >
                        <img
                            className="product-img-main w-full h-full object-cover"
                            src={images[activeIndex]}
                            alt="Product main"
                        />
                        <div className="stockStatus">
                            {!product?.stockStatus && <p>Out Of Stock</p>}
                        </div>
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

                    <div className="swiper-thumb flex space-x-4 w-full mt-4 mb-4">
                        {images.map((image, index) => (
                            <img
                                key={index}
                                className="swiper-img w-1/5 object-cover cursor-pointer"
                                src={image}
                                alt={`Thumbnail img ${index + 1}`}
                                onClick={() => setActiveIndex(index)}
                            />
                        ))}
                    </div>
                </div>
                <div className="product-container-side flex flex-col pl-4 mt-[100px] max-w-[30%] text-left mr-12">
                    <h2 className="product-title flex text-[#ffffff] text-[28px]">
                        {product?.itemName}
                    </h2>
                    <div className="">
                        <div className="product-details flex flex-col mt-2 pr-[90px] min-w-[430px]">
                            {product?.stockStatus ? (
                                <>
                                    <p className="product-price text-[#fff] text-[18px] mb-2">
                                        $
                                        {selectedColorDetail?.salePrice <
                                        selectedColorDetail?.originalPrice
                                            ? selectedColorDetail?.salePrice?.toLocaleString(
                                                  'en-US'
                                              )
                                            : selectedColorDetail?.originalPrice?.toLocaleString(
                                                  'en-US'
                                              )}{' '}
                                    </p>

                                    {!user && (
                                        <p className="text-[#8e8e8e] text-[12px] mb-3">
                                            See if this accessory is compatible
                                            with a car in your Tesla Account
                                            <a
                                                href="/groupproject/signin"
                                                className="text-[#fff] text-[12px] mb-3 underline"
                                            >
                                                {' '}
                                                SIGN IN
                                            </a>
                                        </p>
                                    )}

                                    {product?.productDetails[0]?.colorId && (
                                        <>
                                            <label className="flex my-2 text-[#fff]">
                                                COLOR
                                            </label>
                                            <div className="flex space-x-2 mb-4">
                                                {product?.productDetails.map(
                                                    (detail) => (
                                                        <button
                                                            key={detail.colorId}
                                                            onClick={() =>
                                                                handleColorChange(
                                                                    detail.colorId
                                                                )
                                                            }
                                                            className={`color-option relative w-8 h-8 rounded-full border-2 border-[#333] p-1 ${
                                                                selectedColor ===
                                                                detail.colorId
                                                                    ? 'border-[#fff]'
                                                                    : ''
                                                            }`}
                                                        >
                                                            <img
                                                                src={
                                                                    detail.colorImage
                                                                }
                                                                alt={
                                                                    detail.color
                                                                }
                                                                className={`w-full h-full object-cover rounded-full ${
                                                                    selectedColor ===
                                                                    detail.colorId
                                                                        ? 'ring-2 ring-offset-2 ring-[#fff]'
                                                                        : ''
                                                                }`}
                                                            />
                                                            {selectedColor ===
                                                                detail.colorId && (
                                                                <div className="selected-overlay w-full h-full flex items-center justify-center">
                                                                    <svg
                                                                        className="w-4 h-4 text-white"
                                                                        fill="none"
                                                                        stroke="currentColor"
                                                                        viewBox="0 0 24 24"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                    >
                                                                        <path
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            strokeWidth="2"
                                                                            d="M5 13l4 4L19 7"
                                                                        />
                                                                    </svg>
                                                                </div>
                                                            )}
                                                        </button>
                                                    )
                                                )}
                                            </div>
                                        </>
                                    )}

                                    <label className="flex my-2 text-[#fff]">
                                        QUANTITY
                                    </label>
                                    <div className="quantity-input flex items-center mb-4">
                                        <button
                                            onClick={() =>
                                                handleQuantityChange(-1)
                                            }
                                            className={`quantity-btn text-white p-2 ${
                                                quantity === 1
                                                    ? 'opacity-50 cursor-not-allowed'
                                                    : ''
                                            } `}
                                        >
                                            -
                                        </button>
                                        <input
                                            type="number"
                                            className="quantity-field mx-2 border-1 border-[#393c41] w-[80px] h-[50px] text-white text-center justify-center items-center bg-transparent"
                                            value={quantity}
                                            readOnly
                                            onChange={(e) =>
                                                setQuantity(e.target.value)
                                            }
                                        />
                                        <button
                                            onClick={() =>
                                                handleQuantityChange(1)
                                            }
                                            className="quantity-btn text-white p-2"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <ButtonAuth
                                        title={'ADD TO CART'}
                                        className={'btn-sign-up'}
                                        onClick={handleAddToCart}
                                    />
                                </>
                            ) : (
                                <>
                                    <label className="flex mt-2 text-[#c7c7c7] text-xs font-medium">
                                        THIS ITEM IS OUT OF STOCK
                                    </label>
                                    {!checkClick ? (
                                        <label
                                            className="mt-4 flex text-[#c7c7c7] text-xs font-medium underline cursor-pointer"
                                            onClick={() => setCheckClick(true)}
                                        >
                                            EMAIL ME WHEN THIS ITEM IS RESTOCKED
                                        </label>
                                    ) : (
                                        <div className="flex flex-col mt-2">
                                            <label className="my-2 flex text-[#a2a3a5] text-xs font-medium">
                                                EMAIL
                                            </label>
                                            <InputAuth
                                                type={'email'}
                                                className={
                                                    'w-full mb-2.5 bg-transparent text-[#a2a3a5] border-1 border-solid border-[#333] p-2.5'
                                                }
                                            />
                                            <ButtonAuth
                                                title={'NOTIFY ME'}
                                                className={'btn-sign-up'}
                                            />
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                        <div className="product-description flex flex-col mt-4">
                            <label className="flex text-[#fff]">
                                DESCRIPTION
                            </label>
                            <div className="mt-2 text-[#8e8e8e] text-[13px]">
                                <p>{product?.desc}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center items-center my-6">
                <div className="w-[300px] h-[2px] bg-black min-w-[240px]"></div>
                <SectionHeadlinesNeutral className="w-[240px] h-[120px]" />
                <div className="w-[300px] h-[2px] bg-black min-w-[240px]"></div>
            </div>
            <div>
                <Tesfayedev />
            </div>
            {dataAndEquipment && (
                <div>
                    <div className="relative flex flex-col">
                        <div className="flex justify-center items-center mb-4">
                            <div className="w-[300px] h-[2px] bg-black min-w-[240px]"></div>
                            <SectionHeadlines className="w-[240px] h-[120px]" />
                            <div className="w-[300px] h-[2px] bg-black min-w-[240px]"></div>
                        </div>
                        <p className="text-2xl font-bold mb-4 text-center uppercase">
                            {dataAndEquipment.titleData
                                ? dataAndEquipment.titleData
                                : 'BORN ON THE RACETRACK'}
                        </p>
                        <div className="relative flex justify-center items-center">
                            <img
                                src={dataAndEquipment.imgData}
                                alt="data"
                                className="w-full"
                            />
                            <div className="absolute inset-20 flex justify-center items-center">
                                <div className="flex flex-col absolute top-0 left-0 m-4 text-center">
                                    <div className="flex flex-col items-center mb-4">
                                        <p className="text-[60px] font-bold w-[300px]">
                                            {dataAndEquipment.atbOne.atbNumber}
                                        </p>
                                        <div className="w-[300px] h-[2px] bg-black my-2"></div>
                                        <p className="text-[16px] font-bold w-[300px]">
                                            {dataAndEquipment.atbOne.atbName}
                                        </p>
                                    </div>
                                    <div className="flex flex-col items-center mb-4">
                                        <p className="text-[60px] font-bold w-[300px]">
                                            {dataAndEquipment.atbTwo.atbNumber}
                                        </p>
                                        <div className="w-[300px] h-[2px] bg-black my-2"></div>
                                        <p className="text-[16px] font-bold w-[300px]">
                                            {dataAndEquipment.atbTwo.atbName}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-col items-center absolute top-0">
                                    <div className="flex">
                                        <svg
                                            version="1.1"
                                            class="animatedfacts__circleLeft"
                                            xmlns="http://www.w3.org/2000/svg"
                                            x="0px"
                                            y="0px"
                                            viewBox="0 0 51.1 250.9"
                                            width={'120px'}
                                            height={'240px'}
                                            color="black"
                                        >
                                            <line
                                                class="animatedfacts__circleLine"
                                                x1="50.8"
                                                y1="10.4"
                                                x2="33.5"
                                                y2="0.4"
                                            ></line>
                                            <line
                                                class="animatedfacts__circleLine"
                                                x1="45.1"
                                                y1="21"
                                                x2="27.2"
                                                y2="11.9"
                                            ></line>
                                            <line
                                                class="animatedfacts__circleLine"
                                                x1="39.9"
                                                y1="31.9"
                                                x2="21.6"
                                                y2="23.7"
                                            ></line>
                                            <line
                                                class="animatedfacts__circleLine"
                                                x1="35.3"
                                                y1="43"
                                                x2="16.6"
                                                y2="35.8"
                                            ></line>
                                            <line
                                                class="animatedfacts__circleLine"
                                                x1="31.3"
                                                y1="54.4"
                                                x2="12.2"
                                                y2="48.2"
                                            ></line>
                                            <line
                                                class="animatedfacts__circleLine"
                                                x1="27.8"
                                                y1="65.9"
                                                x2="8.5"
                                                y2="60.7"
                                            ></line>
                                            <line
                                                class="animatedfacts__circleLine"
                                                x1="25.0"
                                                y1="77.6"
                                                x2="5.5"
                                                y2="73.5"
                                            ></line>
                                            <line
                                                class="animatedfacts__circleLine"
                                                x1="22.8"
                                                y1="89.5"
                                                x2="3.1"
                                                y2="86.3"
                                            ></line>
                                            <line
                                                class="animatedfacts__circleLine"
                                                x1="21.3"
                                                y1="101.4"
                                                x2="1.4"
                                                y2="99.3"
                                            ></line>
                                            <line
                                                class="animatedfacts__circleLine"
                                                x1="20.3"
                                                y1="113.4"
                                                x2="0.3"
                                                y2="112.3"
                                            ></line>
                                            <line
                                                class="animatedfacts__circleLine"
                                                x1="0"
                                                y1="125.4"
                                                x2="20"
                                                y2="125.4"
                                            ></line>
                                            <line
                                                class="animatedfacts__circleLine"
                                                x1="0.3"
                                                y1="138.5"
                                                x2="20.3"
                                                y2="137.5"
                                            ></line>
                                            <line
                                                class="animatedfacts__circleLine"
                                                x1="1.4"
                                                y1="151.6"
                                                x2="21.3"
                                                y2="149.5"
                                            ></line>
                                            <line
                                                class="animatedfacts__circleLine"
                                                x1="3.1"
                                                y1="164.5"
                                                x2="22.8"
                                                y2="161.4"
                                            ></line>
                                            <line
                                                class="animatedfacts__circleLine"
                                                x1="5.5"
                                                y1="177.4"
                                                x2="25"
                                                y2="173.3"
                                            ></line>
                                            <line
                                                class="animatedfacts__circleLine"
                                                x1="8.5"
                                                y1="190.1"
                                                x2="27.8"
                                                y2="185"
                                            ></line>
                                            <line
                                                class="animatedfacts__circleLine"
                                                x1="12.2"
                                                y1="202.7"
                                                x2="31.3"
                                                y2="196.5"
                                            ></line>
                                            <line
                                                class="animatedfacts__circleLine"
                                                x1="16.6"
                                                y1="215"
                                                x2="35.3"
                                                y2="207.9"
                                            ></line>
                                            <line
                                                class="animatedfacts__circleLine"
                                                x1="21.6"
                                                y1="227.1"
                                                x2="39.9"
                                                y2="219"
                                            ></line>
                                            <line
                                                class="animatedfacts__circleLine"
                                                x1="27.2"
                                                y1="238.9"
                                                x2="45.1"
                                                y2="229.9"
                                            ></line>
                                            <line
                                                class="animatedfacts__circleLine"
                                                x1="33.5"
                                                y1="250.4"
                                                x2="50.8"
                                                y2="240.4"
                                            ></line>
                                        </svg>
                                        <img
                                            className="w-[300px] h-[240px] my-4"
                                            src={dataAndEquipment.iconData}
                                            alt="data2"
                                        />
                                        <svg
                                            version="1.1"
                                            class="animatedfacts__circleRight"
                                            xmlns="http://www.w3.org/2000/svg"
                                            x="0px"
                                            y="0px"
                                            viewBox="0 0 51.1 250.9"
                                            width={'120px'}
                                            height={'240px'}
                                            color="black"
                                        >
                                            <line
                                                class="animatedfacts__circleLine"
                                                x1="0"
                                                y1="10.4"
                                                x2="17.3"
                                                y2="0.4"
                                            ></line>
                                            <line
                                                class="animatedfacts__circleLine"
                                                x1="5.7"
                                                y1="21"
                                                x2="23.6"
                                                y2="11.9"
                                            ></line>
                                            <line
                                                class="animatedfacts__circleLine"
                                                x1="10.9"
                                                y1="31.9"
                                                x2="29.2"
                                                y2="23.7"
                                            ></line>
                                            <line
                                                class="animatedfacts__circleLine"
                                                x1="15.5"
                                                y1="43"
                                                x2="34.2"
                                                y2="35.8"
                                            ></line>
                                            <line
                                                class="animatedfacts__circleLine"
                                                x1="19.6"
                                                y1="54.4"
                                                x2="38.6"
                                                y2="48.2"
                                            ></line>
                                            <line
                                                class="animatedfacts__circleLine"
                                                x1="23"
                                                y1="65.9"
                                                x2="42.3"
                                                y2="60.7"
                                            ></line>
                                            <line
                                                class="animatedfacts__circleLine"
                                                x1="25.8"
                                                y1="77.6"
                                                x2="45.4"
                                                y2="73.5"
                                            ></line>
                                            <line
                                                class="animatedfacts__circleLine"
                                                x1="28"
                                                y1="89.5"
                                                x2="47.7"
                                                y2="86.3"
                                            ></line>
                                            <line
                                                class="animatedfacts__circleLine"
                                                x1="29.6"
                                                y1="101.4"
                                                x2="49.4"
                                                y2="99.3"
                                            ></line>
                                            <line
                                                class="animatedfacts__circleLine"
                                                x1="30.5"
                                                y1="113.4"
                                                x2="50.5"
                                                y2="112.3"
                                            ></line>
                                            <line
                                                class="animatedfacts__circleLine"
                                                x1="50.8"
                                                y1="125.4"
                                                x2="30.8"
                                                y2="125.4"
                                            ></line>
                                            <line
                                                class="animatedfacts__circleLine"
                                                x1="50.5"
                                                y1="138.5"
                                                x2="30.5"
                                                y2="137.5"
                                            ></line>
                                            <line
                                                class="animatedfacts__circleLine"
                                                x1="49.4"
                                                y1="151.6"
                                                x2="29.6"
                                                y2="149.5"
                                            ></line>
                                            <line
                                                class="animatedfacts__circleLine"
                                                x1="47.7"
                                                y1="164.5"
                                                x2="28"
                                                y2="161.4"
                                            ></line>
                                            <line
                                                class="animatedfacts__circleLine"
                                                x1="45.4"
                                                y1="177.4"
                                                x2="25.8"
                                                y2="173.3"
                                            ></line>
                                            <line
                                                class="animatedfacts__circleLine"
                                                x1="42.3"
                                                y1="190.1"
                                                x2="23"
                                                y2="185"
                                            ></line>
                                            <line
                                                class="animatedfacts__circleLine"
                                                x1="38.6"
                                                y1="202.7"
                                                x2="19.6"
                                                y2="196.5"
                                            ></line>
                                            <line
                                                class="animatedfacts__circleLine"
                                                x1="34.2"
                                                y1="215"
                                                x2="15.5"
                                                y2="207.9"
                                            ></line>
                                            <line
                                                class="animatedfacts__circleLine"
                                                x1="29.2"
                                                y1="227.1"
                                                x2="10.9"
                                                y2="219"
                                            ></line>
                                            <line
                                                class="animatedfacts__circleLine"
                                                x1="23.6"
                                                y1="238.9"
                                                x2="5.7"
                                                y2="229.9"
                                            ></line>
                                            <line
                                                class="animatedfacts__circleLine"
                                                x1="17.3"
                                                y1="250.4"
                                                x2="0"
                                                y2="240.4"
                                            ></line>
                                        </svg>
                                    </div>
                                    <p className="text-lg text-black text-center mt-4">
                                        {dataAndEquipment.descData
                                            ? dataAndEquipment.descData
                                            : 'Water/oil-cooled four-cylinder four-stroke in-line engine'}
                                    </p>
                                    <div className="flex items-center justify-center w-[220px] h-[40px] bg-black mt-4">
                                        <p className="text-white font-bold text-[15px]">
                                            DATA & EQUIPMENT
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-col absolute top-0 right-0 m-4 text-center">
                                    <div className="flex flex-col items-center mb-4">
                                        <p className="text-[60px] font-bold w-[300px]">
                                            {
                                                dataAndEquipment.atbThree
                                                    .atbNumber
                                            }
                                        </p>
                                        <div className="w-[300px] h-[2px] bg-black my-2"></div>
                                        <p className="text-[16px] font-bold w-[300px]">
                                            {dataAndEquipment.atbThree.atbName}
                                        </p>
                                    </div>
                                    <div className="flex flex-col items-center mb-4">
                                        <p className="text-[60px] font-bold w-[300px]">
                                            {dataAndEquipment.atbFour.atbNumber}
                                        </p>
                                        <div className="w-[300px] h-[2px] bg-black my-2"></div>
                                        <p className="text-[16px] font-bold w-[300px]">
                                            {dataAndEquipment.atbFour.atbName}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {dataAndEquipment.imgStartEngineer && (
                        <div className="flex flex-col">
                            <div className="flex justify-center items-center mb-4">
                                <div className="w-[300px] h-[2px] bg-black min-w-[240px]"></div>
                                <SectionHeadlines className="w-[240px] h-[120px]" />
                                <div className="w-[300px] h-[2px] bg-black min-w-[240px]"></div>
                            </div>
                            <p className="text-2xl font-bold mb-4 text-center">
                                CUTS THROUGH MARROW AND BONE – AND THROUGH
                                ASPHALT
                            </p>
                            <div className="flex">
                                <div className="relative">
                                    <img
                                        src={dataAndEquipment.imgStartEngineer}
                                        alt="start-engineer"
                                        className="w-full"
                                    />
                                    <div className="absolute flex flex-col justify-center w-[700px] h-[400px] top-[30%] right-0">
                                        <button
                                            onClick={handleToggleEngine}
                                            className="absolute rounded-full w-[160px] h-[160px] left-[270px] bg-white z-20 text-[22px] font-bold text-[#919191] mb-[20px]"
                                        >
                                            <span className="hover:text-[#16171a]">
                                                {startEngine
                                                    ? 'STOP ENGINE'
                                                    : 'START ENGINE'}
                                            </span>
                                        </button>
                                        {startEngine && (
                                            <div className="w-full h-[500px] absolute z-10">
                                                {/* <div className='w-[500px] h-[500px] border-2 border-[#808080] rounded-full absolute right-[100px]'></div>
                                            <div className='w-[400px] h-[400px] border-2 border-[#808080] rounded-full absolute right-[150px] top-[50px]'></div>
                                            <div className='w-[300px] h-[300px] border-2 border-[#808080] rounded-full absolute right-[200px] top-[100px]'></div> */}
                                                <PulsingCircles />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <audio
                                        ref={audioRef}
                                        // controls
                                        src={dataAndEquipment.sound}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default ProductDetail;
