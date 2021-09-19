const Sequelize = require('sequelize')
const db = {}

const sequelize = new Sequelize('logicafacil', 'logica-tcc', 'logicafacil123', {
    host: 'mariadb-35657-0.cloudclusters.net',
    port: '35657',
    dialect: 'mysql',
    operatorAliases: false,
}) 

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db