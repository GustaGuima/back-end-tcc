const Sequelize = require('sequelize')
const db = require('../database/db')
const { commonModel } = require('../models/Common')

module.exports = db.sequelize.define(
    'aluno_exercicios',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        aluno_id: {
            type: Sequelize.INTEGER,
            references: 'alunos',
            referencesKey: 'id',
            allowNull: false
        },
        exercicio_id: {
            type: Sequelize.INTEGER,
            references: 'exercicios',
            referencesKey: 'id',
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