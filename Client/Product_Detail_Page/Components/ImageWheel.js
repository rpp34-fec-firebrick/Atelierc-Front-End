import React from 'react';
import ImageRender from './SubComponentLevel1/ImageRender.js'

class ImageWheel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wheelPhotos : null,
      currentSelectedStyle: null,
      handleImageClick: null,
      largePhoto: null
    }
  }
  UNSAFE_componentWillReceiveProps (props) {
    // console.log(props)
    if (typeof props.images !== 'string') {
      this.setState({['wheelPhotos']: props.images.results})
      // this.setState({['largePhoto']: props.images.results[0].photos[0].url})
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
        {(this.state.wheelPhotos) ?
        this.state.wheelPhotos?.map((item) =>
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