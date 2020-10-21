import Link from "next/link";
import NavStyles from "./styles/NavStyles";
import User from "./User";
import Signout from "./Signout";
import MyCart from "./MyCart";
import CartCount from "./CartCount";
import { useUser } from "./User";
import { useCart } from "./LocalState";

const Nav = props => {
    const me = useUser();

    const { toggleCart } = useCart();

    return (
        <NavStyles>
            <Link href="/items">
                <a>Shop</a>
            </Link>
            {me && (
                <React.Fragment>
                    <Link href="/sell">
                        <a>Sell</a>
                    </Link>
                    <Link href="/orders">
                        <a>Orders</a>
                    </Link>
                    <Link href="/permissions">
                        <a>Account</a>
                    </Link>
                    <MyCart toggleCart={toggleCart} me={me} />

                    <Signout />
                    <p>
                        Hello, <strong>{me.name}</strong>
                    </p>
                </React.Fragment>
            )}
            {!me && (
                <React.Fragment>
                    <Link href="/signup">
                        <a>Sign Up</a>
                    </Link>
                </React.Fragment>
            )}
        </NavStyles>
    );
};
export default Nav;
