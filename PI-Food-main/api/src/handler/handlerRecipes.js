const {Recipe, Diets} = require('../db')
const {getRecipeId, allRecipes} = require('../controllers/RecipeController')

const STATUS_OK =200;
const STATUS_ERROR=404;

//get por ID ====> ruta del get ==> /recipes/:idRecipe
async function getRecipeById(req, res){

    const { id } = req.params; 

    try {
        const getID= await getRecipeById(id);
        res
        .status(STATUS_OK).json(getID)
    } catch (error) {
        res.status(STATUS_ERROR).json({message: error});
    }
}
// get de todas las recetas
async function getAllRecipe(req, res){
    
    try {
        const getAll = await allRecipes();
        if(req.query.hasOwnProperty('name')){
            const { name } = req.query;
            const filterName= getAll.filter((charName)=>
            charName.name.toLowerCase().includes(name.toLowerCase()));

            if(filterName.length > 0){
                res
                .status(STATUS_OK).json(filterName);
            }else{
                res
                .status(STATUS_ERROR).json({message:"Couldn't find the recipe you're searching for"})
            }
        }else{
            res
            .status(STATUS_OK).json(getAll);
        }    
    } catch (error) {
        res.status(STATUS_ERROR).json({message: error});
    }
}

//post para crear recetas 
async function postRecipe(req, res){
    try {
        const {} = req.body;
    } catch (error) {
        res.status(STATUS_ERROR).json({message: error});
    }
}

module.exports={
    getRecipeById,
    getAllRecipe,
    postRecipe
};