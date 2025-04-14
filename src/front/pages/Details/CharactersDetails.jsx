import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useGlobalReducer from "../../hooks/useGlobalReducer";
import './Details.css'

export function CharactersDetails() {
    const { store, dispatch } = useGlobalReducer();
    const { idCharacter } = useParams();
    const id = parseInt(idCharacter);
    const [showInfo, setShowInfo] = useState(false);
    const [element, setElement] = useState({});
    const [loading, setLoading] = useState(true);

    const fetchElement = async (id,storedData) => {
        setLoading(true);
        if(store.storedData){
            const datosGenerales = localStorage.getItem(JSON.parse('datosGenerales'));
            const datos = datosGenerales.characters.find(item => item.uid === id);
            setElement(datos);
            return;
        }
        try {
            const response = await fetch(`https://swapi.tech/api/people/${id}`); // Cambia la URL según tu API
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
                <h1 className='titleDetails'>Character Details</h1>
            </header>
            <section className='dataInfo'>
                {loading && <p>Loading...</p>}
                <div className='imgDetails'>
                    <img className='imgDetails' src={`https://raw.githubusercontent.com/tbone849/star-wars-guide/refs/heads/master/build/assets/img/characters/${id}.jpg`} alt="" />
                <span onClick={handleClick} className="btnShowInfo m-0 p-0">&#10132;</span>
                </div>
                <div className={`infoData ${showInfo ? '' : 'd-none'}`}>
                    <h4>{element.name}</h4>
                    <p>
                        <strong>Gender:</strong> {element.gender}
                    </p>
                    <p>
                        <strong>Skin Color:</strong> {element.skin_color}
                    </p>
                    <p>
                        <strong>Hair Color:</strong> {element.hair_color}
                    </p>
                    <p>
                        <strong>Height:</strong> {element.height}
                    </p>
                    <p>
                        <strong>Eyes Color:</strong> {element.eye_color}
                    </p>
                    <p>
                        <strong>Mass:</strong> {element.mass}
                    </p>
                    <p>
                        <strong>Homeworld:</strong> {element.homeworld}
                    </p>
                </div>
            </section>
        </div>
    );
}

