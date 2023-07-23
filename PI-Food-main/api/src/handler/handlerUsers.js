const {Users} = require("../db")

const STATUS_OK =200;
const STATUS_CREATED = 201;
const STATUS_ERROR=404;


async function PostUsers(req, res){
    const {name, email, contraseña} = req.body

    try {
        if(!name || !email || !contraseña){
            return res
            .status(STATUS_ERROR)
            .json({message: "The require information is missing"});
        }

        const newUser =await Users.create({
            name,
            email,
            contraseña
        }); 

        res.status(STATUS_CREATED).json(newUser);

    } catch (error) {
        res.status(STATUS_ERROR).json({message: error});
    }
};

async function GetUsers(req, res){
    try {
        const allUsuarios = await Users.findAll();
        if (!allUsuarios.length)
          res.status(STATUS_ERROR).json({ message: "no hay Usuarios en la BD" });
        else res.status(STATUS_OK).json(allUsuarios);
      } catch (error) {
        res.status(STATUS_ERROR).json({ message: "error al obtener Usuarios" });
      }
};


module.exports ={
    PostUsers,
    GetUsers,
}