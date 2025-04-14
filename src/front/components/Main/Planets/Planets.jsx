import React, { useEffect } from "react";
import useGlobalReducer from "../../../hooks/useGlobalReducer";
import { getPlanets } from "../../../services/services";
import { Link } from "react-router-dom";

function Planets() {
    const { store, dispatch } = useGlobalReducer();

    const toggleFavorite = (planet) => {
        const isFavorite = store.favorites.some(
            (fav) => fav.name === planet.name
        );

        let updatedFavorites;
        if (isFavorite) {
            updatedFavorites = store.favorites.filter(
                (fav) => fav.name !== planet.name
            );
        } else {
            updatedFavorites = [...store.favorites, planet];
        }
        dispatch({ type: "SET_FAVORITES", payload: updatedFavorites });
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    };

    useEffect(() => {
        const storedFavorites =
            JSON.parse(localStorage.getItem("favorites")) || [];
        dispatch({ type: "SET_FAVORITES", payload: storedFavorites });
    }, [dispatch]);

    return (
        <>
            <h1 id="titlePlanets" className="titleComponent">
                Planets
            </h1>

            <div className="swiper">
                <div className="swiper-wrapper">
                    {store.planets.map((planet) => {
                        const isFavorite = store.favorites.some(
                            (fav) => fav.name === planet.name
                        );
                        return (
                            <div className="swiper-slide" key={planet.uid}>
                                {planet.uid === "1" && (
                                    <img
                                        src="src/front/assets/img/Tatooine.webp.webp"
                                        alt={planet.name}
                                    />
                                )}
                                {planet.uid !== "1" && (
                                    <img
                                        src={`https://raw.githubusercontent.com/tbone849/star-wars-guide/refs/heads/master/build/assets/img/planets/${planet.uid}.jpg`}
                                        alt={planet.name}
                                        width={"100%"}
                                        height={"100%"}
                                    />
                                )}
                                <div className="swiper-data">
                                    <span className="text-center">
                                        {planet.name}
                                    </span>
                                    <div className="d-flex justify-content-center gap-2">
                                        <Link
                                            to={`/planetsDetails/${planet.uid}`}
                                        >
                                            <button className="btn btn-warning">
                                                Show More!
                                            </button>
                                        </Link>
                                        <button
                                            className={`btn btn-warning favorite-btn${
                                                isFavorite ? "active" : ""
                                            }`}
                                            onClick={() =>
                                                toggleFavorite(planet)
                                            }
                                        >
                                            <i
                                                className={`${
                                                    isFavorite
                                                        ? "fa-solid fa-heart"
                                                        : "fa-regular fa-heart"
                                                }`}
                                            ></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="swiper-pagination"></div>
            </div>
        </>
    );
}
export default Planets;
