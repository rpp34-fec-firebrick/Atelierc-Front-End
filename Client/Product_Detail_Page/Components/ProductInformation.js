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
      stars: null
    }
  }
  UNSAFE_componentWillReceiveProps (props) {
    if (props !== undefined) {
      this.setState({['stars']: props.stars})
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

  render() {
    return (
      <div>
        <br></br>
        <div className = "makeInline">
        <StarsProductPage stars ={this.state.stars}/>
        <br></br>
          <u>
            <a href="#RatingsReviews">Read all Reviews</a>
          </u>
        </div>
        <br></br>
        {(this.state.productData) ? this.state.productData.category : null}
        <h1>
        {(this.state.productData) ? this.state.productData.name : null}
        </h1>
        <div className = {this.state.strikeThrough}>
        ${(this.state.currentSelectedStyle) ? this.state.currentSelectedStyle.original_price : null}
        </div>
        {this.state.sale_price ? `Our Sale Price is $${this.state.sale_price}!`: null}
      </div>
    );
  }
}

export default ProductInformation;