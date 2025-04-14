import React, { useEffect } from "react";
import useGlobalReducer from "../../../hooks/useGlobalReducer";
import { getPlanets } from "../../../services/services";
import { Link } from "react-router-dom";

function Species() {
    const { store, dispatch } = useGlobalReducer();

    const toggleFavorite = (specie) => {
        const isFavorite = store.favorites.some(
            (fav) => fav.name === specie.name
        );

        let updatedFavorites;
        if (isFavorite) {
            updatedFavorites = store.favorites.filter(
                (fav) => fav.name !== specie.name
            );
        } else {
            updatedFavorites = [...store.favorites, specie];
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
            <h1 id="titleSpecies" className="titleComponent">
                Species
            </h1>

            <div className="swiper">
                <div className="swiper-wrapper">
                    {store.species.map((specie) => {
                        const isFavorite = store.favorites.some(
                            (fav) => fav.name === specie.name
                        );
                        return (
                            <div className="swiper-slide" key={specie.uid}>
                                <img
                                    src={`https://raw.githubusercontent.com/tbone849/star-wars-guide/refs/heads/master/build/assets/img/species/${specie.uid}.jpg`}
                                    width={"100%"}
                                    height={"100%"}
                                    alt="character"
                                />
                                <div className="swiper-data">
                                    <span className="text-center">
                                        {specie.name}
                                    </span>
                                    <div className="d-flex justify-content-center gap-2">
                                        <Link
                                            to={`/speciesDetails/${specie.uid}`}
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
                                                toggleFavorite(specie)
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
export default Species;
