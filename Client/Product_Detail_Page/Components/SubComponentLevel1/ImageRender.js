import React from 'react';

function ImageRender (props) {
  return (
    <div onClick={props.onClick}>
    <img src = {props.image.thumbnail_url} alt="thumnail" name = {props.imageUrl} height='75' width='75' border-radius='3'/>
    {(props.selected) ? <div data-testid="imageRender" className = "bold">_________</div> : null}
    <br></br>
    </div>
  );
}

export default ImageRender;