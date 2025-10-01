import { useEffect } from "react";
import useGlobalReducer from "../../../hooks/useGlobalReducer";
import { Link } from "react-router-dom";

function Starships() {
    const { store, dispatch } = useGlobalReducer();

    const toggleFavorite = (starship) => {
        const isFavorite = store.favorites.some(
            (fav) => fav.name === starship.name
        );

        let updatedFavorites;
        if (isFavorite) {
            updatedFavorites = store.favorites.filter(
                (fav) => fav.name !== starship.name
            );
        } else {
            updatedFavorites = [...store.favorites, starship];
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
            <h1 id="titleStarships" className="titleComponent">
                Starships
            </h1>

            <div className="swiper">
                <div className="swiper-wrapper">
                    {store.starships.map((starship) => {
                        const isFavorite = store.favorites.some(
                            (fav) => fav.name === starship.name
                        );
                        return (
                            <div className="swiper-slide" key={starship.uid}>
                                {starship.uid === "2" && (
                                    <img
                                        src="src/front/assets/img/CR90corvette.webp.webp"
                                        width={"100%"}
                                        height={"100%"}
                                        alt={starship.name}
                                    />
                                )}
                                {starship.uid === "3" && (
                                    <img
                                        src="src/front/assets/img/StarDestroyer.webp.webp"
                                        width={"100%"}
                                        height={"100%"}
                                        alt={starship.name}
                                    />
                                )}
                                {starship.uid === "17" && (
                                    <img
                                        src="src/front/assets/img/RabelTransport.webp"
                                        width={"100%"}
                                        height={"100%"}
                                        alt={starship.name}
                                    />
                                )}
                                {starship.uid !== "2" &&
                                    starship.uid !== "3" &&
                                    starship.uid !== "17" && (
                                        <img
                                            src={`https://raw.githubusercontent.com/tbone849/star-wars-guide/refs/heads/master/build/assets/img/starships/${starship.uid}.jpg`}
                                            width={"100%"}
                                            height={"100%"}
                                            alt={starship.name}
                                        />
                                    )}
                                <div className="swiper-data">
                                    <span className="text-center">
                                        {starship.name}
                                    </span>
                                    <div className="d-flex justify-content-center gap-2">
                                        <Link
                                            to={`/starshipsDetails/${starship.uid}`}
                                        >
                                            <button className="btn btn-warning">
                                                Show More!
                                            </button>
                                        </Link>
                                        <button
                                            className={`btn btn-warning favorite-btn${isFavorite ? "active" : ""
                                                }`}
                                            onClick={() =>
                                                toggleFavorite(starship)
                                            }
                                        >
                                            <i
                                                className={`${isFavorite
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

export default Starships;
