import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useGlobalReducer from "../../hooks/useGlobalReducer";
import './Details.css'

function PlanetsDetails() {
    const { store, dispatch } = useGlobalReducer();
    const { idPlanets } = useParams();
    const id = parseInt(idPlanets);
    const [showInfo, setShowInfo] = useState(false);
    const [element, setElement] = useState({});
    const [loading, setLoading] = useState(true);

    const fetchElement = async (id,storedData) => {
        setLoading(true);
        if(store.storedData){
            const datosGenerales = localStorage.getItem(JSON.parse('datosGenerales'));
            const datos = datosGenerales.planets.find(item => item.uid === id);
            setElement(datos);
            return;
        }
        try {
            const response = await fetch(`https://swapi.tech/api/planets/${id}`); // Cambia la URL según tu API
            const data = await response.json();
            setElement(data.result.properties);
        } catch (error) {
            console.error("Error fetching element details:", error);
        }finally{
            setLoading(false);
        }
    };
    
    useEffect(() => {
        fetchElement(id,store.storedData);
    },[id]);

    function handleClick(){
        setShowInfo(!showInfo);
    }

    return (
        <div className="containerDetails">
            <header>
                <h1 className='titleDetails'>Planets Details</h1>
            </header>
            <section className='dataInfo'>
                {loading && <p>Loading...</p>}
                <div className='imgDetails'>
                    <img className='imgDetails' src={`https://raw.githubusercontent.com/tbone849/star-wars-guide/refs/heads/master/build/assets/img/planets/${id}.jpg`} alt="" />
                <span onClick={handleClick} className="btnShowInfo m-0 p-0">&#10132;</span>
                </div>
                <div className={`infoData ${showInfo ? '' : 'd-none'}`}>
                    <h4>{element.name}</h4>
                    <p>
                        <strong>Climate:</strong> {element.climate}
                    </p>
                    <p>
                        <strong>Diameter:</strong> {element.diameter}
                    </p>
                    <p>
                        <strong>Rotation Period:</strong> {element.rotation_period}
                    </p>
                    <p>
                        <strong>Terrain:</strong> {element.terrain}
                    </p>
                    <p>
                        <strong>Gravity:</strong> {element.gravity}
                    </p>
                    <p>
                        <strong>Population:</strong> {element.population}
                    </p>
                    <p>
                        <strong>Orbital Period:</strong> {element.orbital_period}
                    </p>
                </div>
            </section>
        </div>
    );
}

export default PlanetsDetails;