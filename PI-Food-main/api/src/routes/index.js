const { Router } = require('express');
require('dotenv').config();
const{APY_KEY} = process.env;
const express = require('express');    
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = express.Router();
const recipeRouter = require('./recipeRouter');
const dietRouter = require('./dietRouter');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/recipes', recipeRouter);
router.use('/diets', dietRouter);



module.exports = router;
