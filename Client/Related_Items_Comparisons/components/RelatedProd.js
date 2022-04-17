import RelatedCard from './RelatedCard';
import RelatedCardImg from './RelatedCardImg';
import React from 'react';

var RelatedCardList = (props) => (

  <div className="Related-Card-list">
    <h2>Related Product card list:</h2>
    <div className="Product-Card">
      {props.productInfo.map((product, index) => {
        return (<RelatedCard product={product} key={index} eventHandler={props.eventHandler} />);
      })}
      {props.productStyle.map((productStyle, index) => {
        return (<RelatedCardImg productStyle={productStyle} key={index} eventHandler={props.eventHandler} />);
      })}
    </div>
  </div>
);

export default RelatedCardList;