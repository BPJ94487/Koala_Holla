const { Router } = require('express');
const express = require('express');
const koalaRouter = express.Router();
const pool = require('../modules/pool');
// DB CONNECTION


// GET
koalaRouter.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "koalas";';
    pool.query(queryText).then(result => {
            res.send(result.rows);
        })
        .catch(error => {
            console.log('error getting books', error);
            res.sendStatus(500);
        });
});

// POST
koalaRouter.post('/', (req, res) => {
    console.log(req.body);
    let koalaToAdd = req.body;
    let queryText = `
    INSERT INTO "koalas" ("name", "gender", "age", "ready_to_transfer", "notes")
    VALUES ($1, $2, $3, $4, $5);
    `;
    pool.query(queryText, [koalaToAdd.name, koalaToAdd.gender, koalaToAdd.age, koalaToAdd.ready_to_transfer, koalaToAdd.notes])
        .then((result) => {
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log(error);
            res.sendStatus(500);
        });

});


// PUT



// DELETE

module.exports = koalaRouter;