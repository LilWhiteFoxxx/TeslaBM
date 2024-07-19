import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { StyledCartItem } from './CartStyledComponents';
import QuantitySelector from './QuantitySelector';
import { deleteCartItem, getCart, updateCartItem } from '../../apis/cart';
import { removeItem } from '../../app/features/cartSlice';

export const CartItem = ({ cart, cartId, onUpdateCart, isCart = true }) => {
    const dispatch = useDispatch();
    const [itemQty, setItemQty] = useState(cart.quantity);
    const [itemPrice, setItemPrice] = useState(cart.originalPrice);
    const [productId, setProductId] = useState(
        cart.motorDetailId || cart.accessoriesDetailId
    );
    const [type, setType] = useState(
        cart.motorDetailId ? 'motor' : 'accessories'
    );

    useEffect(() => {
        if (cart.salePrice < cart.originalPrice) {
            setItemPrice(cart.salePrice);
        } else {
            setItemPrice(cart.originalPrice);
        }
    }, [cart.salePrice, cart.originalPrice]);

    useEffect(() => {
        if (cart.motorDetailId) {
            setProductId(cart.motorDetailId);
            setType('motor');
        } else if (cart.accessoriesDetailId) {
            setProductId(cart.accessoriesDetailId);
            setType('accessories');
        }
    }, [cart.motorDetailId, cart.accessoriesDetailId]);

    const handleSelect = async (qty) => {
        try {
            const response = await updateCartItem({
                type: type,
                productId: productId,
                quantity: qty,
            });
            if (response.status === 200) {
                setItemQty(qty);
                const res = await getCart();
                onUpdateCart(res.metadata); // Accessing response data correctly
            }
        } catch (error) {
            console.error('Failed to update quantity:', error);
        }
    };

    const handleRemove = async () => {
        try {
            console.log(
                'Removing item with productId:',
                productId,
                'and type:',
                type
            );
            console.log('cartId:', cartId);

            const response = await deleteCartItem({ id: cartId });
            if (response.status === 200) {
                const res = await getCart();
                console.log('Updated cart after removal:', res.metadata);
                onUpdateCart(res.metadata);
                dispatch(removeItem({ id: cartId }));
            }
        } catch (error) {
            console.error('Failed to remove item:', error);
        }
    };

    return (
        <StyledCartItem>
            <img src={cart.itemImg} alt="" />
            <div className="cartItemDescription">
                <h3 className='font-bold'>{cart.itemName}</h3>
                <p>Options go Here</p>
                {cart?.colorId && (
                    <div className="color-display">
                        <p>Color:</p>
                        <img
                            src={cart.colorImg}
                            alt={cart.colorName}
                            className="color-box"
                        />
                    </div>
                )}
                {isCart ? (
                    <div className="quantity-selector-main-cart">
                        Quantity:
                        <span>
                            <QuantitySelector
                                handleSelect={handleSelect}
                                itemQty={itemQty}
                            />
                        </span>
                        <span
                            onClick={handleRemove}
                            className="cart-item-remove"
                        >
                            Remove
                        </span>
                    </div>
                ) : (
                    <div className="gap-2 quantity-selector-main-cart">
                        <p>Quantity: </p>
                        <p className='font-bold'>{itemQty}</p>
                    </div>
                )}
            </div>
            <h3 className="cartItemPrice">
                ${itemPrice.toLocaleString('en-US')}
            </h3>
            {cart.salePrice < cart.originalPrice && (
                <h3 className="cartItemOriginalPrice">
                    <del>${cart.originalPrice.toLocaleString('en-US')}</del>
                </h3>
            )}
        </StyledCartItem>
    );
};
