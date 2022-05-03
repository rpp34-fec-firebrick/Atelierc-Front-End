import React from 'react';

function ImageRender (props) {
  return (
    <div onClick={props.onClick}>
    <img src = {props.image.thumbnail_url} name = {props.imageUrl} height='75' width='75'/>
    </div>
  );
}

export default ImageRender;