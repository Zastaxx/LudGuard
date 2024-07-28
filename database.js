const { Sequelize, DataTypes } = require("sequelize");
const path = require("path");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.join(__dirname, "database.sqlite"),
  logging: false,
});

const Surveillance = sequelize.define(
  "Surveillance",
  {
    userId: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

const initializeDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connexion à la base de données réussie.");

    await sequelize.sync();
    console.log("Tables synchronisées avec succès.");
  } catch (error) {
    console.error("Erreur lors de la connexion à la base de données :", error);
  }
};

module.exports = { sequelize, Surveillance, initializeDatabase };
