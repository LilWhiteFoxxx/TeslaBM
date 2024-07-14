import React from 'react';
import { ApparelButton, ShopNowButton } from '../Styled';
import './VehicleAccessories.scss';

export default function VehicleAccessories(props) {
    const image = props.image;
    const title = props.title;
    const textColor = props.color;
    return (
        <div className="vehicle-accessories">
            <img src={image} alt="" />
            <div className="vehicle-text justify-center items-center flex flex-col">
                <h1
                    style={{
                        color: `${textColor}`,
                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                    }}
                    className="text-2xl font-bold"
                >
                    {title}
                </h1>
                {props.button ? (
                    <ApparelButton style={{ width: '20em' }}>
                        SHOP NOW
                    </ApparelButton>
                ) : (
                    <ShopNowButton>Shop Now</ShopNowButton>
                )}
            </div>
        </div>
    );
}
