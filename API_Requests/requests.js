const axios = require('axios').default;
require('dotenv').config();

var getAllProducts  = (productId, callback) => {
  axios.defaults.headers.common['Authorization'] = process.env.GIT_TOKEN;


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
  axios.defaults.headers.common['Authorization'] = process.env.GIT_TOKEN;

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
  axios.defaults.headers.common['Authorization'] = process.env.GIT_TOKEN;

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

var getMetaReviews = (productId, callback) => {
  axios.defaults.headers.common['Authorization'] = process.env.GIT_TOKEN;

  axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/meta', {
    params: {
      product_id: productId
    }
  })
  .then((response) => {
    const data = response.data;
    callback(null, data);
  }).catch((error) => {
    console.log(`There was an error getting review meta data: ${error}`);
    callback(error, null);
  })
}

var getRelatedProductId  = (productId, callback) => {
  axios.defaults.headers.common['Authorization'] = process.env.GIT_TOKEN;

  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${productId}/related`, {
    params: {
      product_id: productId,
    }
  })
  .then((response) => {
    const data = response.data;
    callback(null, data);
  }).catch((error) => {
    console.log(`There was an error getting related product ID data: ${error}`);
    callback(error, null)
  })
}

var getRelatedProductInfo  = (productIds, callback) => {
  axios.defaults.headers.common['Authorization'] = process.env.GIT_TOKEN;
  var count = 0;
  var allRelatedProduct = [];
  //console.log('IDSSS', productIds)
  for (var i = 0; i < productIds.length; i++) {
    var productId = productIds[i];
    var url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${productId}`;
    axios.get(url, {
      params: {
        product_id: productId
      }
    })
    .then((response) => {
      allRelatedProduct.push(response.data);
      count++;
      if (count === productIds.length) {
        callback(null, allRelatedProduct);
      }
    }).catch((error) => {
      callback(error, null)
    })
  }
}

var getRelatedProductStyle  = (productIds, callback) => {
  axios.defaults.headers.common['Authorization'] = process.env.GIT_TOKEN;
  var count = 0;
  var allRelatedProductStyle = [];
  //console.log('IDSSS', productIds)
  for (var i = 0; i < productIds.length; i++) {
    var productId = productIds[i];
    var url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${productId}/styles`;
    axios.get(url, {
      params: {
        product_id: productId
      }
    })
    .then((response) => {
      allRelatedProductStyle.push(response.data);
      count++;
      if (count === productIds.length) {
        callback(null, allRelatedProductStyle);
      }
    }).catch((error) => {
      callback(error, null)
    })
  }
}

module.exports.getAllReviews = getAllReviews;
module.exports.getAllProducts = getAllProducts;
module.exports.getAllQuestions = getAllQuestions;
module.exports.getRelatedProductId = getRelatedProductId;
module.exports.getRelatedProductInfo = getRelatedProductInfo;
module.exports.getRelatedProductStyle = getRelatedProductStyle;
module.exports.getMetaReviews = getMetaReviews;