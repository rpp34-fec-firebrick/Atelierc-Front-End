import React from 'react';

class AddToOutfit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      add: false,
      buttonClick: null
    };
  }

  UNSAFE_componentWillReceiveProps (props) {
    this.setState({['add']: props.add});
    this.setState({['buttonClick']: props.onClick})
  }



  render() {
    return (
      <div className = "addToOutfitBox">
        {(!this.state.add) ?
        <ion-icon name="star-outline" onClick={this.state.buttonClick} ></ion-icon>
        : <ion-icon name="star" onClick={this.state.buttonClick} ></ion-icon>}
      </div>
    );
  }
}

export default AddToOutfit;