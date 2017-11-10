const Sequelize = require("sequelize");
const db = require("../db");

const Property = db.define("property", {
  PDFlink: {
    type: Sequelize.STRING,
    allowNull: false
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false
  },
  formattedAddress: {
    type: Sequelize.DataTypes.ARRAY(Sequelize.DataTypes.JSON()),
    allowNull: false
  },
  auctionDate: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  time: {
    type: Sequelize.DATE,
    allowNull: false
  },
  room: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

module.exports = Property;
