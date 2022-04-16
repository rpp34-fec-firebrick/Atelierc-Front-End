import RelatedCard from './RelatedCard';
import React from 'react';

var RelatedCardList = (props) => (

  <div className="Related-Card-list">
    <h2>Related Product card list:</h2>
    {props.productInfo.map((product, index) => {
      return (<RelatedCard product={product} key={index}/>);
    })}
  </div>
);

export default RelatedCardList;
