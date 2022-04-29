import React from 'react';
import { Modal } from './Modal.js';

class MyOutfitCard extends React.Component {

  constructor(props) {
    super(props);

    this.state = {}

    this.onCardSelect = this.onCardSelect.bind(this);
  }

  onCardSelect = () => {
    this.props.eventHandler(Number(this.props.product.id));
  };

  render() {
    return (
      <div className="myproduct list-card">
        <img
          className="media-object"
          src={this.props.product.thumbnail_url}
          alt="your outfit product image" />
        <svg
          className="cross symbol"
          width="24"
          height="24"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => {
            this.props.handleDeleteClick(this.props.product.id);
            this.props.onClickMyOutfitDeleteEvent(this.props.product.id);
          }}>
          <path d="M12 11.293l10.293-10.293.707.707-10.293 10.293 10.293 10.293-.707.707-10.293-10.293-10.293 10.293-.707-.707 10.293-10.293-10.293-10.293.707-.707 10.293 10.293z" />
        </svg>
        <div className="card-info">
          <p className="product-list-card-cat">{this.props.product.category}</p>
          <p className="product-list-card-name" onClick={this.onCardSelect}>{this.props.product.name}</p>
          <p className="product-list-card-price">${this.props.product.default_price}</p>
        </div>
      </div>
    )
  }
};
// this.props.onClickMyOutfitDeleteEventHandler(this.props.product);

export default MyOutfitCard;