import React from 'react';

import HeroCarousel from '../../components/shopPage/HeroCarousel';
import VehicleAccessories from '../../components/shopPage/VehicleAccessories';
import ShopAccessories from '../../components/shopPage/ShopAccessories';
import Tesfayedev from '../../components/shopPage/Tesfayedev';

import './ShopPage.scss';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const accessoriesData = [
    {
        image: 'https://www.bmw-motorrad.co.uk/content/dam/bmwmotorradnsc/common/multiimages/images/models/m/m1000rr-2022/productstage/nsc-m1000rr-P0N3S-multiimage-2560x1440.jpg.asset.1715071748350.jpg',
        title: 'Model M',
    },
    {
        image: 'https://www.bmw-motorcycles.vn/content/dam/bmwmotorradnsc/marketVN_IMPORTER/common/multiimages/images/models/sport/s1000rr/nsc-s1000rr-P0N3H-multiimage-2560x1440.jpg.asset.1718263110050.jpg',
        title: 'Model S',
        color: 'black',
    },
    {
        image: 'https://kickstart.bikeexif.com/wp-content/uploads/2023/09/2024-bmw-f900gs-adventure-1.jpg',
        title: 'Model Adventure',
    },
    {
        image: 'https://i.kinja-img.com/image/upload/c_fill,h_675,pg_1,q_80,w_1200/2658ced63872b623073a54e1ede6dc6d.jpg',
        title: 'Model Heritage',
    },
    {
        image: 'https://s1.cdn.autoevolution.com/images/news/bmw-motorrad-announces-the-best-quarterly-results-of-all-time-sells-over-31000-bikes-through-march-94640_1.jpg',
        title: 'Model Adventure',
        color: 'black',
    },
];

const accessoriesDataEnd = {
    button: true,
    image: 'https://pbs.twimg.com/media/EFuZyP0XYAITm8O.jpg:large',
    title: 'Life Style',
    color: 'black',
}

const ShopPage = () => {
    return (
        <div className="shop-page-component">
            <HeroCarousel />
            <Tesfayedev />
            {accessoriesData.map((accessory, index) => (
                <VehicleAccessories
                    key={index}
                    image={accessory.image}
                    title={accessory.title}
                    color={accessory.color}
                    button={accessory.button}
                />
            ))}
            <ShopAccessories />
            <VehicleAccessories
                image={accessoriesDataEnd.image}
                title={accessoriesDataEnd.title}
                color={accessoriesDataEnd.color}
                button={accessoriesDataEnd.button}
            />
        </div>
    );
};

export default ShopPage;
