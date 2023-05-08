import style from './Card.module.css';
import React from 'react';
import {Link} from 'react-router-dom';

function Card(props){

    const{id, name,image, diets, healthscore } = props
    return (
        <div>
            <h3>{name}</h3>
            <img src={image} alt={name} />
            <p>{diets.join(',')}</p>
            <label>{healthscore}</label>
            <Link to={`/detail/${id}`}><button>DETAILS</button></Link>
        </div>
    )
}

export default Card;