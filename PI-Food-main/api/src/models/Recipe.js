const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Recipe', {
      ID:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      image:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      summaryDish:{
        type: DataTypes.TEXT,
        allowNull: false,
      },
      healthscore:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      steps:{
        type: DataTypes.TEXT,
        allowNull: false,
      },
      createInDb:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      }
  },{ timestamps: false }
  );
};
