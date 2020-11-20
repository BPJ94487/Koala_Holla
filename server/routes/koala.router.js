const { Router } = require('express');
const express = require('express');
const koalaRouter = express.Router();
const pool = require('../modules/pool');
// DB CONNECTION


// GET
koalaRouter.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "koalas" ORDER BY "name";';
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
koalaRouter.put('/:id', (req, res) => {
    let koala = req.body; // Book with updated content
    // .id is taco, we can change this accordingly 
    let id = req.params.id; // id of the book to update
    let sqlText = '';
    console.log(`Updating koala ${id} with `, koala.transfer);
    // added conditional 
    if (book.status === 'Ready to Transfer') {
        sqlText = `UPDATE koalas SET ready_to_transfer='Y' WHERE id=$1;`
    } else {
        sqlText = `UPDATE koalas SET ready_to_transfer='N' WHERE id=$1;`
    }
    // TODO - REPLACE BELOW WITH YOUR CODE
    pool.query(sqlText, [id])
        .then((result) => {
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log('Error from db:', error);
            res.sendStatus(500); // if you see a status of 500, come look at LOG on server
        })
});


// DELETE 
koalaRouter.delete('/:id', (req, res) => {
    let id = req.params.id;
    let sqlText = `DELETE FROM koalas WHERE id=$1;`;
    pool.query(sqlText, [id])
        .then((result) => {
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log('Error from db:', error);
            res.sendStatus(500);
        })
})






module.exports = koalaRouter;