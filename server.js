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
    const accountData = req.body;
    db('accounts').insert(accountData)
    .then(account => {
        res.status(201).json(account)
    })
    .catch(error => {
        res.status(500).json({ message: 'failed to add account'});
    })
})

server.put('/api/accounts/:id', (req, res) => {
    //UPDATE accounts SET req.body.key = req.body.value WHERE id = req.param.id
    const {id} = req.params
    const changes = req.body
    db('accounts').where({id}).update(changes)
    .then(count => {
        if (count) {
            res.json({ updated: count })
        } else {
            res.status(404).json({ message: 'invalid account id'})
        }
    })
    .catch(error => {
        res.status(500).json({ message: 'failed to change account'});
    })
})

server.delete('/api/accounts/:id', (req, res) => {
    const {id} = req.params
    db('accounts').where({id}).del()
    .then(deleted => {
        if (deleted) {
            res.status(200).json(deleted)
        } else {
            res.status(404).json({ message: 'invalid account id'})
        }
    })
    .catch(error => {
        res.status(500).json({ message: 'failed to delete account'});
    })
})

module.exports = server;