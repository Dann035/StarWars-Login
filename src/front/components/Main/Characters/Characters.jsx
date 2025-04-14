import React, { useEffect } from "react";
import useGlobalReducer from "../../../hooks/useGlobalReducer";
import { getFilms } from "../../../services/services";
import Swiper from "swiper";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { EffectCoverflow, Pagination } from "swiper/modules";
import "./Characters.css";
import { Link } from "react-router-dom";

function Characters() {
    const { store, dispatch } = useGlobalReducer();

    const toggleFavorite = (character) => {
        const isFavorite = store.favorites.some(
            (fav) => fav.name === character.name
        );

        let updatedFavorites;
        if (isFavorite) {
            updatedFavorites = store.favorites.filter(
                (fav) => fav.name !== character.name
            );
        } else {
            updatedFavorites = [...store.favorites, character];
        }
        dispatch({ type: "SET_FAVORITES", payload: updatedFavorites });
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    };

    useEffect(() => {
        const swiper = new Swiper(".swiper", {
            modules: [EffectCoverflow],
            effect: "coverflow",
            grabCursor: true,
            centeredSlides: true,
            initialSlide: "3",
            speed: 600,
            preventClicks: true,
            slidesPerView: "auto",
            coverflowEffect: {
                rotate: 0,
                stretch: 80,
                depth: 350,
                modifier: 1.5,
                slideShadows: true,
            },
        });
    }, []);

    useEffect(() => {
        const storedFavorites =
            JSON.parse(localStorage.getItem("favorites")) || [];
        dispatch({ type: "SET_FAVORITES", payload: storedFavorites });
    }, [dispatch]);

    return (
        <>
            <h1 id="titleCharacters" className="titleComponent">
                Characters
            </h1>

            <div className="swiper">
                <div className="swiper-wrapper">
                    {store.characters.map((character) => {
                        const isFavorite = store.favorites.some(
                            (fav) => fav.name === character.name
                        );
                        return (
                            <div className="swiper-slide" key={character.uid}>
                                <img
                                    src={`https://raw.githubusercontent.com/tbone849/star-wars-guide/refs/heads/master/build/assets/img/characters/${character.uid}.jpg`}
                                    width={"100%"}
                                    height={"100%"}
                                    alt="character"
                                />
                                <div className="swiper-data">
                                    <span className="text-center">
                                        {character.name}
                                    </span>
                                    <div className="d-flex justify-content-center gap-2">
                                        <Link
                                            to={`/characterDetails/${character.uid}`}
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
                                                toggleFavorite(character)
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

export default Characters;
