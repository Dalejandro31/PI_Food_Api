const express = require('express');
const dietRouters = express.Router();
const {getDietByApi} = require('../handler/handlerDiets');

dietRouters.get('/',getDietByApi);


module.exports= dietRouters;