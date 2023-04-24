const axios = require('axios');
require('dotenv').config();
const { Recipe, Diets } = require('../db');
const { API_KEY } = process.env;

const STATUS_OK= 200;
const STATUS_ERROR=404;
const STATUS_SERVER_ERROR=500;


// const url =`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`; 
const mock = `https://run.mocky.io/v3/aeee69f0-6f4d-40b3-8000-469155e3b5fd`;

async function getRecipeId(req,res){
    const {id} = req.params;
    const sourceId = isNaN(id) ? "db" : "api";

    if(sourceId === "api"){

        try {

            await axios.get(
                `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
            )
                .then(({data})=>{
                    if(data){   
                        const charRecipe={
                            id: data.id,
                            name: data.name,
                            summary: data.summary,
                            healthscore: data.healthscore,
                            steps: data.instructions,
                            vegetarian: data.vegetarian,
                            vegan: data.vegan,
                            glutenFree: data.glutenFree,
                            diets: data.diets,  
                        };
                        res
                        .writeHead(STATUS_OK, {"Content-type": "application/json"})
                        .end(JSON.stringify(charRecipe));
                    }else{
                        res
                            .writeHead(STATUS_ERROR, {"Content-Type": "text/plain"})
                            .end("not found")
                    }    
                });
            } catch (error) {
                res
                .writeHead(STATUS_SERVER_ERROR, {"Content-Type": "text/plain"})
                .end(error.message)
        }        
    }else{
        try {
            const recipe = await Recipe.findByPk(id);
            if(recipe === null){
                res.status(STATUS_ERROR).json({message: "Recipe not found in  database"});
            }else{
                res.json(recipe);
            }
        } catch (error) {
            res.status(STATUS_SERVER_ERROR).json({message:`Error retrieving recipe from database ${error}`});
        }
    }
};


// get informacion de la api 

async function getApi(req,res){
    try {
        const apiUrl = await axios.get(mock);
        const apiInfo = apiUrl.data.results?.map((data)=> {
            return {
                id: data.id,
                name: data.title,
                image: data.image,
                summary: data.summary,
                healthscore: data.healthscore,
                steps: data.instructions,
                vegetarian: data.vegetarian,
                vegan: data.vegan,
                glutenFree: data.glutenFree,
                diets: data.diets,
            }
        });
        res
        .status(STATUS_OK).json(apiInfo);
    } catch (error) {
        res
        .status(STATUS_SERVER_ERROR).json({message: error});
    }
};

//get infoDB

async function recipeDb(res,req){
    try {
        const recipe= await Recipe.findAll({
            include: {
                model: Diets,
                attributes: ['name'],

            }
        });
        const recipeDb = recipe.map((rec) =>{
            return{
                name: rec.name,
                image: rec.image,
                summary: rec.summary,
                healthscore: rec.healthscore,
                steps: rec.steps,
                diets: rec.diets.map( diet => diet.name),
            }
        });
        res
        .status(STATUS_OK).json(recipeDb);
    } catch (error) {
        res
        .status(STATUS_SERVER_ERROR).json({message: error});
    }
}

// get todas las recetas api & BD

async function allRecipes(req,res){
    try {
        const Api = await getApi();
        const DB = await recipeDb();
        const all = DB.concat(Api);
        
        res
        .status(STATUS_OK).json(all);
    } catch (error) {
        res
        .status(STATUS_ERROR).json({message: error});
    }
}


module.exports = {
    getRecipeId,
    getApi,
    recipeDb,
    allRecipes
}