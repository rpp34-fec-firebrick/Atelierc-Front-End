import React from 'react';
class Summary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      starsInfo: {},
      recommend: 0,
    };
  }


  render() {
    var keysArr = Object.keys(this.props.starsInfo);
    var valueArr = Object.values(this.props.starsInfo);
    var ratingsBarObj = {};
    var totalReviews = this.props.totalReviews;
    if (keysArr !== 0) {
      for(let i = 0; i < keysArr.length; i++) {
        let numberStar = parseInt(valueArr[i]);
        let ratingBarPercent = parseInt((numberStar/totalReviews)*100);
        ratingsBarObj[keysArr[i]] = ratingBarPercent;
      };
      return (
        <div>
          <div class="recommendPercent">{this.props.recommend}% of reviews recommend this product</div>
          <div class="starsBarNum">5 stars</div>
          <progress class="starsBar" id="5starbar" value={ratingsBarObj['5'] || 0} max="100"> 100% </progress>
          <div class="starsBarNum">4 stars</div>
          <progress class="starsBar" id="4starbar" value={ratingsBarObj['4'] || 0} max="100"> 100% </progress>
          <div class="starsBarNum">3 stars</div>
          <progress class="starsBar" id="3starbar" value={ratingsBarObj['3'] || 0} max="100"> 100% </progress>
          <div class="starsBarNum">2 stars</div>
          <progress class="starsBar" id="2starbar" value={ratingsBarObj['2'] || 0} max="100"> 100% </progress>
          <div class="starsBarNum">1 stars</div>
          <progress class="starsBar" id="1starbar"value={ratingsBarObj['1'] || 0} max="100"> 100% </progress>
        </div>
      );
    }
  }
}

export default Summary;