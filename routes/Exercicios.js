const express = require('express')
const exercicios = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')

process.env.SECRET_KEY = 'secret'

const Exercicio = require('../models/Exercicio')
exercicios.use(cors())

exercicios.post('/exercicio', (req, res) => {
    Exercicio.findOne({
        where: {
            id: req.body.id
        }
    }).then(exercicio => {
        if (exercicio) {
            console.log(exercicio.resposta_incorreta1)
            let token = jwt.sign(exercicio.dataValues, process.env.SECRET_KEY, {
                expiresIn: 1440
            })
            res.send(token)
        }
        console.log(exercicio)
    }).catch(e => {
        console.log(e)
    })

})


module.exports = exercicios