import React from 'react';
class Helpful extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <p>Helpful? Yes ({this.props.reviewData.helpfulness})</p>
      </div>
    );
  }
}

export default Helpful;