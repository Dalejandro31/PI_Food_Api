const{Diets} = require('../db');
const { getApi }= require('./RecipeController');


async function getDietsApi(){
    const dietsAll=[];
    //realizo un mapeo de las recetas para traer todas las dietas
    const recipeByAPI = await getApi();
    const allDietsApi= recipeByAPI.map((diet)=>diet.diets);

    
    //el foreach  anidado recorre todas las dietas y las agrega al array
    allDietsApi.forEach((x)=> x.forEach((y)=> dietsAll.push(y)));
    //el operador new set evita que tnga duplicados dentro de mi array resultante   
    return[...new Set(dietsAll)];

};

///////////////////////////////////////////////////////////////////////////////////////s

async function getDietsDB(){    
    //obtengo las dietas obtenidas en la funcion anterior
    const infoApi= await getDietsApi();
    //recorro todas las dietas, utilizo el metodo findOrCreate para buscar o crear los registros en mi base de datos 
    infoApi.forEach((info)=>{
        Diets.findOrCreate({
            where: {name : info}
        }); 
    }); 

    //obtengo todas las dietas en mi base de datos y retorno el resultado
    const getAll= await Diets.findAll();
    
    return getAll;
    //console.log(getAll)   
};







module.exports={
    getDietsApi,
    getDietsDB,
    
};