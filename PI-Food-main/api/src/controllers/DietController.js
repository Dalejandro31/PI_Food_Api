const{Diets} = require('../db');
const { getApi }= require('./RecipeController');


async function getDietsApi(){
    const dietsAll=[];
    
    const recipeByAPI = await getApi();
    const allDietsApi= recipeByAPI.map((diet)=>diet.diets);

    

    allDietsApi.forEach((x)=> x.forEach((y)=> dietsAll.push(y)));

    return[...new Set(dietsAll)];

};

///////////////////////////////////////////////////////////////////////////////////////s

async function getDietsDB(){    
    const infoApi= await getDietsApi();

    infoApi.forEach((info)=>{
        Diets.findOrCreate({
            where: {name : info}
        }); 
    }); 

    const getAll= await Diets.findAll();
    
    return getAll;
    //console.log(getAll)
};







module.exports={
    getDietsApi,
    getDietsDB,
    
};