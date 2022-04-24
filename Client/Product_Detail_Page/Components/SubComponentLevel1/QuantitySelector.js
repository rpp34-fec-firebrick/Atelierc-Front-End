import React from 'react';
import QuantitySelectorRender from './SubComponentLevel2/QuantitySelectorRender.js'

class QuantitySelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStyle: null,
      selectedSize: null,
      selectedSku: null,
      onQuantityChange: null,
      outOfStock: false,
    };
  }

  UNSAFE_componentWillReceiveProps (props) {
    if (props.currentStyle !== null) {
      this.setState({['selectedStyle']: props.currentStyle})
      this.setState({['selectedSize']: props.selectedSize})
      this.setState({['onQuantityChange']: props.onChange})
      if (props.selectedSize !== null) {
        var skuValue = props.selectedSize;
        var quantity = props.currentStyle.skus[skuValue].quantity;
        var len = (quantity > 15) ? 15 : quantity;
        var arr = [];
        for (var i = 1; i <= len; i++) {
          arr.push(i)
        }
        if (arr.length === 0) {
          this.setState({['outOfStock']: true});
        } else {
          this.setState({['selectedSku']: arr});
          this.setState({['outOfStock']: false});
        }
      }
    }
  }

  render() {
    return (
      <div>
        QuantitySelector
        <label for="size-select">Select your Desired Quantity!</label>
        <select name="pets" id="pet-select" onChange={this.state.onQuantityChange}>
          {(this.state.outOfStock) ?
          <option value="">--Out of Stock!--</option> :
          <option value="">--Select your Desired Quantity!--</option>}
        {(this.state.selectedSku !== null && this.state.outOfStock === false) ?
          this.state.selectedSku?.map((item) =>
          <QuantitySelectorRender index = {item} key = {item}/> )
          : null
        }
      </select>
      </div>
    );
  }
}

export default QuantitySelector;