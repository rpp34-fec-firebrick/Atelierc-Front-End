import React from 'react';
import SizeSelectorRender from './SubComponentLevel2/SizeSelectorRender.js';

class SizeSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStyle: null,
      selectedSize: null,
      onSizeChange: null,
      outOfStock: false
    };
  }

  UNSAFE_componentWillReceiveProps (props) {
    if (props.currentStyle !== null) {
      this.setState({['selectedStyle']: props.currentStyle})
      this.setState({['onSizeChange']: props.onChange})
      this.setState({['selectedSize']: props.selectedSize})

      var selectedSku = props.selectedSize;
      var quantity = props.currentStyle?.skus[selectedSku]?.quantity;
      if (quantity === 0) {
        this.setState({['outOfStock']: true});
      } else {
        this.setState({['outOfStock']: false})
      }
    }
  }

  render() {
    return (
      <div>
        <label></label>
        <select onChange={this.state.onSizeChange} className = "sizeSelector">
        {(this.state.outOfStock) ?
          <option value="">Out of Stock!</option> :
          <option value="">Select Size!</option>}
          {(this.state.selectedStyle !== null && this.state.outOfStock === false) ?
          Object.keys(this.state.selectedStyle?.skus).map((key, index) =>
            <SizeSelectorRender skuInfo = {this.state.selectedStyle?.skus[key]}
            value = {key} key={key}/>)
          : null
          }
        </select>
      </div>
    );
  }
}

export default SizeSelector;