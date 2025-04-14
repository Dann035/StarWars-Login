import {
    Outlet,
    useLocation,
} from "../../../node_modules/react-router-dom/dist";
import ScrollToTop from "../components/ScrollToTop";
import { Navbar } from "../components/Header/Navbar";
import { Footer } from "../components/Footer/Footer";
import Login from "./Login/Login";

export const Layout = () => {
    const location = useLocation();

    const isLoginPage = location.pathname === "/" || location.pathname === "/signUp";

    return (
        <ScrollToTop>
            {!isLoginPage && <Navbar />}
            <Outlet />
            {!isLoginPage && <Footer />}
        </ScrollToTop>
    );
};
