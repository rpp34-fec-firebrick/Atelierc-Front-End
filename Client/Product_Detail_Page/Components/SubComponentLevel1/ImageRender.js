import React from 'react';

function ImageRender (props) {
  return (
    <div className = 'test'>
    <img onClick={props.onclick} src = {props.image.thumbnail_url} height='100' width='100'/>
    </div>
  );
}
    // <button onClick={props.onclick}>

export default ImageRender;