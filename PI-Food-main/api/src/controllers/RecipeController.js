const axios = require('axios');
require('dotenv').config();
const { Recipe, Diets } = require('../db');
const { API_KEY } = process.env;

const STATUS_OK= 200;
const STATUS_ERROR=404;
const STATUS_SERVER_ERROR=500;


const urlAPI =`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`; 
const mock = `https://run.mocky.io/v3/4bc7ed61-deb6-4118-b2bb-7b811243f028`;

async function getRecipeId(id){
    
    const sourceId = isNaN(id) ? "db" : "api";

    if(sourceId === "api"){

        const data = await axios.get(
                `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
            )
            .then(response => response.data)
            .then(data =>{
                const dataRecived={
                            id: data.id,
                            name: data.title,
                            summary: data.summary.replace(/<\/?[^>]+(>|$)/g, ""),
                            healthscore: data.healthScore,
                            steps: data.instructions.replace(/<\/?[^>]+(>|$)/g, ""),
                            vegetarian: data.vegetarian,
                            vegan: data.vegan,
                            glutenFree: data.glutenFree,
                            diets: data.diets,  
                        }

                        return dataRecived;
                    })
                    return data;
                }   
            return await Recipe.findByPk(id);    
};


// get informacion de la api 

async function getApi(){
    
        const apiUrl = await axios.get(urlAPI);
        return apiUrl.data.results.map((data)=> {
            return {
                id: data.id,
                name: data.title,
                image: data.image,
                summary: data.summary,
                healthscore: data.healthScore,
                steps: data.instructions,
                vegetarian: data.vegetarian,
                vegan: data.vegan,
                glutenFree: data.glutenFree,
                diets: data.diets,
            }
        });
    
};

//get infoDB

async function recipeDb(){ 
    
    const recipes = await Recipe.findAll({
        attributes: ["id","name","image","summary","healthscore","steps"],
        include: {model: Diets,attributes:["name"]}
    });
        return await recipes.map(recipe => ({
            id:recipe.id,
            name:recipe.name,
            summary: recipe.summary,
            healthScore:recipe.healthscore,
            steps: recipe.steps,
            image: recipe.image,
            diets: recipe.Diets.map(diet => diet.name)
        }));
}

// get todas las recetas api & BD

// async function allRecipes(){

//     const Api = await getApi();
//     const DB = await recipeDb();
//     const all = DB.concat(Api);
//     return all;
    
// }


module.exports = {
    getRecipeId,
    getApi,
    recipeDb,
    //allRecipes
}