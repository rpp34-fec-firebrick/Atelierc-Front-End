const path = require('path');
const express = require('express');
const requests = require('../API_Requests/requests.js');

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

app.post('/reviews/meta', (req, res) => {
  var productId = req.body.productId;
  requests.getMetaReviews(productId, (error, response) => {
    if (error) {
      res.sendStatus(500);
    } else {
      console.log('Successful getMetaReviews Data');
      res.send(response);
    }
  })
});

app.post('/relatedProductId', (req, res) => {
  //this is an array of all related product IDs
  var productIds = req.body.productIds;
  //console.log('IDSS', productIds);
  requests.getRelatedProductId(productIds, (error, response) => {
    if (error) {
      res.sendStatus(500);
    } else {
      console.log('Successful getRelatedProductId Data');
      res.send(response);
    }
  })
});


app.post('/relatedProductInfo', (req, res) => {
  //this is an array of all related product IDs
  var productIds = req.body.productIds;
  //console.log('IDSS', productIds);
  requests.getRelatedProductInfo(productIds, (error, response) => {
    if (error) {
      res.sendStatus(500);
    } else {
      console.log('Successful getRelatedProductInfo Data');
      res.send(response);
    }
  })
});

app.post('/relatedProductstyle', (req, res) => {
  //this is an array of all related product IDs
  var productIds = req.body.productIds;
  //console.log('IDSS', productIds);
  requests.getRelatedProductStyle(productIds, (error, response) => {
    if (error) {
      res.sendStatus(500);
    } else {
      console.log('Successful getRelatedProductStyle Data');
      res.send(response);
    }
  })
});







app.listen(port, function () {
 console.log('App listening on port: ' + port);
});