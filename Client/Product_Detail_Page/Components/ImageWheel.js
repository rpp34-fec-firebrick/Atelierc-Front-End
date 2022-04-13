import React from 'react';
import ImageRender from './SubComponentLevel1/ImageRender.js'

// function ImageWheel (props) {
//   return (
//     <div>
//       {(props.images.results) ?
//         props.images.results.map((image) =>
//         <ImageRender image = {image} key = {image.style_id}/>)
//         : null}
//     </div>
//   );
// }

class ImageWheel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      styles : null,
      currentSelectedStyle: null,
      handleImageClick: null
    }
  }
  UNSAFE_componentWillReceiveProps (props) {
    if (props !== undefined) {
      this.setState({['styles']: props.images.results})
      this.setState({['handleImageClick']: props.onClick})
    }
  }

  render() {
    return (
      <div>
        {(this.state.styles) ?
        this.state.styles?.map((item) =>
        <ImageRender onclick = {this.state.handleImageClick}
        image = {item} key = {item.style_id}/>)
        : null}
      </div>
    );
  }
}



export default ImageWheel;