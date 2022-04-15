import React from 'react';
import RelatedProd from './components/RelatedProd';
import MyOutfit from './components/MyOutfit';
import axios from 'axios';



class Related_Items_Comparisons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      relatedProductsID: [],
      allRelatedProduct: [],
      allRelatedProductStyle: []
    };
  }

  componentDidMount() {
    var randomIndex = Math.floor(Math.random() * 1011);
    randomIndex += 64620;

    //this reqesut related prodcut id for each related prodcuts 
    axios.post('/relatedProductId', {
      productIds: randomIndex
    })
      .then((response) => {
        console.log('Successful get all related products ID Request: ', response.data);
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
          //productIds: this.state.relatedProductsID
          productIds: this.state.relatedProductsID
        })
          .then((response) => {
            console.log('Successful get all related products information Request: ', response.data);
            return response.data;
          })
          .then((relatedProductsData) => {
            this.setState({
              allRelatedProduct: relatedProductsData
            })
          })
          .catch((error) => {
            console.log(`There was an error getting all related products information data: ${error}`);
          })

        //this reqesut prodcut style for each related prodcuts 
        axios.post('/relatedProductstyle', {
          // productIds: this.state.relatedProductsID
          productIds: this.state.relatedProductsID
        })
          .then((response) => {
            console.log('Successful get all related products style Request: ', response.data);
            return response.data;
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
        <h1>Widget4 is related product list and my out fit list</h1>
        <RelatedProd productInfo={this.state.allRelatedProduct} productStyle={this.state.allRelatedProductStyle} />
        <MyOutfit />
      </div>
    );
  }
};

export default Related_Items_Comparisons;