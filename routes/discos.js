const express = require('express');
const router = express.Router();
const fs = require('fs');

const discos = fs.readFileSync('assets/discos.json', 'utf-8');

router.get('/', (req, res) => {
    if(discos) res.send(discos);
    else res.status(404).send('the server found no discos file');
});

module.exports = router;
