import App from "next/app";
import { ApolloProvider } from "@apollo/client";
import Page from "../components/Page";
import withData from "../lib/withData";
import { CartStateProvider } from "../components/LocalState";

function MyApp({ Component, apollo, pageProps }) {
    return (
        <ApolloProvider client={apollo}>
            <CartStateProvider>
                <Page>
                    <Component {...pageProps} />
                </Page>
            </CartStateProvider>
        </ApolloProvider>
    );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async appContext => {
//     // calls page's `getInitialProps` and fills `appProps.pageProps`
//     const appProps = await App.getInitialProps(appContext);

//     return { ...appProps };
// };

export default withData(MyApp);
