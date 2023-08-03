import style from './Card.module.css';
import React from 'react';
import {Link} from 'react-router-dom';

function Card(props){

    const{id, name,image, healthscore} = props
    console.log(props)
    return (
        <div className={style.cardContainer}>
            <div className={style.divImg}>
            <Link to={`/detail/${id}`}> <img className={style.image} src={image} alt={name} /></Link>
            </div>
            <div className={style.divInfo}>
                <h3 className={style.name}>{name}</h3>
            </div>
            {/* <div className={style.divInfo}>
                <h3 className={style.healthscore}>{healthscore}</h3>
            </div> */}
            
        </div>
    )
}

export default Card;