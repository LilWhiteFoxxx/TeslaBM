import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { StyledOrderSummary } from './CartStyledComponents';
import { checkCartItem } from '../../apis/checkout';
import { createOrder } from '../../apis/order';
import { deleteCart } from '../../apis/cart';
import { clearCart } from '../../app/features/cartSlice';
import { makePayment } from '../../apis/payment'; // Import makePayment function

export const OrderSummary = ({ cart, isCart = true }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const address = user?.address[0];

    const [paymentMethod, setPaymentMethod] = useState('1');

    const cartTotal = useMemo(() => {
        return cart?.reduce((total, item) => {
            const price =
                item.salePrice < item.originalPrice
                    ? item.salePrice
                    : item.originalPrice;
            return total + price * item.quantity;
        }, 0);
    }, [cart]);

    const handlePaymentChange = (event) => {
        setPaymentMethod(event.target.value);
    };

    const handleCheckout = async () => {
        try {
            // Check each cart item
            for (const item of cart) {
                const res = await checkCartItem({ id: item.id });
                if (res.metadata) {
                    console.log(res.metadata);
                } else {
                    console.log(res.message);
                    toast.error(`${item.itemName} - ${res.message}`);
                    return;
                }
            }

            if (paymentMethod === '1') {
                // Create order and handle cash payment
                const order = await createOrder({
                    cartItems: cart,
                    paymentMethodId: paymentMethod,
                });

                if (order.metadata) {
                    toast.success('Checkout success!');

                    navigate('/groupproject/invoicer', {
                        state: order.metadata.id,
                    });

                    const res = await deleteCart();
                    if (res.metadata) {
                        dispatch(clearCart());
                    }
                }
            } else if (paymentMethod === '2') {
                // Handle online payment
                await makePayment({ products: cart });

                // if (paymentResult.success) {
                //     // Assuming makePayment returns an object with a success flag
                //     // After successful payment, create the order and clear the cart
                //     const order = await createOrder({
                //         cartItems: cart,
                //         paymentMethodId: paymentMethod,
                //     });

                //     if (order.metadata) {
                //         toast.success('Payment successful and order created!');
                //         navigate('/groupproject/invoicer', {
                //             state: order.metadata.id,
                //         });

                //         const res = await deleteCart();
                //         if (res.metadata) {
                //             dispatch(clearCart());
                //         }
                //     }
                // }
            }
        } catch (error) {
            console.error('Checkout error', error);
        }
    };

    const handleCheckCart = () => {
        if (cart?.length > 0) {
            navigate('/groupproject/checkout');
        } else {
            toast.error('No product in cart! Please add to cart');
        }
    };

    return (
        <StyledOrderSummary>
            <h2 className="font-bold">Order Summary</h2>
            <p>
                Shipping <span>Calculated at checkout</span>
            </p>
            <p>
                Sales Tax{' '}
                <button className="cart-sales-tax-info-button">
                    <p>i</p>
                </button>
                <span>Calculated at checkout</span>
            </p>
            <h2>
                Subtotal <span>${cartTotal?.toLocaleString('en-US')}</span>
            </h2>
            {!isCart && (
                <>
                    <div className="address">
                        <p className="font-bold">Address</p>
                        <p>{`${address?.street}, ${address?.ward}, ${address?.district}, ${address?.city}, ${address?.country}`}</p>
                    </div>
                    <div className="payment-methods">
                        <p>Select Payment Method</p>
                        <label>
                            <input
                                type="radio"
                                value="1"
                                checked={paymentMethod === '1'}
                                onChange={handlePaymentChange}
                            />
                            Cash
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="2"
                                checked={paymentMethod === '2'}
                                onChange={handlePaymentChange}
                            />
                            Online
                        </label>
                    </div>
                </>
            )}
            {isCart ? (
                <button className="checkoutButton" onClick={handleCheckCart}>
                    CHECKOUT
                </button>
            ) : (
                <button className="checkoutButton" onClick={handleCheckout}>
                    CONFIRM
                </button>
            )}
        </StyledOrderSummary>
    );
};
