const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const fs = require('fs');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/content/:experiment', (req, res) => {
    let filePath = `${__dirname}/static/${req.params.experiment}.html`;

    let redirect = request.post('http://localhost:5000/modify_base_template', function (err, resp, body) {
        if (err) {
            console.log(err);
            res.sendFile(filePath);
        } else {
            res.send(body);
        }
    });
    let form = redirect.form();
    form.append('file', fs.createReadStream(filePath));
});

app.get('/', (req, res) => {
   console.log('OK');
   res.send('OK');
});

app.get("/sections/:experiment", (req, res) => {
    //console.log('ok');
    let filePath = `${__dirname}/static/sections/${req.params.experiment}.html`;
    console.log(filePath);
    //res.send('ok');
    res.sendFile(filePath);
});

app.listen(9050, () => {
    console.log('Content server is running on port 9050');
});