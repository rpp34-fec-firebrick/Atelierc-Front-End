import React from 'react';
import ImageRender from './SubComponentLevel1/ImageRender.js'

function ImageWheel (props) {
  return (
    <div>
      {(props.images.results) ?
        props.images.results.map((image) =>
        <ImageRender image = {image} key = {image.style_id}/>)
        : null}
    </div>
  );
}


export default ImageWheel;