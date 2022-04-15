import axios from 'axios';
import React from 'react';
import Features from './Components/Features.js';
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
    };
  }

  componentDidMount () {
    var randomIndex = Math.floor(Math.random() * 1011);
    randomIndex += 64620;
    // var randomIndex = 64620;
    axios.post('/products', {
      productId: randomIndex
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
    console.log('Test')
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
      <div>
        <ProductInformation data = {this.state.productData} style = {this.state.currentStyle}/>
        <Features data ={this.state.productData.features}/>
        <ImageWheel images = {this.state.styles}
        onClick ={this.handleImageClick.bind(this)} styleId = {this.state.currentStyle}/>
        <StyleSelection onClick ={this.handleStyleClick.bind(this)}
         styles = {this.state.styles} styleId = {this.state.currentStyle}/>
        <AddToCart />
        <Description data = {this.state.productData}/>
        <DescriptionList listItems = {this.state.productData}/>
      </div>
    );
  }
};

export default Product_Detail_Page;