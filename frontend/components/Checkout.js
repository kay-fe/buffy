import React, { useState } from "react";
import NProgress from "nprogress";
import {
    CardElement,
    Elements,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useMutation, gql } from "@apollo/client";
import Router from "next/router";
import styled from "styled-components";
import SickButton from "./styles/SickButton";
import { CURRENT_USER_QUERY } from "./User";
import { useCart } from "./LocalState";
import { stripePublishableKey } from "../config.js";

// We use loadStripe because is load in their lib async
const stripe = loadStripe(stripePublishableKey);

const CREATE_ORDER_MUTATION = gql`
    mutation createOrder($token: String!) {
        createOrder(token: $token) {
            id
            charge
            total
            items {
                id
                title
            }
        }
    }
`;

const style = {
    base: {
        fontSize: "18px",
    },
};

function Checkout() {
    return (
        <Elements stripe={stripe}>
            <CheckoutForm />
        </Elements>
    );
}

function useCheckout() {
    const stripe = useStripe();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const elements = useElements();
    const { closeCart } = useCart();

    const [checkout] = useMutation(CREATE_ORDER_MUTATION, {
        refetchQueries: [{ query: CURRENT_USER_QUERY }],
    });

    // manually call the mutation once we have the stripe token

    const handleSubmit = async event => {
        setLoading(true);
        // 1. Stop the form from submitting
        event.preventDefault();

        // 2. Start the page transition so show the user something is happening

        NProgress.start();

        // 3. Create the payment method
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement),
        });
        console.log("paymentMethod = ", paymentMethod);

        // 4. Handle any errors
        if (error) {
            NProgress.done();
            return setError(error);
        }

        // 5. Send it to the server and charge it
        const order = await checkout({
            variables: {
                token: paymentMethod.id,
            },
        }).catch(err => {
            alert(err.message);
        });
        console.log("order = ", order);

        // 6. Change the page to the new order
        Router.push({
            pathname: "/order",
            query: { id: order.data.createOrder.id },
        });

        // 6. Close the cart
        closeCart();

        // 7. Turn loader off
        setLoading(false);
    };

    return { error, handleSubmit, loading };
}

const CheckoutFormStyles = styled.form`
    box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.04);
    border: 1px solid rgba(0, 0, 0, 0.06);
    border-radius: 5px;
    padding: 1rem;
    display: grid;
    grid-gap: 1rem;
`;

function CheckoutForm() {
    const { handleSubmit, error, loading } = useCheckout();
    return (
        <CheckoutFormStyles onSubmit={handleSubmit} data-testid="checkout">
            {error && <p>{error.message}</p>}
            {loading && <p>Checking You Out!</p>}
            <CardElement options={{ style }} hidePostalCode={true} />
            <SickButton type="submit">Pay</SickButton>
        </CheckoutFormStyles>
    );
}

export default Checkout;
export { CREATE_ORDER_MUTATION };
