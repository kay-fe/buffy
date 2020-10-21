import PropTypes from "prop-types";
import Link from "next/link";
import Title from "./styles/Title";
import ItemStyles from "./styles/ItemStyles";
import PriceTag from "./styles/PriceTag";
import formatMoney from "../lib/formatMoney";
import DeleteItem from "./DeleteItem";
import AddToCart from "./AddToCart";

export default function Item({
    item: { title, image, id, price, description },
}) {
    return (
        <ItemStyles>
            {image && <img src={image} alt={title} />}

            <Title>
                <Link
                    href={{
                        pathname: "/item",
                        query: { id: id },
                    }}
                >
                    <a>{title}</a>
                </Link>
            </Title>
            <PriceTag>{formatMoney(price)}</PriceTag>
            <p>{description}</p>

            <div className="buttonList">
                <AddToCart id={id} />

                <Link
                    href={{
                        pathname: "update",
                        query: { id: id },
                    }}
                >
                    <a>Edit ✏️</a>
                </Link>

                <DeleteItem id={id}>Delete this Item </DeleteItem>
            </div>
        </ItemStyles>
    );
}

Item.propTypes = {
    item: PropTypes.object.isRequired,
};
