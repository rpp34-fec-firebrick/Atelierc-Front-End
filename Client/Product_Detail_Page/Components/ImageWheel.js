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
    if (typeof props.images !== 'string' && props.styleId?.name) {
      this.setState({['currentSelectedStyle']: props.styleId})
      this.setState({['handleImageClick']: props.onClick});
      this.setState({['largePhoto']: props.styleId?.photos[0].url})
      if (props.styleId.photos?.length <= 5) {
        this.setState({['wheelPhotos']: props.styleId.photos})
      } else {
        this.setState({['wheelPhotos']: props.styleId.photos.slice(0, 5)});
      }

    }
  }

  imageWheelClick (event) {
    console.log(event.target.name)
  }

  render() {
    return (
      <div>
        <img className = "CentralPhoto1" src = {this.state.largePhoto}/>
        <div>
          <button onClick={this.imageWheelClick.bind(this)} name='UP'> UP </button>
          <br></br>
            <div className ='imageRender1'>
            {(this.state.wheelPhotos) ?
            this.state.wheelPhotos?.map((item) =>
            <ImageRender onclick = {this.state.handleImageClick}
            image = {item} key = {item.url}/>)
            : null}
            <br></br>
          </div>
          <button onClick={this.imageWheelClick.bind(this)} name='DOWN'>Down</button>
        </div>
      </div>
    );
  }
}



export default ImageWheel;