const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const authMiddleware = require('./auth');

const router = express.Router();

require('../models/Users');
const Users = mongoose.model('users');

mongoose.connect('mongodb://localhost/autenticate', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(() => {
  console.log("Conexão com MongoDB realizada com sucesso!");
}).catch((erro) => {
  console.log("Conexão com MongoDB falhou!");
});

router.post('/authenticate', (req, res) => {
  const user = {
    id: 1,
    name: 'Mateus Silva',
    company: 'DevAcademy',
    website: 'https://devacademy.com.br',
  };

  return res.json({
    user,
    token: jwt.sign(user, 'PRIVATEKEY'),
  });
});

router.post("/create", (req, res) => {
  const users = Users.create(req.body, (err) => {
    if (err) return res.status(400).json({
      error: true,
      message: "Erro: Usuário não foi cadastrada no banco de dados."
    });

    return res.status(200).json({
      error: false,
      message: "Usuário cadastrado com sucesso!"
    });
  });
});

/**
 * Private route
 */
//router.use(authMiddleware);

router.get("/users", (req, res) => {
  Users.find({}).then((users) => {
    return res.json(users);
  }).catch((err) => {
    return res.status(400).json({
      error: true,
      message: "Nenhum usuário encontrado!"
    });
  });
});

router.delete("/delete/:id",  (req, res) => {
  const users = Users.deleteOne({ _id: req.params.id }, (err) => {
    if (err) return res.status(400).json({
      error: true,
      message: "Erro: Usuário não foi excluido do banco de dados."
    });

    return res.status(200).json({
      error: false,
      message: "Usuário excluido com sucesso!"
    });
  });
});

module.exports = router;
