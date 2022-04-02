const path = require('path');
const express = require('express');

const app = express();
const port = 3000;

// const HTML_FILE = path.join(DIST_DIR, 'index.html'); // NEW
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(express.text());
app.use(express.static(path.join(__dirname, '../dist')));
app.use(express.static(path.join(__dirname, '../Client')));


app.get('/', (req, res) => {
 res.send('Test');
});






app.listen(port, function () {
 console.log('App listening on port: ' + port);
});