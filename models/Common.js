const Sequelize = require('sequelize')

const commonModel = {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    data_cadastro: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }
}

module.exports = {commonModel}