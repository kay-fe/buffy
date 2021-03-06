import Error from "./ErrorMessage";
import styled from "styled-components";
import Head from "next/head";
import { useQuery, gql } from "@apollo/client";
import useForm from "../lib/useForm";

const SingleItemStyles = styled.div`
    max-width: 1200px;
    margin: 2rem auto;
    box-shadow: ${props => props.theme.bs};
    display: grid;
    grid-auto-columns: 1fr;
    grid-auto-flow: column;
    min-height: 800px;
    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
    .details {
        margin: 3rem;
        font-size: 2rem;
    }
`;

const SINGLE_ITEM_QUERY = gql`
    query SINGLE_ITEM_QUERY($id: ID!) {
        item(where: { id: $id }) {
            id
            title
            description
            largeImage
        }
    }
`;

function SingleItem({ id }) {
    const { loading, error, data } = useQuery(SINGLE_ITEM_QUERY, {
        variables: { id },
    });
    if (error) return <Error error={error} />;
    if (loading) return <p>Loading...</p>;
    if (!data.item) return <p>No Item Found for {id}</p>;
    const { item } = data;
    return (
        <SingleItemStyles data-testid="singleItem">
            <Head>
                <title>Buffy | {item.title}</title>
            </Head>
            <img src={item.largeImage} alt={item.title} />
            <div className="details">
                <h2>Viewing {item.title}</h2>
                <p>{item.description}</p>
            </div>
        </SingleItemStyles>
    );
}

export default SingleItem;
export { SINGLE_ITEM_QUERY };
