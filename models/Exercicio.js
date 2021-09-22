const Sequelize = require('sequelize')
const db = require('../database/db')

module.exports = db.sequelize.define(
    'exercicios',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        titulo: {
            type: Sequelize.STRING,
            allowNull: false
        },
        nivel: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        enunciado: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        resposta: {
            type: Sequelize.STRING,
            allowNull: false
        },
        resposta_incorreta1: {
            type: Sequelize.STRING,
            allowNull: false
        },
        resposta_incorreta2: {
            type: Sequelize.STRING,
            allowNull: false
        },
        resposta_incorreta3: {
            type: Sequelize.STRING,
            allowNull: false
        },
        experiencia_fornecida: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        pontuacao_fornecida: {
            type: Sequelize.BIGINT,
            allowNull: false
        },
        respondido: {
            type: Sequelize.TINYINT,
            allowNull: false
        }
    },
    {
        timestamps: false
    }
)