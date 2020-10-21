import PleaseSignIn from "../components/PleaseSignIn";
import Order from "../components/Order";
import { useRouter } from "next/router";

const OrderPage = props => {
    const router = useRouter();
    return (
        <div>
            <PleaseSignIn>
                <Order id={router.query.id} />
            </PleaseSignIn>
        </div>
    );
};

export default OrderPage;
