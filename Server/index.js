const path = require('path');
const express = require('express');
const requests = require('../API_Requests/requests.js');

const axios = require('axios');

const app = express();
const port = 3000;

// const HTML_FILE = path.join(DIST_DIR, 'index.html'); // NEW
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(express.text());
app.use(express.static(path.join(__dirname, '../dist')));
app.use(express.static(path.join(__dirname, '../Client')));



app.post('/products', (req, res) => {
  var productId = req.body.productId;
  requests.getAllProducts(productId, (error, response) => {
    if (error) {
      res.sendStatus(500);
    } else {
      console.log('Successful getAllProducts Data')
      res.send(response);
    }
  })
});

app.post('/questions', (req, res) => {
  var productId = req.body.productId;
  requests.getAllQuestions(productId, (error, response) => {
    if (error) {
      res.sendStatus(500);
    } else {
      console.log('Successful getAllQuestions Data')
      res.send(response);
    }
  })
});

app.post('/questionHelpful', (req, res) => {
  console.log('Wow, such helpful question', req.body);
  res.status(201).end();

  // POST to /qa/questions/question_id/helpful
});

app.post('/answerHelpful', (req, res) => {
  console.log('Wow, such helpful answer', req.body);
  res.status(201).end();

  // POST to /qa/answers/answer_id/helpful
});

app.post('/answerReport', (req, res) => {
  console.log('Wow, much reported', req.body);
  res.status(201).end();

  // POST to /qa/answers/answer_id/report
})

app.post('/reviews', (req, res) => {
  var productId = req.body.productId;
  requests.getAllReviews(productId, (error, response) => {
    if (error) {
      res.sendStatus(500);
    } else {
      console.log('Successful getAllReviews Data')
      res.send(response);
    }
  })
});











app.listen(port, function () {
 console.log('App listening on port: ' + port);
});