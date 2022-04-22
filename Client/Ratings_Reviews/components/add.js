import React from 'react';
class Add extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      popup: false,
      productId: this.props.productId,
      rating: 0,
      summary: '',
      body: '',
      recommend: false,
      name: '',
      email: '',
      photos: [],
      characteristics: {}
    };
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

  render() {
    return (
      <div>
        <button type="button" onClick={this.handleReviewPopup.bind(this)}>Add Review</button>
        <div id="reviewPopup">
        <span className="close" onClick={this.handleReviewPopup.bind(this)}>&times;</span>
          <div id="reviewPopupContent">
            <h1>Add a Review</h1>
            <select id="reviewStars">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <textarea id="reviewSummary" maxLenth="50" placeholder="Title for your review"></textarea>
            <textarea id="reviewBody" maxLength="500" placeholder="Enter review here"></textarea>
            <select id="recommend">
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
            <textarea id="username" maxLength="20"></textarea>
            <textarea id="email" maxlength="30"></textarea>

          </div>
        </div>
      </div>
    );
  }
}

export default Add;