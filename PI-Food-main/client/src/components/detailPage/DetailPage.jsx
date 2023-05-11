import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {getRecipeDetail} from '../../redux/actions';
import { useParams } from "react-router-dom";
import style from './detailPage.module.css';



export default function Detail(){

    const {id} = useParams();
    const selector = useSelector(state => state.recipeDetail);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getRecipeDetail(id));
    },[dispatch,id])

    return(
        <div className={style.contenedorPadre}>
            
            {
                selector.hasOwnProperty('name')?(
                    <div className={style.contenedorHijo}>
                        <h1>DETAILS</h1>
                        <div className={style.divImagen}>
                            <img className={style.image} src={selector.image} alt={selector.name}/>
                        </div>
                        
                        <div className={style.divDescription}>
                            <h2>Name: </h2>
                            <p>{selector.name}</p>
                            <h2>Summary: </h2>
                            <p>{selector.summary}</p>
                            <h2>HealthScore</h2>
                            <p>{selector.healthscore}</p>
                            <h2>Steps: </h2>
                            <p>{selector.steps}</p>
                            <h2>Diets: </h2>
                            <p>{selector.diets}</p>
                        </div>

                        <div>
                            <Link to='/home'><button className={style.buttonHome}>Home</button></Link> 
                        </div>

                    </div>
                ) : undefined
            }
        </div>
    )
}