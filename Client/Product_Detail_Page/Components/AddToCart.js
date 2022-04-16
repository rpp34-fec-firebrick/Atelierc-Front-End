import React from 'react';
import SizeSelector from './SubComponentLevel1/SizeSelector.js';
import QuantitySelector from './SubComponentLevel1/QuantitySelector.js';
import AddToCartButton from './SubComponentLevel1/AddToCartButton.js';

class AddToCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStyle : null,
      selectedSize: null,
      selectedQuantity: null
    };
  }


  UNSAFE_componentWillReceiveProps (props) {
    // console.log(props)
    if (typeof props.currentStyle?.name === 'string') {
      this.setState({['currentStyle']: props.currentStyle})
    }
  }

  onSizeChange (event) {
    this.setState({['selectedSize']: event.target.value})
  }

  onQuantityChange (event) {
    console.log('hi')
    this.setState({['selectedQuantity']: event.target.value})
  }

  render() {
    return (
      <div>
        <SizeSelector currentStyle={this.state.currentStyle}
        onChange={this.onSizeChange.bind(this)} selectedSize = {this.state.selectedSize}/>
        <QuantitySelector currentStyle={this.state.currentStyle}
        onChange={this.onQuantityChange.bind(this)} selectedSize={this.state.selectedSize}/>
        <AddToCartButton/>
      </div>
    );
  }
}

export default AddToCart;