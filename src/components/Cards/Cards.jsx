import React from 'react';

import Card from '../Card/Card';
import {
    UilClipboardAlt,
    UilUsdSquare,
    UilMoneyWithdrawal,
} from '@iconscout/react-unicons';

import './Cards.css';
// import { cardsData } from "../../Data/Data";

const Cards = ({ totalSale, orderAmount }) => {
    const cardsData = [
        {
            title: 'Sales',
            color: {
                backGround: 'linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)',
                boxShadow: '0px 10px 20px 0px #e0c6f5',
            },
            barValue: 70,
            value: String(totalSale) || '0',
            png: UilUsdSquare,
            series: [
                {
                    name: 'Sales',
                    data: [31, 40, 28, 51, 42, 109, 100],
                },
            ],
        },
        {
            title: 'Revenue',
            color: {
                backGround: 'linear-gradient(180deg, #FF919D 0%, #FC929D 100%)',
                boxShadow: '0px 10px 20px 0px #FDC0C7',
            },
            barValue: 0,
            value: '0',
            png: UilMoneyWithdrawal,
            series: [
                {
                    name: 'Revenue',
                    data: [10, 100, 50, 70, 80, 30, 40],
                },
            ],
        },
        {
            title: 'Orders',
            color: {
                backGround:
                    'linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)',
                boxShadow: '0px 10px 20px 0px #F9D59B',
            },
            barValue: 30,
            value: String(orderAmount) || '0',
            png: UilClipboardAlt,
            series: [
                {
                    name: 'Orders',
                    data: [10, 25, 15, 30, 12, 15, 20],
                },
            ],
        },
    ];

    return (
        <div className="Cards">
            {cardsData.map((card, id) => {
                return (
                    <div className="parentContainer" key={id}>
                        <Card
                            title={card.title}
                            color={card.color}
                            barValue={card.barValue}
                            value={card.value}
                            png={card.png}
                            series={card.series}
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default Cards;
