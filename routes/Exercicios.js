const express = require('express')
const exercicios = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')

process.env.SECRET_KEY = 'secret'

const Exercicio = require('../models/Exercicio')
exercicios.use(cors())

function exercicioRespondido(exercicio, req, res) {
    Exercicio.update({
        respondido: 1
    },
    {
        where: {
            id: exercicio.id
        }
    }).catch(err => {
        console.log(err)
    })
}

exercicios.put('/exercicioRespondido', (req, res) => {
    Exercicio.findOne({
        where: {
            id: req.body.id
        }
    }).then(exercicio => {
        if (exercicio) {
            exercicioRespondido(exercicio, req, res)
        }
    }).catch(e => {
        console.log(e)
    })

})


exercicios.post('/exercicio', (req, res) => {
    Exercicio.findOne({
        where: {
            id: req.body.id
        }
    }).then(exercicio => {
        if (exercicio) {
            let token = jwt.sign(exercicio.dataValues, process.env.SECRET_KEY, {
                expiresIn: 1440
            })
            res.send(token)
        }
    }).catch(e => {
        console.log(e)
    })

})

exercicios.get('/exercicios', (req, res) => {
    Exercicio.findAll().then(exercicios => {
        if (exercicios) {
            return res.json(exercicios)
        }
    })
})


module.exports = exercicios