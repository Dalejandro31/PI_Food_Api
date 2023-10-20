import React from 'react';
import style from './landingPage.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import{faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import {Link} from 'react-router-dom';

function welcomePage(){
    return(
        <div>
            <header>
                <nav>
                    <a href='#' className={style.logo}>
                        <h1>
                            <span className={style.pi}>PI</span><span className={style.foods}>Foods</span>
                        </h1>
                    </a>
                    <ul>
                        <li className={style.navitem}>
                        <a href="#about" className={style.navlink}>about</a>
                        </li>
                        <li className={style.navitem}>
                            <a href="#about" className={style.navlink}>Log In</a>
                        </li>
                        <li className={style.navitem}>
                            <a href="#about" className={style.navlink}>subcribe</a>
                        </li>
                    </ul>
                </nav>
                <section className={style.home}>
                    <div className={style.introtext}>   
                        <h1>
                            <span className={style.created}>you can created</span><br/>
                            <span className={style.diet}>your diet</span>
                        </h1>
                        <p>
                            texto sobre el objetivo del sitio web y demas ...
                        </p>
                        <a href="#" className={style.btnred}>Learn more</a>
                        <a href="#" className={style.btnblue}>Subscribe</a>
                    </div>
                    <div>
                    <iframe 
                        className={style.frame}
                        src="https://www.youtube.com/embed/sUmM_PFpsvQ"
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                    <div className={style.stand1}></div>
                    <div className={style.stand2}></div>
                    </div>
                    
                </section>
            </header>
        </div>
    )
};

export default welcomePage;    