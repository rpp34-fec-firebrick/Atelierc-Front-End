import React from 'react';
import Stars from './stars';
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
    if(this.state.data.length !== 0) {
      return (
        <div class='indvReview'>
          <Stars stars={this.props.reviewData.rating}/>
          <h4>{this.props.reviewData.summary}</h4>
          <p>{this.props.reviewData.reviewer_name},{this.props.reviewData.date}</p>
          <p>{this.props.reviewData.body}</p>
          <p>{this.props.reviewData.response}</p>
        </div>
      );
    }
  }
}

export default Review;