import React from 'react';
import ImageRender from './SubComponentLevel1/ImageRender.js'

class ImageWheel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wheelPhotos : null,
      currentSelectedStyle: null,
      largePhoto: null,
      allWheelPhotos: null,
      firstWheelPhotoIndex: 0,
      showUp: false,
      showDown: false,
    }
  }
  UNSAFE_componentWillReceiveProps (props) {
    if (typeof props.images !== 'string' && props.styleId?.name) {
      this.setState({['currentSelectedStyle']: props.styleId})
      this.setState({['largePhoto']: props.styleId?.photos[0].url})
      if (props.styleId.photos?.length <= 5) {
        this.setState({['wheelPhotos']: props.styleId.photos})
      } else {
        this.setState({['allWheelPhotos']: props.styleId.photos});
        this.setState({['showDown']: true});
        this.setState({['wheelPhotos']: props.styleId.photos.slice(0, 5)});
      }

    }
  }

  imageWheelClick (event) {
    if (this.state?.allWheelPhotos !== null) {
      if (event.target.name === 'chevron-down-outline' && this.state.firstWheelPhotoIndex + 1 + 5 <= this.state.allWheelPhotos.length) {
        var newStartIndex = this.state.firstWheelPhotoIndex + 1;
        var newEndIndex = newStartIndex + 5;
        this.setState({['showUp']: true})
        if (this.state.allWheelPhotos.length === newEndIndex) {
          console.log('hi')
          this.setState({['showDown']: false})
        }
        this.setState({['firstWheelPhotoIndex']: newStartIndex});
        this.setState({['wheelPhotos']: this.state.allWheelPhotos.slice(newStartIndex, newEndIndex)});
      } else if (event.target.name === 'chevron-up-outline' && this.state.firstWheelPhotoIndex > 0) {
        var newStartIndex = this.state.firstWheelPhotoIndex - 1;
        var newEndIndex = newStartIndex + 5;

        this.setState({['showDown']: true})
        if (newStartIndex === 0) {
          this.setState({['showUp']: false });
        }

        this.setState({['firstWheelPhotoIndex']: newStartIndex});
        this.setState({['wheelPhotos']: this.state.allWheelPhotos.slice(newStartIndex, newEndIndex)});
      }
    }
  }

  handleImageClick (event) {
    this.setState({['largePhoto']: event.target.name})
  }

  render() {
    return (
      <div className ="generalPhotoDisplay">
        <div className="imageWheel">
          {(this.state.showUp) ?
          <ion-icon name="chevron-up-outline" onClick={this.imageWheelClick.bind(this)}></ion-icon>
          : null}
          <br></br>
            <div className ='imageRender1'>
            {(this.state.wheelPhotos) ?
            this.state.wheelPhotos?.map((item) =>
            <ImageRender onClick ={this.handleImageClick.bind(this)}
            image = {item} imageUrl = {item.url} key = {item.url}/>)
            : null}
            <br></br>
          </div>
          {(this.state.showDown) ?
          <ion-icon name="chevron-down-outline" onClick={this.imageWheelClick.bind(this)}></ion-icon>
          : null}
        </div>
        <div>
          <img className = "CentralPhoto1" src = {this.state.largePhoto}/>
        </div>
      </div>
    );
  }
}



export default ImageWheel;