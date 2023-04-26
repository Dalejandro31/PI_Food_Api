const axios = require('axios');
require('dotenv').config();
const{Diets} = require('../db');
const { getApi }= require('./RecipeController');


async function getDietsApi(){
    const recipeByAPI = await getApi();
    const allDietsApi= recipeByAPI.map((diet)=>diet.diets);

    const dietsAll=[];

    allDietsApi.forEach((x)=> x.forEach ((y)=> dietsAll.push(y)));

    return[...new Set(dietsAll)];

};


async function getDietsDB(){    
    const dietAll = await Diets.findAll({
        attributes:["name","id"]
    });

    const dietAllArray=[];

    dietAll.forEach((x)=> dietAllArray.push({name:x.name, id:x.id}));

    return dietAllArray;
};





module.exports={
    getDietsApi,
    getDietsDB
};