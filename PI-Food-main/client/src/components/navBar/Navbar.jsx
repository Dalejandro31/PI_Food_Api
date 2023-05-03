import style from './NavBar.module.css';
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
        <div>
            <Link to='/'><button>LANDING PAGE</button></Link>
            <input type="text" value={recipeName.recipeValue} onChange={(e)=> handleSearch(e)} placeholder='recipes..' />
            <button onClick={()=>onSearch}>SEARCH</button>
        </div>
    )
};

export default NavBar;