import React from 'react';
import style from './landingPage.module.css';
import {Link} from 'react-router-dom';

function welcomePage(){
    return(
        <div className={style.contenedorPadre}>
            <div className={style.contenedorInfoPi}>
                <h1>Welcome! to the food Api of SoyHenry</h1>
            </div>
            <Link to='/home'><button type='submit' className={style.buttonHomePage}>Home Page</button></Link>    
        </div>
    )
};

export default welcomePage;