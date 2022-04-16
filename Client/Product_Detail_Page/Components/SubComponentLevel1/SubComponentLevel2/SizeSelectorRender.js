import React from 'react';

function SizeSelectorRender (props) {
    return (
      <option value={props.value}>{props.skuInfo.size}</option>
    );
}

export default SizeSelectorRender;