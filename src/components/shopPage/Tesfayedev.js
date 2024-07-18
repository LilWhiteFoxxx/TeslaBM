import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { useNavigate } from 'react-router-dom';

import ForwardArrow from './ForwardArrow';
import BackwardArrow from './BackwardArrow';
import { getAllMotor } from '../../apis/motor';

import './Styles/Slides.scss';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader

export const Tesfayedev = () => {
    const [showArrow, setShowArrow] = useState(false);
    const [slidesData, setSlidesData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            const res = await getAllMotor(50);
            const shuffledData = res.metadata.sort(() => 0.5 - Math.random());
            const selectedProducts = shuffledData.slice(0, 10);
            setSlidesData(selectedProducts);
        };

        fetchProducts();
    }, []);

    const handleProductClick = (product) => {
        navigate(`/groupproject/product/${product.slug}`, { state: { product } });
    };

    return (
        <div>
            <div className="title-wrap w-full mt-10">
                <h3>Recommended Products</h3>
            </div>
            <div
                className="carousel-wrapper"
                onMouseEnter={() => setShowArrow(true)}
                onMouseLeave={() => setShowArrow(false)}
            >
                <Carousel
                    className="main-carousel"
                    controls={true}
                    showThumbs={false}
                    showArrows={showArrow}
                    showStatus={false}
                    interval={2500}
                    infiniteLoop
                    centerMode={true}
                    centerSlidePercentage={30}
                    renderArrowPrev={(clickHandler, hasPrev, label) =>
                        showArrow && (
                            <BackwardArrow clickHandler={clickHandler} />
                        )
                    }
                    renderArrowNext={(clickHandler, hasNext, label) =>
                        showArrow && (
                            <ForwardArrow clickHandler={clickHandler} />
                        )
                    }
                >
                    {slidesData.map((slide, index) => (
                        <div className="wrap" key={index}>
                            <div className='w-[450px] h-[350px]'>
                                {slide.isVideo ? (
                                    <video
                                        className="img-wrapper object-cover"
                                        height="100%"
                                        width="100%"
                                        autoPlay="autoplay"
                                        muted
                                        loop
                                        onClick={() => handleProductClick(slide)}
                                    >
                                        <source
                                            src={slide.itemImg}
                                            type="video/webm"
                                        />
                                    </video>
                                ) : (
                                    <img
                                        className="img-wrapper"
                                        src={slide.itemImg}
                                        alt={slide.alt}
                                        height="100%"
                                        width="100%"
                                        onClick={() => handleProductClick(slide)}
                                    />
                                )}
                            </div>
                            <div className='flex flex-col text-left px-4 ml-4'>
                                <span className='text-[12px]'>{slide.mfg}</span>
                                <span className='hover:text-red-600 ' onClick={() => handleProductClick(slide)}>{slide.itemName}</span>
                            </div>
                        </div>
                    ))}
                </Carousel>
            </div>
        </div>
    );
};

export default Tesfayedev;
