import React from 'react';

class AddToCartButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: null,
      sizeId: null,
      currentStyle: null
    };
  }

  UNSAFE_componentWillReceiveProps (props) {
    if (props.currentStyle !== null) {
      console.log(this.state.sizeId)
      this.setState({['sizeId']: props.sizeId});
      console.log(this.state.sizeId)
      this.setState({['quantity']: props.quantity});
      this.setState({['currentStyle']: props.currentStyle});
    }
  }

  onAddToBagClick () {
    console.log('clicked')
  }

  render() {
    return (
      <div>
        <button onClick ={this.onAddToBagClick}>Add to Bag!</button>
      </div>
    );
  }
}

export default AddToCartButton;