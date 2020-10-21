import { useMutation, gql } from "@apollo/client";
import { CURRENT_USER_QUERY } from "./User";
import { SINGLE_ITEM_QUERY } from "./SingleItem";

const ADD_TO_CART_MUTATION = gql`
    mutation addToCart($id: ID!) {
        addToCart(id: $id) {
            id
            quantity
        }
    }
`;

function AddToCart({ id }) {
    const [addToCart, { loading }] = useMutation(ADD_TO_CART_MUTATION, {
        variables: {
            id,
        },
        // awaitRefetchQueries: true,
        refetchQueries: [{ query: CURRENT_USER_QUERY }],
        // update: updateCart,
        // optimisticResponse: {
        //     __typename: "Mutation",
        //     addToCart: {
        //         __typename: "CartItem",
        //         id,
        //     },
        // },
    });
    return (
        <button
            type="button"
            disabled={loading}
            onClick={() => addToCart().catch(err => alert(err.message))}
        >
            Add{loading && "ing"} To Cart 🛒
        </button>
    );
}

export default AddToCart;
export { ADD_TO_CART_MUTATION };
