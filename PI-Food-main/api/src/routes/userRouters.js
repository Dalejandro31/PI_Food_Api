const express = require('express');
const userRouter = express.Router();
const {PostUsers, GetUsers} = require('../handler/handlerUsers');
const {loginUsuarios} = require('../handler/handlerlogin');

userRouter.get('/', GetUsers);
userRouter.post('/', PostUsers);
userRouter.post('/login',loginUsuarios)

module.exports= userRouter;

