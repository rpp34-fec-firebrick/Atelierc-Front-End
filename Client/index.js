import axios from 'axios';
import React from 'react';
import TOKEN from '../Auth.js';
import ReactDOM from 'react-dom';
import Product_Detail_Page from './Product_Detail_Page/Product_Detail_Page.js'
import Ratings_Reviews from './Ratings_Reviews/Ratings_Reviews.js'
import Questions_Answers from './Questions_Answers/Questions_Answers.js'
import Related_Items_Comparisons from './Related_Items_Comparisons/Related_Items_Comparisons.js'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // Get Request to the Server
componentDidMount () {
  axios.defaults.headers.common['Authorization'] = TOKEN.TOKEN;
  axios.defaults.headers.common['params'] = {page: 2, count: 10};
  var randomIndex = Math.floor(Math.random() * 1011);
  randomIndex += 64620;
  // var randomIndex = 64620;

  var url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${randomIndex}`;
  axios.get(url, {
    params: {
      page: randomIndex,
      count: 10000
    }

  })
    .then((response) => {
      console.log(response.data)
      const data = response.data;
    }).catch((error) => {
      console.log('error', error);
    })
// var url2 = 'https://app-hrsei-api.herokuapp.com/api/fec2/:hr-rpp/products/1'
// var url3 = 'https://app-hrsei-api.herokuapp.com/api/fec2/:hr-rpp/products/1/styles'
}



  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is</h2>
        <Product_Detail_Page />
        <Ratings_Reviews />
        <Questions_Answers />
        <Related_Items_Comparisons />
      </div>
    );
  }
}



ReactDOM.render(<App />,document.getElementById('app'));