import React from 'react';

class ProductInformation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productData : null,
      currentSelectedStyle: null
    }
  }
  UNSAFE_componentWillReceiveProps (props) {
    if (props !== undefined) {
      this.setState({['productData']: props.data})
      this.setState({['currentSelectedStyle']: props.style})
    }
  }

  render() {
    return (
      <div>
        <br></br>
        Star Rating (To be added)
        Button to Read the reviews
        <br></br>
        Category
        {(this.state.productData) ? this.state.productData.category : null}
        <br></br>
        Product Name
        {(this.state.productData) ? this.state.productData.name : null}
        <br></br>
        Product Price
        {(this.state.currentSelectedStyle) ? this.state.currentSelectedStyle.original_price : null}
      </div>
    );
  }
}

export default ProductInformation;