import React from 'react';

import './HeroCarousel.scss';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { ShopNowButton } from '../Styled';
// import wallConnector from '../../Assets/images/wall_connector.avif';
// import homeBanner from '../../Assets/images/bmw-s1000rr-1.jpg';
// import chillBanner from '../../Assets/images/chill_banner.avif';
// import floorMats from '../../Assets/images/floormats.avif';

export default function HeroCarousel() {
    return (
        <div className="hero-carousel">
            <Carousel
                autoPlay
                infiniteLoop
                emulateTouch
                interval="5000"
                showThumbs={false}
            >
                <div className="carousel-image-container">
                    <img src={'https://www.experiencemotorcycles.co.nz/assets/uploads/2016/02/DESERT.jpg'} alt="" />
                    <div className="carousel-text">
                        <h1>FIND YOUR MOTORRAD BIKE</h1>
                        <h2>Service what you deserves</h2>
                        <div className="text-black">
                            <ShopNowButton>SHOP NOW</ShopNowButton>
                        </div>
                    </div>
                </div>
                <div className="carousel-image-container">
                    <img src={'https://www.roadrider.com.au/wp-content/uploads/2016/09/143910.jpg'} alt="" />
                    <div className="carousel-text">
                        <h1>FIND YOUR MOTORRAD BIKE</h1>
                        <h2>Service what you deserves</h2>
                        <div className="text-black">
                            <ShopNowButton>SHOP NOW</ShopNowButton>
                        </div>
                    </div>
                </div>
                <div className="carousel-image-container">
                    <img src={'https://images.unsplash.com/photo-1550966871-47324cfb6278?fm=jpg&w=3000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGJtdyUyMG1vdG9yY3ljbGV8ZW58MHx8MHx8fDA%3D'} alt="" />
                    <div className="carousel-text">
                        <h1>FIND YOUR MOTORRAD BIKE</h1>
                        <h2>Service what you deserves</h2>
                        <div className="text-black">
                            <ShopNowButton>SHOP NOW</ShopNowButton>
                        </div>
                    </div>
                </div>
            </Carousel>
        </div>
    );
}
