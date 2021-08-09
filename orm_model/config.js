const Sequelize = require('sequelize');
const sequelize = new Sequelize('birthdays', 'postgres', 'qazpoi', {
  dialect: 'postgres',
  host: 'localhost',
  define: {
    timestamps: false
  }
});

module.exports = sequelize;