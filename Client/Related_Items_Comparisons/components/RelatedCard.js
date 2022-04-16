import React from 'react';


var RelatedCard = (props) => {

  var onCardSelect = function () {
    props.eventHandler(props.product);
  };

  return (
    <div className="product-list-card related">
      <h3>Each related product card</h3>
      <p className="product-list-card-cat">{props.product.category}</p>
      <p className="product-list-card-name">{props.product.name}</p>
      <p className="product-list-card-price">${props.product.default_price}</p>
    </div>
  );
};

export default RelatedCard;