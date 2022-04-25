import React from 'react';

function StyleRender (props) {
    return (
      <div onClick={props.onclick}>
          <img className ='styleRender'
          src = {props.style.photos[0].url} name ={props.value}/>
      </div>
    );
}

export default StyleRender;