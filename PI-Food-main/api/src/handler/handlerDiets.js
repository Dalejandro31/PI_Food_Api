const {Diets} = require('../db');
const { getDietsDB } = require('../controllers/DietController');

const STATUS_OK =200;
const STATUS_CREATED = 201;
const STATUS_ERROR=404;

async function getDietByApi(req, res){
    try {
        const getDiet = await getDietsDB();
        res
        .status(STATUS_OK).json(getDiet);
    } catch (error) {
        res
        .status(STATUS_ERROR).json({message:error});    
    }
}


module.exports= {
    getDietByApi
}
    