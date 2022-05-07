import React from 'react';
import SizeSelector from './SubComponentLevel1/SizeSelector.js';
import AddToOutfit from './SubComponentLevel1/AddToOutfit.js';
import QuantitySelector from './SubComponentLevel1/QuantitySelector.js';
import AddToCartButton from './SubComponentLevel1/AddToCartButton.js';

class AddToCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStyle : null,
      selectedSize: null,
      selectedQuantity: null,
      productId: null,
      addToOutfit: false,
    };
  }


  UNSAFE_componentWillReceiveProps (props) {
    this.setState({['updateOutfit']: props.updateOutfit});

    if (typeof props.currentStyle?.name === 'string') {
      this.setState({['currentStyle']: props.currentStyle})
      this.setState({['productId']: props.productId})
    }
  }

  onSizeChange (event) {
    if (event.target.value === '') {
      var quantity = (this.state?.selectedQuantity) ? this.state.selectedQuantity : null;
      this.setState({['selectedQuantity']: quantity});
      this.setState({['selectedSize']: null})
    } else {
      this.setState({['selectedSize']: event.target.value})
    }
  }

  onQuantityChange (event) {
    this.setState({['selectedQuantity']: event.target.value})
  }

  onAddToBagClick () {
    var data = {
      sizeId : this.state.selectedSize,
      quantity : this.state.selectedQuantity,
      currentStyle: this.state.currentStyle,
      productId: this.state.productId
    };
  }
  onAddToOutfitClick () {
    if (this.state.addToOutfit) {
      this.setState({['addToOutfit']: false})
    } else {
      this.setState({['addToOutfit']: true})
    }
  }

  render() {
    return (
      <div className = "cartGrid">
        <div className = "sizeSelectorGrid">
          <SizeSelector currentStyle={this.state.currentStyle} className = "StyleCirclesRender"
          onChange={this.onSizeChange.bind(this)} selectedSize = {this.state.selectedSize}/>
        </div>
        <div className = "quantitySelectorGrid">
          <QuantitySelector currentStyle={this.state?.currentStyle}
          onChange={this.onQuantityChange.bind(this)} selectedSize={this.state?.selectedSize}/>
        </div>
        <div className = "addToOutfitGrid">
          <AddToOutfit onClick={this.onAddToOutfitClick.bind(this)} add = {this.state.addToOutfit}/>
        </div>
        <div className = "addToCartButtonGrid">
          {(this.state.selectedQuantity && this.state.selectedSize) ?
          <AddToCartButton sizeId = {this.state.selectedSize}
          quantity = {this.state.selectedQuantity} currentStyle = {this.state.currentStyle}
          onClick={this.onAddToBagClick.bind(this)}
          /> : null
          }
        </div>
      </div>
    );
  }
}

export default AddToCart;