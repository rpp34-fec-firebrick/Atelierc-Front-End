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
      handleImageClick: null,
      stylesToRender : null
    }
  }
  UNSAFE_componentWillReceiveProps (props) {
    // console.log(props)
    if (typeof props.images !== 'string') {
      if (props.images.results?.length <= 7) {
        var stylesToRender = props.images.results;
      } else {
        var stylesToRender = props.images.results;
        stylesToRender = stylesToRender.slice(0, 7)
      }
      this.setState({['stylesToRender']: stylesToRender})
      this.setState({['styles']: props.images.results})
      this.setState({['handleImageClick']: props.onClick})
    }
  }

  imageWheelClick (event) {
    console.log(event.target.name)
  }

  render() {
    return (
      <div>
        <button onClick={this.imageWheelClick.bind(this)} name='UP'> UP </button>
        <br></br>
        {(this.state.styles) ?
        this.state.styles?.map((item) =>
        <ImageRender onclick = {this.state.handleImageClick}
        image = {item} key = {item.style_id}/>)
        : null}
        <br></br>
        <button onClick={this.imageWheelClick.bind(this)} name='DOWN'>Down</button>
      </div>
    );
  }
}



export default ImageWheel;