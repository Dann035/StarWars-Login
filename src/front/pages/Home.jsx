import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useEffect } from "react";
import { fetchAllData, getCharacters } from "../services/services.js";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "fontawesome";
import Characters from "../components/Main/Characters/Characters.jsx";
import Vehicles from "../components/Main/Vehicles/Vehicles.jsx";
import Species from "../components/Main/Species/Species.jsx";
import Starships from "../components/Main/Starships/Starships.jsx";
import Planets from "../components/Main/Planets/Planets.jsx";
import Films from "../components/Main/Films/Films.jsx";
import Loading from "../components/Loading/Loading.jsx";
import { useNavigate } from "react-router-dom";
useNavigate
export const Home = () => {
    const { store, dispatch } = useGlobalReducer();
    localStorage.setItem("datosGenerales", JSON.stringify(store));
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    useEffect(() => {
        //verificartoken te muestro el contenido
        if (!token) {
            navigate("/");
        } else {
            verifyToken(token);
        }
        fetchAllData(dispatch);
    }, []);

    const verifyToken = async (token) => {
        try {
            const response = await fetch("http://127.0.0.1:3001/api/protected", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                setTimeout(() => {
                    alert("Something went wrong");
                }, 300);
                navigate("/");
                return;
            }
        } catch (error) {
            console.log("Error verifying token:", error);
            navigate("/");
        }
    }

    return (
        <div className="container text-center">
            {store.loading ? (
                <Loading />
            ) : (
                <>
                    <Films />
                    <Characters />
                    <Planets />
                    <Species />
                    <Starships />
                    <Vehicles />
                </>
            )}
        </div>
    );
};



