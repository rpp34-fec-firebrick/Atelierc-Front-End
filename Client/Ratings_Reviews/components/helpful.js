import React from 'react';
import axios from 'axios';
class Helpful extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleHelpful = this.handleHelpful.bind(this);
    this.handleReport = this.handleReport.bind(this);
  }

  handleHelpful() {
    axios.post('/review/helpful', {
      reviewId: this.props.reviewData.review_id,
    }).then((response) => {
      console.log('successful review helpful post');
    }).catch((error) => {
      console.log('error posting review helpful' + error)
    })
  }

  handleReport() {
    axios.post('/review/report', {
      reviewId: this.props.reviewData.review_id,
    }).then((response) => {
      // console.log('successful review report post');
    }).catch((error) => {
      console.log('error posting review report' + error)
    })
  }

  render() {
    return (
      <div>
        <span className="helpful-text">Helpful?</span>
        <span className="helpful-link" onClick={this.handleHelpful}>Yes (</span>
        <span className="helpful-text">{this.props.reviewData.helpfulness}</span>
        <span className="helpful-text">)   |   </span>
        <span className="helpful-link" onClick={this.handleReport}>Report</span>
      </div>
    );
  }
}

export default Helpful;