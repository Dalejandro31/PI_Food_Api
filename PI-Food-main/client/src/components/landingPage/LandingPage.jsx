import React from 'react';
import style from './landingPage.module.css';
import {Link} from 'react-router-dom';

function welcomePage(){
    return(
        <div className={style.contenedorPadre}>
            <div className={style.contenedorInfo}>
                <div className={style.contenedorInfoPi}>
                    <div className={style.text}>
                        <h1>"¡Bienvenido a Foods! Descubre y crea deliciosas recetas saludables para una vida equilibrada y llena de sabor.</h1>
                        <h3>En Sober Foods, nos apasiona la comida saludable y la creatividad en la cocina. Utilizamos una API para ofrecerte
                            una amplia variedad de recetas y te brindamos la funcionalidad para que puedas crear tus propias recetas únicas.</h3>
                        <h3>Explora recetas de diferentes tipos de cocina, filtra por ingredientes, busca por nombre o palabras clave y ordena
                            las recetas según tus preferencias.</h3> 
                        <h2>Beneficios</h2> 
                        <h3>Encuentra inspiración culinaria, aprende nuevas técnicas de cocina y disfruta de comidas saludables y deliciosas
                            que se adapten a tus gustos y necesidades.</h3>
                        <h2>Comienza tu viaje culinario ahora. ¡Regístrate para acceder a todas las funciones y comienza a crear tus propias recetas!</h2>       
                    </div>
                </div>
                
            </div>           
            <Link to='/login'><button type='submit' className={style.buttonHomePage}>Iniciar Sesion</button></Link>       
        </div>
    )
};

export default welcomePage;    