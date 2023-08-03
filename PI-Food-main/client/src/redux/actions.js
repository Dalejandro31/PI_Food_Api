import axios from "axios";
import { GET_ALL_RECIPES,
    GET_RECIPE_BY_NAME,
    GET_RECIPE_DETAIL,
    GET_DIETS,
    FILTER_DIETS,
    ORDER_ASC,
    ORDER_DESC,
    GET_API,
    HEALTSC_ASC,
    HEALTSC_DES,
    POST_RECIPE,
    GET_USERS,
    POST_LOGIN,
    POST_USERS} from './actions-type';

//ACTIONS RECIPES------------------------------------------------------------->>
export const getAllRecipes= () =>{
    return async(dispatch) => {
        await axios.get('http://localhost:3001/recipes')
        .then((res) => res.data)
        .then((data) => dispatch({type: GET_ALL_RECIPES, payload: data}))
    }
}

export const getRecipeName = (name) => {
    return (dispatch) => {
        
        dispatch({type:GET_RECIPE_DETAIL, payload: []})
        axios.get('http://localhost:3001/recipes/?name='+name)
        .then((res)=> res.data)
        .then((data) => dispatch({type: GET_RECIPE_BY_NAME, payload: data}))
        
        
    }
}

export const getRecipeDetail = (id) => {
    return async(dispatch) => {
        
        dispatch({type:GET_RECIPE_DETAIL, payload:[]})
        await axios.get(`http://localhost:3001/recipes/${id}`)
        .then((res)=>res.data)
        .then((data) => dispatch({type: GET_RECIPE_DETAIL, payload: data}))
        .catch((err) => console.log(err))
    }
}

//ACTIONS DIETS--------------------------------------------------------------------------->>

export const getDiets = () =>{
    return async(dispatch) => {
        
        await axios.get(`http://localhost:3001/diets`)
        .then((res)=>{
            let response = res.data?.map(e =>e.name)
            dispatch({type: GET_DIETS, payload:response})
        })

    }
}

export const filterDiet  = (diets) =>{
    return{
        type: FILTER_DIETS,
        payload: diets
    }
}

//ORDENAR ASCENDENTE Y DESCENDENTE ------------------------------------------->>

export const orderAsc= () =>{
    return{
        type:ORDER_ASC
    }
}

export const orderDesc = () =>{
    return{
        type:ORDER_DESC
    }
}
export const healtScAsc = () =>{
    return {
        type: HEALTSC_ASC
    }
}

export const healtScDes = () =>{
    return{
        type: HEALTSC_DES
    }
}

//get Api----------------------------------------------------------->>
export const getApi = () =>{
    return{
        type:GET_API
    }
}
//post Recipe------------------------------------------------------->>
export const postRecipe = (payload) =>{
    return {
        type: POST_RECIPE,
        payload: payload
    }
}
//Actions Login -------------------------------->>>>
export const postUsers = (newUser) =>{
    return async (dispatch) => {
        try {
            const response = await axios.post('http://localhost:3001/users', newUser);
            dispatch({
                type: POST_USERS,
                payload: response.data,
            })
            alert('nuevo Usuario creado exitosamente' )
        } catch (error) {
            alert(`error: ${error}`)
        }
    }
}
export const postLogin = (newLogin) =>{
    return async (dispatch) => {
        try {
          const response = await axios.post('http://localhost:3001/users/login', newLogin);
          const { usuario, email, id, nombre} = response.data;
          dispatch({
            type: POST_LOGIN,
            payload: {
             usuario, email, id, nombre
            },
          });
          alert('Login exitoso')        
        } catch (error) {
         
          alert(`Error al iniciar sesión: ${error}`);
          
        }
      };
}

export const getUsers = () =>{
    return async (dispatch) => {
        try {
          const response = await axios.get(`http://localhost:3001/users`);
          let usuarios = response.data?.map((e) => e);
          dispatch({ type: GET_USERS, payload: usuarios });
        } catch (error) {
          console.log(`error ${error}`);
          console.log(`no usuarios creados`);
        }
      };
}