import React, { useMemo } from "react";
import { StyledOrderSummary } from "./CartStyledComponents";
import { useNavigate } from "react-router-dom";

export const OrderSummary = ({ cart }) => {
  const navigate = useNavigate();

  const cartTotal = useMemo(() => {
    return cart.reduce((total, item) => {
      const price = item.salePrice < item.originalPrice ? item.salePrice : item.originalPrice;
      return total + price * item.quantity;
    }, 0);
  }, [cart]);

  return (
    <StyledOrderSummary>
      <h2>Order Summary</h2>
      <p>
        Shipping <span>Calculated at checkout</span>
      </p>
      <p>
        Sales Tax{" "}
        <button className='cart-sales-tax-info-button'>
          <p>i</p>
        </button>
        <span>Calculated at checkout</span>
      </p>
      <h2>
        Subtotal <span>{cartTotal.toLocaleString("en-US")} VND</span>
      </h2>
      <button className='checkoutButton' onClick={() => navigate("/groupproject/checkout")}>
        CHECKOUT
      </button>
    </StyledOrderSummary>
  );
};
