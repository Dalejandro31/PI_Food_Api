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
    POST_RECIPE} from './actions-type';

//ACTIONS RECIPES------------------------------------------------------------->>
export const getAllRecipes= () =>{
    return async(dispatch) => {
        try {
            const response = await axios.get('http://localhost:3001/recipes')
            const data = response.data;
            dispatch({type: GET_ALL_RECIPES, payload: data});
        } catch (error) {
            console.error('RECIPES NOT FOUND',error);
        }
    }
}

export const getRecipeName = (name) => {
    return async(dispatch) => {
        try {
            const response = await axios.get(`http://localhost:3001/recipes/?name=${name}`);
            const data = response.data;
            dispatch({type: GET_RECIPE_BY_NAME, payload: data});
        } catch (error) {
            console.error('NAME RECIPES DONT EXCIST',error);
        }
    }
}

export const getRecipeDetail = (id) => {
    return async(dispatch) => {
        try {
            const response = await axios.get(`http://localhost:3001/recipes/?name=${id}`);
            const data = response.data;
            dispatch({type: GET_RECIPE_DETAIL, payload: data});
        } catch (error) {
            console.error('RECIPE DONT EXCIST',error);
        }
    }
}

//ACTIONS DIETS--------------------------------------------------------------------------->>

export const getDiets = () =>{
    return async(dispatch) => {
        try {
            const response = await axios.get(`http://localhost:3001/diets`);
            const data = response.data;
            dispatch({type: GET_DIETS, payload: data});
        } catch (error) {
            console.error('DIET DONT EXCIST', error);
        }
    }
}

export const filterDiet  = (diets) =>{
    return async(dispatch) => {
        try {
            dispatch({type:FILTER_DIETS, payload: diets});
        } catch (error) {
            console.error(error);
        }
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
