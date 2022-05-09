import React from 'react';
import axios from 'axios';
class Add extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: 0,
      rating: 0,
      summary: '',
      body: '',
      recommend: false,
      username: '',
      email: '',
      photos: [],
      characteristics: {},
      success: false
    };
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleStarChange = this.handleStarChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTextChange (e) {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  handleStarChange (e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit () {
    var rating = parseInt(this.state.rating);
    var productObj = {
      rating: rating,
      summary: this.state.summary,
      body: this.state.body,
      recommend: this.state.recommend,
      name: this.state.username,
      email: this.state.email,
      photos: this.state.photos,
      characteristics: this.state.characteristics
    }
    // console.log(JSON.stringify(productObj));
    // console.log(this.props.productId);
    axios.post('/review/post', {
      productId: this.props.productId,
      productObject: productObj
    }).then((response) => {
      console.log('successful review post');
      this.setState({['success']: true});
    }).catch((error) => {
      console.log('error posting review' + error)
    })
  }


  render() {
    return (
      <div>
        <div id="reviewPopup">
          <div id="reviewPopupContent">
          <span className="close" onClick={this.props.handleReviewPopup}>&times;</span>
            <h1>Add a Review</h1>
            <div>Number of Stars</div>
            <div>
              <fieldset className="rating" id="rating" onChange={(e) => {this.handleStarChange(e)}}>
                <input type="radio" id="star5" name="rating" value="5" />
                <label form="star5">5 stars</label>
                <input type="radio" id="star4" name="rating" value="4" />
                <label form="star4">4 stars</label>
                <input type="radio" id="star3" name="rating" value="3" />
                <label form="star3">3 stars</label>
                <input type="radio" id="star2" name="rating" value="2" />
                <label form="star2">2 stars</label>
                <input type="radio" id="star1" name="rating" value="1" />
                <label form="star1">1 star</label>
              </fieldset>
            </div>
            <div>Review Title</div>
            <textarea id="summary" maxLength="50" placeholder="Title for your review" onChange={(e) => {this.handleTextChange(e)}}></textarea>
            <div>Review</div>
            <textarea id="body" maxLength="500" placeholder="Enter review here" onChange={(e) => {this.handleTextChange(e)}}></textarea>
            <div>Would you recommend this product?</div>
            <select id="recommend" onChange={(e) => {this.handleTextChange(e)}}>
            <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
            <div>Username</div>
            <textarea id="username" maxLength="20" placeholder="username" onChange={(e) => {this.handleTextChange(e)}}></textarea>
            <div>Email</div>
            <textarea id="email" maxLength="30" placeholder="email" onChange={(e) => {this.handleTextChange(e)}}></textarea>
            <div></div>
            <div className="reviewButton" onClick={this.handleSubmit}>Submit</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Add;