import React from 'react';
class Review extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <p>{this.props.reviewData.rating}</p>
        <p>{this.props.reviewData.reviewer_name},{this.props.reviewData.date}</p>
        <p>{this.props.reviewData.body}</p>
        <p>{this.props.reviewData.response}</p>
      </div>
    );
  }
}

export default Review;