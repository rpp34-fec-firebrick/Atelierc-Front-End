import React from 'react';

var MyOutfitCardImg = (props) => {

  return (
    <div>
      <img className="media-object-myoutfit" src={props.productStyle.results[0].photos[0].thumbnail_url} alt="my outfit prod"/>
    </div>
  );
};

export default MyOutfitCardImg;