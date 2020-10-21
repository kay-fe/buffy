import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Items from "../components/Items";
import { PAGINATION_QUERY } from "../components/Pagination";

function Home() {
    const router = useRouter();
    const { data, loading } = useQuery(PAGINATION_QUERY);
    if (loading) return "Loading...";
    return (
        <Items
            page={parseFloat(router.query.page) || 1}
            count={data.itemsConnection.aggregate.count}
        />
    );
}

// Home.propTypes = {
//     query: PropTypes.shape({
//         page: PropTypes.string,
//         count: PropTypes.number,
//     }),
// };

export default Home;
