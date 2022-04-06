const path = require('path');
const express = require('express');
const requests = require('../API_Requests/requests.js');
const TOKEN = require('../Auth.js');
const axios = require('axios');

const app = express();
const port = 3000;

// const HTML_FILE = path.join(DIST_DIR, 'index.html'); // NEW
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(express.text());
app.use(express.static(path.join(__dirname, '../dist')));
app.use(express.static(path.join(__dirname, '../Client')));



app.get('/products', (req, res) => {
  var productId = req.body.data;
  // request.getAll
 res.send('Test');
});

app.get('/questions', (req, res) => {
  axios.defaults.headers.common['Authorization'] = TOKEN.TOKEN;
  var randomIndex = Math.floor(Math.random() * 1011);
  randomIndex += 64620; // for single product, use 64620

  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions/`, {
    params: {
      product_id: randomIndex,
      count: 100
    }
  })
  .then((response) => {
    console.log(response.data);
    const data = response.data;
  }).catch((error) => {
    console.log(`There was an error getting question data: ${error}`);
  })

})




app.listen(port, function () {
 console.log('App listening on port: ' + port);
});