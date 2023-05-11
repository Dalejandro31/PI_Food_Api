import style from './Card.module.css';
import React from 'react';
import {Link} from 'react-router-dom';

function Card(props){

    const{id, name,image, diets, healthscore } = props
    return (
        <div className={style.cardContainer}>
            <h3 className={style.name}>{name}</h3>
            <img className={style.image} src={image} alt={name} />
            <h3>Diets:</h3>
            <p className={style.name}>{diets.join(',')}</p>
            <h3>HealthScore:</h3>
            <label>{healthscore}</label>
            <div><Link to={`/detail/${id}`}><button className={style.buttonDetails}>DETAILS</button></Link></div>
        </div>
    )
}

export default Card;