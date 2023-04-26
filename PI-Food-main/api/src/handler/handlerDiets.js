const {Diets} = require('../db');
const {getDietsApi, getDietsDB} = require('../controllers/DietController');

const STATUS_OK =200;
const STATUS_CREATED = 201;
const STATUS_ERROR=404;

async function getDietByApi(req, res){
    
}