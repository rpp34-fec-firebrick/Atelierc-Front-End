import React from 'react';
import Stars from './stars';
import Helpful from './helpful';
class Review extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      review_id: ''
    };
  }

  UNSAFE_componentWillReceiveProps (props) {
    this.setState({['data']: props.reviewData});
    console.log('review:' + JSON.stringify(this.state['data']));
  }

  render() {
    var configureDate = (date) => {
      if (date.indexOf('-') === -1) {
        return date;
      }
      let months = {
        '01': 'January',
        '02': 'February',
        '03': 'March',
        '04': 'April',
        '05': 'May',
        '06': 'June',
        '07': 'July',
        '08': 'August',
        '09': 'September',
        '10': 'October',
        '11': 'November',
        '12': 'December'
      };

      date = date.split('-');
      let day = date[2].split('T')[0];
      let month = months[date[1]];
      let year = date[0]

      return `${month} ${day}, ${year}`;
    };
    var cleanDate = configureDate(this.props.reviewData.date);
    if(this.state.data.length !== 0) {
      return (
        <div class='indvReview'>
          <div class="reviewInfo">
            <Stars stars={this.props.reviewData.rating}/>
            <div class="reviewerName">
              <span>{this.props.reviewData.reviewer_name}</span>
              <span>{cleanDate}</span>
            </div>
          </div>
          <h4>{this.props.reviewData.summary}</h4>
          <p>{this.props.reviewData.body}</p>
          <div class="response-box">
            <div class="response-box2">{this.props.reviewData.response}</div>
          </div>
          <Helpful reviewData={this.props.reviewData}/>
        </div>
      );
    }
  }
}

export default Review;