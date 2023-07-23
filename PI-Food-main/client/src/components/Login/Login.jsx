import React, {useState, useEffect} from "react";
import style from "./Login.module.css"
import {useDispatch, useSelector} from "react-redux"
import { useNavigate, Link } from "react-router-dom";
import {getUsers, postLogin} from "../../redux/actions"
export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [input, setInput] = useState({
        email:"",
        contraseña:""
    });
    useEffect(() => {
        dispatch(getUsers());
      }, [dispatch]);
    
  
    const users = useSelector((state) => state.users);
    const userMap = users.map((e) => ({
        email:e.email,
        contraseña: e.contraseña,
    }));
    console.log(userMap)
    
    const handleChange = (event) => {
        const{name, value} = event.target;
        setInput((prevInput) => ({
            ...prevInput,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const isUser = userMap.find(
            (user) => user.email === input.email && user.contraseña === input.contraseña
        );
        if(isUser){
            await dispatch(postLogin(input))
            navigate("/home")
        }else{
            alert("Los datos ingresados, no son correctos intentalo nuevamente");
        }
    };

    return(
        <div className={style.contenedorPadre} >
            <form className={style.login} onSubmit={handleSubmit}>
                <div className={style.imgLogin}></div>
                <div className={style.componetsLogin}>
                    <h3>Login</h3>
                    <div className={style.contendorInputs}>

                        <label htmlFor="inp" className={style.inp}>
                            <input 
                                type="email" 
                                value={input.email} 
                                name="email" id="inp"  
                                onChange={handleChange}
                                placeholder="&nbsp;"
                            />
                            <span className={style.label}>Email</span>
                            <span className={style.focusBg}></span>
                        </label>

                        <label htmlFor="inp" className={style.inp}>
                            <input 
                                type="text" 
                                value={input.contraseña}
                                name="contraseña"
                                onChange={handleChange}
                                id="inp"  
                                placeholder="&nbsp;"
                            />
                            <span className={style.label}>Contraseña</span>
                            <span className={style.focusBg}></span>
                        </label>    
                    </div>
                    <button type="submit" className={style.buttonLogin}>Ingresar</button>
                    <Link to='/Register'>Crea tu cuenta aqui</Link>
                </div>
               
            </form>

        </div>
    )
}
