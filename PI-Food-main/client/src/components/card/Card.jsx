import style from './Card.module.css';
import React from 'react';
import {Link} from 'react-router-dom';

function Card(props){
    const{id, name,image, diets }= props
    return (
        <div>
            <h3>{name}</h3>
            <img src={image} alt="Card image" />
            <p>{diets}</p>
            <Link to={`/detail/${id}`}><button>DETAILS</button></Link>
        </div>
    )
}

export default Card;