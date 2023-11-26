const sequelize = require("sequelize");

const connection = new sequelize('criapergutas', 'root', 'password', {
    host: "localhost",
    dialect: 'mysql',
})

module.exports = connection