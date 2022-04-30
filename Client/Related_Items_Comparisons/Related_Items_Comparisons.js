import React from 'react';
import RelatedCardList from './components/RelatedProdList';
import MyOutfitCardList from './components/MyOutfitCardList';
import axios from 'axios';
// import { acceptsEncodings } from 'express/lib/request';

class Related_Items_Comparisons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProdData: [],
      currentProdStyle: [],
      relatedProductsID: [],
      allRelatedProduct: [],
      allRelatedProductStyle: []
    };
  }

  componentDidMount() {
    var randomIndex = Math.floor(Math.random() * 1011);
    randomIndex += 64620;

    //the promise is very WET, will need to dry it out(tech debt), otherwise it is going to be very diffcult to debug
    //this request the current product info
    axios.post('/relatedProductInfo', {
      productIds: [randomIndex]
    })
      .then((response) => {
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

    //this request the current product style
    axios.post('/relatedProductstyle', {
      // productIds: this.state.relatedProductsID
      productIds: [randomIndex]
    })
      .then((response) => {
        return response.data;
      })
      .then((currentProductsStyleData) => {
        this.setState({
          currentProdStyle: currentProductsStyleData[0]
        })
        // console.log('hereerere', this.state.currentProdStyle);
      })
      .catch((error) => {
        console.log(`There was an error getting current products style data: ${error}`);
      })

    //this reqesut related prodcut id for each related prodcuts 
    axios.post('/relatedProductId', {
      productIds: randomIndex
    })
      .then((response) => {
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
          .then(() => {
            //this reqesut prodcut style for each related prodcuts 
            axios.post('/relatedProductstyle', {
              // productIds: this.state.relatedProductsID
              productIds: this.state.relatedProductsID
            })
              .then((response) => {
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
              .then(() => {
                var relatedProds = this.state.allRelatedProduct;
                var relatedProdsStyle = this.state.allRelatedProductStyle;
                for (var i = 0; i < relatedProds.length; i++) {
                  var urlToPhoto = relatedProdsStyle[i].results[0].photos[0].thumbnail_url;
                  relatedProds[i].thumbnail_url = urlToPhoto;
                }
                this.setState({
                  allRelatedProduct: relatedProds
                })
              })
          })
      })
  }

  render() {
    return (
      <div>
        <h4 className="title related">Related Products</h4>
        <RelatedCardList
          productInfo={this.state.allRelatedProduct}
          productStyle={this.state.allRelatedProductStyle}
          eventHandler={this.props.eventHandler}
          currProdInfo={this.state.currentProdData}
        />
        <h4 className="title outfit">Your OutFit</h4>
        <MyOutfitCardList
          currProdInfo={this.state.currentProdData}
          currProdStyle={this.state.currentProdStyle}
          eventHandler={this.props.myOutfitEventHandler}
          myOutfitIds={this.props.myOutfitIds}
          onClickMyOutfitDeleteEvent={this.props.onClickMyOutfitDeleteEvent}
        />
      </div>
    );
  }
};

export default Related_Items_Comparisons;