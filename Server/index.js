const path = require('path');
const express = require('express');
const multer  = require('multer');
const expressStaticGzip = require('express-static-gzip');
const upload = multer({ dest: 'uploads/' });
const axios = require('axios');

const requests = require('../API_Requests/requests.js');
require('dotenv').config();
const s3Helpers = require('../Client/Questions_Answers/s3-helpers.js');

const app = express();
const port = 3000;
const root = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp';

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(express.text());
app.use(expressStaticGzip(path.join(__dirname, '../dist'), {
  enableBrotli: true
}));
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
  axios.defaults.headers.common['Authorization'] = process.env.GIT_TOKEN;
  console.log
  axios.get(`${root}/products/${req.body.productId}`)
  .then((response) => {
    res.send(response.data.name);
  })
  .catch((err) => {
    console.log(`Error getting product data: ${err}`)
  });
})


app.post('/questionHelpful', (req, res) => {
  axios.defaults.headers.common['Authorization'] = process.env.GIT_TOKEN;

  axios.put(`${root}/qa/questions/${req.body.question_id}/helpful`)
  .then((helpfulRes) => {
    res.status(204).end();
  })
  .catch((err) => {
    console.log(`Error sending question helpfulness: ${err}`);
  });
});

app.post('/answerHelpful', (req, res) => {
  axios.defaults.headers.common['Authorization'] = process.env.GIT_TOKEN;

  axios.put(`${root}/qa/answers/${req.body.answer_id}/helpful`)
  .then((helpfulRes) => {
    res.status(204).end();
  })
  .catch((err) => {
    console.log(`Error sending answer helpfulness: ${err}`);
  });
});

app.post('/answerReport', (req, res) => {
  axios.defaults.headers.common['Authorization'] = process.env.GIT_TOKEN;

  axios.put(`${root}/qa/answers/${req.body.answer_id}/report`)
  .then((reportedRes) => {
    res.status(204).end();
  })
  .catch((err) => {
    console.log(`Error reporting answer: ${err}`);
  });
});

app.post('/questionSubmit', (req, res) => {
  axios.defaults.headers.common['Authorization'] = process.env.GIT_TOKEN;

  axios.post(`${root}/qa/questions`, req.body)
  .then((questionCreatedRes) => {
    res.status(201).end();
  })
  .catch((err) => {
    console.log(`Error sending question: ${err}`);
  });
});

app.post('/answerSubmit', (req, res) => {
  axios.defaults.headers.common['Authorization'] = process.env.GIT_TOKEN;

  console.log(req.body);

  axios.post(`${root}/qa/questions/${req.body.question_id}/answers`, req.body.answerContents)
  .then((answerCreatedRes) => {
    res.status(201).end();
  })
  .catch((err) => {
    console.log(`Error sending answer: ${err}`);
  });
});

app.post('/uploadImages', upload.array('images', 5), async function (req, res) {
  const imageURLs = [];
  const keys = [];

  for (var i = 0; i < req.files.length; i++) {
    let result = await s3Helpers.uploadFile(req.files[i])
    imageURLs.push(result.Location);
    keys.push(result.key);

  }

  res.status(201).json({ urls: imageURLs, keys: keys });
});

app.get('/images/:key', (req, res) => {
  let key = req.params.key;

  let stream = s3Helpers.downloadImage(key);

  stream.pipe(res);
});

app.post('/reviews', (req, res) => {
  var productId = req.body.productId;
  console.log('request body:' + req.body);
  console.log('productID:' + productId);
  requests.getAllReviews(productId, (error, response) => {
    if (error) {
      res.sendStatus(500);
      console.log('error getting product reviews' + productId);
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