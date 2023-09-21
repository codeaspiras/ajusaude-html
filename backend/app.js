
const express = require('express')
const cors = require('cors');
const searchProtocols = require('./search-protocols');
const app = express();

app.use(cors());

app.get('/:document', (req, res) => {
    searchProtocols(req.params.document).then(
        (result) => res.status(200).send(result)
    ).catch((err) => {
        res.status(500).send({
            error: err,
        });
        console.error(err);
    });
});

app.listen(3000, () => {
    console.log(`Example app listening on port 3000`)
});