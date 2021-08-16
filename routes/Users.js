const express = require('express')
const users = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const Aluno = require('../models/Aluno')
const Exercicio = require('../models/Exercicio')
const Professor = require('../models/Professor')
users.use(cors())

process.env.SECRET_KEY = 'secret'

function cadastrarProfessor(userData, req, res) {
    Professor.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(professor => {
            if (!professor) {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    userData.password = hash
                    Professor.create(userData)
                        .then(professor => {
                            res.json({ status: professor.email + ' Registrado' })
                        })
                        .catch(err => {
                            res.send('error: ' + err)
                        })
                })
            } else {
                res.send({ error: 'Professor Existente' })
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
}

function cadastrarAluno(userData, req, res) {
    Aluno.findOne({
        where: {
            email: req.body.email
        }
    }).then(aluno => {
            if (!aluno) {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    userData.password = hash
                    Aluno.create(userData)
                        .then(aluno => {
                            res.json({ status: aluno.email + ' Registrado' })
                        })
                        .catch(err => {
                            res.send('error: ' + err)
                    })
                })
            } else {
                res.send({ error: 'Aluno Existente' })
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
}

function adicionarExperiencia(userData, req, res) {
    Aluno.update({
        experiencia: userData.experiencia,
        questoes_respondidas: userData.questoes_respondidas += 1,
        tentativas: userData.tentativas += 1,
        pontuacao: userData.pontuacao += req.body.pontuacao
    },
    {
        where: {
            email: req.body.email
        }
    }
    ).then(aluno => {
        
    }).catch(err => {
        console.log(err)
    })
}

function subirNivel(userData, req, res) {
    Aluno.update({
        experiencia: 0,
        nivel: userData.nivel += 1,
        questoes_respondidas: userData.questoes_respondidas += 1,
        tentativas: userData.tentativas += 1,
        pontuacao: userData.pontuacao += req.body.pontuacao
    },
    {
        where: {
            email: req.body.email
        }
    }
    ).then(aluno => {
        
    }).catch(err => {
        console.log(err)
    })
}

function questaoIncorreta(userData, req, res){
    Aluno.update({
        tentativas: userData.tentativas += 1
    },
    {
        where: {
            email: req.body.email
        }
    }
    ).then(aluno => {
        
    }).catch(err => {
        console.log(err)
    })
}

function logar(req, res, usuario) {
    if (bcrypt.compareSync(req.body.password, usuario.password)) {
        let token = jwt.sign(usuario.dataValues, process.env.SECRET_KEY, {
            expiresIn: 1440
        })
        res.send(token)
    }
}

users.post('/register', (req, res) => {
    const today = new Date()

    const userData = {
        nome: req.body.nome,
        email: req.body.email,
        password: req.body.password,
        professor: req.body.professor,
        created: today
    }
    if (userData.professor == "true") {
        cadastrarProfessor(userData, req, res)
    } else {
        cadastrarAluno(userData, req, res)
    }
})

users.post('/login', (req, res) => {
    Aluno.findOne({
        where: {
            email: req.body.email
        }
    }).then(aluno => {
        if (aluno) {
            logar(req, res, aluno)
        } else {
            Professor.findOne({
                where: {
                    email: req.body.email
                }
            }).then(professor => {
                if (professor) {
                    logar(req, res, professor)
                } else {
                    res.status(400).json({error: "Usuario Inexistente"});
                }
            }).catch(err => {
                res.status(400).json({ error: err })
            })
        }
    }).catch(err => {
        res.status(400).json({ error: err })
    })
})

users.put('/experiencia', (req, res) => {
    Aluno.findOne({
        where: {
            email: req.body.email
        }
    }).then(aluno => {
        if (aluno) {
            if((aluno.experiencia += req.body.experiencia) >= 100){
                subirNivel(aluno, req, res)
            }else {
                adicionarExperiencia(aluno, req, res)   
            }
        }
    })
})

users.put('/experiencia/tentativas', (req, res) => {
    Aluno.findOne({
        where: {
            email: req.body.email
        }
    }).then(aluno => {
        if (aluno) {
            questaoIncorreta(aluno, req, res)
        }
    })
})

users.get('/alunos/ranking', (req, res) => {
    Aluno.findAll({
        order: [
            ['pontuacao', 'DESC']
        ]
    }).then(alunos => {
        if (alunos) {
            return res.json(alunos)
        }
    })
})

users.post('/encontrarUsuario', (req, res) => {
    console.log(req.body.email)
    Aluno.findOne({
        where: {
            email: req.body.email
        }
    }).then(aluno => {
        console.log(aluno)
        if (aluno) {
           return res.json(aluno)
        } else {
            Professor.findOne({
                where: {
                    email: req.body.email
                }
            }).then(professor => {
                if (professor) {
                    return res.json(professor)
                }
            }).catch(err => {
                res.status(400).json({ error: err })
            })
        }
    }).catch(err => {
        res.status(400).json({ error: err })
    })
})

module.exports = users