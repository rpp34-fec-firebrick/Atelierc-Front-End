import React from 'react';
// import DescriptionList from './SubComponentLevel1/DescriptionList.js';
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
        <div className = "bold">
        {(this.state.productData) ? this.state.productData.slogan : null}
        </div>
        <br></br>
        <div className = "productDescription">
        {(this.state.productData) ? this.state.productData.description : null}
        </div>
      </div>
    );
  }
}

export default Description;