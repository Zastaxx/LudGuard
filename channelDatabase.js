const { Sequelize, DataTypes } = require("sequelize");
const path = require("path");

const databasePath = path.join(__dirname, "channelDatabase.sqlite");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: databasePath,
  logging: false,
});

const Channel = sequelize.define(
  "Channel",
  {
    modChannelId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "Channel",
  }
);

const initializeDatabase = async () => {
  try {
    await sequelize.sync();
    console.log("Base de données des canaux synchronisée.");
  } catch (error) {
    console.error(
      "Erreur lors de la synchronisation de la base de données des canaux :",
      error
    );
  }
};

module.exports = { Channel, initializeDatabase };
