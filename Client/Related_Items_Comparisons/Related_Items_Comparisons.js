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

    //this reqesut prodcut details for each related prodcuts 
    //(category, name, price, sale price, stat(will get it from the parent), image)
    axios.post('/relatedProductInfo', {
      productIds: [randomIndex, randomIndex + 1, randomIndex + 2]
    })
      .then((response) => {
        console.log('Successful get all related products Request: ', response.data);
        return response.data;
      })
      .then((relatedProductsData) => {
        this.setState({
          allRelatedProduct: relatedProductsData
        })
      })
      .catch((error) => {
        console.log(`There was an error getting all related products data: ${error}`);
      })

      axios.post('/relatedProductstyle', {
        productIds: [randomIndex, randomIndex + 1, randomIndex + 2]
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
  }

  render() {
    return (
      <div>
        <h1>Widget4 is related product list and my out fit list</h1>
        <RelatedProd />
        <MyOutfit />
      </div>
    );
  }
};

export default Related_Items_Comparisons;