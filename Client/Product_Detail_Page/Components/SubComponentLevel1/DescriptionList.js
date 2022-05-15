import React from 'react';
import DescriptionListRender from './SubComponentLevel2/DescriptionListRender.js';
var count = 0;

function DescriptionList (props) {
  return (
    <div>
      <br></br>
      {(props.listItems.features) ?
        props.listItems.features.map((item) =>
        <DescriptionListRender data-testid="descriptionFeatures" item = {item} key = {count++}/>)
        : null}

    </div>
  );
}


export default DescriptionList;