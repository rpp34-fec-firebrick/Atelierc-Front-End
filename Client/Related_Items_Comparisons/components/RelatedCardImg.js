import React from 'react';

var RelatedCardImg = (props) => {

  var onCardSelect = function () {
    props.eventHandler(Number(props.productStyle.product_id));
  };

  return (
    <div>
      <img className="media-object" src={props.productStyle.results[0].photos[0].thumbnail_url} alt="" onClick={onCardSelect}/>
      {props.productStyle.product_id}
    </div>
  );
};

export default RelatedCardImg;