import React from 'react';
import style from './landingPage.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import{faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import {Link} from 'react-router-dom';

function welcomePage(){
    return(
        <div className={style.contenedorPadre}>
            <div className={style.contenedorInfo}>
                <div className={style.content1}>
                    <div className={style.infoProject}>
                        <h1>Foods App</h1>
                        <h2>
                            This is a web application that allows users to create, filter, and organize food recipes in a simple and efficient way.{<p/>}

                            The platform offers a wide variety of features, such as searching for recipes by name and displaying complete details of each recipe. 
                            Users can interact intuitively with the application to discover new culinary ideas and organize their favorite recipes according to their preferences.{<p/>}

                            Foods is a project that combines technologies such as React.js, JavaScript, Redux, Express, PostgreSQL, HTML, and CSS to provide an interactive and 
                            practical experience in creating and organizing food recipes.

                        </h2>
                    </div>
                </div>
                <div className={style.content2}>
                    <div className={style.photo}>
                        <div className={style.contentPhoto}/>
                    </div>
                    <div className={style.myInfo}>
                        <h2>Hello, I am David, passionate about development and technology. Builder of innovative solutions. Always learning, always growing. 🚀</h2>
                    </div>
                </div>
                <div className={style.content3}>
                    <div className={style.socialNetworks}>
                        <h1>Social Networks</h1>
                        <a href='https://www.linkedin.com/in/david-alejandro-orozco-casas/' className={style.buttonLinkedin} >
                            <FontAwesomeIcon icon={faLinkedin} size='5x'/>
                        </a>
                        <a href='https://github.com/Dalejandro31' className={style.buttonGitHub} >
                            <FontAwesomeIcon icon={faGithub} size='5x'/>
                        </a>
                    </div>
                </div>
            </div>           
            <Link to='/login'><button type='submit' className={style.buttonHomePage}>Iniciar Sesion</button></Link>       
        </div>
    )
};

export default welcomePage;    