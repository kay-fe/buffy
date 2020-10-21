import { useQuery, useMutation, gql } from "@apollo/client";
import Router from "next/router";
import Form from "./styles/Form";
import formatMoney from "../lib/formatMoney";
import Error from "./ErrorMessage";
import useForm from "../lib/useForm";
import PropTypes from "prop-types";
import { ALL_ITEMS_QUERY } from "./Items";
import { PAGINATION_QUERY } from "./Pagination";

const SINGLE_ITEM_QUERY = gql`
    query SINGLE_ITEM_QUERY($id: ID!) {
        item(where: { id: $id }) {
            id
            title
            price
            description
            image
            largeImage
        }
    }
`;

const UPDATE_ITEM_MUTATION = gql`
    mutation UPDATE_ITEM_MUTATION(
        $id: ID!
        $title: String
        $description: String
        $price: Int
        $image: String
        $largeImage: String
    ) {
        updateItem(
            id: $id
            title: $title
            description: $description
            price: $price
            image: $image
            largeImage: $largeImage
        ) {
            id
            title
            description
            price
        }
    }
`;

function UpdateItem({ id }) {
    const { data = {}, loading } = useQuery(SINGLE_ITEM_QUERY, {
        variables: { id },
    });
    const { inputs, handleChange, customLoading } = useForm(data.item);
    const [updateItem, { loading: updating, error }] = useMutation(
        UPDATE_ITEM_MUTATION,
        {
            variables: {
                // ...data.item,
                ...inputs,
            },
            refetchQueries: [
                { query: ALL_ITEMS_QUERY },
                { query: PAGINATION_QUERY },
            ],
        }
    );
    if (loading) return <p>Loading...</p>;
    if (!data || !data.item) return <p>No Item Found for ID {id}</p>;

    return (
        <Form
            onSubmit={async e => {
                e.preventDefault();
                const res = await updateItem();
                console.log(res);
                Router.push("/items");
            }}
        >
            <Error error={error} />
            <fieldset
                disabled={updating || customLoading}
                aria-busy={updating || customLoading}
            >
                <label htmlFor="file">
                    Image
                    <input
                        type="file"
                        id="file"
                        name="image"
                        placeholder="Upload an image"
                        onChange={handleChange}
                    />
                    {inputs.image ? (
                        <img src={inputs.image} alt="Upload Preview" />
                    ) : (
                        <img src={data.item.image} alt="Upload Preview" />
                    )}
                </label>

                <label htmlFor="title">
                    Title
                    <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Title"
                        required
                        defaultValue={data.item.title}
                        onChange={handleChange}
                    />
                </label>

                <label htmlFor="price">
                    Price
                    <input
                        type="number"
                        id="price"
                        name="price"
                        placeholder="Price"
                        required
                        defaultValue={data.item.price}
                        onChange={handleChange}
                    />
                </label>

                <label htmlFor="description">
                    Description
                    <textarea
                        id="description"
                        name="description"
                        placeholder="Enter A Description"
                        required
                        defaultValue={data.item.description}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">
                    Sav{loading ? "ing" : "e"} Changes
                </button>
            </fieldset>
        </Form>
    );
}

UpdateItem.propTypes = {
    id: PropTypes.string.isRequired,
};

export default UpdateItem;
export { UPDATE_ITEM_MUTATION };
export { SINGLE_ITEM_QUERY };
