import React from 'react';

function ImageRender (props) {
  return (
    <div className = 'test'>
    <img onClick={props.onclick} src = {props.image.thumbnail_url}/>
    </div>
  );
}
    // <button onClick={props.onclick}>

export default ImageRender;