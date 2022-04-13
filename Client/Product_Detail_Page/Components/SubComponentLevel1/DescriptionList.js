import React from 'react';
import DescriptionListRender from './DescriptionListRender.js';


function DescriptionList (props) {
  return (
    <div>
      {(props.listItems.features) ?
        props.listItems.features.map((item) =>
        <DescriptionListRender item = {item} key = {item.value}/>)
        : null}
    </div>
  );
}


export default DescriptionList;