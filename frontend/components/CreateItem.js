import Router from "next/router";
import Form from "./styles/Form";
import formatMoney from "../lib/formatMoney";
import Error from "./ErrorMessage";
import { useMutation, gql } from "@apollo/client";
import useForm from "../lib/useForm";
import { ALL_ITEMS_QUERY } from "./Items";
import { PAGINATION_QUERY } from "./Pagination";

const CREATE_ITEM_MUTATION = gql`
    mutation CREATE_ITEM_MUTATION(
        $title: String!
        $description: String!
        $price: Int!
        $image: String
        $largeImage: String
    ) {
        createItem(
            title: $title
            description: $description
            price: $price
            image: $image
            largeImage: $largeImage
        ) {
            id
            title
        }
    }
`;

function update(cache, payload) {
    cache.modify("ROOT_QUERY", {
        allItems(items, { readField }) {
            return [payload.data.createItem, ...items];
        },
    });
}

function CreateItem() {
    const { inputs, customLoading: uploading, handleChange } = useForm({
        title: "",
        description: "",
        price: 0,
        image: "",
        largeImage: "",
    });

    const [createItem, { loading, error }] = useMutation(CREATE_ITEM_MUTATION, {
        variables: inputs,
        // update,
        optimisticResponse: {
            __typename: "Mutation",
            createItem: {
                __typename: "Item",
                inputs,
            },
        },
        refetchQueries: [
            { query: ALL_ITEMS_QUERY },
            { query: PAGINATION_QUERY },
        ],
    });

    return (
        <Form
            data-testid="form"
            onSubmit={async e => {
                // Stop the form from submitting
                e.preventDefault();
                // call the mutation
                const res = await createItem();
                // change them to the single item page
                Router.push({
                    pathname: "/item",
                    query: { id: res.data.createItem.id },
                });
            }}
        >
            <Error error={error} />
            <fieldset
                disabled={loading || uploading}
                aria-busy={loading || uploading}
            >
                <label htmlFor="file">
                    Image
                    <input
                        type="file"
                        id="file"
                        name="image"
                        placeholder="Upload an image"
                        required
                        onChange={handleChange}
                    />
                </label>

                <label htmlFor="title">
                    Title
                    <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Title"
                        required
                        value={inputs.title}
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
                        value={inputs.price}
                        onChange={handleChange}
                    />
                </label>

                <label htmlFor="description">
                    Description
                    <textarea
                        id="description"
                        name="description"
                        placeholder="Description"
                        required
                        value={inputs.description}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">Submit</button>
            </fieldset>
        </Form>
    );
}

export default CreateItem;
export { CREATE_ITEM_MUTATION };
