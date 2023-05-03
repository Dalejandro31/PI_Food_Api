import style from './homePage.module.css';
import React from 'react';
import {Card} from '../card/Card';
import {NavBar} from '../navBar/Navbar';
import { Link } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { useEffect,useState } from 'react';
import {filterDiet,
    getAllRecipes,
    getDiets,
    orderAsc, 
    orderDesc,
    healtScAsc,
    healtScDes,
    getApi} from '../../redux/actions';
 
function Home(){
    const dispatch = useDispatch();
    const allRecipes = useSelector((state)=> state.recipes);
    const diets = useSelector((state) => state.diets);
    const [Order, setOrder] = useState('');

    useEffect(()=>{
        dispatch(getAllRecipes())
        dispatch(getDiets())
    },[dispatch]);

    const handleDiets = (event) =>{
        event.preventDefault()
        dispatch(filterDiet(event.target.value))
        setOrder(`order ${event.target.value}`)
    }

    const handleSort = (event) =>{
        event.preventDefault()
        event.target.value === 'Asc'
        ? dispatch(orderAsc(event.target.value))
        : dispatch(orderDesc(event.target.value))
        setOrder(`order ${event.target.value}`)
    }

    const handleHealtSc= (event) =>{
        event.preventDefault()
        event.target.value === 'HealtAsc'
        ? dispatch(healtScAsc(event.target.value))
        : dispatch(healtScDes(event.target.value))
        setOrder(`order ${event.target.value}`)

    }

    const handleApi = (event) =>{
        event.preventDefault()
        dispatch(getApi(event.target.value))
        setOrder(`order ${event.target.value}`)
    }


    return(
        <div>
            <h1>hola soy el home</h1>
        </div>
    )

}

export default Home