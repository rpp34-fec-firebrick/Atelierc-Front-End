import React from 'react';
class Review extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <p>This is the review area text</p>
        <p>This is the answer portion</p>
      </div>
    );
  }
}

export default Review;