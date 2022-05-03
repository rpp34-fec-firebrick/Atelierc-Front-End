import React from 'react';
import MyOutfitCard from './MyOutfitCard';
import axios from 'axios';


class MyOutfitCardList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      myOutfitIds: this.props.myOutfitIds,
      myProdInfo: [],
      myProdStyle: [],
      showNewCard: false,
      currentProdInfo: this.props.currProdInfo
    }

    this.handleClick = this.handleClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  componentDidMount() {
    //this requests all the style info of the myoutfit
    //console.log('???', this.state.myoutfitIds)
    axios.post('/relatedProductInfo', {
      productIds: this.state.myOutfitIds
    })
      .then((response) => {
        //here we sorted the data based on the ID
        var data = response.data.sort((a, b) => Number(a.id) - Number(b.id));
        return data;
      })
      .then((myProductsData) => {
        this.setState({
          myProdInfo: myProductsData
        })
      })
      .catch((error) => {
        console.log(`There was an error getting all my products information data: ${error}`);
      })
      .then(() => {
        axios.post('/relatedProductstyle', {
          productIds: this.state.myOutfitIds
        })
          .then((response) => {
            //here we sorted the data based on the ID
            var data = response.data.sort((a, b) => Number(a.product_id) - Number(b.product_id));
            return data;
          })
          .then((myProductsStyleData) => {
            this.setState({
              myProdStyle: myProductsStyleData
            })
          })
          .then(() => {
            var prodInfo = this.state.myProdInfo;
            var prodStyle = this.state.myProdStyle;
            for (var i = 0; i < prodInfo.length; i++) {
              var urlToPhoto = prodStyle[i].results[0].photos[0].thumbnail_url;
              prodInfo[i].thumbnail_url = urlToPhoto;
            }
            this.setState({
              myProdInfo: prodInfo
            })
          })
          .catch((error) => {
            console.log(`There was an error getting all my products style data: ${error}`);
          })
      })
  }

  handleClick = (productId) => {
    axios.post('/relatedProductstyle', {
      productIds: [productId]
    })
      .then((response) => {
        return response.data;
      })
      .then((productStyleData) => {
        var prodInfo = this.props.currProdInfo;
        var urlToPhoto = productStyleData[0].results[0].photos[0].thumbnail_url;
        prodInfo.thumbnail_url = urlToPhoto;
        return prodInfo;
      })
      .then((prodInfo) => {
        if (!this.state.myProdInfo.includes(prodInfo)) {
          this.setState({
            myProdInfo: this.state.myProdInfo.concat([prodInfo])
          })
        }
      })
      .catch((error) => {
        console.log(`There was an error getting a product style data: ${error}`);
      })
  }

  handleDeleteClick = (productId) => {
    //find the item based on the product ID
    //take it out from the array
    var currentProductList = this.state.myProdInfo;
    var newProductList = []
    var i = 0;
    while (i < currentProductList.length) {
      if (currentProductList[i].id !== productId) {
        newProductList.push(currentProductList[i])
      }
      i++;
    }
    this.setState({
      myProdInfo: newProductList
    })
  }

  render() {
    return (
      <div className="myoutfit-Card list" >
        <div className="add-new-card list-card" onClick={() => {
          this.props.eventHandler();
          this.handleClick(this.props.currProdInfo.id);
        }}>
          <h1 className="add-symbol">+</h1>
        </div>
        {this.state.myProdInfo.map((product, index) => {
          return (<MyOutfitCard
            product={product}
            key={index}
            eventHandler={this.props.eventHandler}
            dataToFeedTable={this.props.dataToFeedTable}
            currProdInfo={this.props.currProdInfo}
            onClickMyOutfitDeleteEvent={this.props.onClickMyOutfitDeleteEvent}
            handleDeleteClick={this.handleDeleteClick}
          />);
        })}
      </div>
    )
  }
}

export default MyOutfitCardList;