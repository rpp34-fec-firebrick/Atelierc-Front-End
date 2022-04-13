import React from 'react';

function StyleRender (props) {
    return (
      <button onClick={props.onclick}>
          <img className ='styleRender'
          src = {props.style.photos[0].url} name ={props.value}/>
      </button>
    );
}

export default StyleRender;