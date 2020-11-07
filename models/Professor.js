const Sequelize = require('sequelize')
const db = require('../database/db')
const { commonModel } = require('../models/Common')

module.exports = db.sequelize.define(
    'professores',
    {
        ...commonModel
    },
    {
        timestamps: false
    }
)