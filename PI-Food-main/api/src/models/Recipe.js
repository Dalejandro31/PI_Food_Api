const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Recipe', {
      id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      image:{
        type: DataTypes.TEXT,
        allowNull: false,
      },
      summary:{
        type: DataTypes.TEXT,
        allowNull: false,
      },
      healthscore:{
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      steps:{
        type: DataTypes.TEXT,
        allowNull: false,
      }
  },{ timestamps: false }
  );
};
