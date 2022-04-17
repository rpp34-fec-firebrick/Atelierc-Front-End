import React from 'react';

function ImageRender (props) {
    return (
      <button onClick={props.onclick}>
          <img className ='imageRender' src = {props.image.thumbnail_url}/>
      </button>
    );
}

export default ImageRender;