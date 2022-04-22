import React from 'react';
import { Modal } from './Modal.js';

class RelatedCard extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      show: false
    };

    this.hideModal = this.hideModal.bind(this);
    this.onCardSelect = this.onCardSelect.bind(this);
    this.onStarSelect = this.onStarSelect.bind(this);
  }

  hideModal = () => {
    this.setState({ show: false })
  }

  onCardSelect = () => {
    this.props.eventHandler(Number(this.props.product.id));
  };

  onStarSelect = () => {
    //a modal will show
    //all product details will be listed inside that modal
    //when click outside the modal
    //the modal will disappear
    this.setState({ show: true });
  };

  render() {
    return (
      <div className="product-list-card related">
        <h3>Each related product card</h3>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" onClick={this.onStarSelect}>
          <path d="M12 6.76l1.379 4.246h4.465l-3.612 2.625 1.379 4.246-3.611-2.625-3.612 2.625 1.379-4.246-3.612-2.625h4.465l1.38-4.246zm0-6.472l-2.833 8.718h-9.167l7.416 5.389-2.833 8.718 7.417-5.388 7.416 5.388-2.833-8.718 7.417-5.389h-9.167l-2.833-8.718z" />
        </svg>
        <Modal show={this.state.show} handleClose={this.hideModal}>
          <p>Modal</p>
        </Modal>
        <p className="product-list-card-cat">{this.props.product.category}</p>
        <p className="product-list-card-name" onClick={this.onCardSelect}>{this.props.product.name}</p>
        <p className="product-list-card-price">${this.props.product.default_price}</p>
        {this.props.product.id}
      </div>
    )
  }
};

export default RelatedCard;