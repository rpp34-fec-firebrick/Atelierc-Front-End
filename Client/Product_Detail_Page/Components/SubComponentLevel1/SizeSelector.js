import React from 'react';
import SizeSelectorRender from './SubComponentLevel2/SizeSelectorRender.js';

class SizeSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStyle: null,
      selectedSize: null,
      onSizeChange: null
    };
  }

  UNSAFE_componentWillReceiveProps (props) {
    if (props.currentStyle !== null) {
      this.setState({['selectedStyle']: props.currentStyle})
      this.setState({['onSizeChange']: props.onChange})
      this.setState({['selectedSize']: props.selectedSize})
    }
  }

  render() {
    return (
      <div>
        SizeSelector
        <label for="size-select">Select your Size!</label>
        <select name="pets" id="pet-select" onChange={this.state.onSizeChange}>
          <option value="">--Please choose your size--</option>
          {(this.state.selectedStyle !== null) ?
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