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
      showNewCard: false
    }

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    //this requests all the style info of the myoutfit
    //console.log('???', this.state.myoutfitIds)
    axios.post('/relatedProductInfo', {
      productIds: this.state.myOutfitIds
    })
      .then((response) => {
        console.log('Successful get all my products information Request: ', response.data)
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
          // productIds: this.state.relatedProductsID
          productIds: this.state.myOutfitIds
        })
          .then((response) => {
            console.log('Successful get all my products style Request: ', response.data);
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
            var ProdInfo = this.state.myProdInfo;
            var ProdStyle = this.state.myProdStyle;
            for (var i = 0; i < ProdInfo.length; i++) {
              var urlToPhoto = ProdStyle[i].results[0].photos[0].thumbnail_url;
              ProdInfo[i].thumbnail_url = urlToPhoto;
            }
            this.setState({
              myProdInfo: ProdInfo
            })
          })
          .catch((error) => {
            console.log(`There was an error getting all my products style data: ${error}`);
          })
      })
  }

  handleClick = () => {
    console.log("+ is clicked")

    //when + is click, the current product will be added to this card list 
    this.setState({
      showNewCard: true
    })
    console.log('+ product info', this.state.currentProdInfo);

  }

  render() {
    return (
      <div className="myoutfit-Card list">
        <div className="add-new-card list-card" onClick={() => {
          this.props.eventHandler();
        }}>
          <h1 classname="add-symbol">+</h1>
        </div>
        <div className="MyOutfit-Card">
          {this.state.myProdInfo.map((product, index) => {
            return (<MyOutfitCard
              product={product}
              key={index}
              eventHandler={this.props.eventHandler}
              dataToFeedTable={this.props.dataToFeedTable}
              currProdInfo={this.props.currProdInfo}
              onClickMyOutfitDeleteEvent={this.props.onClickMyOutfitDeleteEvent}
            />);
          })}
        </div>

      </div>
    )
  }
}

export default MyOutfitCardList;