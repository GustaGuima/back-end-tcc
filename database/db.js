const Sequelize = require('sequelize')
const db = {}

const sequelize = new Sequelize('logicafacil', 'logicafacil', 'logicafacil123', {
    host: 'mariadb-8257-0.cloudclusters.net',
    port: '8257',
    dialect: 'mysql',
    operatorAliases: false,
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db