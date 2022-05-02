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
      currentProductId: 64912,
      starValue: 0,
      reviews: [],
      styles: {},
      myOutfit: [],
      questions: [],
      productData: {},
    };

  }

  // Initial Post Request to the Server

componentDidMount () {
  // var randomIndex = Math.floor(Math.random() * 1011)
  // randomIndex += 64620;
  // var randomIndex = 64620;

  axios.post('/products', {
    productId: this.state.currentProductId
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
  });

  axios.post('/reviews', {
    productId: this.state.currentProductId,
  })
  .then((response) => {
    console.log('Successful Reviews Request')
  }).catch((error) => {
    console.log('error', 'error');
  });
}

  //this click function handle related prodcut card click and update the current prodcut id
  onClickEvent(productId) {
    this.setState({ currentProductId: productId });
  }

  //this click function handle client's adding current item to the myoutfit list
  onClickMyOutfitEvent() {
    if (this.state.myOutfit) {
      if (!this.state.myOutfit.includes(this.state.currentProductId)) {
        this.setState(previousState => {
          {
            myOutfit: previousState.myOutfit.push(this.state.currentProductId)
          }
        });
      }
    }
  }

  //this click function handle client's deleting an item to the myoutfit list
  onClickMyOutfitDeleteEvent(deletedProdId) {
    //'client deleted an product from the outfit list'
    console.log('client delete product, id:', deletedProdId);
    //find the item based on the product ID
    //take it out from the array
    var currentProductList = this.state.myOutfit;
    var newProductList = []
    var i = 0;
    if (currentProductList) {
      while (i < currentProductList.length) {
        if (currentProductList[i] !== deletedProdId) {
          newProductList.push(currentProductList[i]);
        }
        i++;
      }
    }
    this.setState(() =>
      {
      myOutfit: newProductList
    })
  }

  render() {
    return (
      <div>
        <Product_Detail_Page productId={this.state.currentProductId}/>
        <div id="RatingsReviews">
        <Ratings_Reviews />
        </div>
        <Questions_Answers productId={this.state.currentProductId}/>
        <Related_Items_Comparisons
        productId={this.state.currentProductId}
        myOutfitIds={this.state.myOutfit}
        eventHandler={this.onClickEvent.bind(this)}
        myOutfitEventHandler={this.onClickMyOutfitEvent.bind(this)}
        onClickMyOutfitDeleteEvent={this.onClickMyOutfitDeleteEvent.bind(this)}
        />
      </div>
    );
  }
}


ReactDOM.render(<App />, document.getElementById('app'));
