import React from 'react';
import style from './landingPage.module.css';
import {Link} from 'react-router-dom';

function welcomePage(){
    return(
        <div className={style.contenedorPadre}>
            <div className={style.contenedorInfoPi}>
                //contiene la informacion sobre el pi
            </div>
            <Link to='/home'><button type='submit' className={style.buttonHomePage}>Home Page</button></Link>    
        </div>
    )
};

export default welcomePage;