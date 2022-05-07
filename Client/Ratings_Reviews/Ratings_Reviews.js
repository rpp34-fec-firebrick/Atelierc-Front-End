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
      reviewInfo: [],
      reviewLoad: [],
      popup: false,
      recommend: 0,
      starsInfo: {},
      totalReviews: 0
    };
    this.handleReviewPopup = this.handleReviewPopup.bind(this);
    this.handleMoreReviews = this.handleMoreReviews.bind(this);
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
      if (response.data.results.length > 5) {
        var tempArr = [];
        for (let i = 0; i < 5; i++) {
          tempArr.push(response.data.results[i]);
        }
        this.setState({['reviewLoad']: tempArr});
      } else {
        this.setState({['reviewLoad']: response.data.results});
      }
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
      this.setState({['starsInfo']: ratingsObj});
      var totalReviews = 0;
      var totStars = 0;
      var ratingsArr = Object.values(ratingsObj);
      var starValueArr = Object.keys(ratingsObj);
      var ratingsNumArr = [];
      var ratingsPercentObj = {};
      for (var i = 0; i <= ratingsArr.length - 1; i++) {
        let currentInt = parseInt(ratingsArr[i]);
        let starValue = parseInt(starValueArr[i]);
        ratingsNumArr.push(currentInt);
        totalReviews = totalReviews + currentInt;
        totStars = totStars + (currentInt * starValue);
      };
      var starRating = parseInt(totStars/totalReviews);
      this.setState({['stars']: starRating});
      this.setState({['reviewInfo']: ratingsNumArr});
      this.setState({['totalReviews']: totalReviews});
      var recommend = parseInt(response.data.recommended.true);
      var notRecommend = parseInt(response.data.recommended.false);
      var totRecommend = recommend + notRecommend;
      console.log('recommendations total ' + totRecommend);
      var recommendPercent = parseInt((recommend/totRecommend)*100);
      this.setState({['recommend']: recommendPercent});
    }).catch((error) => {
      console.log('error', error);
    });
  }

  handleReviewPopup () {
    let reviewPopup = document.getElementById('reviewPopup');
    if (!this.state.popup) {
      reviewPopup.style.display = "block";
      this.setState({
        popup: true
      })
    } else {
      reviewPopup.style.display = "none";
      this.setState({
        popup: false
      })
    }
  }

  handleMoreReviews () {
    var reviewLoad = this.state.reviewLoad;
    if (this.state.data.length > 5) {
      if (this.state.reviewLoad.length === 5) {
        if (this.state.data.length >= 10) {
          for (let i = 5; i < 10; i ++) {
            reviewLoad.push(this.state.data[i]);
          }
        } else {
          for (let i = 5; i < this.state.data.length; i++) {
            reviewLoad.push(this.state.data[i]);
          }
        }
        this.setState({['reviewLoad']: reviewLoad});
      } else {
        let slicedArr = reviewLoad.slice(0,5);
        this.setState({['reviewLoad']: slicedArr});
      }
    }
  }

  render() {
    var reviews = this.state.reviewLoad.map((review) => {
      return (<Review reviewData={review}/>);
    })
    if (this.state.data.length > 0 && this.state.reviewInfo.length !== 0) {
      return (
        <div class="reviewContainer">
          <div class="summaryArea">
            <p>Ratings & Reviews</p>
            <div class='numRating'>{this.state.stars}</div>
            <Stars stars={this.state.stars}/>
            <Summary starsInfo={this.state.starsInfo} recommend={this.state.recommend} totalReviews={this.state.totalReviews}/>
          </div>
          <div class="reviewArea">
            <div>{ reviews }</div>
            <div class="buttons">
             <div class="reviewButton" onClick={this.handleMoreReviews}>More Reviews</div><div class="reviewButton" onClick={this.handleReviewPopup}>Add Review   +</div>
             <Add productId={this.state.productId} handleReviewPopup={this.handleReviewPopup}/>
            </div>
          </div>
        </div>
      );
    }
  }
};

export default Ratings_Reviews;