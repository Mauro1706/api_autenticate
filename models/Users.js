const mongoose = require('mongoose');

const Users = new mongoose.Schema({
        name: { type: String, require: true },
        password: { type: String, require: true },
        cpf: { type: String, minlength: 11, require: false },
        data_registro: { type: Date, default: Date.now },
    },
    {
        timestamps: true,
    });

mongoose.model('users', Users);