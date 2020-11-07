const Sequelize = require('sequelize')
const db = {}
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres'
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db