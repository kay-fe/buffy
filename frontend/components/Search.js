import Downshift, { resetIdCounter } from "downshift";
import { useRouter } from "next/router";
import { useLazyQuery, gql } from "@apollo/client";
import debounce from "lodash.debounce";
import { DropDown, DropDownItem, SearchStyles } from "./styles/DropDown";

const SEARCH_ITEMS_QUERY = gql`
    query SEARCH_ITEMS_QUERY($searchTerm: String!) {
        items(
            where: {
                OR: [
                    { title_contains: $searchTerm }
                    { description_contains: $searchTerm }
                ]
            }
        ) {
            id
            image
            largeImage
            title
        }
    }
`;

function AutoComplete(props) {
    const router = useRouter();
    const [findItems, { loading, data, error }] = useLazyQuery(
        SEARCH_ITEMS_QUERY,
        {
            fetchPolicy: "no-cache",
        }
    );
    const items = data ? data.items : [];
    const findItemsButChill = debounce(findItems, 350);
    resetIdCounter();

    return (
        <SearchStyles>
            <Downshift
                onChange={selectionItem => {
                    router.push({
                        pathname: "/item",
                        query: {
                            id: selectionItem.id,
                        },
                    });
                }}
                itemToString={item => (item === null ? "" : item.title)}
            >
                {({
                    getInputProps,
                    getItemProps,
                    isOpen,
                    inputValue,
                    highlightedIndex,
                }) => (
                    <div>
                        <input
                            {...getInputProps({
                                type: "search",
                                placeholder: "Search For An Item",
                                id: "search",
                                className: loading ? "loading" : "",
                                onChange: e => {
                                    e.persist();
                                    findItemsButChill({
                                        variables: {
                                            searchTerm: e.target.value,
                                        },
                                    });
                                },
                            })}
                        />

                        {isOpen && (
                            <DropDown>
                                {items.map((item, index) => (
                                    <DropDownItem
                                        {...getItemProps({ item })}
                                        key={item.id}
                                        highlighted={index === highlightedIndex}
                                    >
                                        <img
                                            width="50"
                                            src={item.largeImage}
                                            alt={item.title}
                                        />
                                        {item.title}
                                    </DropDownItem>
                                ))}
                                {!items.length && !loading && (
                                    <DropDownItem>
                                        {" "}
                                        Nothing Found {inputValue}
                                    </DropDownItem>
                                )}
                            </DropDown>
                        )}
                    </div>
                )}
            </Downshift>
        </SearchStyles>
    );
}

export default AutoComplete;
