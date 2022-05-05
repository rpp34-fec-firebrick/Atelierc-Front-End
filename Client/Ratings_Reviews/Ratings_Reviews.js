import React from 'react';
import axios from 'axios';
import Add from './components/add.js';
import More from './components/more.js';
import Review from './components/review.js';
import Summary from './components/summary';
import Stars from './components/stars';



class Ratings_Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: 64913,
      stars: 0,
      data: [],
      reviewInfo: []
    };
  }

  UNSAFE_componentWillReceiveProps (props) {
    this.setState({['productId']: props.productId});
    console.log('product ID ' + props.productId)
    axios.post('/reviews', {
      productId: props.productId
    })
    .then((response) => {
      console.log('Successful Reviews Request');
      console.log(response.data.results);
      this.setState({['data']: response.data.results});
    }).catch((error) => {
      console.log('error', error);
    });

    axios.post('/reviews/meta' , {
      productId: props.productId
    })
    .then((response) => {
      console.log('Get those stars');
      console.log(response.data);
      var ratingsObj = response.data.ratings;
      var totalReviews = 0;
      var totStars = 0;
      var ratingsArr = Object.values(ratingsObj);
      var ratingsNumArr = [];
      for (var i = 0; i <= ratingsArr.length - 1; i++) {
        let currentInt = parseInt(ratingsArr[i]);
        ratingsNumArr.push(currentInt);
        totalReviews += currentInt;
        totStars = totStars + (currentInt * (i+1));
      };
      var starRating = parseInt(totStars/totalReviews);
      this.setState({['stars']: starRating});
      this.setState({['reviewInfo']: ratingsNumArr});
    }).catch((error) => {
      console.log('error', error);
    });
  }

  render() {
    console.log(this.state.data);
    return (
      <div>
        <h2>Ratings & Reviews</h2>
        <Stars stars={this.state.stars}/>
        <Summary reviewData={this.state.data}/>
        <Review reviewData={this.state.data}/>
        <More reviewData={this.state.data}/>
        <Add productId={this.state.productId}/>
      </div>
    );
  }
};

export default Ratings_Reviews;