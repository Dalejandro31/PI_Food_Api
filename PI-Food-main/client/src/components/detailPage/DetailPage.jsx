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
    console.log(selector)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getRecipeDetail(id));
    },[dispatch,id])

    return(
        <div className={style.contenedorPadre}>
            
            {
                selector.hasOwnProperty('name')?(
                    <div className={style.contenedorHijo}>
                        <div className={style.divImagen}>
                            <img className={style.image} src={selector.image} alt={selector.name}/>
                        </div>
                        
                        <div className={style.contentDescription}>
                            <div className={style.divDescription}>
                                <h1>{selector.name}</h1>
                                <h2>Summary: </h2>
                                <h3>{selector.summary}</h3>
                                <h2>Steps: </h2>
                                <h3>{selector.steps}</h3>
                                <h2>HealthScore</h2>
                                <h3>{selector.healthscore}</h3>
                                <h2>Diets: </h2>
                                <h3>{selector.diets}</h3>
                                <Link to='/home'><button className={style.buttonHome}>Home</button></Link> 
                            </div>
                        </div>
                        
                    </div>
                ) : undefined
            }
        </div>
    )
}