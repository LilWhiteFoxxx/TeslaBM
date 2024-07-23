import { loadStripe } from '@stripe/stripe-js';
import axios from '../axios/axios.config';

// Initialize Stripe outside of the component's render to avoid recreating the instance on every render

export const makePayment = async (payload) => {
    try {
        const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

        // Ensure that Stripe has been loaded
        const stripe = await stripePromise;

        // Prepare the request body
        const body = {
            products: payload.products,
        };

        // Send the request to create a checkout session
        const response = await axios.post(
            'payment/create-checkout-session',
            body
        );

        // Extract session data from the response
        const { id } = response.metadata;
        console.log(id);
        // Redirect to the Stripe Checkout page
        const result = await stripe.redirectToCheckout({ sessionId: id });

        if (result.error) {
            // Handle errors that occur during redirection
            console.error(result.error.message);
        }

        return result;
    } catch (error) {
        // Handle unexpected errors
        console.error('Error during payment process:', error);
    }
};
