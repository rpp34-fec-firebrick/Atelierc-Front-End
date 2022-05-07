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
      mouseX: null,
      mouseY: null
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

  // imageZoom () {
  //   var image = document.getElementById('CentralPhoto1Grid');
  //   var magnifyingGlass = document.createElement('div');
  //   magnifyingGlass.setAttribute("class", "newMagnifyingGlass");
  //   image.parentElement.insertBefore(magnifyingGlass, image);

  //   var zoom = 3;

  //   magnifyingGlass.style.backgroundImage = "url('" + image.src + "')";
  //   magnifyingGlass.style.backgroundRepeat = "no-repeat";
  //   magnifyingGlass.style.backgroundSize = (image.width * zoom) + "px" + (image.height * zoom) + "px";

  //   var w = magnifyingGlass.offsetWidth / 2;
  //   var h = magnifyingGlass.offsetHeight / 2;

  //   magnifyingGlass.addEventListener("mousemove", moveMagnifier);
  //   image.addEventListener("mousemove", moveMagnifier);

  //   var x = this.state.mouseX;
  //   var y = this.state.mouseY;

  //   if (x > image.width - (w / zoom)) x = image.width - (w / zoom);
  //   if (x < w / zoom) x = w / zoom;
  //   if (y > image.height - (h / zoom)) y = image.height - (h / zoom);
  //   if (y < h / zoom) y = h / zoom;

  //   magnifyingGlass.style.left = (x - w) + "px";
  //   magnifyingGlass.style.top = (y - h) + "px";
  //   magnifyingGlass.style.backgroundPosition = "-" + ((x * zoom) - w + zoom) + "px -" + ((y * zoom) - h + zoom) + "px";
  //   console.log('hi')

  //   // setTimeout(magnifyingGlass.remove(),160);
  // }

  imageZoom () {
    console.log('hi')
    var img, lens, result, cx, cy;
    img = document.getElementById("CentralPhoto1Grid");
    // result = document.getElementById("image-zoom");
    lens = document.createElement("DIV");
    lens.setAttribute("class", 'img-zoom-lens');

    img.parentElement.insertBefore(lens, img);

    var imageLocation = img.getBoundingClientRect();
    // console.log(imageLocation);
    // cx = result.offsetWidth / lens.offsetWidth;
    // cy = result.offsetHeight / 1;
    var zoom = 3;

    lens.style.backgroundImage = "url('" + img.src + "')";
    lens.style.backgroundSize - (img.width * zoom) + "px " + (img.height * zoom) + "px";

    lens.addEventListener("mouseOver", moveLens(this.state.mouseX, this.state.mouseY));
    img.addEventListener("mouseMove", moveLens(this.state.mouseX, this.state.mouseY));
    lens.addEventListener("touchmove", moveLens(this.state.mouseX, this.state.mouseY));
    img.addEventListener("touchmove", moveLens(this.state.mouseX, this.state.mouseY));

    function moveLens (xPos, yPos) {
      var x = xPos - (lens.offsetWidth / 2);
      var y = yPos - (lens.offsetHeight / 2);

      if (x > img.width - lens.offsetWidth) x = img.width - lens.offsetWidth;
      if (x < 0) x = 0;
      if (y > img.height - lens.offsetHeight) y = img.height - lens.offsetHeight;
      if (y < 0) y = 0;

      lens.style.left = x + imageLocation.x + "px";
      lens.style.top = y + imageLocation.y + "px";
      lens.style.backgroundPosition = "-" + (x * zoom) + "px -" + (y * zoom) + "px";
    }
  }

  _onMouseMove (event) {
    this.setState({ mouseX: event.nativeEvent.offsetX, mouseY: event.nativeEvent.offsetY });
    this.imageZoom()
  }

  render() {
    return (
      <div className ="photoDisplay">
        <div className="wheelimageGrid">
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

        <div className = "centralGridMainPhoto">
          {/* <img id = "CentralPhoto1Grid" onMouseMove = {this._onMouseMove.bind(this)}
          className = "CentralPhoto1" src = {this.state.largePhoto}/> */}
          <img id = "CentralPhoto1Grid"
          className = "CentralPhoto1" src = {this.state.largePhoto}/>
        </div>
      </div>
    );
  }
}

export default ImageWheel;


