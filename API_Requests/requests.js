const axios = require('axios').default;
const AUTH = require('../Auth.js');

var getAllProducts  = (productId, callback) => {
  axios.defaults.headers.common['Authorization'] = AUTH.TOKEN;

  var count = 0;
  var dataSummary = [];
  var endPointsArray = [`/${productId}`, `/${productId}/styles`, `/${productId}/related`];

  for (var i = 0; i < endPointsArray.length; i++) {
    var url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products${endPointsArray[i]}`;
    axios.get(url, {
      params: {
        page: productId,
        count: 10
      }
    })
    .then((response) => {
      dataSummary.push(response.data);
      count++;
      if (count === endPointsArray.length) {
        callback(null, dataSummary)
      }
    }).catch((error) => {
      callback(error, null)
    })
  }
}

var getAllQuestions  = (productId, callback) => {
  axios.defaults.headers.common['Authorization'] = AUTH.TOKEN;

  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions/`, {
    params: {
      product_id: productId,
      count: 100
    }
  })
  .then((response) => {
    const data = response.data;
    callback(null, data);
  }).catch((error) => {
    console.log(`There was an error getting question data: ${error}`);
    callback(error, null)
  })
}


var getAllReviews  = (productId, callback) => {
  axios.defaults.headers.common['Authorization'] = AUTH.TOKEN;

  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/`, {
    params: {
      product_id: productId,
      count: 15,
      page: 1,
      sort: 'relevant'
    }
  })
  .then((response) => {
    const data = response.data;
    callback(null, data);
  }).catch((error) => {
    console.log(`There was an error getting question data: ${error}`);
    callback(error, null)
  })
}

module.exports.getAllReviews = getAllReviews;
module.exports.getAllProducts = getAllProducts;
module.exports.getAllQuestions = getAllQuestions;