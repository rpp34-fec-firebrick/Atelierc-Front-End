import React from 'react';
import StarsProductPage from './SubComponentLevel1/Stars.js';

class ProductInformation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productData : null,
      currentSelectedStyle : null,
      strikeThrough : 'noStrike',
      sale_price : null,
      stars: 3
    }
  }
  UNSAFE_componentWillReceiveProps (props) {
    if (props !== undefined) {
      // this.setState({['stars']: props.stars})
      this.setState({['productData']: props.data})
      this.setState({['currentSelectedStyle']: props.style})
      if (props.style?.sale_price === null) {
        this.setState({['strikeThrough']: 'noStrike'})
      } else {
        this.setState({['sale_price']: props.style?.sale_price})
        this.setState({['strikeThrough']: 'strike'})
      }
    }
  }

  scrollFeature () {
    document.getElementById('RatingsReviewsScrollFeature').scrollIntoView(true)
  }

  render() {
    return (
      <div>
        <div className = "makeInline">
          <div className = "starProductPage">
            <StarsProductPage stars ={this.state.stars}/>
          </div>
          <div className = "readReviews" >
            <button onClick = {this.scrollFeature}>Read All Reviews!</button>
          </div>
        </div>
      <br></br>
        <h3>
        {(this.state.productData) ? this.state.productData.category : null}
          </h3>
        <h1>
        {(this.state.productData) ? this.state.productData.name : null}
        </h1>
        <div className = {this.state.strikeThrough}>
        ${(this.state.currentSelectedStyle) ? this.state.currentSelectedStyle.original_price : null}
        </div>
        {this.state.sale_price ? `Our Sale Price is $${this.state.sale_price}!`: null}
        <br></br>
      </div>
    );
  }
}

export default ProductInformation;