import React from 'react';
import DescriptionListRender from './DescriptionListRender.js';
var count = 0;

function DescriptionList (props) {
  return (
    <div>
      {console.log('it ran')}
      {(props.listItems.features) ?
        props.listItems.features.map((item) =>
        <DescriptionListRender item = {item} key = {count++}/>)
        : null}

    </div>
  );
}


export default DescriptionList;