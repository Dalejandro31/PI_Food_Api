const axios = require('axios');
require('dotenv').config();
const { Recipe, Diets } = require('../db');
const { API_KEY } = process.env;

const STATUS_OK= 200;
const STATUS_ERROR=404;
const STATUS_SERVER_ERROR=500;


const urlAPI =`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`; 

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
                            image: data.image,
                            summary: data.summary.replace(/<\/?[^>]+(>|$)/g, ""),
                            healthscore: data.healthScore,
                            steps: data.instructions.replace(/<\/?[^>]+(>|$)/g, ""),
                            vegetarian: data.vegetarian,
                            vegan: data.vegan,
                            glutenFree: data.glutenFree,
                            diets: data.diets || data.Diets.map(diet=>diet.name)
                        }
                        return dataRecived;
                    })
                    return data;
                }   
                const recipe = await Recipe.findByPk(id, {
                    include: Diets, // Include the Diets model to fetch associated diets
                  });
                
                  if (!recipe) {
                    // Handle if the recipe is not found
                    throw new Error("Recipe not found");
                  }
                
                  // Convert the Sequelize object to a plain object for JSON serialization
                  const recipeData = recipe.toJSON();
                
                  // Extract diets from the recipe data
                  const diets = recipeData?.Diets?.map((diet) => diet.name) || [];
                
                  // Return the recipe data with the associated diets
                  return {
                    id: recipeData.id,
                    name: recipeData.name,
                    image: recipeData.image,
                    summary: recipeData.summary,
                    healthscore: recipeData.healthscore,
                    steps: recipeData.steps,
                    diets: diets,
                  };  
};  


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
            healthscore:recipe.healthscore,
            steps: recipe.steps,
            image: recipe.image,
            diets: recipe.Diets.map(diet => diet.name)
        }));
}



module.exports = {
    getRecipeId,
    getApi,
    recipeDb,
}