import { useEffect } from "react";
import useGlobalReducer from "../../hooks/useGlobalReducer";
import "./Navbar.css";
import { Link } from "react-router-dom";

export const Navbar = () => {
    const { store, dispatch } = useGlobalReducer();

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
        dispatch({ type: "SET_FAVORITES", payload: storedFavorites });
    },[]);

    const removeFavorite = (item) => {
        if (item.name) {
            const updatingFavorites = store.favorites.filter(fav => fav.name !== item.name);
            dispatch({ type: "SET_FAVORITES", payload: updatingFavorites });
            localStorage.setItem("favorites", JSON.stringify(updatingFavorites));
        }
        if (item.title) {
            const updatingFavorites = store.favorites.filter(fav => fav.title !== item.title);
            dispatch({ type: "SET_FAVORITES", payload: updatingFavorites });
            localStorage.setItem("favorites", JSON.stringify(updatingFavorites));
        }
    }
    return (
        <nav className="localNavBar navbar navbar-expand-xl navbar-dark bg-tertiary">
            <div className="container-fluid">
                <Link to={"/"} className="navbar-brand">
                    <img
                        id="local-nav-logo-desktop"
                        src="https://lumiere-a.akamaihd.net/v1/images/sw_logo_stacked_2x-52b4f6d33087_7ef430af.png?region=0,0,586,254"
                        alt="Star Wars Logo"
                        className="StarWarsLogo"
                    />
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNavContent"
                    aria-controls="navbarNavContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <i className="navabar-toggler-icon fa fa-bars"></i>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavContent">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a href="#titleCharacters" className="nav-link">
                                Home
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="#titleFilms" className="nav-link">
                                Films
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="#titleCharacters" className="nav-link">
                                Characters
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="#titlePlanets" className="nav-link">
                                Planets
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="#titleSpecies" className="nav-link">
                                Species
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="#titleVehicles" className="nav-link">
                                Vehicles
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="#titleStarships" className="nav-link">
                                Starships
                            </a>
                        </li>
                        <li className="nav-item dropdown">
                            <a
                                className="btnNavbarFavoritos nav-link dropdown-toggle"
                                href="#"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Favoritos({store.favorites.length})
                            </a>
                            <ul className="dropdown-menu">
                                {store.favorites.length > 0 ? (
                                    store.favorites.map( (fav, index) => (
                                        <li key={index}>
                                            <div className="dropdown-item d-flex justify-content-between align-items-center">
                                                {fav.name || fav.title}
                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => removeFavorite(fav)}
                                                >
                                                    <i className="fa fa-trash"></i>
                                                </button>
                                            </div>
                                        </li>
                                    ))
                                    ) : (
                                        <li>
                                            <span className="dropdown-item">No favorites yet</span>
                                        </li>
                                )}
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

