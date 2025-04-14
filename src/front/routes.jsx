// Import necessary components and functions from react-router-dom.

import {
    createBrowserRouter,
    createRoutesFromElements,
    Navigate,
    Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import Login from "./pages/Login/Login";
import { CharactersDetails } from "./pages/Details/CharactersDetails.jsx";
import PlanetsDetails from "./pages/Details/PlanetsDetails";
import SpeciesDetails from "./pages/Details/SpeciesDetails";
import StarshipsDetails from "./pages/Details/StarshipsDetails";
import VehiclesDetails from "./pages/Details/VehiclesDetails";
import FilmsDetails from "./pages/Details/FilmsDetails.jsx";
import SignUp from "./pages/Login/SignUp.jsx";


export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>}>
            <Route path="/" element={<Login />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/home" element={<Home />} />

            <Route
                path="/characterDetails/:idCharacter"
                element={<CharactersDetails />}
            />
            <Route
                path="/planetsDetails/:idPlanets"
                element={<PlanetsDetails />}
            />
            <Route
                path="/speciesDetails/:idSpecies"
                element={<SpeciesDetails />}
            />
            <Route
                path="/starshipsDetails/:idStarships"
                element={<StarshipsDetails />}
            />
            <Route
                path="/vehiclesDetails/:idVehicles"
                element={<VehiclesDetails />}
            />
            <Route path="/filmsDetails/:idFilms" element={<FilmsDetails />} />
        </Route>
    ),
    {
        future: {
            v7_startTransition: true,
        },
    }
);
