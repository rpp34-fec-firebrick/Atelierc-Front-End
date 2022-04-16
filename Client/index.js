import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import Product_Detail_Page from './Product_Detail_Page/Product_Detail_Page.js'
import Ratings_Reviews from './Ratings_Reviews/Ratings_Reviews.js'
import Questions_Answers from './Questions_Answers/Questions_Answers.js'
import Related_Items_Comparisons from './Related_Items_Comparisons/Related_Items_Comparisons.js'

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentProductId: Math.floor(Math.random() * 1011) + 64620,
      starValue: 0,
      reviews : [],
      styles: {},
      relatedProducts : [],
      myOutfit : [],
      questions: [],
      productData: {},
    };

  }

  // Initial Post Request to the Server
componentDidMount () {
  var randomIndex = Math.floor(Math.random() * 1011)
  randomIndex += 64620;
  // var randomIndex = 64620;
  this.setState({currentProductId: randomIndex});
  axios.post('/products', {
    productId: randomIndex
  })
  .then((response) => {
    console.log('Successful Product Request')
    //Update State Based on Data
    //Each if Statement in the for loop is associated with a unique identifier in state
    for (var i = 0; i < response.data.length; i++) {
      if (response.data[i].length) this.setState({['relatedProducts']: response.data[i]});
      if (response.data[i].campus !== undefined) this.setState({['productData']: response.data[i]});
      if (response.data[i].results !== undefined) this.setState({['styles']: response.data[i]});
    }
  }).catch((error) => {
    console.log('error', 'error');
  })

  axios.post('/questions', {
    productId: randomIndex
  })
  .then((response) => {
    console.log('Successful Question Request')
  }).catch((error) => {
    console.log('error', 'error');
  })

  axios.post('/reviews', {
    productId: randomIndex,
  })
  .then((response) => {
    console.log('Successful Reviews Request')
  }).catch((error) => {
    console.log('error', 'error');
  })

//   axios.post('/reviews', {
//     productId: randomIndex,
//   })
//   .then((response) => {
//     console.log('Successful Reviews Request');
//     console.log(response.data);
//   }).catch((error) => {
//     console.log('error', 'error');
//   })

}


  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is</h2>
        <Product_Detail_Page productId={this.state.currentProductId}/>
        <Ratings_Reviews />
        <Questions_Answers productId={this.state.currentProductId}/>
        <Related_Items_Comparisons />
      </div>
    );
  }
}


ReactDOM.render(<App />, document.getElementById('app'));