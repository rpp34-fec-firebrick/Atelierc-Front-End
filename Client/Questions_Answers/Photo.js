import React from 'react';

function Photo (props) {
  return (
    <div id="photoModal">
      <div id="photoContent">
        <span className="close" onClick={() => { props.togglePhoto() }}>&times;</span>
        <img id="photo" src={props.photo} />
      </div>
    </div>
  );
}

export default Photo;