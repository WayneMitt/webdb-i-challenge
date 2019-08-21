const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

server.get('/api/accounts', (req, res) => {
    //SELECT * FROM accounts
    db('accounts')
    .then(accounts => {
        res.json(accounts);
    })
    .catch(error => {
        res.status(500).json({ message: 'failed to get accounts'});
    })
});

server.get('/api/accounts/:id', (req, res) => {
    //SELECT * FROM accounts WHERE id = req.param.id
    const {id} = req.params
    db('accounts').where({id})
    .then(account => {
        if (account) {
            res.json(account);
        } else {
            res.status(404).json('invalid account id')
        }
    })
    .catch(error => {
        res.status(500).json({ message: 'failed to get account'});
    })
});

server.post('/api/accounts', (req, res) => {
    //INSERT INTO accounts ('name','budget') VALUES ('Wayne','1000000')
})

module.exports = server;