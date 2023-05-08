const {Recipe, Diets} = require('../db.js')
const {getRecipeId, getApi,recipeDb,} = require('../controllers/RecipeController.js');

const STATUS_OK =200;
const STATUS_CREATED = 201;
const STATUS_ERROR=404;

//get por ID ====> ruta del get ==> /recipes/:idRecipe
async function getRecipeById(req, res){

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
    const {name} =req.query;

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
        // diets?.map(async (e) => {
        //     console.log("::::::::",newRecipe);
        //     let dietDb = await Diets.findOne({where: {name: e}})
        //     await newRecipe.addDiets(dietDb)
        // })

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