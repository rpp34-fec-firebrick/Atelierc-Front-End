import React from 'react';

var RelatedCardImg = (props) => {

  var onCardSelect = function () {
    props.eventHandler(props.productStyle.product_id);
  };

  return (
      <img className="media-object" src={props.productStyle.results[0].photos[0].thumbnail_url} alt="" onClick={onCardSelect}/>
  );
};

export default RelatedCardImg;