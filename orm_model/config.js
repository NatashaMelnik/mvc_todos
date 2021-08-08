const Sequelize = require('sequelize');
const sequelize = new Sequelize('army_bd', 'postgres', 'qazpoi', {
  dialect: 'postgres',
  host: 'localhost'
});

module.exports = sequelize;