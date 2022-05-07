import axios from 'axios';
import React from 'react';
import AddToCart from './Components/AddToCart.js';
import ImageWheel from './Components/ImageWheel.js';
import Description from './Components/Description.js';
import StyleSelection from './Components/StyleSelection.js';
import ProductInformation from './Components/ProductInformation.js';
import DescriptionList from './Components/SubComponentLevel1/DescriptionList.js'


class Product_Detail_Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      relatedProducts: [],
      productData: [],
      styles: '',
      currentStyle: {},
      currentProductId: null,
      updateOutfit: null,
      stars: null,
    };
  }

  UNSAFE_componentWillReceiveProps (props) {
    // this.setState({currentProductId: props.productId})
    this.setState({['stars']: props.stars})
    this.setState({currentProductId: 64620})
    this.setState({['updateOutfit']: props.updateOutfit});
    // axios.post('/products', {
    //   productId: props.productId
    // })
    axios.post('/products', {
      productId: 64620
    })
    .then((response) => {
      console.log('Successful Product Request')
      //Update State Based on Data
      //Each if Statement in the for loop is associated with a unique identifier in state
      for (var i = 0; i < response.data.length; i++) {
        if (response.data[i].length) this.setState({['relatedProducts']: response.data[i]});
        if (response.data[i].campus !== undefined) this.setState({['productData']: response.data[i]});
        if (response.data[i].results !== undefined) this.setState({['styles']: response.data[i]});
      }
      // Idenifying the Default Image in Styles
      var currentStyles = this.state.styles.results;
      for (var i = 0; i < currentStyles.length; i++) {
        if (currentStyles[i]['default?'] === true) {
          this.setState({['currentStyle']: currentStyles[i]})
          break;
        }
      }
    }).catch((error) => {
      console.log('error', 'error');
    })
  }

  handleStyleClick (event) {
    var clickedOnStyleId = Number(event.target.name);
    var currentStyles = this.state.styles.results;
    for (var i = 0; i < currentStyles.length; i++) {
      if (currentStyles[i]['style_id'] === clickedOnStyleId) {
        this.setState({['currentStyle']: currentStyles[i]});
        break;
      }
    }
  }

  // handleImageClick (event) {

  //   console.log(event.target.name)
  // }


  render() {
    return (
      <div className ="productDetailPageGrid">
        <div className = "pageHeadergrid"></div>
        <div className = "imageWheelGrid">
          <ImageWheel images = {this.state.styles}
            styleId = {this.state.currentStyle}/>
        </div>

        <div className = "productInformationGrid">
          <ProductInformation data = {this.state.productData}
          style = {this.state.currentStyle}
          stars = {this.state.stars}/>
        </div>

        <div className = "styleSelectionGrid">
          <StyleSelection onClick ={this.handleStyleClick.bind(this)}
          styles = {this.state.styles} styleId = {this.state.currentStyle}/>
        </div>

        <div className = "addToCartGrid">
              <AddToCart currentStyle = {this.state.currentStyle}
              productId = {this.state.currentProductId}
              updateOutfit = {this.state.updateOutfit}
              />
        </div>

          <div className = "productDesctiptionFeatrues">
            <div className = "emptySpace"></div>
              <div className = "descriptionPane1">
                <Description data = {this.state.productData}/>
              </div>
              <div className="verticalLine"></div>
              <div className = "featureListPane2">
                <DescriptionList listItems = {this.state.productData}/>
              </div>
          </div>
        </div>
    );
  }
};

export default Product_Detail_Page;