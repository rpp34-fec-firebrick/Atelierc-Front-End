import React from 'react';

function DescriptionListRender (props) {
  return (
    <div>
      <ion-icon name="checkmark-outline"></ion-icon> {props.item.feature}
      <br></br>
    </div>
  );
}


export default DescriptionListRender;