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
    };
  }

  UNSAFE_componentWillReceiveProps (props) {
    this.setState({currentProductId: props.productId})
    axios.post('/products', {
      productId: props.productId
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

  handleImageClick (event) {
    // var clickedOnStyleId = Number(event.target.name);
    // var currentStyles = this.state.styles.results;
    // for (var i = 0; i < currentStyles.length; i++) {
    //   if (currentStyles[i]['style_id'] === clickedOnStyleId) {
    //     this.setState({['currentStyle']: currentStyles[i]});
    //     break;
    //   }
    // }
    console.log('hi')
  }


  render() {
    return (
      <div className = "productDetailPage1">
        <div className = "layout1">

          <div className ='PDPLayout1'>
            <ImageWheel images = {this.state.styles}
            onClick ={this.handleImageClick.bind(this)} styleId = {this.state.currentStyle}/>
          </div>
          <div className = "PDPLayout2">
            <div className = "Pane2Top">
            <ProductInformation data = {this.state.productData} style = {this.state.currentStyle}/>
              </div>
            <div className = "Pane2Middle">
            <StyleSelection onClick ={this.handleStyleClick.bind(this)}
            styles = {this.state.styles} styleId = {this.state.currentStyle}/>
            </div>
            <div className = "Pane2Botton">
            <AddToCart currentStyle = {this.state.currentStyle} productId = {this.state.currentProductId}/>
            </div>
          </div>

         </div>
         <div className = "layout2">
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