import React from 'react';
import StyleRender from './StyleRender.js'

function StyleSelection (props) {
    return (
      <div>
          {(props.styles.results) ?
          props.styles.results.map((style) =>
          <StyleRender style = {style} key = {style.style_id}/>)
          : null}
      </div>
    );
}

export default StyleSelection;