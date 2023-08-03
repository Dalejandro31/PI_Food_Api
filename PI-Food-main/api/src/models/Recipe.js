const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
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
