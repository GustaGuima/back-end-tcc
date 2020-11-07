const Sequelize = require('sequelize')
const db = require('../database/db')
const { commonModel } = require('../models/Common')

module.exports = db.sequelize.define(
    'alunos',
    {
        ...commonModel,
        nivel: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 1
        },
        experiencia: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        questoes_respondidas: {
            type: Sequelize.BIGINT,
            allowNull: false,
            defaultValue: 0
        },
        tentativas: {
            type: Sequelize.BIGINT,
            allowNull: false,
            defaultValue: 0
        },
        pontuacao: {
            type: Sequelize.BIGINT,
            allowNull: false,
            defaultValue: 0
        }
    },
    {
        timestamps: false
    }
)