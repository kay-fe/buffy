import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import Meta from "./Meta";
import Header from "./Header";

const theme = {
    red: "#FF0000",
    black: "#393939",
    grey: "#3A3A3A",
    lightgrey: "#E1E1E1",
    offWhite: "#EDEDED",
    tablet: "768px",
    laptop: "1200px",
    desktop: "1200px",
    orange: "#E78354",
    purple: "rgb(127, 92, 204)",
    bs: "0 12px 24px 0 rgba(0, 0, 0, 0.09)",
};

const StyledPage = styled.div`
    background: white;
    color: ${props => props.theme.black};
`;

const Inner = styled.div`
    max-width: ${props => props.theme.laptop};
    margin: 0 auto;
    padding: 2rem;
`;

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'radnika_next';
    src: url('/static/radnikanext-medium-webfont.woff2') format('woff2')
     ;
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'cooper_regular';
    src: url('/static/Cooper-Black-Regular.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }
  html {
    box-sizing: border-box;
    font-size: 10px;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height: 2;
    font-family: 'radnika_next';
  }
  a {
    text-decoration: none;
    color: ${theme.black};
  }
  button {  font-family: 'radnika_next'; }
`;

const Page = props => {
    return (
        <ThemeProvider theme={theme}>
            <StyledPage>
                <GlobalStyles />
                <Meta />
                <Header />
                <Inner>{props.children}</Inner>
            </StyledPage>
        </ThemeProvider>
    );
};

export default Page;
