import { ALL_ITEMS_QUERY } from "./Items";
import { useMutation, gql } from "@apollo/client";
import { PAGINATION_QUERY } from "./Pagination";
import NProgress from "nprogress";

const DELETE_ITEM_MUTATION = gql`
    mutation DELETE_ITEM_MUTATION($id: ID!) {
        deleteItem(id: $id) {
            id
            title
        }
    }
`;
function update(cache, payload) {
    cache.evict(cache.identify(payload.data.deleteItem));
    NProgress.done();
}

function DeleteItem({ id, children }) {
    const [deleteItem, { error }] = useMutation(DELETE_ITEM_MUTATION, {
        variables: { id },
        update,
        // optimisticResponse: {
        //     __typename: "Mutation",
        //     deleteItem: {
        //         __typename: "Item",
        //         id,
        //     },
        // },
        // awaitRefetchQueries: true,
        // refetchQueries: [
        // { query: ALL_ITEMS_QUERY },
        // { query: PAGINATION_QUERY },
        // ],
    });

    return (
        <button
            type="button"
            onClick={() => {
                if (confirm("Are you sure you want to delete this item?")) {
                    NProgress.start();
                    deleteItem().catch(err => {
                        alert(err.message);
                    });
                }
            }}
        >
            {children}
        </button>
    );
}

export default DeleteItem;
