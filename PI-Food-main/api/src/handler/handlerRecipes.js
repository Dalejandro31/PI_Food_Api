const {Recipe, Diets} = require('../db.js')
const {getRecipeId, getApi,recipeDb,} = require('../controllers/RecipeController.js');

const STATUS_OK =200;
const STATUS_CREATED = 201;
const STATUS_ERROR=404;

//get por ID ====> ruta del get ==> /recipes/:idRecipe
async function getRecipeById(req, res){
    //obtengo por parametros el id de la receta, esta funcion se encargara de buscar por el id 
    const { id } = req.params; 
    
    try {
        const getId= await getRecipeId(id)
        res.status(STATUS_OK).json(getId)
    } catch (error) {
        res.status(STATUS_ERROR).json({message:"este es el  error"});
    }
}
// get de todas las recetas
async function getAllRecipe(req, res){
    //por medio de la consulta query obtenemos el parametro del nombre de la receta
    const {name} =req.query;
    // se hace uso de las funciones get api y recipedb y  se hace uso de promise.all para que se ejecuten en paralelo y ambas se resuelvan
    const [api, db] = await Promise.all([getApi(),recipeDb()]);

    const allRecipes = [...api, ...db];
    
    if(name){
        try {
            let filterRecipe= allRecipes.filter((x)=>
            x.name.toLowerCase().includes(name.toLowerCase()));

            filterRecipe.length
                ? res
                .status(STATUS_OK).json(filterRecipe)
                : res
                .status(STATUS_ERROR).json({message:"Recipe don't excist"});
        } catch (error) {
            return res.status(STATUS_ERROR).json({message:error});
            
        }
    }else{
        try {
            res.json(allRecipes);    
        } catch (error) {
            res.status(STATUS_ERROR).json({message:"errorDB"})
        }
        
        
    }
    
}

//post para crear recetas 
async function postRecipe(req, res){
    const {name, image, summary, healthscore, steps,diets} = req.body;
    try {
        if(!name || !image){
            return res
            .status(STATUS_ERROR)
            .json({message: "The require information is missing"});
        }

        const newRecipe =await Recipe.create({
            name,
            summary,
            healthscore,
            steps,
            image
        }); 

        if(diets){
            console.log("***********::",newRecipe);
            let diet= await Diets.findAll({where:{name:diets}});
            await newRecipe.addDiets(diet);
        }
        
        res.status(STATUS_CREATED).json(newRecipe);   
    } catch (error) {
        res.status(STATUS_ERROR).json({message: error});
    }
}

module.exports={
    getRecipeById,
    getAllRecipe,
    postRecipe 
};