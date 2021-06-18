const mongoose = require('mongoose');

const Users = new mongoose.Schema({
    name: { type: String, require: true },
    password: { type: String, require: true },
    cpf: { type: String, require: false },
    isFaceta: { type: Boolean, required: true, default: 0 },
    data: { type: Date, default: Date.now },
},
{
    timestamps: true,
});

mongoose.model('users', Users);