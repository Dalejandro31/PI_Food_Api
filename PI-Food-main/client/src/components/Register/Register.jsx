import React from "react";
import style from "./Register.module.css"


export default function Register(){
    return(
        <div className={style.divFather}>
            <form className={style.formRegister}>
                <h1>Registro</h1>
                <div className={style.divFirstAndLastName}>
                    
                    <input 
                        className={style.names}
                        placeholder="ej: Luis"
                    />
                    
                    <input 
                        className={style.names}
                        placeholder="ej: Suarez"
                    />
                </div>
                <div className={style.divEmail}>
                    
                    <input
                        className={style.email}
                        placeholder="ej: LuizSuarez@gmail.com"
                    />
                </div>
                <div className={style.divPassword}>
                    
                    <input
                        className={style.password}
                    />
                </div>
                <div className={style.divPassword}>
                    
                    <input 
                        className={style.password}
                    />
                </div>
                <button className={style.buttonRegister}>Registrarse</button>
            </form>
        </div>
    )
}