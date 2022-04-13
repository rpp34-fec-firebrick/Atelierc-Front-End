import React from 'react';
import DescriptionList from './SubComponentLevel1/DescriptionList.js';
class Description extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productData : null
    }
  }
  UNSAFE_componentWillReceiveProps (props) {
    if (props !== undefined) {
      this.setState({['productData']: props.data})
    }
  }

  render() {
    return (
      <div>
        <br></br>
        Product Slogan
        {(this.state.productData) ? this.state.productData.slogan : null}
        <br></br>
        Product Description
        {(this.state.productData) ? this.state.productData.description : null}
        Product Features List
        <DescriptionList listItems = {(this.state.productData) ? this.state.productData : null}/>
      </div>
    );
  }
}

export default Description;