import React from "react";
import styled from "styled-components";
import CartCount from "./CartCount";

const CartIcon = styled.svg`
    height: 29px;
    width: 32px;
    display: block;
`;

function MyCart({ toggleCart, me }) {
    return (
        <button onClick={toggleCart}>
            <CartIcon viewBox="0 0 32 32">
                <title>My Cart</title>
                <g
                    id="Cart"
                    stroke="none"
                    strokeWidth="1"
                    fill="none"
                    fillRule="evenodd"
                >
                    <path
                        d="M7.9992231,18 C9.10382411,18 9.99928015,18.8954305 9.99928015,20 C9.99928015,21.1045695 9.10382411,22 7.9992231,22 C6.89462209,22 5.99916605,21.1045695 5.99916605,20 C5.99916605,18.8954305 6.89462209,18 7.9992231,18 Z M16.9994798,18 C18.1040809,18 18.9995369,18.8954305 18.9995369,20 C18.9995369,21.1045695 18.1040809,22 16.9994798,22 C15.8948788,22 14.9994228,21.1045695 14.9994228,20 C14.9994228,18.8954305 15.8948788,18 16.9994798,18 Z M3.99910899,2 C4.4259786,2 4.80105984,2.27008075 4.94125741,2.66458912 L4.97353199,2.77515787 L5.717,6 L19.9995654,6 C20.5993562,6 21.0545307,6.52069506 20.9947143,7.10037092 L20.9757747,7.21695569 L18.9754735,16.2169557 C18.8737859,16.6744812 18.4679666,17 17.9992642,17 L17.9992642,17 L6.99895043,17 C6.53022872,17 6.12439809,16.6744549 6.02272991,16.2169052 L6.02272991,16.2169052 L6.018,16.198 L3.20306285,4 L1,4 L1,2 L3.99910899,2 Z M18.7525064,8 L6.24514963,8 L7.80019399,15 L17.196462,15 L18.7525064,8 Z"
                        fill="#1C2F42"
                        fillRule="nonzero"
                    ></path>
                </g>
            </CartIcon>

            {me.cart ? (
                <CartCount
                    count={me.cart.reduce(
                        (tally, cartItem) => tally + cartItem.quantity,
                        0
                    )}
                ></CartCount>
            ) : (
                <CartCount>0 </CartCount>
            )}
        </button>
    );
}

export default MyCart;
