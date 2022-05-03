import React from 'react';

function Photo (props) {
  return (
    <div id="photoModal" data-testid="modal">
      <div id="photoContent">
        <span className="close" onClick={() => { props.togglePhoto() }} data-testid="close">&times;</span>
        <img id="photo" src={props.photo} />
      </div>
    </div>
  );
}

export default Photo;