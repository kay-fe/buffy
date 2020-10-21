import Link from "next/link";
import Router from "next/router";
import styled from "styled-components";
import NProgress from "nprogress";
import Nav from "./Nav";
import Logo from "./Logo";
import Cart from "./Cart";
import Search from "./Search";

Router.onRouteChangeStart = () => {
    NProgress.start();
};

Router.onRouteChangeComplete = () => {
    NProgress.done();
};

Router.onRouteChangeError = () => {
    NProgress.done();
};

const StyledHeader = styled.header`
    .bar {
        border-bottom: 10px solid ${props => props.theme.black};
        display: grid;
        grid-template-columns: auto 1fr;
        justify-content: space-between;
        align-items: stretch;

        @media (max-width: ${props => props.theme.desktop}) {
            grid-template-columns: 1fr;
            justify-content: center;
        }
    }
    .sub-bar {
        display: grid;
        grid-template-columns: 1fr auto;
        border-bottom: 1px solid ${props => props.theme.lightgrey};
    }
`;

const Header = props => {
    return (
        <StyledHeader>
            <div className="bar">
                <Logo />
                <Nav />
            </div>
            <div className="sub-bar">
                <Search />
            </div>
            <Cart />
        </StyledHeader>
    );
};

export default Header;