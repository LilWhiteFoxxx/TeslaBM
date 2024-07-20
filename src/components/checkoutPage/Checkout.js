import React, { useEffect, useState } from 'react';
import { CartPage, MobileCheckoutBtn } from '../cart/CartStyledComponents';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { checkCartItem } from '../../apis/checkout';
import { OrderSummary } from '../cart/OrderSummary';
import { CartItem } from '../cart/CartItem';
import { getCart } from '../../apis/cart'; // Import the new functions
import Footer from '../Footer';

export default function Checkout() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [carts, setCarts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getCart();
                setCarts(res.metadata);
            } catch (error) {
                console.error('Failed to fetch data', error);
                setError('Failed to load cart data.');
            }
        };

        fetchData();
    }, [dispatch]);

    const handleUpdateCart = async (updatedCart) => {
        try {
            setCarts(updatedCart);
        } catch (error) {
            console.error('Failed to update cart', error);
            setError('Failed to update cart.');
        }
    };

    const handleCheckout = async () => {
        setIsLoading(true);
        try {
            // Check each cart item
            for (const item of carts) {
                const res = await checkCartItem({ id: item.id });
                if (res.metadata) {
                    console.log(res.metadata);
                } else {
                    console.log(res.message);
                    toast.error(`${item.itemName} - ${res.message}`);
                    return;
                }
            }
            navigate('/groupproject/invoicer');
            toast.success('Checkout success!');

            // Proceed to checkout
            // await checkout();
        } catch (error) {
            console.error('Checkout error', error);
            setError('Checkout failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <CartPage>
            <div className="cartContainer">
                <h1 className="text-[24px] font-bold">CHECKOUT</h1>
                {error && <p className="error-message">{error}</p>}
                <div className="cartContent">
                    <div className="cartItems">
                        {carts.map((cart) => (
                            <CartItem
                                key={cart.id}
                                cart={cart}
                                cartId={cart.id}
                                onUpdateCart={handleUpdateCart}
                                isCart={false}
                            />
                        ))}
                    </div>
                    <OrderSummary cart={carts} isCart={false} />
                    <div className="cartExtraFooterController">
                        <Footer />
                    </div>
                </div>
            </div>
            <MobileCheckoutBtn>
                <button onClick={handleCheckout} disabled={isLoading}>
                    {isLoading ? 'Processing...' : 'CONFIRM'}
                </button>
            </MobileCheckoutBtn>
        </CartPage>
    );
}
