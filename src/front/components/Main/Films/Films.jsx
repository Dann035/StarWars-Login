import React, { useEffect } from "react";
import useGlobalReducer from "../../../hooks/useGlobalReducer";
import { getFilms } from "../../../services/services";
import "./Films.css";
import { Link } from "react-router-dom";

function Films() {
    const { store, dispatch } = useGlobalReducer();

    const toggleFavorite = (films) => {
        const isFavorite = store.favorites.some(
            (fav) => fav.title === films.title
        );

        let updatedFavorites;
        if (isFavorite) {
            updatedFavorites = store.favorites.filter(
                (fav) => fav.title !== films.title
            );
        } else {
            updatedFavorites = [...store.favorites, films];
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
            <h1 id="titleCharacters" className="titleComponent">
                Films
            </h1>

            <div className="swiper">
                <div className="swiper-wrapper">
                    {store.films.map((film, i) => {
                        const isFavorite = store.favorites.some(
                            (fav) => fav.title === film.title
                        );
                        return (
                            <div className="swiper-slide" key={film.episode_id}>
                                <img
                                    src={`https://raw.githubusercontent.com/tbone849/star-wars-guide/refs/heads/master/build/assets/img/films/${film.episode_id}.jpg`}
                                    width={"100%"}
                                    height={"100%"}
                                    alt="character"
                                />
                                <div className="swiper-data">
                                    <span className="text-center">
                                        {film.title}
                                    </span>
                                    <div className="d-flex justify-content-center gap-2">
                                        <Link
                                            to={`/filmsDetails/${film.episode_id}`}
                                        >
                                            <button className="btn btn-warning">
                                                Show More!
                                            </button>
                                        </Link>
                                        <button
                                            className={`btn btn-warning favorite-btn${
                                                isFavorite ? "active" : ""
                                            }`}
                                            onClick={() => toggleFavorite(film)}
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
export default Films;
