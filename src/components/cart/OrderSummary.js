import React, { useMemo, useState } from 'react';
import { StyledOrderSummary } from './CartStyledComponents';
import { useNavigate } from 'react-router-dom';
import { checkCartItem } from '../../apis/checkout';
import { toast } from 'react-toastify';

export const OrderSummary = ({ cart, isCart = true }) => {
    const navigate = useNavigate();

    const [paymentMethod, setPaymentMethod] = useState('cash');

    const cartTotal = useMemo(() => {
        return cart.reduce((total, item) => {
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
            toast.success('Checkout success!');
            // Proceed to checkout
            // await checkout();
            // navigate('/groupproject/confirmation'); //
        } catch (error) {
            console.error('Checkout error', error);
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
                Subtotal <span>${cartTotal.toLocaleString('en-US')}</span>
            </h2>
            {!isCart && (
                <div className="payment-methods">
                    <p>Select Payment Method</p>
                    <label>
                        <input
                            type="radio"
                            value="cash"
                            checked={paymentMethod === 'cash'}
                            onChange={handlePaymentChange}
                        />
                        Cash
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="online"
                            checked={paymentMethod === 'online'}
                            onChange={handlePaymentChange}
                        />
                        Online
                    </label>
                </div>
            )}
            {isCart ? (
                <button
                    className="checkoutButton"
                    onClick={() => navigate('/groupproject/checkout')}
                >
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
