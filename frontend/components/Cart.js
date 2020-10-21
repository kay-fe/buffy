import { useCart } from "./LocalState";
import { useUser } from "./User";
import CartStyles from "./styles/CartStyles";
import Supreme from "./styles/Supreme";
import CloseButton from "./styles/CloseButton";
import calcTotalPrice from "../lib/calcTotalPrice";
import formatMoney from "../lib/formatMoney";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

function Cart() {
    const me = useUser();
    const { cartOpen, toggleCart } = useCart();
    if (!me) return <p>not logged in</p>;

    return (
        <CartStyles open={cartOpen} data-testid="cart">
            <header>
                <CloseButton onClick={toggleCart} title="close">
                    &times;
                </CloseButton>
                <Supreme>{me.name}'s Cart</Supreme>
                <p>
                    You Have {me.cart.length} Item
                    {me.cart.length === 1 ? "" : "s"} in your cart.
                </p>
            </header>
            <ul>
                {me.cart.map(cartItem => (
                    <CartItem key={cartItem.id} cartItem={cartItem} />
                ))}
            </ul>
            {me.cart.length > 0 && (
                <footer>
                    <p>{formatMoney(calcTotalPrice(me.cart))}</p>

                    <Checkout />
                </footer>
            )}
        </CartStyles>
    );
}

export default Cart;
