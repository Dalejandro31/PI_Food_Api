const express = require('express');
const recipeRouter = express.Router();
const {getRecipeById,getAllRecipe,postRecipe} = require('../handler/handlerRecipes.js');
const {  getRecipeId } = require('../controllers/RecipeController');

// informacion  de la receta por   ID

recipeRouter.get('/:id',getRecipeById);

// iformacion de todas las Recetas 
recipeRouter.get('/', getAllRecipe)

recipeRouter.get('/?name', getAllRecipe);

// informacion para crear una nueva receta

recipeRouter.post('/', postRecipe);

module.exports= recipeRouter;

