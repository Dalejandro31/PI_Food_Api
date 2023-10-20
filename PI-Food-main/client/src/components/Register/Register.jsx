import React,{useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate } from "react-router-dom";
import style from "./Register.module.css"
import { postUsers } from "../../redux/actions";


export default function Register(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [newUser, setNewUser] = useState({
        name:'',
        lastName:'',
        email:'',
        password:'',
    })

    const handleChange = (e) => {
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value,
        })
    }



    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(postUsers(newUser));
        setNewUser({
            name:'',
            lastName:'',
            email:'',
            password:'',
        })
        navigate('/login')
    }

    return(
        <div className={style.divFather}>
            <form className={style.formRegister} onSubmit={handleSubmit}>
                <h1>Registro</h1>
                <div className={style.divFirstAndLastName}>
                    
                    <input 
                        className={style.names}
                        value={newUser.name}
                        name="name"
                        placeholder="First Name"
                        onChange={handleChange}
                    />
                    <input 
                        className={style.names}
                        value={newUser.lastName}
                        name="lastName"
                        placeholder="Last Name"
                        onChange={handleChange}
                    />
                </div>
                <div className={style.divEmail}>
                    <input
                        className={style.email}
                        value={newUser.email}
                        name="email"
                        placeholder="email"
                        onChange={handleChange}
                    />
                </div>
                <div className={style.divPassword}>
                    <input
                        className={style.password}
                        type="password"
                        value={newUser.password}
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                    />
                </div>
                <button className={style.buttonRegister}>Registrarse</button>
            </form>
        </div>
    )
}