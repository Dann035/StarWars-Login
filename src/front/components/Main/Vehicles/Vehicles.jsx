import { useEffect } from "react";
import useGlobalReducer from "../../../hooks/useGlobalReducer";
import "./Vehicles.css";
import { Link } from "react-router-dom";

function Vehicles() {
    const { store, dispatch } = useGlobalReducer();

    const toggleFavorite = (vehicle) => {
        const isFavorite = store.favorites.some(fav => fav.name === vehicle.name)

        let updatedFavorites;
        if (isFavorite) {
            updatedFavorites = store.favorites.filter(fav => fav.name !== vehicle.name);
        } else {
            updatedFavorites = [...store.favorites, vehicle];
        }
        dispatch({ type: "SET_FAVORITES", payload: updatedFavorites });
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    }

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
        dispatch({ type: "SET_FAVORITES", payload: storedFavorites });
    }, [dispatch]);

    return (
        <>
            <h1 id="titleVehicles" className="titleComponent">vehicles</h1>

            <div className="swiper">
                <div className="swiper-wrapper">
                    {store.vehicles.map((vehicle) => {
                        const isFavorite = store.favorites.some((fav) => fav.name === vehicle.name);
                        return (
                            <div className="swiper-slide" key={vehicle.uid}>
                                <img
                                    src={`https://raw.githubusercontent.com/tbone849/star-wars-guide/refs/heads/master/build/assets/img/vehicles/${vehicle.uid}.jpg`}
                                    alt="character"
                                />
                                <div className="swiper-data">
                                    <span className="text-center">
                                        {vehicle.name}
                                    </span>
                                    <div className="d-flex justify-content-center gap-2">
                                        <Link to={`/vehiclesDetails/${vehicle.uid}`}>
                                            <button className="btn btn-warning">
                                                Show More!
                                            </button>
                                        </Link>
                                        <button
                                            className={`btn btn-warning favorite-btn${isFavorite ? "active" : ""
                                                }`}
                                            onClick={() => toggleFavorite(vehicle)}
                                        >
                                            <i className={`${isFavorite ? "fa-solid fa-heart" : "fa-regular fa-heart"}`}></i>
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

export default Vehicles;
