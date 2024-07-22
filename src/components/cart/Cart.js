import React, { useEffect, useState } from 'react';
import { CartPage, MobileCheckoutBtn } from './CartStyledComponents';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// import { updateQuantity } from '../../app/features/cartSlice';
import { OrderSummary } from './OrderSummary';
import { CartItem } from './CartItem';
import { getCart } from '../../apis/cart';
import Footer from '../Footer';

export default function Cart() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [carts, setCarts] = useState([]);
    // const cartQty = useSelector(cartQuantity);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getCart();
                setCarts(res.metadata);
                // dispatch(updateQuantity(res.metadata.length));
            } catch (error) {
                console.error('Failed to fetch data', error);
            }
        };

        fetchData();
    }, [dispatch]);

    const handleUpdateCart = async (updatedCart) => {
        try {
            setCarts(updatedCart);
            // dispatch(updateQuantity(carts.length));
        } catch (error) {
            console.error('Failed to update cart', error);
        }
    };

    // const cartItems = carts.map((cart) => (
    //     <CartItem key={cart.id} cart={cart} onUpdateCart={handleUpdateCart} />
    // ));

    return (
        <CartPage>
            <div className="cartContainer">
                <h1 className="text-[24px] font-bold">CART</h1>

                <div className="cartContent">
                    <div className="cartItems">
                        {carts?.map((cart) => (
                            <CartItem
                                key={cart.id}
                                cart={cart}
                                cartId={cart.id}
                                onUpdateCart={handleUpdateCart}
                            />
                        ))}
                    </div>
                    <OrderSummary cart={carts} />
                    <div className="cartExtraFooterController">
                        <Footer />
                    </div>
                </div>
            </div>
            <MobileCheckoutBtn>
                <button onClick={() => navigate('/groupproject/checkout')}>
                    CHECKOUT
                </button>
            </MobileCheckoutBtn>
        </CartPage>
    );
}
