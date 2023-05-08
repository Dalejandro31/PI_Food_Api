import style from './NavBar.module.css'
import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {getRecipeName} from '../../redux/actions';


function NavBar(){
    const dispatch = useDispatch();
    const [recipeName, setRecipeName] = useState({recipeValue:''});
    const handleSearch = (event) =>{
        setRecipeName({recipeValue: event.target.value})
    }
    const onSearch = () =>{
        dispatch(getRecipeName(recipeName.recipeValue));
    }
    return(
        <div className={style.contenedorNav}>
                <Link to='/'><button className={style.butonLandingPage}>LANDING PAGE</button></Link>
            <div className={style.searchContainer}>
                <input className={style.inputSearch} type="text" value={recipeName.recipeValue} onChange={(e)=> handleSearch(e)} placeholder='recipes..' />
                <button className={style.butonSearch} onClick={()=>onSearch}>SEARCH</button>
            </div>
        </div>
    )
};

export default NavBar;