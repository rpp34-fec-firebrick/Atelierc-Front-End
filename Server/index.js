const path = require('path');
const express = require('express');
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });
const axios = require('axios');

const requests = require('../API_Requests/requests.js');
const AUTH = require('../Auth.js');
const s3Helpers = require('../Client/Questions_Answers/s3-helpers.js');

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

app.post('/productsForQuestions', (req, res) => {
  axios.defaults.headers.common['Authorization'] = AUTH.TOKEN;

  console.log(req.body);

  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${req.body.productId}`)
  .then((response) => {
    res.send(response.data.name);
  })
  .catch((err) => {
    console.log(`Error getting product data: ${err}`)
  })
})

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
});

app.post('/questionSubmit', (req, res) => {
  console.log('Wow, question much recorded', req.body);
  res.status(201).end();

  // POST to /qa/questions
});

app.post('/answerSubmit', (req, res) => {
  console.log('Wow, answer much recorded', req.body);
  res.status(201).end();

  // POST to /qa/questions/question_id/answers
});

app.post('/uploadImages', upload.array('images', 5), async function (req, res) {
  const locations = [];

  for (var i = 0; i < req.files.length; i++) {
    let result = await s3Helpers.uploadFile(req.files[i])
    locations.push(result.Location);
  }
  console.log(locations);
  res.status(201).json(locations);
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