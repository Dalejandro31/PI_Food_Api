const express = require('express');
const router = express.Router();



// informacion  de la receta por   ID

router.get('/:id',getRecipeById);

// iformacion de todas las Recetas 

router.get('/', getAllRecipe);

// informacion para crear una nueva receta

router.post('/', postRecipe);

