import React from 'react';
import RelatedCardList from './components/RelatedProd';
import MyOutfit from './components/MyOutfitCard';
import axios from 'axios';
// import { acceptsEncodings } from 'express/lib/request';



class Related_Items_Comparisons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProdData: [],
      relatedProductsID: [],
      allRelatedProduct: [],
      allRelatedProductStyle: []
    };
  }

  componentDidMount() {
    var randomIndex = Math.floor(Math.random() * 1011);
    randomIndex += 64620;

    //this request the current product info
    axios.post('/relatedProductInfo', {
      productIds: [randomIndex]
    })
      .then((response) => {
        console.log('Successful get current product information Request: ', response.data)
        //here we sorted the data based on the ID
        return response.data;
      })
      .then((currentProductsData) => {
        this.setState({
          currentProdData: currentProductsData[0]
        })
      })
      .catch((error) => {
        console.log(`There was an error getting all related products information data: ${error}`);
      })

    //this reqesut related prodcut id for each related prodcuts 
    axios.post('/relatedProductId', {
      productIds: randomIndex
    })
      .then((response) => {
        console.log('Successful get all related products ID Request: ', response.data);
        response.data.sort(function (a, b) {
          return a - b;
        })
        return response.data;
      })
      .then((relatedProductsId) => {
        this.setState({
          relatedProductsID: relatedProductsId
        })
      })
      .catch((error) => {
        console.log(`There was an error getting all related products ID: ${error}`);
      })

      //this reqesut prodcut details for each related prodcuts 
      //(category, name, price, sale price, stat(will get it from the parent), image)
      .then(() => {
        axios.post('/relatedProductInfo', {
          productIds: this.state.relatedProductsID
        })
          .then((response) => {
            console.log('Successful get all related products information Request: ', response.data)
            //here we sorted the data based on the ID
            var data = response.data.sort((a, b) => Number(a.id) - Number(b.id));
            return data;
          })
          .then((relatedProductsData) => {
            this.setState({
              allRelatedProduct: relatedProductsData
            })
          })
          .catch((error) => {
            console.log(`There was an error getting all related products information data: ${error}`);
          })
      })
      .then(() => {
        //this reqesut prodcut style for each related prodcuts 
        axios.post('/relatedProductstyle', {
          // productIds: this.state.relatedProductsID
          productIds: this.state.relatedProductsID
        })
          .then((response) => {
            console.log('Successful get all related products style Request: ', response.data);
            //here we sorted the data based on the ID
            var data = response.data.sort((a, b) => Number(a.product_id) - Number(b.product_id));
            return data;
          })
          .then((relatedProductsStyleData) => {
            this.setState({
              allRelatedProductStyle: relatedProductsStyleData
            })
          })
          .catch((error) => {
            console.log(`There was an error getting all related products style data: ${error}`);
          })
      })
  }

  // {this.state.relatedProductsID.map((id) =>
  //   <RelatedProd productId={id} />
  // )}        


  render() {
    return (
      <div>
        <RelatedCardList
          productInfo={this.state.allRelatedProduct}
          productStyle={this.state.allRelatedProductStyle}
          eventHandler={this.props.eventHandler}
          currProdInfo={this.state.currentProdData}
        />
        <MyOutfit />
      </div>
    );
  }
};

export default Related_Items_Comparisons;