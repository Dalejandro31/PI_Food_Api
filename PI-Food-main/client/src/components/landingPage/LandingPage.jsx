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
            </header>
        </div>
    )
};

export default welcomePage;    