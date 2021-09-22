const express = require("express");
const exercicios = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");

process.env.SECRET_KEY = "secret";

const Exercicio = require("../models/Exercicio");
const AlunoExercicio = require("../models/AlunoExercicio");
exercicios.use(cors());

function cadastrarExercicio(userData, req, res) {
  Exercicio.findOne({
    where: {
      titulo: req.body.titulo,
    },
  })
    .then((exercicio) => {
      if (!exercicio) {
        Exercicio.create(userData)
          .then((exercicio) => {
            res.json({ status: exercicio.titulo + " Registrado" });
          })
          .catch((err) => {
            res.send("error: " + err);
          });
      } else {
        res.send({ error: "Exercício Existente" });
      }
    })
    .catch((err) => {
      res.send("error: " + err);
    });
}

function exercicioRespondido(exercicioAlunoData, req, res) {
  AlunoExercicio.findOne({
    where: {
      aluno_id: req.body.aluno_id,
      exercicio_id: req.body.exercicio_id,
    },
  })
    .then((alunoExercicio) => {
      if (!alunoExercicio) {
        AlunoExercicio.create(exercicioAlunoData)
        .then((exercicioAlunoData) => {
            res.json({ status: "Exercicio Respondido" });
          }).catch((err) => {
            res.send("error: " + err)
          });
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

exercicios.post("/exercicioRespondido", (req, res) => {
  const alunoExercicioData = {
    aluno_id: req.body.aluno_id,
    exercicio_id: req.body.exercicio_id,
    respondido: req.body.respondido,
  };
  exercicioRespondido(alunoExercicioData, req, res);
});

exercicios.post("/exercicio", (req, res) => {
  Exercicio.findOne({
    where: {
      id: req.body.id,
    },
  })
    .then((exercicio) => {
      if (exercicio) {
        let token = jwt.sign(exercicio.dataValues, process.env.SECRET_KEY, {
          expiresIn: 1440,
        });
        res.send(token);
      }
    })
    .catch((e) => {
      console.log(e);
    });
});

exercicios.get("/exercicios", (req, res) => {
  Exercicio.findAll().then((exercicios) => {
    if (exercicios) {
      return res.json(exercicios);
    }
  });
});

exercicios.post("/verificarExercicios", (req, res) => {
    AlunoExercicio.findAll({
        where: {
            aluno_id: req.body.aluno_id
        }
    }).then((alunoExercicios) => {
      if (alunoExercicios) {
        return res.json(alunoExercicios);
      }
    }).catch((err) => {
        return res.json(err)
    });
  });

exercicios.post("/createExercicio", (req, res) => {
  const userData = {
    titulo: req.body.titulo,
    nivel: req.body.nivel,
    enunciado: req.body.enunciado,
    resposta: req.body.resposta,
    resposta_incorreta1: req.body.resposta_incorreta1,
    resposta_incorreta2: req.body.resposta_incorreta2,
    resposta_incorreta3: req.body.resposta_incorreta3,
    experiencia_fornecida: req.body.experiencia_fornecida,
    pontuacao_fornecida: req.body.pontuacao_fornecida,
    respondido: 0,
  };
  cadastrarExercicio(userData, req, res);
});

module.exports = exercicios;
