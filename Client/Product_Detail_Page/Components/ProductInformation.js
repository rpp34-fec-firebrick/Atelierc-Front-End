import React from 'react';

class ProductInformation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productData : null,
      currentSelectedStyle : null,
      strikeThrough : 'noStrike',
      sale_price : null
    }
  }
  UNSAFE_componentWillReceiveProps (props) {
    if (props !== undefined) {
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
        Star Rating (To be added)
        <h6>
          <u>
            <a href="#RatingsReviews">Read all Reviews</a>
          </u>
        </h6>
        <br></br>
        Product Category
        {(this.state.productData) ? this.state.productData.category : null}
        <br></br>
        Product Name
        {(this.state.productData) ? this.state.productData.name : null}
        <br></br>
        Product Price
        <div className = {this.state.strikeThrough}>
        {(this.state.currentSelectedStyle) ? this.state.currentSelectedStyle.original_price : null}
        </div>
        {this.state.sale_price ? `Our Sale Price is ${this.state.sale_price}`: null}
      </div>
    );
  }
}

export default ProductInformation;