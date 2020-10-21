import PropTypes from "prop-types";
import { gql, useQuery } from "@apollo/client";

const CURRENT_USER_QUERY = gql`
    query CURRENT_USER_QUERY {
        me {
            id
            email
            name
            permissions
            cart {
                id
                quantity
                item {
                    id
                    price
                    image
                    largeImage
                    title
                    description
                }
            }
        }
    }
`;

function useUser() {
    const { data, loading, error } = useQuery(CURRENT_USER_QUERY);
    return data ? data.me : null;
}

export { CURRENT_USER_QUERY, useUser };
