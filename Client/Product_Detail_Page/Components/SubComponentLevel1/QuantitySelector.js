import React from 'react';
import QuantitySelectorRender from './SubComponentLevel2/QuantitySelectorRender.js'

class QuantitySelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStyle: null,
      selectedSize: null,
      selectedSku: null,
      onQuantityChange: null
    };
  }

  UNSAFE_componentWillReceiveProps (props) {
    if (props.currentStyle !== null) {
      this.setState({['selectedStyle']: props.currentStyle})
      this.setState({['selectedSize']: props.selectedSize})
      this.setState({['onQuantityChange']: props.onChange})
      if (props.selectedSize !== null) {
        var len = (props.selectedSize > 15) ? 15 : props.selectedSize;
        var arr = [];
        for (var i = 1; i <= len; i++) {
          arr.push(i)
        }
        this.setState({['selectedSku']: arr});
      }
    }
  }

  render() {
    return (
      <div>
        QuantitySelector
        <label for="size-select">Select your Desired Quantity!</label>
        <select name="pets" id="pet-select" onChange={this.state.onQuantityChange}>
          <option value="">--Please choose your size--</option>
        {(this.state.selectedSku !== null) ?
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