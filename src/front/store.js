export const initialStore = () => {
    return {
        vehicles: [],
        characters: [],
        species: [],
        starships: [],
        planets: [],
        films: [],
        loading: false,
        favorites: [],
        fav: false,
    };
};
export default function storeReducer(store, action = {}) {
    switch (action.type) {
        case "GET_DATA":
            return {
                ...store,
                data: action.payload,
                loading: false,
            };
        case "GET_CHARACTERS":
            return {
                ...store,
                characters: action.payload,
                loading: false,
            };
        case "GET_VEHICLES":
            return {
                ...store,
                vehicles: action.payload,
                loading: false,
            };
        case "GET_SPECIES":
            return {
                ...store,
                species: action.payload,
                loading: false,
            };
        case "GET_STARSHIPS":
            return {
                ...store,
                starships: action.payload,
                loading: true,
            };
        case "GET_PLANETS":
            return {
                ...store,
                planets: action.payload,
                loading: false,
            };
        case "GET_FILMS":
            return {
                ...store,
                films: action.payload,
                loading: false,
            };
        case "SET_LOADING":
            return {
                ...store,
                loading: action.payload,
            };
        case "SET_ERROR":
            return {
                ...store,
                message: action.payload,
                loading: false,
            };
        case "SET_FAVORITES":
            return {
                ...store,
                favorites: action.payload,
            };
        case "SAVE_TO_LOCALSTORAGE":
            const combinedData = {
                vehicles: store.vehicles,
                characters: store.characters,
                species: store.species,
                starships: store.starships,
                planets: store.planets,
                films: store.films,
            };
            //localStorage.setItem('starWarsData', JSON.stringify(combinedData));
            return store;
        case "GET_DATA_FROM_LOCALSTORAGE":
            return {
                ...store,
                ...action.payload,
                loading: false,
            };
        default:
            throw new Error("Invalid action type");
    }
}
