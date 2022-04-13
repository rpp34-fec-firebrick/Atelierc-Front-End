import axios from 'axios';
import React from 'react';
import Features from './Components/Features.js';
import AddToCart from './Components/AddToCart.js';
import ImageWheel from './Components/ImageWheel.js';
import Description from './Components/Description.js';
import StyleSelection from './Components/StyleSelection.js';
import DescriptionList from './Components/SubComponentLevel1/DescriptionList.js'
class Product_Detail_Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      relatedProducts: [],
      productData: [],
      styles: {}
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
    }).catch((error) => {
      console.log('error', 'error');
    })
  }

  render() {
    return (
      <div>
        <Features data ={this.state.productData.features}/>
        <ImageWheel images = {this.state.styles}/>
        <StyleSelection styles = {this.state.styles} />
        <AddToCart />
        <Description data = {this.state.productData}/>
        <DescriptionList listItems = {this.state.productData}/>
      </div>
    );
  }
};

export default Product_Detail_Page;