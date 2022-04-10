import React from 'react';

function ImageRender (props) {
    return (
      <div>
          <img className ='imageRender' src = {props.image.photos[0].url}/>
      </div>
    );
}

export default ImageRender;