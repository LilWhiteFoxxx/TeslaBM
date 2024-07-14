import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';

import ForwardArrow from './ForwardArrow';
import BackwardArrow from './BackwardArrow';
import { getAllProduct } from '../../apis/product';

import './Styles/Slides.scss';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader

// import img1 from '../../Assets/images/img1.avif';
// import img2 from '../../Assets/images/img2.avif';
// import img3 from '../../Assets/images/img3.avif';
// import img4 from '../../Assets/images/img4.avif';
// import img5 from '../../Assets/images/img5.avif';
// import video from '../../Assets/images/Tesla_web.webm';
// import img7 from '../../Assets/images/img7.avif';
// import img8 from '../../Assets/images/img8.avif';
// import img9 from '../../Assets/images/img9.avif';
// import img10 from '../../Assets/images/img10.avif';

// const slidesData = [
//     { src: img1, alt: 'slide-1', title: 'SAE J1772 Charging Adapter' },
//     { src: img2, alt: 'slide-2', title: 'Model S/3/Y Pet Liner' },
//     { src: img3, alt: 'slide-3', title: 'Model 3 All-Weather Interior Liners' },
//     { src: img4, alt: 'slide-4', title: 'Model Y All-Weather Interior Liners' },
//     { src: img5, alt: 'slide-5', title: 'Wall Connector' },
//     { src: video, alt: 'slide-6', title: 'TESLA', isVideo: true },
//     { src: img7, alt: 'slide-7', title: 'Gen 2 NEMA Adapters' },
//     { src: img8, alt: 'slide-8', title: 'Cable Organizer' },
//     { src: img9, alt: 'slide-9', title: 'Key Card' },
//     {
//         src: img10,
//         alt: 'slide-10',
//         title: 'Model Y All-Weather Rear Cargo Liner Set',
//     },
// ];

export const Tesfayedev = () => {
    const [showArrow, setShowArrow] = useState(false);
    const [slidesData, setSlidesData] = useState([])

    useEffect(() => {
        const fetchProducts = async () => {
            const res = await getAllProduct(50);
            setSlidesData(res.metadata);
        };

        fetchProducts();
    }, []);

    return (
        <div>
            <div className="title-wrap w-full mt-10">
                <h3>Recommed Products</h3>
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
                                    />
                                )}
                            </div>
                            <div className='flex flex-col text-left px-4 ml-4'>
                                <span className='text-[12px]'>{slide.mfg}</span>
                                <span className='hover:text-red-600 '>{slide.itemName}</span>
                            </div>
                        </div>
                    ))}
                </Carousel>
            </div>
        </div>
    );
};

export default Tesfayedev;
