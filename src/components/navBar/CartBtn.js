import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { addItem, updateQuantity } from '../../app/features/cartSlice';
import { ReactComponent as CartBtnSvg } from '../../Assets/images/cart.svg';
import { getCart } from '../../apis/cart';

const CartBtnStyled = styled.div`
    position: relative;
    button {
        background: none;
        border: none;
    }
    .cartQtyIndicator {
        content: ${({ cartQty }) => JSON.stringify(cartQty)};
        position: absolute;
        background-color: #3d69e1;
        height: 16px;
        width: 16px;
        border-radius: 50%;
        right: 0;
        top: 0;
        transform: translate(50%, -50%);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;

export default function CartBtn() {
    const dispatch = useDispatch();
    const cartQty = useSelector(state => state.cart.quantity);

    useEffect(() => {
        dispatch(updateQuantity(cartQty));
    }, [cartQty, dispatch]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getCart();
                if (res.metadata) {
                    // Assuming res.metadata is an array of items
                    res.metadata.forEach(item => {
                        dispatch(
                            addItem({
                                id: item.id,
                                // Optionally pass other item properties here
                            })
                        );
                    });
                }
            } catch (error) {
                console.error('Failed to fetch data', error);
            }
        };

        fetchData();
    }, [dispatch]);

    return (
        <CartBtnStyled cartQty={cartQty}>
            {cartQty > 0 && (
                <div className="cartQtyIndicator">
                    <p>{cartQty}</p>
                </div>
            )}
            <button>
                <CartBtnSvg />
            </button>
        </CartBtnStyled>
    );
}
