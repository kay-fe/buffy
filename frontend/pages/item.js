import SingleItem from "../components/SingleItem";
import { useRouter } from "next/router";

const Item = () => {
    const router = useRouter();
    return <SingleItem id={router.query.id} />;
};

export default Item;
