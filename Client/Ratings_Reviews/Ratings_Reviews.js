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
      productId: this.props.productId,
      data: []
    };
  }

  componentDidMount() {
    axios.post('/reviews', {
      productId: this.props.productId,
    })
    .then((response) => {
      console.log('Successful Reviews Request');
      this.setState({['data']: response.data});
    }).catch((error) => {
      console.log('error', 'error');
    })
  }

  render() {
    return (
      <div>
        <Summary />
        <Stars/>
        <Review/>
        <More/>
        <Add productId={this.state.productId}/>
      </div>
    );
  }
};

export default Ratings_Reviews;