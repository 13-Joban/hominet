const Sequelize = require('sequelize');

const sequelize = new Sequelize('hominet', 'root', 'lOsqwdPP2z', {
  host: '127.0.0.1',
  dialect: 'mysql',
  logging: false, // disable logging
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

module.exports = sequelize;
