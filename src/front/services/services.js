import { cat } from "fontawesome";

const BASE_URL = 'https://www.swapi.tech/api';

const fetchData = async (endpoint, dispatch, actionType, mapFunction) => {
    try {
        const response = await fetch(`${BASE_URL}/${endpoint}/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Error fetching ${endpoint}: ${response.statusText}`);
        }
        const data = await response.json();
        const results = mapFunction(data);
        dispatch({ type: actionType, payload: results });
    } catch (error) {
        console.error(`Error fetching ${endpoint}:`, error);
        dispatch({ type: "SET_ERROR", payload: `Failed to fetch ${endpoint}` });
    }
};

const mapData = (data) => data.results.map(item => ({
    uid: item.uid,
    name: item.name,
}));
const mapDataFilms = (data) => data.result.map(film => ({
        episode_id: film.properties.episode_id,
        title: film.properties.title,
    }))


export const getCharacters = async (dispatch) => {
    await fetchData("people", dispatch, "GET_CHARACTERS", mapData)
};
export const getFilms = async (dispatch) => {
    await fetchData("films", dispatch, "GET_FILMS", mapDataFilms)
};
export const getPlanets = async (dispatch) => {
    await fetchData("planets", dispatch, "GET_PLANETS", mapData)
};
export const getSpecies = async (dispatch) => {
    await fetchData("species", dispatch, "GET_SPECIES", mapData)
};
export const getStarships = async (dispatch) => {
    await fetchData("starships", dispatch, "GET_STARSHIPS", mapData)
};
export const getVehicles = async (dispatch) => {
    await fetchData("vehicles", dispatch, "GET_VEHICLES", mapData)
};

export const fetchAllData = async (dispatch, storedData) => {
    if (storedData) {
        dispatch({ type: "GET_DATA_FROM_LOCALSTORAGE", payload: storedData });
        return;
    }
    try {
        dispatch({ type: "SET_LOADING", payload: true });
        await Promise.all([
            getCharacters(dispatch),
            getFilms(dispatch),
            getPlanets(dispatch),
            getSpecies(dispatch),
            getStarships(dispatch),
            getVehicles(dispatch),
        ]);
        dispatch({ type: "SAVE_TO_LOCALSTORAGE" });
    } catch (error) {
        console.error("Error fetchign all data:", error);
        dispatch({ type: "SET_ERROR", payload: "Failed to fetch all data" });
    } finally {
        dispatch({ type: "SET_LOADING", payload: false });
    }
}

