import React from 'react';

function StyleRender (props) {
    return (
      <div>
          <img className ='styleRender' src = {props.style.photos[0].url}/>
      </div>
    );
}

export default StyleRender;