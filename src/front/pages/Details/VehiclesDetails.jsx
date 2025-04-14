import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useGlobalReducer from "../../hooks/useGlobalReducer";
import './Details.css'

function VehiclesDetails() {
    const { store, dispatch } = useGlobalReducer();
    const { idVehicles } = useParams();
    const id = parseInt(idVehicles);
    const [showInfo, setShowInfo] = useState(false);
    const [element, setElement] = useState({});
    const [loading, setLoading] = useState(true);

    const fetchElement = async (id,storedData) => {
        setLoading(true);
        if(store.storedData){
            const datosGenerales = localStorage.getItem(JSON.parse('datosGenerales'));
            const datos = datosGenerales.vehicles.find(item => item.uid === id);
            setElement(datos);
            return;
        }
        try {
            const response = await fetch(`https://swapi.tech/api/vehicles/${id}`); // Cambia la URL según tu API
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
                <h1 className='titleDetails'>Vehicles Details</h1>
            </header>
            <section className='dataInfo'>
                {loading && <p>Loading...</p>}
                <div className='imgDetails'>
                    <img className='imgDetails' src={`https://raw.githubusercontent.com/tbone849/star-wars-guide/refs/heads/master/build/assets/img/vehicles/${id}.jpg`} alt="" />
                <span onClick={handleClick} className="btnShowInfo m-0 p-0">&#10132;</span>
                </div>
                <div className={`infoData ${showInfo ? '' : 'd-none'}`}>
                    <h4>{element.name}</h4>
                    <p>
                        <strong>Consumables:</strong> {element.consumables}
                    </p>
                    <p>
                        <strong>Cargo Capacity:</strong> {element.cargo_capacity}
                    </p>
                    <p>
                        <strong>Maximum Atmosphering Speed:</strong> {element.max_atmosphering_speed}
                    </p>
                    <p>
                        <strong>Crew:</strong> {element.crew}
                    </p>
                    <p>
                        <strong>Passengers:</strong> {element.passengers}
                    </p>
                    <p>
                        <strong>Length:</strong> {element.length}
                    </p>
                    <p>
                        <strong>Manufacturer:</strong> {element.manufacturer}
                    </p>
                    <p>
                        <strong>Model:</strong> {element.model}
                    </p>
                    <p>
                        <strong>Vehicle Class:</strong> {element.vehicle_class}
                    </p>
                </div>
            </section>
        </div>
    );
}

export default VehiclesDetails;